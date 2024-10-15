
const ERROR_IMPORT_FAILURE = 'Failed to import FFmpeg core';

let ffmpeg;
let arrayBufferPool = [];
const load = async ({ coreURL, wasmURL }) => {
  const first = !ffmpeg;
  try {
    // when web worker type is `classic`.
    importScripts([coreURL]);
  } catch {
    // when web worker type is `module`.
    const module = await import(/* @vite-ignore */ coreURL);
    self.createFFmpegCore = module.default;

    if (!self.createFFmpegCore) {
      throw ERROR_IMPORT_FAILURE;
    }
  }

  try {
    ffmpeg = await self.createFFmpegCore({
      // Fix `Overload resolution failed.` when using multi-threaded ffmpeg-core.
      // Encoded wasmURL and workerURL in the URL as a hack to fix locateFile issue.
      mainScriptUrlOrBlob: `${coreURL}#${btoa(JSON.stringify({ wasmURL }))}`,
    });
  } catch(e) {
    console.error(e);
    throw ERROR_IMPORT_FAILURE;
  }

  return first;
};

const decode = async ({ codec, data }) => {
  return ffmpeg.processFrame(codec, data, (_) =>{});
};

const recycle = (array) => {
  ffmpeg.recycleFrame(array);
}

const close = () => {
  ffmpeg.close();
  ffmpeg = null;
  arrayBufferPool = [];
}

// message handler is synchronous
self.onmessage = async ({ data: { id, type, data } }) => {
  try {
    if (type !== "LOAD" && !ffmpeg) {
      self.postMessage({
        id,
        type: "ERROR",
        data: "FFmpeg not loaded",
      });
    } else if (type === "LOAD") {
      const ret = await load(data);
      self.postMessage({ id, type, data: ret });
    } else if (type === "DECODE") {
      // accept moved buffer first
      if (data.arrayBuffer) {
        arrayBufferPool.push(data.arrayBuffer);
        if (arrayBufferPool.length > 8) {
          arrayBufferPool.shift();
        }
      }
      const ret = await decode(data);
      if (ret === 0) {
        var buffer = null;
        while(arrayBufferPool.length > 0) {
          var pop = arrayBufferPool.pop();
          if (pop.byteLength  === ffmpeg.frameBuffer.data.length) {
            buffer = pop;
            break;
          }
        }
        if (!buffer) {
          buffer = new ArrayBuffer(ffmpeg.frameBuffer.data.length);
          console.log("worker create arrayBuffer");
        }
        let array = new Uint8Array(buffer);
        array.set(ffmpeg.frameBuffer.data);
        self.postMessage({ id, type, data: {data: {data: buffer, yuvFormat: ffmpeg.frameBuffer.yuvFormat}}}, [buffer]);
        recycle(ffmpeg.frameBuffer.data);
      } else {
        self.postMessage({
          id,
          type: "ERROR",
          data: {},
        });
      }
    } else if (type === "CLOSE") {
      close();
      self.postMessage({ id, type, data: {} });
    } else {
      self.postMessage({
        id,
        type: "ERROR",
        data: `Unknown command: ${type}`,
      });
    }
  } catch (e) {
    self.postMessage({
      id,
      type: "ERROR",
      data: e.toString(),
    });
  }
};