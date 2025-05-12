import {getServerConf} from "./ljw.js?v=7"
import {ids as langIds, lang} from './lang.js?v=7'
import {F as ka, J as H4, L as K4, l as Le, m as r, P as ha, s as ga, z as e4} from "./vendor.js?v=0b990c6e";

var _a = Object.defineProperty;
var va = (u, e, i) => e in u ? _a(u, e, {enumerable: !0, configurable: !0, writable: !0, value: i}) : u[e] = i;
var D = (u, e, i) => (va(u, typeof e != "symbol" ? e + "" : e, i), i), o4 = (u, e, i) => {
    if (!e.has(u)) throw TypeError("Cannot " + i)
};
var h = (u, e, i) => (o4(u, e, "read from private field"), i ? i.call(u) : e.get(u)), Cu = (u, e, i) => {
    if (e.has(u)) throw TypeError("Cannot add the same private member more than once");
    e instanceof WeakSet ? e.add(u) : e.set(u, i)
}, _e = (u, e, i, n) => (o4(u, e, "write to private field"), n ? n.call(u, i) : e.set(u, i), i), V4 = (u, e, i, n) => ({
    set _(a) {
        _e(u, e, a, i)
    }, get _() {
        return h(u, e, n)
    }
}), q4 = (u, e, i) => (o4(u, e, "access private method"), i);

const fa = function () {
    const e = document.createElement("link").relList;
    if (e && e.supports && e.supports("modulepreload")) return;
    for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
    new MutationObserver(a => {
        for (const t of a) if (t.type === "childList") for (const s of t.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && n(s)
    }).observe(document, {childList: !0, subtree: !0});

    function i(a) {
        const t = {};
        return a.integrity && (t.integrity = a.integrity), a.referrerpolicy && (t.referrerPolicy = a.referrerpolicy), a.crossorigin === "use-credentials" ? t.credentials = "include" : a.crossorigin === "anonymous" ? t.credentials = "omit" : t.credentials = "same-origin", t
    }

    function n(a) {
        if (a.ep) return;
        a.ep = !0;
        const t = i(a);
        fetch(a.href, t)
    }
};
fa();
var l4 = (u => (u[u.I420 = 0] = "I420", u[u.I444 = 1] = "I444", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(l4 || {});

function xa(u) {
    switch (u) {
        case 0:
        case"I420":
            return 0;
        case 1:
        case"I444":
            return 1;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function ya(u) {
    switch (u) {
        case 0:
            return "I420";
        case 1:
            return "I444";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var Fe = (u => (u[u.Legacy = 0] = "Legacy", u[u.Map = 1] = "Map", u[u.Translate = 2] = "Translate", u[u.Auto = 3] = "Auto", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(Fe || {});

function ba(u) {
    switch (u) {
        case 0:
        case"Legacy":
            return 0;
        case 1:
        case"Map":
            return 1;
        case 2:
        case"Translate":
            return 2;
        case 3:
        case"Auto":
            return 3;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function wa(u) {
    switch (u) {
        case 0:
            return "Legacy";
        case 1:
            return "Map";
        case 2:
            return "Translate";
        case 3:
            return "Auto";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var j = (u => (u[u.Unknown = 0] = "Unknown", u[u.Alt = 1] = "Alt", u[u.Backspace = 2] = "Backspace", u[u.CapsLock = 3] = "CapsLock", u[u.Control = 4] = "Control", u[u.Delete = 5] = "Delete", u[u.DownArrow = 6] = "DownArrow", u[u.End = 7] = "End", u[u.Escape = 8] = "Escape", u[u.F1 = 9] = "F1", u[u.F10 = 10] = "F10", u[u.F11 = 11] = "F11", u[u.F12 = 12] = "F12", u[u.F2 = 13] = "F2", u[u.F3 = 14] = "F3", u[u.F4 = 15] = "F4", u[u.F5 = 16] = "F5", u[u.F6 = 17] = "F6", u[u.F7 = 18] = "F7", u[u.F8 = 19] = "F8", u[u.F9 = 20] = "F9", u[u.Home = 21] = "Home", u[u.LeftArrow = 22] = "LeftArrow", u[u.Meta = 23] = "Meta", u[u.Option = 24] = "Option", u[u.PageDown = 25] = "PageDown", u[u.PageUp = 26] = "PageUp", u[u.Return = 27] = "Return", u[u.RightArrow = 28] = "RightArrow", u[u.Shift = 29] = "Shift", u[u.Space = 30] = "Space", u[u.Tab = 31] = "Tab", u[u.UpArrow = 32] = "UpArrow", u[u.Numpad0 = 33] = "Numpad0", u[u.Numpad1 = 34] = "Numpad1", u[u.Numpad2 = 35] = "Numpad2", u[u.Numpad3 = 36] = "Numpad3", u[u.Numpad4 = 37] = "Numpad4", u[u.Numpad5 = 38] = "Numpad5", u[u.Numpad6 = 39] = "Numpad6", u[u.Numpad7 = 40] = "Numpad7", u[u.Numpad8 = 41] = "Numpad8", u[u.Numpad9 = 42] = "Numpad9", u[u.Cancel = 43] = "Cancel", u[u.Clear = 44] = "Clear", u[u.Menu = 45] = "Menu", u[u.Pause = 46] = "Pause", u[u.Kana = 47] = "Kana", u[u.Hangul = 48] = "Hangul", u[u.Junja = 49] = "Junja", u[u.Final = 50] = "Final", u[u.Hanja = 51] = "Hanja", u[u.Kanji = 52] = "Kanji", u[u.Convert = 53] = "Convert", u[u.Select = 54] = "Select", u[u.Print = 55] = "Print", u[u.Execute = 56] = "Execute", u[u.Snapshot = 57] = "Snapshot", u[u.Insert = 58] = "Insert", u[u.Help = 59] = "Help", u[u.Sleep = 60] = "Sleep", u[u.Separator = 61] = "Separator", u[u.Scroll = 62] = "Scroll", u[u.NumLock = 63] = "NumLock", u[u.RWin = 64] = "RWin", u[u.Apps = 65] = "Apps", u[u.Multiply = 66] = "Multiply", u[u.Add = 67] = "Add", u[u.Subtract = 68] = "Subtract", u[u.Decimal = 69] = "Decimal", u[u.Divide = 70] = "Divide", u[u.Equals = 71] = "Equals", u[u.NumpadEnter = 72] = "NumpadEnter", u[u.RShift = 73] = "RShift", u[u.RControl = 74] = "RControl", u[u.RAlt = 75] = "RAlt", u[u.VolumeMute = 76] = "VolumeMute", u[u.VolumeUp = 77] = "VolumeUp", u[u.VolumeDown = 78] = "VolumeDown", u[u.Power = 79] = "Power", u[u.CtrlAltDel = 100] = "CtrlAltDel", u[u.LockScreen = 101] = "LockScreen", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(j || {});

function fe(u) {
    switch (u) {
        case 0:
        case"Unknown":
            return 0;
        case 1:
        case"Alt":
            return 1;
        case 2:
        case"Backspace":
            return 2;
        case 3:
        case"CapsLock":
            return 3;
        case 4:
        case"Control":
            return 4;
        case 5:
        case"Delete":
            return 5;
        case 6:
        case"DownArrow":
            return 6;
        case 7:
        case"End":
            return 7;
        case 8:
        case"Escape":
            return 8;
        case 9:
        case"F1":
            return 9;
        case 10:
        case"F10":
            return 10;
        case 11:
        case"F11":
            return 11;
        case 12:
        case"F12":
            return 12;
        case 13:
        case"F2":
            return 13;
        case 14:
        case"F3":
            return 14;
        case 15:
        case"F4":
            return 15;
        case 16:
        case"F5":
            return 16;
        case 17:
        case"F6":
            return 17;
        case 18:
        case"F7":
            return 18;
        case 19:
        case"F8":
            return 19;
        case 20:
        case"F9":
            return 20;
        case 21:
        case"Home":
            return 21;
        case 22:
        case"LeftArrow":
            return 22;
        case 23:
        case"Meta":
            return 23;
        case 24:
        case"Option":
            return 24;
        case 25:
        case"PageDown":
            return 25;
        case 26:
        case"PageUp":
            return 26;
        case 27:
        case"Return":
            return 27;
        case 28:
        case"RightArrow":
            return 28;
        case 29:
        case"Shift":
            return 29;
        case 30:
        case"Space":
            return 30;
        case 31:
        case"Tab":
            return 31;
        case 32:
        case"UpArrow":
            return 32;
        case 33:
        case"Numpad0":
            return 33;
        case 34:
        case"Numpad1":
            return 34;
        case 35:
        case"Numpad2":
            return 35;
        case 36:
        case"Numpad3":
            return 36;
        case 37:
        case"Numpad4":
            return 37;
        case 38:
        case"Numpad5":
            return 38;
        case 39:
        case"Numpad6":
            return 39;
        case 40:
        case"Numpad7":
            return 40;
        case 41:
        case"Numpad8":
            return 41;
        case 42:
        case"Numpad9":
            return 42;
        case 43:
        case"Cancel":
            return 43;
        case 44:
        case"Clear":
            return 44;
        case 45:
        case"Menu":
            return 45;
        case 46:
        case"Pause":
            return 46;
        case 47:
        case"Kana":
            return 47;
        case 48:
        case"Hangul":
            return 48;
        case 49:
        case"Junja":
            return 49;
        case 50:
        case"Final":
            return 50;
        case 51:
        case"Hanja":
            return 51;
        case 52:
        case"Kanji":
            return 52;
        case 53:
        case"Convert":
            return 53;
        case 54:
        case"Select":
            return 54;
        case 55:
        case"Print":
            return 55;
        case 56:
        case"Execute":
            return 56;
        case 57:
        case"Snapshot":
            return 57;
        case 58:
        case"Insert":
            return 58;
        case 59:
        case"Help":
            return 59;
        case 60:
        case"Sleep":
            return 60;
        case 61:
        case"Separator":
            return 61;
        case 62:
        case"Scroll":
            return 62;
        case 63:
        case"NumLock":
            return 63;
        case 64:
        case"RWin":
            return 64;
        case 65:
        case"Apps":
            return 65;
        case 66:
        case"Multiply":
            return 66;
        case 67:
        case"Add":
            return 67;
        case 68:
        case"Subtract":
            return 68;
        case 69:
        case"Decimal":
            return 69;
        case 70:
        case"Divide":
            return 70;
        case 71:
        case"Equals":
            return 71;
        case 72:
        case"NumpadEnter":
            return 72;
        case 73:
        case"RShift":
            return 73;
        case 74:
        case"RControl":
            return 74;
        case 75:
        case"RAlt":
            return 75;
        case 76:
        case"VolumeMute":
            return 76;
        case 77:
        case"VolumeUp":
            return 77;
        case 78:
        case"VolumeDown":
            return 78;
        case 79:
        case"Power":
            return 79;
        case 100:
        case"CtrlAltDel":
            return 100;
        case 101:
        case"LockScreen":
            return 101;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function We(u) {
    switch (u) {
        case 0:
            return "Unknown";
        case 1:
            return "Alt";
        case 2:
            return "Backspace";
        case 3:
            return "CapsLock";
        case 4:
            return "Control";
        case 5:
            return "Delete";
        case 6:
            return "DownArrow";
        case 7:
            return "End";
        case 8:
            return "Escape";
        case 9:
            return "F1";
        case 10:
            return "F10";
        case 11:
            return "F11";
        case 12:
            return "F12";
        case 13:
            return "F2";
        case 14:
            return "F3";
        case 15:
            return "F4";
        case 16:
            return "F5";
        case 17:
            return "F6";
        case 18:
            return "F7";
        case 19:
            return "F8";
        case 20:
            return "F9";
        case 21:
            return "Home";
        case 22:
            return "LeftArrow";
        case 23:
            return "Meta";
        case 24:
            return "Option";
        case 25:
            return "PageDown";
        case 26:
            return "PageUp";
        case 27:
            return "Return";
        case 28:
            return "RightArrow";
        case 29:
            return "Shift";
        case 30:
            return "Space";
        case 31:
            return "Tab";
        case 32:
            return "UpArrow";
        case 33:
            return "Numpad0";
        case 34:
            return "Numpad1";
        case 35:
            return "Numpad2";
        case 36:
            return "Numpad3";
        case 37:
            return "Numpad4";
        case 38:
            return "Numpad5";
        case 39:
            return "Numpad6";
        case 40:
            return "Numpad7";
        case 41:
            return "Numpad8";
        case 42:
            return "Numpad9";
        case 43:
            return "Cancel";
        case 44:
            return "Clear";
        case 45:
            return "Menu";
        case 46:
            return "Pause";
        case 47:
            return "Kana";
        case 48:
            return "Hangul";
        case 49:
            return "Junja";
        case 50:
            return "Final";
        case 51:
            return "Hanja";
        case 52:
            return "Kanji";
        case 53:
            return "Convert";
        case 54:
            return "Select";
        case 55:
            return "Print";
        case 56:
            return "Execute";
        case 57:
            return "Snapshot";
        case 58:
            return "Insert";
        case 59:
            return "Help";
        case 60:
            return "Sleep";
        case 61:
            return "Separator";
        case 62:
            return "Scroll";
        case 63:
            return "NumLock";
        case 64:
            return "RWin";
        case 65:
            return "Apps";
        case 66:
            return "Multiply";
        case 67:
            return "Add";
        case 68:
            return "Subtract";
        case 69:
            return "Decimal";
        case 70:
            return "Divide";
        case 71:
            return "Equals";
        case 72:
            return "NumpadEnter";
        case 73:
            return "RShift";
        case 74:
            return "RControl";
        case 75:
            return "RAlt";
        case 76:
            return "VolumeMute";
        case 77:
            return "VolumeUp";
        case 78:
            return "VolumeDown";
        case 79:
            return "Power";
        case 100:
            return "CtrlAltDel";
        case 101:
            return "LockScreen";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var Du = (u => (u[u.Text = 0] = "Text", u[u.Rtf = 1] = "Rtf", u[u.Html = 2] = "Html", u[u.ImageRgba = 21] = "ImageRgba", u[u.ImagePng = 22] = "ImagePng", u[u.ImageSvg = 23] = "ImageSvg", u[u.Special = 31] = "Special", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(Du || {});

function Sa(u) {
    switch (u) {
        case 0:
        case"Text":
            return 0;
        case 1:
        case"Rtf":
            return 1;
        case 2:
        case"Html":
            return 2;
        case 21:
        case"ImageRgba":
            return 21;
        case 22:
        case"ImagePng":
            return 22;
        case 23:
        case"ImageSvg":
            return 23;
        case 31:
        case"Special":
            return 31;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function za(u) {
    switch (u) {
        case 0:
            return "Text";
        case 1:
            return "Rtf";
        case 2:
            return "Html";
        case 21:
            return "ImageRgba";
        case 22:
            return "ImagePng";
        case 23:
            return "ImageSvg";
        case 31:
            return "Special";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var ft = (u => (u[u.Dir = 0] = "Dir", u[u.DirLink = 2] = "DirLink", u[u.DirDrive = 3] = "DirDrive", u[u.File = 4] = "File", u[u.FileLink = 5] = "FileLink", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(ft || {});

function Pa(u) {
    switch (u) {
        case 0:
        case"Dir":
            return 0;
        case 2:
        case"DirLink":
            return 2;
        case 3:
        case"DirDrive":
            return 3;
        case 4:
        case"File":
            return 4;
        case 5:
        case"FileLink":
            return 5;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Ra(u) {
    switch (u) {
        case 0:
            return "Dir";
        case 2:
            return "DirLink";
        case 3:
            return "DirDrive";
        case 4:
            return "File";
        case 5:
            return "FileLink";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var Te = (u => (u[u.NotSet = 0] = "NotSet", u[u.Low = 2] = "Low", u[u.Balanced = 3] = "Balanced", u[u.Best = 4] = "Best", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(Te || {});

function Ia(u) {
    switch (u) {
        case 0:
        case"NotSet":
            return 0;
        case 2:
        case"Low":
            return 2;
        case 3:
        case"Balanced":
            return 3;
        case 4:
        case"Best":
            return 4;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Ta(u) {
    switch (u) {
        case 0:
            return "NotSet";
        case 2:
            return "Low";
        case 3:
            return "Balanced";
        case 4:
            return "Best";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

function ja(u) {
    switch (u) {
        case 0:
        case"Generic":
            return 0;
        case 1:
        case"Printer":
            return 1;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Na(u) {
    switch (u) {
        case 0:
            return "Generic";
        case 1:
            return "Printer";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var a0 = (u => (u[u.Keyboard = 0] = "Keyboard", u[u.Clipboard = 2] = "Clipboard", u[u.Audio = 3] = "Audio", u[u.File = 4] = "File", u[u.Restart = 5] = "Restart", u[u.Recording = 6] = "Recording", u[u.BlockInput = 7] = "BlockInput", u[u.Camera = 8] = "Camera", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(a0 || {});

function Oa(u) {
    switch (u) {
        case 0:
        case"Keyboard":
            return 0;
        case 2:
        case"Clipboard":
            return 2;
        case 3:
        case"Audio":
            return 3;
        case 4:
        case"File":
            return 4;
        case 5:
        case"Restart":
            return 5;
        case 6:
        case"Recording":
            return 6;
        case 7:
        case"BlockInput":
            return 7;
        case 8:
        case"Camera":
            return 8;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Ua(u) {
    switch (u) {
        case 0:
            return "Keyboard";
        case 2:
            return "Clipboard";
        case 3:
            return "Audio";
        case 4:
            return "File";
        case 5:
            return "Restart";
        case 6:
            return "Recording";
        case 7:
            return "BlockInput";
        case 8:
            return "Camera";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var mu = (u => (u[u.Auto = 0] = "Auto", u[u.VP9 = 1] = "VP9", u[u.H264 = 2] = "H264", u[u.H265 = 3] = "H265", u[u.VP8 = 4] = "VP8", u[u.AV1 = 5] = "AV1", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(mu || {});

function Ma(u) {
    switch (u) {
        case 0:
        case"Auto":
            return 0;
        case 1:
        case"VP9":
            return 1;
        case 2:
        case"H264":
            return 2;
        case 3:
        case"H265":
            return 3;
        case 4:
        case"VP8":
            return 4;
        case 5:
        case"AV1":
            return 5;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function La(u) {
    switch (u) {
        case 0:
            return "Auto";
        case 1:
            return "VP9";
        case 2:
            return "H264";
        case 3:
            return "H265";
        case 4:
            return "VP8";
        case 5:
            return "AV1";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var y = (u => (u[u.NotSet = 0] = "NotSet", u[u.No = 1] = "No", u[u.Yes = 2] = "Yes", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(y || {});

function X(u) {
    switch (u) {
        case 0:
        case"NotSet":
            return 0;
        case 1:
        case"No":
            return 1;
        case 2:
        case"Yes":
            return 2;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Y(u) {
    switch (u) {
        case 0:
            return "NotSet";
        case 1:
            return "No";
        case 2:
            return "Yes";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var ge = (u => (u[u.BlkStateUnknown = 0] = "BlkStateUnknown", u[u.BlkOnSucceeded = 2] = "BlkOnSucceeded", u[u.BlkOnFailed = 3] = "BlkOnFailed", u[u.BlkOffSucceeded = 4] = "BlkOffSucceeded", u[u.BlkOffFailed = 5] = "BlkOffFailed", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(ge || {});

function Wa(u) {
    switch (u) {
        case 0:
        case"BlkStateUnknown":
            return 0;
        case 2:
        case"BlkOnSucceeded":
            return 2;
        case 3:
        case"BlkOnFailed":
            return 3;
        case 4:
        case"BlkOffSucceeded":
            return 4;
        case 5:
        case"BlkOffFailed":
            return 5;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Va(u) {
    switch (u) {
        case 0:
            return "BlkStateUnknown";
        case 2:
            return "BlkOnSucceeded";
        case 3:
            return "BlkOnFailed";
        case 4:
            return "BlkOffSucceeded";
        case 5:
            return "BlkOffFailed";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var nu = (u => (u[u.PrvStateUnknown = 0] = "PrvStateUnknown", u[u.PrvOnByOther = 2] = "PrvOnByOther", u[u.PrvNotSupported = 3] = "PrvNotSupported", u[u.PrvOnSucceeded = 4] = "PrvOnSucceeded", u[u.PrvOnFailedDenied = 5] = "PrvOnFailedDenied", u[u.PrvOnFailedPlugin = 6] = "PrvOnFailedPlugin", u[u.PrvOnFailed = 7] = "PrvOnFailed", u[u.PrvOffSucceeded = 8] = "PrvOffSucceeded", u[u.PrvOffByPeer = 9] = "PrvOffByPeer", u[u.PrvOffFailed = 10] = "PrvOffFailed", u[u.PrvOffUnknown = 11] = "PrvOffUnknown", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(nu || {});

function qa(u) {
    switch (u) {
        case 0:
        case"PrvStateUnknown":
            return 0;
        case 2:
        case"PrvOnByOther":
            return 2;
        case 3:
        case"PrvNotSupported":
            return 3;
        case 4:
        case"PrvOnSucceeded":
            return 4;
        case 5:
        case"PrvOnFailedDenied":
            return 5;
        case 6:
        case"PrvOnFailedPlugin":
            return 6;
        case 7:
        case"PrvOnFailed":
            return 7;
        case 8:
        case"PrvOffSucceeded":
            return 8;
        case 9:
        case"PrvOffByPeer":
            return 9;
        case 10:
        case"PrvOffFailed":
            return 10;
        case 11:
        case"PrvOffUnknown":
            return 11;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Ka(u) {
    switch (u) {
        case 0:
            return "PrvStateUnknown";
        case 2:
            return "PrvOnByOther";
        case 3:
            return "PrvNotSupported";
        case 4:
            return "PrvOnSucceeded";
        case 5:
            return "PrvOnFailedDenied";
        case 6:
            return "PrvOnFailedPlugin";
        case 7:
            return "PrvOnFailed";
        case 8:
            return "PrvOffSucceeded";
        case 9:
            return "PrvOffByPeer";
        case 10:
            return "PrvOffFailed";
        case 11:
            return "PrvOffUnknown";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

function J4() {
    return {data: new Uint8Array(0), key: !1, pts: 0}
}

const n0 = {
    encode(u, e = r.Writer.create()) {
        return u.data.length !== 0 && e.uint32(10).bytes(u.data), u.key !== !1 && e.uint32(16).bool(u.key), u.pts !== 0 && e.uint32(24).int64(u.pts), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = J4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.data = i.bytes();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.key = i.bool();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.pts = q(i.int64());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            data: o(u.data) ? z(u.data) : new Uint8Array(0),
            key: o(u.key) ? globalThis.Boolean(u.key) : !1,
            pts: o(u.pts) ? globalThis.Number(u.pts) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.data.length !== 0 && (e.data = P(u.data)), u.key !== !1 && (e.key = u.key), u.pts !== 0 && (e.pts = Math.round(u.pts)), e
    }, create(u) {
        return n0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = J4();
        return e.data = (i = u.data) != null ? i : new Uint8Array(0), e.key = (n = u.key) != null ? n : !1, e.pts = (a = u.pts) != null ? a : 0, e
    }
};

function G4() {
    return {frames: []}
}

const g = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.frames) n0.encode(i, e.uint32(10).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = G4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.frames.push(n0.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {frames: globalThis.Array.isArray(u == null ? void 0 : u.frames) ? u.frames.map(e => n0.fromJSON(e)) : []}
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.frames) != null && i.length && (e.frames = u.frames.map(n => n0.toJSON(n))), e
    }, create(u) {
        return g.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = G4();
        return e.frames = ((i = u.frames) == null ? void 0 : i.map(n => n0.fromPartial(n))) || [], e
    }
};

function Z4() {
    return {compress: !1}
}

const o0 = {
    encode(u, e = r.Writer.create()) {
        return u.compress !== !1 && e.uint32(8).bool(u.compress), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Z4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.compress = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {compress: o(u.compress) ? globalThis.Boolean(u.compress) : !1}
    }, toJSON(u) {
        const e = {};
        return u.compress !== !1 && (e.compress = u.compress), e
    }, create(u) {
        return o0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Z4();
        return e.compress = (i = u.compress) != null ? i : !1, e
    }
};

function Q4() {
    return {compress: !1, stride: 0}
}

const r0 = {
    encode(u, e = r.Writer.create()) {
        return u.compress !== !1 && e.uint32(8).bool(u.compress), u.stride !== 0 && e.uint32(16).int32(u.stride), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Q4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.compress = i.bool();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.stride = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            compress: o(u.compress) ? globalThis.Boolean(u.compress) : !1,
            stride: o(u.stride) ? globalThis.Number(u.stride) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.compress !== !1 && (e.compress = u.compress), u.stride !== 0 && (e.stride = Math.round(u.stride)), e
    }, create(u) {
        return r0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Q4();
        return e.compress = (i = u.compress) != null ? i : !1, e.stride = (n = u.stride) != null ? n : 0, e
    }
};

function X4() {
    return {
        vp9s: void 0,
        rgb: void 0,
        yuv: void 0,
        h264s: void 0,
        h265s: void 0,
        vp8s: void 0,
        av1s: void 0,
        display: 0
    }
}

const s0 = {
    encode(u, e = r.Writer.create()) {
        return u.vp9s !== void 0 && g.encode(u.vp9s, e.uint32(50).fork()).ldelim(), u.rgb !== void 0 && o0.encode(u.rgb, e.uint32(58).fork()).ldelim(), u.yuv !== void 0 && r0.encode(u.yuv, e.uint32(66).fork()).ldelim(), u.h264s !== void 0 && g.encode(u.h264s, e.uint32(82).fork()).ldelim(), u.h265s !== void 0 && g.encode(u.h265s, e.uint32(90).fork()).ldelim(), u.vp8s !== void 0 && g.encode(u.vp8s, e.uint32(98).fork()).ldelim(), u.av1s !== void 0 && g.encode(u.av1s, e.uint32(106).fork()).ldelim(), u.display !== 0 && e.uint32(112).int32(u.display), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = X4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 6:
                    if (t !== 50) break;
                    a.vp9s = g.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.rgb = o0.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.yuv = r0.decode(i, i.uint32());
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.h264s = g.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.h265s = g.decode(i, i.uint32());
                    continue;
                case 12:
                    if (t !== 98) break;
                    a.vp8s = g.decode(i, i.uint32());
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.av1s = g.decode(i, i.uint32());
                    continue;
                case 14:
                    if (t !== 112) break;
                    a.display = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            vp9s: o(u.vp9s) ? g.fromJSON(u.vp9s) : void 0,
            rgb: o(u.rgb) ? o0.fromJSON(u.rgb) : void 0,
            yuv: o(u.yuv) ? r0.fromJSON(u.yuv) : void 0,
            h264s: o(u.h264s) ? g.fromJSON(u.h264s) : void 0,
            h265s: o(u.h265s) ? g.fromJSON(u.h265s) : void 0,
            vp8s: o(u.vp8s) ? g.fromJSON(u.vp8s) : void 0,
            av1s: o(u.av1s) ? g.fromJSON(u.av1s) : void 0,
            display: o(u.display) ? globalThis.Number(u.display) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.vp9s !== void 0 && (e.vp9s = g.toJSON(u.vp9s)), u.rgb !== void 0 && (e.rgb = o0.toJSON(u.rgb)), u.yuv !== void 0 && (e.yuv = r0.toJSON(u.yuv)), u.h264s !== void 0 && (e.h264s = g.toJSON(u.h264s)), u.h265s !== void 0 && (e.h265s = g.toJSON(u.h265s)), u.vp8s !== void 0 && (e.vp8s = g.toJSON(u.vp8s)), u.av1s !== void 0 && (e.av1s = g.toJSON(u.av1s)), u.display !== 0 && (e.display = Math.round(u.display)), e
    }, create(u) {
        return s0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = X4();
        return e.vp9s = u.vp9s !== void 0 && u.vp9s !== null ? g.fromPartial(u.vp9s) : void 0, e.rgb = u.rgb !== void 0 && u.rgb !== null ? o0.fromPartial(u.rgb) : void 0, e.yuv = u.yuv !== void 0 && u.yuv !== null ? r0.fromPartial(u.yuv) : void 0, e.h264s = u.h264s !== void 0 && u.h264s !== null ? g.fromPartial(u.h264s) : void 0, e.h265s = u.h265s !== void 0 && u.h265s !== null ? g.fromPartial(u.h265s) : void 0, e.vp8s = u.vp8s !== void 0 && u.vp8s !== null ? g.fromPartial(u.vp8s) : void 0, e.av1s = u.av1s !== void 0 && u.av1s !== null ? g.fromPartial(u.av1s) : void 0, e.display = (i = u.display) != null ? i : 0, e
    }
};

function Y4() {
    return {id: "", pk: new Uint8Array(0)}
}

const D4 = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.pk.length !== 0 && e.uint32(18).bytes(u.pk), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Y4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.pk = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.String(u.id) : "", pk: o(u.pk) ? z(u.pk) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.pk.length !== 0 && (e.pk = P(u.pk)), e
    }, create(u) {
        return D4.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Y4();
        return e.id = (i = u.id) != null ? i : "", e.pk = (n = u.pk) != null ? n : new Uint8Array(0), e
    }
};

function $4() {
    return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        name: "",
        online: !1,
        cursor_embedded: !1,
        original_resolution: void 0,
        scale: 0
    }
}

const E0 = {
    encode(u, e = r.Writer.create()) {
        return u.x !== 0 && e.uint32(8).sint32(u.x), u.y !== 0 && e.uint32(16).sint32(u.y), u.width !== 0 && e.uint32(24).int32(u.width), u.height !== 0 && e.uint32(32).int32(u.height), u.name !== "" && e.uint32(42).string(u.name), u.online !== !1 && e.uint32(48).bool(u.online), u.cursor_embedded !== !1 && e.uint32(56).bool(u.cursor_embedded), u.original_resolution !== void 0 && v.encode(u.original_resolution, e.uint32(66).fork()).ldelim(), u.scale !== 0 && e.uint32(73).double(u.scale), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = $4();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.x = i.sint32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.y = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.width = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.height = i.int32();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.name = i.string();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.online = i.bool();
                    continue;
                case 7:
                    if (t !== 56) break;
                    a.cursor_embedded = i.bool();
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.original_resolution = v.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 73) break;
                    a.scale = i.double();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            x: o(u.x) ? globalThis.Number(u.x) : 0,
            y: o(u.y) ? globalThis.Number(u.y) : 0,
            width: o(u.width) ? globalThis.Number(u.width) : 0,
            height: o(u.height) ? globalThis.Number(u.height) : 0,
            name: o(u.name) ? globalThis.String(u.name) : "",
            online: o(u.online) ? globalThis.Boolean(u.online) : !1,
            cursor_embedded: o(u.cursor_embedded) ? globalThis.Boolean(u.cursor_embedded) : !1,
            original_resolution: o(u.original_resolution) ? v.fromJSON(u.original_resolution) : void 0,
            scale: o(u.scale) ? globalThis.Number(u.scale) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), u.width !== 0 && (e.width = Math.round(u.width)), u.height !== 0 && (e.height = Math.round(u.height)), u.name !== "" && (e.name = u.name), u.online !== !1 && (e.online = u.online), u.cursor_embedded !== !1 && (e.cursor_embedded = u.cursor_embedded), u.original_resolution !== void 0 && (e.original_resolution = v.toJSON(u.original_resolution)), u.scale !== 0 && (e.scale = u.scale), e
    }, create(u) {
        return E0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = $4();
        return e.x = (i = u.x) != null ? i : 0, e.y = (n = u.y) != null ? n : 0, e.width = (a = u.width) != null ? a : 0, e.height = (t = u.height) != null ? t : 0, e.name = (s = u.name) != null ? s : "", e.online = (E = u.online) != null ? E : !1, e.cursor_embedded = (l = u.cursor_embedded) != null ? l : !1, e.original_resolution = u.original_resolution !== void 0 && u.original_resolution !== null ? v.fromPartial(u.original_resolution) : void 0, e.scale = (d = u.scale) != null ? d : 0, e
    }
};

function u3() {
    return {host: "", port: 0}
}

const l0 = {
    encode(u, e = r.Writer.create()) {
        return u.host !== "" && e.uint32(10).string(u.host), u.port !== 0 && e.uint32(16).int32(u.port), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = u3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.host = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.port = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {host: o(u.host) ? globalThis.String(u.host) : "", port: o(u.port) ? globalThis.Number(u.port) : 0}
    }, toJSON(u) {
        const e = {};
        return u.host !== "" && (e.host = u.host), u.port !== 0 && (e.port = Math.round(u.port)), e
    }, create(u) {
        return l0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = u3();
        return e.host = (i = u.host) != null ? i : "", e.port = (n = u.port) != null ? n : 0, e
    }
};

function e3() {
    return {dir: "", show_hidden: !1}
}

const Fu = {
    encode(u, e = r.Writer.create()) {
        return u.dir !== "" && e.uint32(10).string(u.dir), u.show_hidden !== !1 && e.uint32(16).bool(u.show_hidden), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = e3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.dir = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.show_hidden = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            dir: o(u.dir) ? globalThis.String(u.dir) : "",
            show_hidden: o(u.show_hidden) ? globalThis.Boolean(u.show_hidden) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.dir !== "" && (e.dir = u.dir), u.show_hidden !== !1 && (e.show_hidden = u.show_hidden), e
    }, create(u) {
        return Fu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = e3();
        return e.dir = (i = u.dir) != null ? i : "", e.show_hidden = (n = u.show_hidden) != null ? n : !1, e
    }
};

function i3() {
    return {}
}

const _u = {
    encode(u, e = r.Writer.create()) {
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = i3();
        for (; i.pos < n;) {
            const t = i.uint32();
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {}
    }, toJSON(u) {
        return {}
    }, create(u) {
        return _u.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        return i3()
    }
};

function t3() {
    return {username: "", password: ""}
}

const D0 = {
    encode(u, e = r.Writer.create()) {
        return u.username !== "" && e.uint32(10).string(u.username), u.password !== "" && e.uint32(18).string(u.password), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = t3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.username = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.password = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            username: o(u.username) ? globalThis.String(u.username) : "",
            password: o(u.password) ? globalThis.String(u.password) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.username !== "" && (e.username = u.username), u.password !== "" && (e.password = u.password), e
    }, create(u) {
        return D0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = t3();
        return e.username = (i = u.username) != null ? i : "", e.password = (n = u.password) != null ? n : "", e
    }
};

function a3() {
    return {
        username: "",
        password: new Uint8Array(0),
        my_id: "",
        my_name: "",
        option: void 0,
        file_transfer: void 0,
        port_forward: void 0,
        view_camera: void 0,
        video_ack_required: !1,
        session_id: 0,
        version: "",
        os_login: void 0,
        my_platform: "",
        hwid: new Uint8Array(0)
    }
}

const J = {
    encode(u, e = r.Writer.create()) {
        return u.username !== "" && e.uint32(10).string(u.username), u.password.length !== 0 && e.uint32(18).bytes(u.password), u.my_id !== "" && e.uint32(34).string(u.my_id), u.my_name !== "" && e.uint32(42).string(u.my_name), u.option !== void 0 && R.encode(u.option, e.uint32(50).fork()).ldelim(), u.file_transfer !== void 0 && Fu.encode(u.file_transfer, e.uint32(58).fork()).ldelim(), u.port_forward !== void 0 && l0.encode(u.port_forward, e.uint32(66).fork()).ldelim(), u.view_camera !== void 0 && _u.encode(u.view_camera, e.uint32(122).fork()).ldelim(), u.video_ack_required !== !1 && e.uint32(72).bool(u.video_ack_required), u.session_id !== 0 && e.uint32(80).uint64(u.session_id), u.version !== "" && e.uint32(90).string(u.version), u.os_login !== void 0 && D0.encode(u.os_login, e.uint32(98).fork()).ldelim(), u.my_platform !== "" && e.uint32(106).string(u.my_platform), u.hwid.length !== 0 && e.uint32(114).bytes(u.hwid), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = a3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.username = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.password = i.bytes();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.my_id = i.string();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.my_name = i.string();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.option = R.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.file_transfer = Fu.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.port_forward = l0.decode(i, i.uint32());
                    continue;
                case 15:
                    if (t !== 122) break;
                    a.view_camera = _u.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 72) break;
                    a.video_ack_required = i.bool();
                    continue;
                case 10:
                    if (t !== 80) break;
                    a.session_id = q(i.uint64());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.version = i.string();
                    continue;
                case 12:
                    if (t !== 98) break;
                    a.os_login = D0.decode(i, i.uint32());
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.my_platform = i.string();
                    continue;
                case 14:
                    if (t !== 114) break;
                    a.hwid = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            username: o(u.username) ? globalThis.String(u.username) : "",
            password: o(u.password) ? z(u.password) : new Uint8Array(0),
            my_id: o(u.my_id) ? globalThis.String(u.my_id) : "",
            my_name: o(u.my_name) ? globalThis.String(u.my_name) : "",
            option: o(u.option) ? R.fromJSON(u.option) : void 0,
            file_transfer: o(u.file_transfer) ? Fu.fromJSON(u.file_transfer) : void 0,
            port_forward: o(u.port_forward) ? l0.fromJSON(u.port_forward) : void 0,
            view_camera: o(u.view_camera) ? _u.fromJSON(u.view_camera) : void 0,
            video_ack_required: o(u.video_ack_required) ? globalThis.Boolean(u.video_ack_required) : !1,
            session_id: o(u.session_id) ? globalThis.Number(u.session_id) : 0,
            version: o(u.version) ? globalThis.String(u.version) : "",
            os_login: o(u.os_login) ? D0.fromJSON(u.os_login) : void 0,
            my_platform: o(u.my_platform) ? globalThis.String(u.my_platform) : "",
            hwid: o(u.hwid) ? z(u.hwid) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.username !== "" && (e.username = u.username), u.password.length !== 0 && (e.password = P(u.password)), u.my_id !== "" && (e.my_id = u.my_id), u.my_name !== "" && (e.my_name = u.my_name), u.option !== void 0 && (e.option = R.toJSON(u.option)), u.file_transfer !== void 0 && (e.file_transfer = Fu.toJSON(u.file_transfer)), u.port_forward !== void 0 && (e.port_forward = l0.toJSON(u.port_forward)), u.view_camera !== void 0 && (e.view_camera = _u.toJSON(u.view_camera)), u.video_ack_required !== !1 && (e.video_ack_required = u.video_ack_required), u.session_id !== 0 && (e.session_id = Math.round(u.session_id)), u.version !== "" && (e.version = u.version), u.os_login !== void 0 && (e.os_login = D0.toJSON(u.os_login)), u.my_platform !== "" && (e.my_platform = u.my_platform), u.hwid.length !== 0 && (e.hwid = P(u.hwid)), e
    }, create(u) {
        return J.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d, c;
        const e = a3();
        return e.username = (i = u.username) != null ? i : "", e.password = (n = u.password) != null ? n : new Uint8Array(0), e.my_id = (a = u.my_id) != null ? a : "", e.my_name = (t = u.my_name) != null ? t : "", e.option = u.option !== void 0 && u.option !== null ? R.fromPartial(u.option) : void 0, e.file_transfer = u.file_transfer !== void 0 && u.file_transfer !== null ? Fu.fromPartial(u.file_transfer) : void 0, e.port_forward = u.port_forward !== void 0 && u.port_forward !== null ? l0.fromPartial(u.port_forward) : void 0, e.view_camera = u.view_camera !== void 0 && u.view_camera !== null ? _u.fromPartial(u.view_camera) : void 0, e.video_ack_required = (s = u.video_ack_required) != null ? s : !1, e.session_id = (E = u.session_id) != null ? E : 0, e.version = (l = u.version) != null ? l : "", e.os_login = u.os_login !== void 0 && u.os_login !== null ? D0.fromPartial(u.os_login) : void 0, e.my_platform = (d = u.my_platform) != null ? d : "", e.hwid = (c = u.hwid) != null ? c : new Uint8Array(0), e
    }
};

function n3() {
    return {code: "", hwid: new Uint8Array(0)}
}

const vu = {
    encode(u, e = r.Writer.create()) {
        return u.code !== "" && e.uint32(10).string(u.code), u.hwid.length !== 0 && e.uint32(18).bytes(u.hwid), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = n3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.code = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.hwid = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {code: o(u.code) ? globalThis.String(u.code) : "", hwid: o(u.hwid) ? z(u.hwid) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.code !== "" && (e.code = u.code), u.hwid.length !== 0 && (e.hwid = P(u.hwid)), e
    }, create(u) {
        return vu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = n3();
        return e.code = (i = u.code) != null ? i : "", e.hwid = (n = u.hwid) != null ? n : new Uint8Array(0), e
    }
};

function o3() {
    return {text: ""}
}

const gu = {
    encode(u, e = r.Writer.create()) {
        return u.text !== "" && e.uint32(10).string(u.text), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = o3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.text = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {text: o(u.text) ? globalThis.String(u.text) : ""}
    }, toJSON(u) {
        const e = {};
        return u.text !== "" && (e.text = u.text), e
    }, create(u) {
        return gu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = o3();
        return e.text = (i = u.text) != null ? i : "", e
    }
};

function r3() {
    return {privacy_mode: !1}
}

const d0 = {
    encode(u, e = r.Writer.create()) {
        return u.privacy_mode !== !1 && e.uint32(8).bool(u.privacy_mode), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = r3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.privacy_mode = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {privacy_mode: o(u.privacy_mode) ? globalThis.Boolean(u.privacy_mode) : !1}
    }, toJSON(u) {
        const e = {};
        return u.privacy_mode !== !1 && (e.privacy_mode = u.privacy_mode), e
    }, create(u) {
        return d0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = r3();
        return e.privacy_mode = (i = u.privacy_mode) != null ? i : !1, e
    }
};

function s3() {
    return {vp8: !1, vp9: !1, av1: !1, h264: !1, h265: !1}
}

const G = {
    encode(u, e = r.Writer.create()) {
        return u.vp8 !== !1 && e.uint32(8).bool(u.vp8), u.vp9 !== !1 && e.uint32(16).bool(u.vp9), u.av1 !== !1 && e.uint32(24).bool(u.av1), u.h264 !== !1 && e.uint32(32).bool(u.h264), u.h265 !== !1 && e.uint32(40).bool(u.h265), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = s3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.vp8 = i.bool();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.vp9 = i.bool();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.av1 = i.bool();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.h264 = i.bool();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.h265 = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            vp8: o(u.vp8) ? globalThis.Boolean(u.vp8) : !1,
            vp9: o(u.vp9) ? globalThis.Boolean(u.vp9) : !1,
            av1: o(u.av1) ? globalThis.Boolean(u.av1) : !1,
            h264: o(u.h264) ? globalThis.Boolean(u.h264) : !1,
            h265: o(u.h265) ? globalThis.Boolean(u.h265) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.vp8 !== !1 && (e.vp8 = u.vp8), u.vp9 !== !1 && (e.vp9 = u.vp9), u.av1 !== !1 && (e.av1 = u.av1), u.h264 !== !1 && (e.h264 = u.h264), u.h265 !== !1 && (e.h265 = u.h265), e
    }, create(u) {
        return G.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = s3();
        return e.vp8 = (i = u.vp8) != null ? i : !1, e.vp9 = (n = u.vp9) != null ? n : !1, e.av1 = (a = u.av1) != null ? a : !1, e.h264 = (t = u.h264) != null ? t : !1, e.h265 = (s = u.h265) != null ? s : !1, e
    }
};

function E3() {
    return {h264: !1, h265: !1, vp8: !1, av1: !1, i444: void 0}
}

const Z = {
    encode(u, e = r.Writer.create()) {
        return u.h264 !== !1 && e.uint32(8).bool(u.h264), u.h265 !== !1 && e.uint32(16).bool(u.h265), u.vp8 !== !1 && e.uint32(24).bool(u.vp8), u.av1 !== !1 && e.uint32(32).bool(u.av1), u.i444 !== void 0 && G.encode(u.i444, e.uint32(42).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = E3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.h264 = i.bool();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.h265 = i.bool();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.vp8 = i.bool();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.av1 = i.bool();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.i444 = G.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            h264: o(u.h264) ? globalThis.Boolean(u.h264) : !1,
            h265: o(u.h265) ? globalThis.Boolean(u.h265) : !1,
            vp8: o(u.vp8) ? globalThis.Boolean(u.vp8) : !1,
            av1: o(u.av1) ? globalThis.Boolean(u.av1) : !1,
            i444: o(u.i444) ? G.fromJSON(u.i444) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.h264 !== !1 && (e.h264 = u.h264), u.h265 !== !1 && (e.h265 = u.h265), u.vp8 !== !1 && (e.vp8 = u.vp8), u.av1 !== !1 && (e.av1 = u.av1), u.i444 !== void 0 && (e.i444 = G.toJSON(u.i444)), e
    }, create(u) {
        return Z.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = E3();
        return e.h264 = (i = u.h264) != null ? i : !1, e.h265 = (n = u.h265) != null ? n : !1, e.vp8 = (a = u.vp8) != null ? a : !1, e.av1 = (t = u.av1) != null ? t : !1, e.i444 = u.i444 !== void 0 && u.i444 !== null ? G.fromPartial(u.i444) : void 0, e
    }
};

function l3() {
    return {
        username: "",
        hostname: "",
        platform: "",
        displays: [],
        current_display: 0,
        sas_enabled: !1,
        version: "",
        features: void 0,
        encoding: void 0,
        resolutions: void 0,
        platform_additions: "",
        windows_sessions: void 0
    }
}

const uu = {
    encode(u, e = r.Writer.create()) {
        u.username !== "" && e.uint32(10).string(u.username), u.hostname !== "" && e.uint32(18).string(u.hostname), u.platform !== "" && e.uint32(26).string(u.platform);
        for (const i of u.displays) E0.encode(i, e.uint32(34).fork()).ldelim();
        return u.current_display !== 0 && e.uint32(40).int32(u.current_display), u.sas_enabled !== !1 && e.uint32(48).bool(u.sas_enabled), u.version !== "" && e.uint32(58).string(u.version), u.features !== void 0 && d0.encode(u.features, e.uint32(74).fork()).ldelim(), u.encoding !== void 0 && Z.encode(u.encoding, e.uint32(82).fork()).ldelim(), u.resolutions !== void 0 && iu.encode(u.resolutions, e.uint32(90).fork()).ldelim(), u.platform_additions !== "" && e.uint32(98).string(u.platform_additions), u.windows_sessions !== void 0 && J0.encode(u.windows_sessions, e.uint32(106).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = l3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.username = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.hostname = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.platform = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.displays.push(E0.decode(i, i.uint32()));
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.current_display = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.sas_enabled = i.bool();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.version = i.string();
                    continue;
                case 9:
                    if (t !== 74) break;
                    a.features = d0.decode(i, i.uint32());
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.encoding = Z.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.resolutions = iu.decode(i, i.uint32());
                    continue;
                case 12:
                    if (t !== 98) break;
                    a.platform_additions = i.string();
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.windows_sessions = J0.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            username: o(u.username) ? globalThis.String(u.username) : "",
            hostname: o(u.hostname) ? globalThis.String(u.hostname) : "",
            platform: o(u.platform) ? globalThis.String(u.platform) : "",
            displays: globalThis.Array.isArray(u == null ? void 0 : u.displays) ? u.displays.map(e => E0.fromJSON(e)) : [],
            current_display: o(u.current_display) ? globalThis.Number(u.current_display) : 0,
            sas_enabled: o(u.sas_enabled) ? globalThis.Boolean(u.sas_enabled) : !1,
            version: o(u.version) ? globalThis.String(u.version) : "",
            features: o(u.features) ? d0.fromJSON(u.features) : void 0,
            encoding: o(u.encoding) ? Z.fromJSON(u.encoding) : void 0,
            resolutions: o(u.resolutions) ? iu.fromJSON(u.resolutions) : void 0,
            platform_additions: o(u.platform_additions) ? globalThis.String(u.platform_additions) : "",
            windows_sessions: o(u.windows_sessions) ? J0.fromJSON(u.windows_sessions) : void 0
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.username !== "" && (e.username = u.username), u.hostname !== "" && (e.hostname = u.hostname), u.platform !== "" && (e.platform = u.platform), (i = u.displays) != null && i.length && (e.displays = u.displays.map(n => E0.toJSON(n))), u.current_display !== 0 && (e.current_display = Math.round(u.current_display)), u.sas_enabled !== !1 && (e.sas_enabled = u.sas_enabled), u.version !== "" && (e.version = u.version), u.features !== void 0 && (e.features = d0.toJSON(u.features)), u.encoding !== void 0 && (e.encoding = Z.toJSON(u.encoding)), u.resolutions !== void 0 && (e.resolutions = iu.toJSON(u.resolutions)), u.platform_additions !== "" && (e.platform_additions = u.platform_additions), u.windows_sessions !== void 0 && (e.windows_sessions = J0.toJSON(u.windows_sessions)), e
    }, create(u) {
        return uu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = l3();
        return e.username = (i = u.username) != null ? i : "", e.hostname = (n = u.hostname) != null ? n : "", e.platform = (a = u.platform) != null ? a : "", e.displays = ((t = u.displays) == null ? void 0 : t.map(c => E0.fromPartial(c))) || [], e.current_display = (s = u.current_display) != null ? s : 0, e.sas_enabled = (E = u.sas_enabled) != null ? E : !1, e.version = (l = u.version) != null ? l : "", e.features = u.features !== void 0 && u.features !== null ? d0.fromPartial(u.features) : void 0, e.encoding = u.encoding !== void 0 && u.encoding !== null ? Z.fromPartial(u.encoding) : void 0, e.resolutions = u.resolutions !== void 0 && u.resolutions !== null ? iu.fromPartial(u.resolutions) : void 0, e.platform_additions = (d = u.platform_additions) != null ? d : "", e.windows_sessions = u.windows_sessions !== void 0 && u.windows_sessions !== null ? J0.fromPartial(u.windows_sessions) : void 0, e
    }
};

function D3() {
    return {sid: 0, name: ""}
}

const c0 = {
    encode(u, e = r.Writer.create()) {
        return u.sid !== 0 && e.uint32(8).uint32(u.sid), u.name !== "" && e.uint32(18).string(u.name), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = D3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.sid = i.uint32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.name = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {sid: o(u.sid) ? globalThis.Number(u.sid) : 0, name: o(u.name) ? globalThis.String(u.name) : ""}
    }, toJSON(u) {
        const e = {};
        return u.sid !== 0 && (e.sid = Math.round(u.sid)), u.name !== "" && (e.name = u.name), e
    }, create(u) {
        return c0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = D3();
        return e.sid = (i = u.sid) != null ? i : 0, e.name = (n = u.name) != null ? n : "", e
    }
};

function d3() {
    return {error: void 0, peer_info: void 0, enable_trusted_devices: !1}
}

const C0 = {
    encode(u, e = r.Writer.create()) {
        return u.error !== void 0 && e.uint32(10).string(u.error), u.peer_info !== void 0 && uu.encode(u.peer_info, e.uint32(18).fork()).ldelim(), u.enable_trusted_devices !== !1 && e.uint32(24).bool(u.enable_trusted_devices), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = d3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.error = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.peer_info = uu.decode(i, i.uint32());
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.enable_trusted_devices = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            error: o(u.error) ? globalThis.String(u.error) : void 0,
            peer_info: o(u.peer_info) ? uu.fromJSON(u.peer_info) : void 0,
            enable_trusted_devices: o(u.enable_trusted_devices) ? globalThis.Boolean(u.enable_trusted_devices) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.error !== void 0 && (e.error = u.error), u.peer_info !== void 0 && (e.peer_info = uu.toJSON(u.peer_info)), u.enable_trusted_devices !== !1 && (e.enable_trusted_devices = u.enable_trusted_devices), e
    }, create(u) {
        return C0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = d3();
        return e.error = (i = u.error) != null ? i : void 0, e.peer_info = u.peer_info !== void 0 && u.peer_info !== null ? uu.fromPartial(u.peer_info) : void 0, e.enable_trusted_devices = (n = u.enable_trusted_devices) != null ? n : !1, e
    }
};

function c3() {
    return {scale: 0}
}

const p0 = {
    encode(u, e = r.Writer.create()) {
        return u.scale !== 0 && e.uint32(8).int32(u.scale), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = c3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.scale = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {scale: o(u.scale) ? globalThis.Number(u.scale) : 0}
    }, toJSON(u) {
        const e = {};
        return u.scale !== 0 && (e.scale = Math.round(u.scale)), e
    }, create(u) {
        return p0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = c3();
        return e.scale = (i = u.scale) != null ? i : 0, e
    }
};

function C3() {
    return {x: 0, y: 0}
}

const B0 = {
    encode(u, e = r.Writer.create()) {
        return u.x !== 0 && e.uint32(8).int32(u.x), u.y !== 0 && e.uint32(16).int32(u.y), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = C3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.x = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.y = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {x: o(u.x) ? globalThis.Number(u.x) : 0, y: o(u.y) ? globalThis.Number(u.y) : 0}
    }, toJSON(u) {
        const e = {};
        return u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), e
    }, create(u) {
        return B0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = C3();
        return e.x = (i = u.x) != null ? i : 0, e.y = (n = u.y) != null ? n : 0, e
    }
};

function p3() {
    return {x: 0, y: 0}
}

const A0 = {
    encode(u, e = r.Writer.create()) {
        return u.x !== 0 && e.uint32(8).int32(u.x), u.y !== 0 && e.uint32(16).int32(u.y), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = p3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.x = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.y = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {x: o(u.x) ? globalThis.Number(u.x) : 0, y: o(u.y) ? globalThis.Number(u.y) : 0}
    }, toJSON(u) {
        const e = {};
        return u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), e
    }, create(u) {
        return A0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = p3();
        return e.x = (i = u.x) != null ? i : 0, e.y = (n = u.y) != null ? n : 0, e
    }
};

function B3() {
    return {x: 0, y: 0}
}

const m0 = {
    encode(u, e = r.Writer.create()) {
        return u.x !== 0 && e.uint32(8).int32(u.x), u.y !== 0 && e.uint32(16).int32(u.y), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = B3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.x = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.y = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {x: o(u.x) ? globalThis.Number(u.x) : 0, y: o(u.y) ? globalThis.Number(u.y) : 0}
    }, toJSON(u) {
        const e = {};
        return u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), e
    }, create(u) {
        return m0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = B3();
        return e.x = (i = u.x) != null ? i : 0, e.y = (n = u.y) != null ? n : 0, e
    }
};

function A3() {
    return {scale_update: void 0, pan_start: void 0, pan_update: void 0, pan_end: void 0}
}

const F0 = {
    encode(u, e = r.Writer.create()) {
        return u.scale_update !== void 0 && p0.encode(u.scale_update, e.uint32(10).fork()).ldelim(), u.pan_start !== void 0 && B0.encode(u.pan_start, e.uint32(18).fork()).ldelim(), u.pan_update !== void 0 && A0.encode(u.pan_update, e.uint32(26).fork()).ldelim(), u.pan_end !== void 0 && m0.encode(u.pan_end, e.uint32(34).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = A3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.scale_update = p0.decode(i, i.uint32());
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.pan_start = B0.decode(i, i.uint32());
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.pan_update = A0.decode(i, i.uint32());
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.pan_end = m0.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            scale_update: o(u.scale_update) ? p0.fromJSON(u.scale_update) : void 0,
            pan_start: o(u.pan_start) ? B0.fromJSON(u.pan_start) : void 0,
            pan_update: o(u.pan_update) ? A0.fromJSON(u.pan_update) : void 0,
            pan_end: o(u.pan_end) ? m0.fromJSON(u.pan_end) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.scale_update !== void 0 && (e.scale_update = p0.toJSON(u.scale_update)), u.pan_start !== void 0 && (e.pan_start = B0.toJSON(u.pan_start)), u.pan_update !== void 0 && (e.pan_update = A0.toJSON(u.pan_update)), u.pan_end !== void 0 && (e.pan_end = m0.toJSON(u.pan_end)), e
    }, create(u) {
        return F0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        const e = A3();
        return e.scale_update = u.scale_update !== void 0 && u.scale_update !== null ? p0.fromPartial(u.scale_update) : void 0, e.pan_start = u.pan_start !== void 0 && u.pan_start !== null ? B0.fromPartial(u.pan_start) : void 0, e.pan_update = u.pan_update !== void 0 && u.pan_update !== null ? A0.fromPartial(u.pan_update) : void 0, e.pan_end = u.pan_end !== void 0 && u.pan_end !== null ? m0.fromPartial(u.pan_end) : void 0, e
    }
};

function m3() {
    return {touch_event: void 0, modifiers: []}
}

const _0 = {
    encode(u, e = r.Writer.create()) {
        u.touch_event !== void 0 && F0.encode(u.touch_event, e.uint32(10).fork()).ldelim(), e.uint32(18).fork();
        for (const i of u.modifiers) e.int32(i);
        return e.ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = m3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.touch_event = F0.decode(i, i.uint32());
                    continue;
                case 2:
                    if (t === 16) {
                        a.modifiers.push(i.int32());
                        continue
                    }
                    if (t === 18) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.modifiers.push(i.int32());
                        continue
                    }
                    break
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            touch_event: o(u.touch_event) ? F0.fromJSON(u.touch_event) : void 0,
            modifiers: globalThis.Array.isArray(u == null ? void 0 : u.modifiers) ? u.modifiers.map(e => fe(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.touch_event !== void 0 && (e.touch_event = F0.toJSON(u.touch_event)), (i = u.modifiers) != null && i.length && (e.modifiers = u.modifiers.map(n => We(n))), e
    }, create(u) {
        return _0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = m3();
        return e.touch_event = u.touch_event !== void 0 && u.touch_event !== null ? F0.fromPartial(u.touch_event) : void 0, e.modifiers = ((i = u.modifiers) == null ? void 0 : i.map(n => n)) || [], e
    }
};

function F3() {
    return {mask: 0, x: 0, y: 0, modifiers: []}
}

const ku = {
    encode(u, e = r.Writer.create()) {
        u.mask !== 0 && e.uint32(8).int32(u.mask), u.x !== 0 && e.uint32(16).sint32(u.x), u.y !== 0 && e.uint32(24).sint32(u.y), e.uint32(34).fork();
        for (const i of u.modifiers) e.int32(i);
        return e.ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = F3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.mask = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.x = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.y = i.sint32();
                    continue;
                case 4:
                    if (t === 32) {
                        a.modifiers.push(i.int32());
                        continue
                    }
                    if (t === 34) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.modifiers.push(i.int32());
                        continue
                    }
                    break
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            mask: o(u.mask) ? globalThis.Number(u.mask) : 0,
            x: o(u.x) ? globalThis.Number(u.x) : 0,
            y: o(u.y) ? globalThis.Number(u.y) : 0,
            modifiers: globalThis.Array.isArray(u == null ? void 0 : u.modifiers) ? u.modifiers.map(e => fe(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.mask !== 0 && (e.mask = Math.round(u.mask)), u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), (i = u.modifiers) != null && i.length && (e.modifiers = u.modifiers.map(n => We(n))), e
    }, create(u) {
        return ku.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = F3();
        return e.mask = (i = u.mask) != null ? i : 0, e.x = (n = u.x) != null ? n : 0, e.y = (a = u.y) != null ? a : 0, e.modifiers = ((t = u.modifiers) == null ? void 0 : t.map(s => s)) || [], e
    }
};

function _3() {
    return {
        down: !1,
        press: !1,
        control_key: void 0,
        chr: void 0,
        unicode: void 0,
        seq: void 0,
        win2win_hotkey: void 0,
        modifiers: [],
        mode: 0
    }
}

const S = {
    encode(u, e = r.Writer.create()) {
        u.down !== !1 && e.uint32(8).bool(u.down), u.press !== !1 && e.uint32(16).bool(u.press), u.control_key !== void 0 && e.uint32(24).int32(u.control_key), u.chr !== void 0 && e.uint32(32).uint32(u.chr), u.unicode !== void 0 && e.uint32(40).uint32(u.unicode), u.seq !== void 0 && e.uint32(50).string(u.seq), u.win2win_hotkey !== void 0 && e.uint32(56).uint32(u.win2win_hotkey), e.uint32(66).fork();
        for (const i of u.modifiers) e.int32(i);
        return e.ldelim(), u.mode !== 0 && e.uint32(72).int32(u.mode), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = _3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.down = i.bool();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.press = i.bool();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.control_key = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.chr = i.uint32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.unicode = i.uint32();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.seq = i.string();
                    continue;
                case 7:
                    if (t !== 56) break;
                    a.win2win_hotkey = i.uint32();
                    continue;
                case 8:
                    if (t === 64) {
                        a.modifiers.push(i.int32());
                        continue
                    }
                    if (t === 66) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.modifiers.push(i.int32());
                        continue
                    }
                    break;
                case 9:
                    if (t !== 72) break;
                    a.mode = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            down: o(u.down) ? globalThis.Boolean(u.down) : !1,
            press: o(u.press) ? globalThis.Boolean(u.press) : !1,
            control_key: o(u.control_key) ? fe(u.control_key) : void 0,
            chr: o(u.chr) ? globalThis.Number(u.chr) : void 0,
            unicode: o(u.unicode) ? globalThis.Number(u.unicode) : void 0,
            seq: o(u.seq) ? globalThis.String(u.seq) : void 0,
            win2win_hotkey: o(u.win2win_hotkey) ? globalThis.Number(u.win2win_hotkey) : void 0,
            modifiers: globalThis.Array.isArray(u == null ? void 0 : u.modifiers) ? u.modifiers.map(e => fe(e)) : [],
            mode: o(u.mode) ? ba(u.mode) : 0
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.down !== !1 && (e.down = u.down), u.press !== !1 && (e.press = u.press), u.control_key !== void 0 && (e.control_key = We(u.control_key)), u.chr !== void 0 && (e.chr = Math.round(u.chr)), u.unicode !== void 0 && (e.unicode = Math.round(u.unicode)), u.seq !== void 0 && (e.seq = u.seq), u.win2win_hotkey !== void 0 && (e.win2win_hotkey = Math.round(u.win2win_hotkey)), (i = u.modifiers) != null && i.length && (e.modifiers = u.modifiers.map(n => We(n))), u.mode !== 0 && (e.mode = wa(u.mode)), e
    }, create(u) {
        return S.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d, c;
        const e = _3();
        return e.down = (i = u.down) != null ? i : !1, e.press = (n = u.press) != null ? n : !1, e.control_key = (a = u.control_key) != null ? a : void 0, e.chr = (t = u.chr) != null ? t : void 0, e.unicode = (s = u.unicode) != null ? s : void 0, e.seq = (E = u.seq) != null ? E : void 0, e.win2win_hotkey = (l = u.win2win_hotkey) != null ? l : void 0, e.modifiers = ((d = u.modifiers) == null ? void 0 : d.map(p => p)) || [], e.mode = (c = u.mode) != null ? c : 0, e
    }
};

function v3() {
    return {id: 0, hotx: 0, hoty: 0, width: 0, height: 0, colors: new Uint8Array(0)}
}

const v0 = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).uint64(u.id), u.hotx !== 0 && e.uint32(16).sint32(u.hotx), u.hoty !== 0 && e.uint32(24).sint32(u.hoty), u.width !== 0 && e.uint32(32).int32(u.width), u.height !== 0 && e.uint32(40).int32(u.height), u.colors.length !== 0 && e.uint32(50).bytes(u.colors), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = v3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = q(i.uint64());
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.hotx = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.hoty = i.sint32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.width = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.height = i.int32();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.colors = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            hotx: o(u.hotx) ? globalThis.Number(u.hotx) : 0,
            hoty: o(u.hoty) ? globalThis.Number(u.hoty) : 0,
            width: o(u.width) ? globalThis.Number(u.width) : 0,
            height: o(u.height) ? globalThis.Number(u.height) : 0,
            colors: o(u.colors) ? z(u.colors) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.hotx !== 0 && (e.hotx = Math.round(u.hotx)), u.hoty !== 0 && (e.hoty = Math.round(u.hoty)), u.width !== 0 && (e.width = Math.round(u.width)), u.height !== 0 && (e.height = Math.round(u.height)), u.colors.length !== 0 && (e.colors = P(u.colors)), e
    }, create(u) {
        return v0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E;
        const e = v3();
        return e.id = (i = u.id) != null ? i : 0, e.hotx = (n = u.hotx) != null ? n : 0, e.hoty = (a = u.hoty) != null ? a : 0, e.width = (t = u.width) != null ? t : 0, e.height = (s = u.height) != null ? s : 0, e.colors = (E = u.colors) != null ? E : new Uint8Array(0), e
    }
};

function g3() {
    return {x: 0, y: 0}
}

const g0 = {
    encode(u, e = r.Writer.create()) {
        return u.x !== 0 && e.uint32(8).sint32(u.x), u.y !== 0 && e.uint32(16).sint32(u.y), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = g3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.x = i.sint32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.y = i.sint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {x: o(u.x) ? globalThis.Number(u.x) : 0, y: o(u.y) ? globalThis.Number(u.y) : 0}
    }, toJSON(u) {
        const e = {};
        return u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), e
    }, create(u) {
        return g0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = g3();
        return e.x = (i = u.x) != null ? i : 0, e.y = (n = u.y) != null ? n : 0, e
    }
};

function k3() {
    return {salt: "", challenge: ""}
}

const k0 = {
    encode(u, e = r.Writer.create()) {
        return u.salt !== "" && e.uint32(10).string(u.salt), u.challenge !== "" && e.uint32(18).string(u.challenge), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = k3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.salt = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.challenge = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            salt: o(u.salt) ? globalThis.String(u.salt) : "",
            challenge: o(u.challenge) ? globalThis.String(u.challenge) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.salt !== "" && (e.salt = u.salt), u.challenge !== "" && (e.challenge = u.challenge), e
    }, create(u) {
        return k0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = k3();
        return e.salt = (i = u.salt) != null ? i : "", e.challenge = (n = u.challenge) != null ? n : "", e
    }
};

function h3() {
    return {compress: !1, content: new Uint8Array(0), width: 0, height: 0, format: 0, special_name: ""}
}

const W = {
    encode(u, e = r.Writer.create()) {
        return u.compress !== !1 && e.uint32(8).bool(u.compress), u.content.length !== 0 && e.uint32(18).bytes(u.content), u.width !== 0 && e.uint32(24).int32(u.width), u.height !== 0 && e.uint32(32).int32(u.height), u.format !== 0 && e.uint32(40).int32(u.format), u.special_name !== "" && e.uint32(50).string(u.special_name), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = h3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.compress = i.bool();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.content = i.bytes();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.width = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.height = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.format = i.int32();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.special_name = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            compress: o(u.compress) ? globalThis.Boolean(u.compress) : !1,
            content: o(u.content) ? z(u.content) : new Uint8Array(0),
            width: o(u.width) ? globalThis.Number(u.width) : 0,
            height: o(u.height) ? globalThis.Number(u.height) : 0,
            format: o(u.format) ? Sa(u.format) : 0,
            special_name: o(u.special_name) ? globalThis.String(u.special_name) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.compress !== !1 && (e.compress = u.compress), u.content.length !== 0 && (e.content = P(u.content)), u.width !== 0 && (e.width = Math.round(u.width)), u.height !== 0 && (e.height = Math.round(u.height)), u.format !== 0 && (e.format = za(u.format)), u.special_name !== "" && (e.special_name = u.special_name), e
    }, create(u) {
        return W.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E;
        const e = h3();
        return e.compress = (i = u.compress) != null ? i : !1, e.content = (n = u.content) != null ? n : new Uint8Array(0), e.width = (a = u.width) != null ? a : 0, e.height = (t = u.height) != null ? t : 0, e.format = (s = u.format) != null ? s : 0, e.special_name = (E = u.special_name) != null ? E : "", e
    }
};

function f3() {
    return {clipboards: []}
}

const hu = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.clipboards) W.encode(i, e.uint32(10).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = f3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.clipboards.push(W.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {clipboards: globalThis.Array.isArray(u == null ? void 0 : u.clipboards) ? u.clipboards.map(e => W.fromJSON(e)) : []}
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.clipboards) != null && i.length && (e.clipboards = u.clipboards.map(n => W.toJSON(n))), e
    }, create(u) {
        return hu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = f3();
        return e.clipboards = ((i = u.clipboards) == null ? void 0 : i.map(n => W.fromPartial(n))) || [], e
    }
};

function x3() {
    return {entry_type: 0, name: "", is_hidden: !1, size: 0, modified_time: 0}
}

const V = {
    encode(u, e = r.Writer.create()) {
        return u.entry_type !== 0 && e.uint32(8).int32(u.entry_type), u.name !== "" && e.uint32(18).string(u.name), u.is_hidden !== !1 && e.uint32(24).bool(u.is_hidden), u.size !== 0 && e.uint32(32).uint64(u.size), u.modified_time !== 0 && e.uint32(40).uint64(u.modified_time), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = x3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.entry_type = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.name = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.is_hidden = i.bool();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.size = q(i.uint64());
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.modified_time = q(i.uint64());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            entry_type: o(u.entry_type) ? Pa(u.entry_type) : 0,
            name: o(u.name) ? globalThis.String(u.name) : "",
            is_hidden: o(u.is_hidden) ? globalThis.Boolean(u.is_hidden) : !1,
            size: o(u.size) ? globalThis.Number(u.size) : 0,
            modified_time: o(u.modified_time) ? globalThis.Number(u.modified_time) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.entry_type !== 0 && (e.entry_type = Ra(u.entry_type)), u.name !== "" && (e.name = u.name), u.is_hidden !== !1 && (e.is_hidden = u.is_hidden), u.size !== 0 && (e.size = Math.round(u.size)), u.modified_time !== 0 && (e.modified_time = Math.round(u.modified_time)), e
    }, create(u) {
        return V.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = x3();
        return e.entry_type = (i = u.entry_type) != null ? i : 0, e.name = (n = u.name) != null ? n : "", e.is_hidden = (a = u.is_hidden) != null ? a : !1, e.size = (t = u.size) != null ? t : 0, e.modified_time = (s = u.modified_time) != null ? s : 0, e
    }
};

function y3() {
    return {id: 0, path: "", entries: []}
}

const eu = {
    encode(u, e = r.Writer.create()) {
        u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path);
        for (const i of u.entries) V.encode(i, e.uint32(26).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = y3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.entries.push(V.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            entries: globalThis.Array.isArray(u == null ? void 0 : u.entries) ? u.entries.map(e => V.fromJSON(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), (i = u.entries) != null && i.length && (e.entries = u.entries.map(n => V.toJSON(n))), e
    }, create(u) {
        return eu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = y3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.entries = ((a = u.entries) == null ? void 0 : a.map(t => V.fromPartial(t))) || [], e
    }
};

function b3() {
    return {path: "", include_hidden: !1}
}

const fu = {
    encode(u, e = r.Writer.create()) {
        return u.path !== "" && e.uint32(10).string(u.path), u.include_hidden !== !1 && e.uint32(16).bool(u.include_hidden), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = b3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.path = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.include_hidden = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            path: o(u.path) ? globalThis.String(u.path) : "",
            include_hidden: o(u.include_hidden) ? globalThis.Boolean(u.include_hidden) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.path !== "" && (e.path = u.path), u.include_hidden !== !1 && (e.include_hidden = u.include_hidden), e
    }, create(u) {
        return fu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = b3();
        return e.path = (i = u.path) != null ? i : "", e.include_hidden = (n = u.include_hidden) != null ? n : !1, e
    }
};

function w3() {
    return {path: "", include_hidden: !1}
}

const xu = {
    encode(u, e = r.Writer.create()) {
        return u.path !== "" && e.uint32(10).string(u.path), u.include_hidden !== !1 && e.uint32(16).bool(u.include_hidden), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = w3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.path = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.include_hidden = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            path: o(u.path) ? globalThis.String(u.path) : "",
            include_hidden: o(u.include_hidden) ? globalThis.Boolean(u.include_hidden) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.path !== "" && (e.path = u.path), u.include_hidden !== !1 && (e.include_hidden = u.include_hidden), e
    }, create(u) {
        return xu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = w3();
        return e.path = (i = u.path) != null ? i : "", e.include_hidden = (n = u.include_hidden) != null ? n : !1, e
    }
};

function S3() {
    return {path: "", empty_dirs: []}
}

const h0 = {
    encode(u, e = r.Writer.create()) {
        u.path !== "" && e.uint32(10).string(u.path);
        for (const i of u.empty_dirs) eu.encode(i, e.uint32(18).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = S3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.path = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.empty_dirs.push(eu.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            path: o(u.path) ? globalThis.String(u.path) : "",
            empty_dirs: globalThis.Array.isArray(u == null ? void 0 : u.empty_dirs) ? u.empty_dirs.map(e => eu.fromJSON(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.path !== "" && (e.path = u.path), (i = u.empty_dirs) != null && i.length && (e.empty_dirs = u.empty_dirs.map(n => eu.toJSON(n))), e
    }, create(u) {
        return h0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = S3();
        return e.path = (i = u.path) != null ? i : "", e.empty_dirs = ((n = u.empty_dirs) == null ? void 0 : n.map(a => eu.fromPartial(a))) || [], e
    }
};

function z3() {
    return {id: 0, path: "", include_hidden: !1}
}

const yu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), u.include_hidden !== !1 && e.uint32(24).bool(u.include_hidden), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = z3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.include_hidden = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            include_hidden: o(u.include_hidden) ? globalThis.Boolean(u.include_hidden) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), u.include_hidden !== !1 && (e.include_hidden = u.include_hidden), e
    }, create(u) {
        return yu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = z3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.include_hidden = (a = u.include_hidden) != null ? a : !1, e
    }
};

function P3() {
    return {id: 0, path: "", new_name: ""}
}

const bu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), u.new_name !== "" && e.uint32(26).string(u.new_name), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = P3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.new_name = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            new_name: o(u.new_name) ? globalThis.String(u.new_name) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), u.new_name !== "" && (e.new_name = u.new_name), e
    }, create(u) {
        return bu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = P3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.new_name = (a = u.new_name) != null ? a : "", e
    }
};

function R3() {
    return {
        read_dir: void 0,
        send: void 0,
        receive: void 0,
        create: void 0,
        remove_dir: void 0,
        remove_file: void 0,
        all_files: void 0,
        cancel: void 0,
        send_confirm: void 0,
        rename: void 0,
        read_empty_dirs: void 0
    }
}

const I = {
    encode(u, e = r.Writer.create()) {
        return u.read_dir !== void 0 && fu.encode(u.read_dir, e.uint32(10).fork()).ldelim(), u.send !== void 0 && Ru.encode(u.send, e.uint32(18).fork()).ldelim(), u.receive !== void 0 && Tu.encode(u.receive, e.uint32(26).fork()).ldelim(), u.create !== void 0 && Ou.encode(u.create, e.uint32(34).fork()).ldelim(), u.remove_dir !== void 0 && ju.encode(u.remove_dir, e.uint32(42).fork()).ldelim(), u.remove_file !== void 0 && Nu.encode(u.remove_file, e.uint32(50).fork()).ldelim(), u.all_files !== void 0 && yu.encode(u.all_files, e.uint32(58).fork()).ldelim(), u.cancel !== void 0 && wu.encode(u.cancel, e.uint32(66).fork()).ldelim(), u.send_confirm !== void 0 && du.encode(u.send_confirm, e.uint32(74).fork()).ldelim(), u.rename !== void 0 && bu.encode(u.rename, e.uint32(82).fork()).ldelim(), u.read_empty_dirs !== void 0 && xu.encode(u.read_empty_dirs, e.uint32(90).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = R3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.read_dir = fu.decode(i, i.uint32());
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.send = Ru.decode(i, i.uint32());
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.receive = Tu.decode(i, i.uint32());
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.create = Ou.decode(i, i.uint32());
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.remove_dir = ju.decode(i, i.uint32());
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.remove_file = Nu.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.all_files = yu.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.cancel = wu.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 74) break;
                    a.send_confirm = du.decode(i, i.uint32());
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.rename = bu.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.read_empty_dirs = xu.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            read_dir: o(u.read_dir) ? fu.fromJSON(u.read_dir) : void 0,
            send: o(u.send) ? Ru.fromJSON(u.send) : void 0,
            receive: o(u.receive) ? Tu.fromJSON(u.receive) : void 0,
            create: o(u.create) ? Ou.fromJSON(u.create) : void 0,
            remove_dir: o(u.remove_dir) ? ju.fromJSON(u.remove_dir) : void 0,
            remove_file: o(u.remove_file) ? Nu.fromJSON(u.remove_file) : void 0,
            all_files: o(u.all_files) ? yu.fromJSON(u.all_files) : void 0,
            cancel: o(u.cancel) ? wu.fromJSON(u.cancel) : void 0,
            send_confirm: o(u.send_confirm) ? du.fromJSON(u.send_confirm) : void 0,
            rename: o(u.rename) ? bu.fromJSON(u.rename) : void 0,
            read_empty_dirs: o(u.read_empty_dirs) ? xu.fromJSON(u.read_empty_dirs) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.read_dir !== void 0 && (e.read_dir = fu.toJSON(u.read_dir)), u.send !== void 0 && (e.send = Ru.toJSON(u.send)), u.receive !== void 0 && (e.receive = Tu.toJSON(u.receive)), u.create !== void 0 && (e.create = Ou.toJSON(u.create)), u.remove_dir !== void 0 && (e.remove_dir = ju.toJSON(u.remove_dir)), u.remove_file !== void 0 && (e.remove_file = Nu.toJSON(u.remove_file)), u.all_files !== void 0 && (e.all_files = yu.toJSON(u.all_files)), u.cancel !== void 0 && (e.cancel = wu.toJSON(u.cancel)), u.send_confirm !== void 0 && (e.send_confirm = du.toJSON(u.send_confirm)), u.rename !== void 0 && (e.rename = bu.toJSON(u.rename)), u.read_empty_dirs !== void 0 && (e.read_empty_dirs = xu.toJSON(u.read_empty_dirs)), e
    }, create(u) {
        return I.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        const e = R3();
        return e.read_dir = u.read_dir !== void 0 && u.read_dir !== null ? fu.fromPartial(u.read_dir) : void 0, e.send = u.send !== void 0 && u.send !== null ? Ru.fromPartial(u.send) : void 0, e.receive = u.receive !== void 0 && u.receive !== null ? Tu.fromPartial(u.receive) : void 0, e.create = u.create !== void 0 && u.create !== null ? Ou.fromPartial(u.create) : void 0, e.remove_dir = u.remove_dir !== void 0 && u.remove_dir !== null ? ju.fromPartial(u.remove_dir) : void 0, e.remove_file = u.remove_file !== void 0 && u.remove_file !== null ? Nu.fromPartial(u.remove_file) : void 0, e.all_files = u.all_files !== void 0 && u.all_files !== null ? yu.fromPartial(u.all_files) : void 0, e.cancel = u.cancel !== void 0 && u.cancel !== null ? wu.fromPartial(u.cancel) : void 0, e.send_confirm = u.send_confirm !== void 0 && u.send_confirm !== null ? du.fromPartial(u.send_confirm) : void 0, e.rename = u.rename !== void 0 && u.rename !== null ? bu.fromPartial(u.rename) : void 0, e.read_empty_dirs = u.read_empty_dirs !== void 0 && u.read_empty_dirs !== null ? xu.fromPartial(u.read_empty_dirs) : void 0, e
    }
};

function I3() {
    return {id: 0}
}

const wu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = I3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.Number(u.id) : 0}
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), e
    }, create(u) {
        return wu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = I3();
        return e.id = (i = u.id) != null ? i : 0, e
    }
};

function T3() {
    return {dir: void 0, block: void 0, error: void 0, done: void 0, digest: void 0, empty_dirs: void 0}
}

const ou = {
    encode(u, e = r.Writer.create()) {
        return u.dir !== void 0 && eu.encode(u.dir, e.uint32(10).fork()).ldelim(), u.block !== void 0 && zu.encode(u.block, e.uint32(18).fork()).ldelim(), u.error !== void 0 && Pu.encode(u.error, e.uint32(26).fork()).ldelim(), u.done !== void 0 && Iu.encode(u.done, e.uint32(34).fork()).ldelim(), u.digest !== void 0 && Su.encode(u.digest, e.uint32(42).fork()).ldelim(), u.empty_dirs !== void 0 && h0.encode(u.empty_dirs, e.uint32(50).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = T3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.dir = eu.decode(i, i.uint32());
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.block = zu.decode(i, i.uint32());
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.error = Pu.decode(i, i.uint32());
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.done = Iu.decode(i, i.uint32());
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.digest = Su.decode(i, i.uint32());
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.empty_dirs = h0.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            dir: o(u.dir) ? eu.fromJSON(u.dir) : void 0,
            block: o(u.block) ? zu.fromJSON(u.block) : void 0,
            error: o(u.error) ? Pu.fromJSON(u.error) : void 0,
            done: o(u.done) ? Iu.fromJSON(u.done) : void 0,
            digest: o(u.digest) ? Su.fromJSON(u.digest) : void 0,
            empty_dirs: o(u.empty_dirs) ? h0.fromJSON(u.empty_dirs) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.dir !== void 0 && (e.dir = eu.toJSON(u.dir)), u.block !== void 0 && (e.block = zu.toJSON(u.block)), u.error !== void 0 && (e.error = Pu.toJSON(u.error)), u.done !== void 0 && (e.done = Iu.toJSON(u.done)), u.digest !== void 0 && (e.digest = Su.toJSON(u.digest)), u.empty_dirs !== void 0 && (e.empty_dirs = h0.toJSON(u.empty_dirs)), e
    }, create(u) {
        return ou.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        const e = T3();
        return e.dir = u.dir !== void 0 && u.dir !== null ? eu.fromPartial(u.dir) : void 0, e.block = u.block !== void 0 && u.block !== null ? zu.fromPartial(u.block) : void 0, e.error = u.error !== void 0 && u.error !== null ? Pu.fromPartial(u.error) : void 0, e.done = u.done !== void 0 && u.done !== null ? Iu.fromPartial(u.done) : void 0, e.digest = u.digest !== void 0 && u.digest !== null ? Su.fromPartial(u.digest) : void 0, e.empty_dirs = u.empty_dirs !== void 0 && u.empty_dirs !== null ? h0.fromPartial(u.empty_dirs) : void 0, e
    }
};

function j3() {
    return {id: 0, file_num: 0, last_modified: 0, file_size: 0, is_upload: !1, is_identical: !1}
}

const Su = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.file_num !== 0 && e.uint32(16).sint32(u.file_num), u.last_modified !== 0 && e.uint32(24).uint64(u.last_modified), u.file_size !== 0 && e.uint32(32).uint64(u.file_size), u.is_upload !== !1 && e.uint32(40).bool(u.is_upload), u.is_identical !== !1 && e.uint32(48).bool(u.is_identical), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = j3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.file_num = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.last_modified = q(i.uint64());
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.file_size = q(i.uint64());
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.is_upload = i.bool();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.is_identical = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0,
            last_modified: o(u.last_modified) ? globalThis.Number(u.last_modified) : 0,
            file_size: o(u.file_size) ? globalThis.Number(u.file_size) : 0,
            is_upload: o(u.is_upload) ? globalThis.Boolean(u.is_upload) : !1,
            is_identical: o(u.is_identical) ? globalThis.Boolean(u.is_identical) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), u.last_modified !== 0 && (e.last_modified = Math.round(u.last_modified)), u.file_size !== 0 && (e.file_size = Math.round(u.file_size)), u.is_upload !== !1 && (e.is_upload = u.is_upload), u.is_identical !== !1 && (e.is_identical = u.is_identical), e
    }, create(u) {
        return Su.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E;
        const e = j3();
        return e.id = (i = u.id) != null ? i : 0, e.file_num = (n = u.file_num) != null ? n : 0, e.last_modified = (a = u.last_modified) != null ? a : 0, e.file_size = (t = u.file_size) != null ? t : 0, e.is_upload = (s = u.is_upload) != null ? s : !1, e.is_identical = (E = u.is_identical) != null ? E : !1, e
    }
};

function N3() {
    return {id: 0, file_num: 0, data: new Uint8Array(0), compressed: !1, blk_id: 0}
}

const zu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.file_num !== 0 && e.uint32(16).sint32(u.file_num), u.data.length !== 0 && e.uint32(26).bytes(u.data), u.compressed !== !1 && e.uint32(32).bool(u.compressed), u.blk_id !== 0 && e.uint32(40).uint32(u.blk_id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = N3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.file_num = i.sint32();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.data = i.bytes();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.compressed = i.bool();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.blk_id = i.uint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0,
            data: o(u.data) ? z(u.data) : new Uint8Array(0),
            compressed: o(u.compressed) ? globalThis.Boolean(u.compressed) : !1,
            blk_id: o(u.blk_id) ? globalThis.Number(u.blk_id) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), u.data.length !== 0 && (e.data = P(u.data)), u.compressed !== !1 && (e.compressed = u.compressed), u.blk_id !== 0 && (e.blk_id = Math.round(u.blk_id)), e
    }, create(u) {
        return zu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = N3();
        return e.id = (i = u.id) != null ? i : 0, e.file_num = (n = u.file_num) != null ? n : 0, e.data = (a = u.data) != null ? a : new Uint8Array(0), e.compressed = (t = u.compressed) != null ? t : !1, e.blk_id = (s = u.blk_id) != null ? s : 0, e
    }
};

function O3() {
    return {id: 0, error: "", file_num: 0}
}

const Pu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.error !== "" && e.uint32(18).string(u.error), u.file_num !== 0 && e.uint32(24).sint32(u.file_num), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = O3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.error = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.file_num = i.sint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            error: o(u.error) ? globalThis.String(u.error) : "",
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.error !== "" && (e.error = u.error), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), e
    }, create(u) {
        return Pu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = O3();
        return e.id = (i = u.id) != null ? i : 0, e.error = (n = u.error) != null ? n : "", e.file_num = (a = u.file_num) != null ? a : 0, e
    }
};

function U3() {
    return {id: 0, path: "", include_hidden: !1, file_num: 0, file_type: 0}
}

const Ru = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), u.include_hidden !== !1 && e.uint32(24).bool(u.include_hidden), u.file_num !== 0 && e.uint32(32).int32(u.file_num), u.file_type !== 0 && e.uint32(40).int32(u.file_type), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = U3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.include_hidden = i.bool();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.file_num = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.file_type = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            include_hidden: o(u.include_hidden) ? globalThis.Boolean(u.include_hidden) : !1,
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0,
            file_type: o(u.file_type) ? ja(u.file_type) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), u.include_hidden !== !1 && (e.include_hidden = u.include_hidden), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), u.file_type !== 0 && (e.file_type = Na(u.file_type)), e
    }, create(u) {
        return Ru.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = U3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.include_hidden = (a = u.include_hidden) != null ? a : !1, e.file_num = (t = u.file_num) != null ? t : 0, e.file_type = (s = u.file_type) != null ? s : 0, e
    }
};

function M3() {
    return {id: 0, file_num: 0, skip: void 0, offset_blk: void 0}
}

const du = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.file_num !== 0 && e.uint32(16).sint32(u.file_num), u.skip !== void 0 && e.uint32(24).bool(u.skip), u.offset_blk !== void 0 && e.uint32(32).uint32(u.offset_blk), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = M3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.file_num = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.skip = i.bool();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.offset_blk = i.uint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0,
            skip: o(u.skip) ? globalThis.Boolean(u.skip) : void 0,
            offset_blk: o(u.offset_blk) ? globalThis.Number(u.offset_blk) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), u.skip !== void 0 && (e.skip = u.skip), u.offset_blk !== void 0 && (e.offset_blk = Math.round(u.offset_blk)), e
    }, create(u) {
        return du.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = M3();
        return e.id = (i = u.id) != null ? i : 0, e.file_num = (n = u.file_num) != null ? n : 0, e.skip = (a = u.skip) != null ? a : void 0, e.offset_blk = (t = u.offset_blk) != null ? t : void 0, e
    }
};

function L3() {
    return {id: 0, file_num: 0}
}

const Iu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.file_num !== 0 && e.uint32(16).sint32(u.file_num), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = L3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.file_num = i.sint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.Number(u.id) : 0, file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0}
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), e
    }, create(u) {
        return Iu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = L3();
        return e.id = (i = u.id) != null ? i : 0, e.file_num = (n = u.file_num) != null ? n : 0, e
    }
};

function W3() {
    return {id: 0, path: "", files: [], file_num: 0, total_size: 0}
}

const Tu = {
    encode(u, e = r.Writer.create()) {
        u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path);
        for (const i of u.files) V.encode(i, e.uint32(26).fork()).ldelim();
        return u.file_num !== 0 && e.uint32(32).int32(u.file_num), u.total_size !== 0 && e.uint32(40).uint64(u.total_size), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = W3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.files.push(V.decode(i, i.uint32()));
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.file_num = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.total_size = q(i.uint64());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            files: globalThis.Array.isArray(u == null ? void 0 : u.files) ? u.files.map(e => V.fromJSON(e)) : [],
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0,
            total_size: o(u.total_size) ? globalThis.Number(u.total_size) : 0
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), (i = u.files) != null && i.length && (e.files = u.files.map(n => V.toJSON(n))), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), u.total_size !== 0 && (e.total_size = Math.round(u.total_size)), e
    }, create(u) {
        return Tu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = W3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.files = ((a = u.files) == null ? void 0 : a.map(E => V.fromPartial(E))) || [], e.file_num = (t = u.file_num) != null ? t : 0, e.total_size = (s = u.total_size) != null ? s : 0, e
    }
};

function V3() {
    return {id: 0, path: "", recursive: !1}
}

const ju = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), u.recursive !== !1 && e.uint32(24).bool(u.recursive), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = V3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.recursive = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            recursive: o(u.recursive) ? globalThis.Boolean(u.recursive) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), u.recursive !== !1 && (e.recursive = u.recursive), e
    }, create(u) {
        return ju.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = V3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.recursive = (a = u.recursive) != null ? a : !1, e
    }
};

function q3() {
    return {id: 0, path: "", file_num: 0}
}

const Nu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), u.file_num !== 0 && e.uint32(24).sint32(u.file_num), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = q3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.file_num = i.sint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.Number(u.id) : 0,
            path: o(u.path) ? globalThis.String(u.path) : "",
            file_num: o(u.file_num) ? globalThis.Number(u.file_num) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), u.file_num !== 0 && (e.file_num = Math.round(u.file_num)), e
    }, create(u) {
        return Nu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = q3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e.file_num = (a = u.file_num) != null ? a : 0, e
    }
};

function K3() {
    return {id: 0, path: ""}
}

const Ou = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(8).int32(u.id), u.path !== "" && e.uint32(18).string(u.path), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = K3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.id = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.path = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.Number(u.id) : 0, path: o(u.path) ? globalThis.String(u.path) : ""}
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.path !== "" && (e.path = u.path), e
    }, create(u) {
        return Ou.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = K3();
        return e.id = (i = u.id) != null ? i : 0, e.path = (n = u.path) != null ? n : "", e
    }
};

function H3() {
    return {}
}

const f0 = {
    encode(u, e = r.Writer.create()) {
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = H3();
        for (; i.pos < n;) {
            const t = i.uint32();
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {}
    }, toJSON(u) {
        return {}
    }, create(u) {
        return f0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        return H3()
    }
};

function J3() {
    return {id: 0, format: ""}
}

const x0 = {
    encode(u, e = r.Writer.create()) {
        return u.id !== 0 && e.uint32(16).int32(u.id), u.format !== "" && e.uint32(26).string(u.format), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = J3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.id = i.int32();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.format = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.Number(u.id) : 0, format: o(u.format) ? globalThis.String(u.format) : ""}
    }, toJSON(u) {
        const e = {};
        return u.id !== 0 && (e.id = Math.round(u.id)), u.format !== "" && (e.format = u.format), e
    }, create(u) {
        return x0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = J3();
        return e.id = (i = u.id) != null ? i : 0, e.format = (n = u.format) != null ? n : "", e
    }
};

function G3() {
    return {formats: []}
}

const y0 = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.formats) x0.encode(i, e.uint32(18).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = G3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 18) break;
                    a.formats.push(x0.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {formats: globalThis.Array.isArray(u == null ? void 0 : u.formats) ? u.formats.map(e => x0.fromJSON(e)) : []}
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.formats) != null && i.length && (e.formats = u.formats.map(n => x0.toJSON(n))), e
    }, create(u) {
        return y0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = G3();
        return e.formats = ((i = u.formats) == null ? void 0 : i.map(n => x0.fromPartial(n))) || [], e
    }
};

function Z3() {
    return {msg_flags: 0}
}

const b0 = {
    encode(u, e = r.Writer.create()) {
        return u.msg_flags !== 0 && e.uint32(16).int32(u.msg_flags), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Z3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.msg_flags = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {msg_flags: o(u.msg_flags) ? globalThis.Number(u.msg_flags) : 0}
    }, toJSON(u) {
        const e = {};
        return u.msg_flags !== 0 && (e.msg_flags = Math.round(u.msg_flags)), e
    }, create(u) {
        return b0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Z3();
        return e.msg_flags = (i = u.msg_flags) != null ? i : 0, e
    }
};

function Q3() {
    return {requested_format_id: 0}
}

const w0 = {
    encode(u, e = r.Writer.create()) {
        return u.requested_format_id !== 0 && e.uint32(16).int32(u.requested_format_id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Q3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.requested_format_id = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {requested_format_id: o(u.requested_format_id) ? globalThis.Number(u.requested_format_id) : 0}
    }, toJSON(u) {
        const e = {};
        return u.requested_format_id !== 0 && (e.requested_format_id = Math.round(u.requested_format_id)), e
    }, create(u) {
        return w0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Q3();
        return e.requested_format_id = (i = u.requested_format_id) != null ? i : 0, e
    }
};

function X3() {
    return {msg_flags: 0, format_data: new Uint8Array(0)}
}

const S0 = {
    encode(u, e = r.Writer.create()) {
        return u.msg_flags !== 0 && e.uint32(16).int32(u.msg_flags), u.format_data.length !== 0 && e.uint32(26).bytes(u.format_data), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = X3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.msg_flags = i.int32();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.format_data = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            msg_flags: o(u.msg_flags) ? globalThis.Number(u.msg_flags) : 0,
            format_data: o(u.format_data) ? z(u.format_data) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.msg_flags !== 0 && (e.msg_flags = Math.round(u.msg_flags)), u.format_data.length !== 0 && (e.format_data = P(u.format_data)), e
    }, create(u) {
        return S0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = X3();
        return e.msg_flags = (i = u.msg_flags) != null ? i : 0, e.format_data = (n = u.format_data) != null ? n : new Uint8Array(0), e
    }
};

function Y3() {
    return {
        stream_id: 0,
        list_index: 0,
        dw_flags: 0,
        n_position_low: 0,
        n_position_high: 0,
        cb_requested: 0,
        have_clip_data_id: !1,
        clip_data_id: 0
    }
}

const z0 = {
    encode(u, e = r.Writer.create()) {
        return u.stream_id !== 0 && e.uint32(16).int32(u.stream_id), u.list_index !== 0 && e.uint32(24).int32(u.list_index), u.dw_flags !== 0 && e.uint32(32).int32(u.dw_flags), u.n_position_low !== 0 && e.uint32(40).int32(u.n_position_low), u.n_position_high !== 0 && e.uint32(48).int32(u.n_position_high), u.cb_requested !== 0 && e.uint32(56).int32(u.cb_requested), u.have_clip_data_id !== !1 && e.uint32(64).bool(u.have_clip_data_id), u.clip_data_id !== 0 && e.uint32(72).int32(u.clip_data_id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Y3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.stream_id = i.int32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.list_index = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.dw_flags = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.n_position_low = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.n_position_high = i.int32();
                    continue;
                case 7:
                    if (t !== 56) break;
                    a.cb_requested = i.int32();
                    continue;
                case 8:
                    if (t !== 64) break;
                    a.have_clip_data_id = i.bool();
                    continue;
                case 9:
                    if (t !== 72) break;
                    a.clip_data_id = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            stream_id: o(u.stream_id) ? globalThis.Number(u.stream_id) : 0,
            list_index: o(u.list_index) ? globalThis.Number(u.list_index) : 0,
            dw_flags: o(u.dw_flags) ? globalThis.Number(u.dw_flags) : 0,
            n_position_low: o(u.n_position_low) ? globalThis.Number(u.n_position_low) : 0,
            n_position_high: o(u.n_position_high) ? globalThis.Number(u.n_position_high) : 0,
            cb_requested: o(u.cb_requested) ? globalThis.Number(u.cb_requested) : 0,
            have_clip_data_id: o(u.have_clip_data_id) ? globalThis.Boolean(u.have_clip_data_id) : !1,
            clip_data_id: o(u.clip_data_id) ? globalThis.Number(u.clip_data_id) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.stream_id !== 0 && (e.stream_id = Math.round(u.stream_id)), u.list_index !== 0 && (e.list_index = Math.round(u.list_index)), u.dw_flags !== 0 && (e.dw_flags = Math.round(u.dw_flags)), u.n_position_low !== 0 && (e.n_position_low = Math.round(u.n_position_low)), u.n_position_high !== 0 && (e.n_position_high = Math.round(u.n_position_high)), u.cb_requested !== 0 && (e.cb_requested = Math.round(u.cb_requested)), u.have_clip_data_id !== !1 && (e.have_clip_data_id = u.have_clip_data_id), u.clip_data_id !== 0 && (e.clip_data_id = Math.round(u.clip_data_id)), e
    }, create(u) {
        return z0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = Y3();
        return e.stream_id = (i = u.stream_id) != null ? i : 0, e.list_index = (n = u.list_index) != null ? n : 0, e.dw_flags = (a = u.dw_flags) != null ? a : 0, e.n_position_low = (t = u.n_position_low) != null ? t : 0, e.n_position_high = (s = u.n_position_high) != null ? s : 0, e.cb_requested = (E = u.cb_requested) != null ? E : 0, e.have_clip_data_id = (l = u.have_clip_data_id) != null ? l : !1, e.clip_data_id = (d = u.clip_data_id) != null ? d : 0, e
    }
};

function $3() {
    return {msg_flags: 0, stream_id: 0, requested_data: new Uint8Array(0)}
}

const P0 = {
    encode(u, e = r.Writer.create()) {
        return u.msg_flags !== 0 && e.uint32(24).int32(u.msg_flags), u.stream_id !== 0 && e.uint32(32).int32(u.stream_id), u.requested_data.length !== 0 && e.uint32(42).bytes(u.requested_data), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = $3();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 3:
                    if (t !== 24) break;
                    a.msg_flags = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.stream_id = i.int32();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.requested_data = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            msg_flags: o(u.msg_flags) ? globalThis.Number(u.msg_flags) : 0,
            stream_id: o(u.stream_id) ? globalThis.Number(u.stream_id) : 0,
            requested_data: o(u.requested_data) ? z(u.requested_data) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.msg_flags !== 0 && (e.msg_flags = Math.round(u.msg_flags)), u.stream_id !== 0 && (e.stream_id = Math.round(u.stream_id)), u.requested_data.length !== 0 && (e.requested_data = P(u.requested_data)), e
    }, create(u) {
        return P0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = $3();
        return e.msg_flags = (i = u.msg_flags) != null ? i : 0, e.stream_id = (n = u.stream_id) != null ? n : 0, e.requested_data = (a = u.requested_data) != null ? a : new Uint8Array(0), e
    }
};

function ui() {
    return {}
}

const R0 = {
    encode(u, e = r.Writer.create()) {
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ui();
        for (; i.pos < n;) {
            const t = i.uint32();
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {}
    }, toJSON(u) {
        return {}
    }, create(u) {
        return R0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        return ui()
    }
};

function ei() {
    return {
        ready: void 0,
        format_list: void 0,
        format_list_response: void 0,
        format_data_request: void 0,
        format_data_response: void 0,
        file_contents_request: void 0,
        file_contents_response: void 0,
        try_empty: void 0
    }
}

const I0 = {
    encode(u, e = r.Writer.create()) {
        return u.ready !== void 0 && f0.encode(u.ready, e.uint32(10).fork()).ldelim(), u.format_list !== void 0 && y0.encode(u.format_list, e.uint32(18).fork()).ldelim(), u.format_list_response !== void 0 && b0.encode(u.format_list_response, e.uint32(26).fork()).ldelim(), u.format_data_request !== void 0 && w0.encode(u.format_data_request, e.uint32(34).fork()).ldelim(), u.format_data_response !== void 0 && S0.encode(u.format_data_response, e.uint32(42).fork()).ldelim(), u.file_contents_request !== void 0 && z0.encode(u.file_contents_request, e.uint32(50).fork()).ldelim(), u.file_contents_response !== void 0 && P0.encode(u.file_contents_response, e.uint32(58).fork()).ldelim(), u.try_empty !== void 0 && R0.encode(u.try_empty, e.uint32(66).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ei();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.ready = f0.decode(i, i.uint32());
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.format_list = y0.decode(i, i.uint32());
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.format_list_response = b0.decode(i, i.uint32());
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.format_data_request = w0.decode(i, i.uint32());
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.format_data_response = S0.decode(i, i.uint32());
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.file_contents_request = z0.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.file_contents_response = P0.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.try_empty = R0.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            ready: o(u.ready) ? f0.fromJSON(u.ready) : void 0,
            format_list: o(u.format_list) ? y0.fromJSON(u.format_list) : void 0,
            format_list_response: o(u.format_list_response) ? b0.fromJSON(u.format_list_response) : void 0,
            format_data_request: o(u.format_data_request) ? w0.fromJSON(u.format_data_request) : void 0,
            format_data_response: o(u.format_data_response) ? S0.fromJSON(u.format_data_response) : void 0,
            file_contents_request: o(u.file_contents_request) ? z0.fromJSON(u.file_contents_request) : void 0,
            file_contents_response: o(u.file_contents_response) ? P0.fromJSON(u.file_contents_response) : void 0,
            try_empty: o(u.try_empty) ? R0.fromJSON(u.try_empty) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.ready !== void 0 && (e.ready = f0.toJSON(u.ready)), u.format_list !== void 0 && (e.format_list = y0.toJSON(u.format_list)), u.format_list_response !== void 0 && (e.format_list_response = b0.toJSON(u.format_list_response)), u.format_data_request !== void 0 && (e.format_data_request = w0.toJSON(u.format_data_request)), u.format_data_response !== void 0 && (e.format_data_response = S0.toJSON(u.format_data_response)), u.file_contents_request !== void 0 && (e.file_contents_request = z0.toJSON(u.file_contents_request)), u.file_contents_response !== void 0 && (e.file_contents_response = P0.toJSON(u.file_contents_response)), u.try_empty !== void 0 && (e.try_empty = R0.toJSON(u.try_empty)), e
    }, create(u) {
        return I0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        const e = ei();
        return e.ready = u.ready !== void 0 && u.ready !== null ? f0.fromPartial(u.ready) : void 0, e.format_list = u.format_list !== void 0 && u.format_list !== null ? y0.fromPartial(u.format_list) : void 0, e.format_list_response = u.format_list_response !== void 0 && u.format_list_response !== null ? b0.fromPartial(u.format_list_response) : void 0, e.format_data_request = u.format_data_request !== void 0 && u.format_data_request !== null ? w0.fromPartial(u.format_data_request) : void 0, e.format_data_response = u.format_data_response !== void 0 && u.format_data_response !== null ? S0.fromPartial(u.format_data_response) : void 0, e.file_contents_request = u.file_contents_request !== void 0 && u.file_contents_request !== null ? z0.fromPartial(u.file_contents_request) : void 0, e.file_contents_response = u.file_contents_response !== void 0 && u.file_contents_response !== null ? P0.fromPartial(u.file_contents_response) : void 0, e.try_empty = u.try_empty !== void 0 && u.try_empty !== null ? R0.fromPartial(u.try_empty) : void 0, e
    }
};

function ii() {
    return {width: 0, height: 0}
}

const v = {
    encode(u, e = r.Writer.create()) {
        return u.width !== 0 && e.uint32(8).int32(u.width), u.height !== 0 && e.uint32(16).int32(u.height), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ii();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.width = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.height = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            width: o(u.width) ? globalThis.Number(u.width) : 0,
            height: o(u.height) ? globalThis.Number(u.height) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.width !== 0 && (e.width = Math.round(u.width)), u.height !== 0 && (e.height = Math.round(u.height)), e
    }, create(u) {
        return v.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = ii();
        return e.width = (i = u.width) != null ? i : 0, e.height = (n = u.height) != null ? n : 0, e
    }
};

function ti() {
    return {display: 0, resolution: void 0}
}

const Uu = {
    encode(u, e = r.Writer.create()) {
        return u.display !== 0 && e.uint32(8).int32(u.display), u.resolution !== void 0 && v.encode(u.resolution, e.uint32(18).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ti();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.display = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.resolution = v.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            display: o(u.display) ? globalThis.Number(u.display) : 0,
            resolution: o(u.resolution) ? v.fromJSON(u.resolution) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.display !== 0 && (e.display = Math.round(u.display)), u.resolution !== void 0 && (e.resolution = v.toJSON(u.resolution)), e
    }, create(u) {
        return Uu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = ti();
        return e.display = (i = u.display) != null ? i : 0, e.resolution = u.resolution !== void 0 && u.resolution !== null ? v.fromPartial(u.resolution) : void 0, e
    }
};

function ai() {
    return {resolutions: []}
}

const iu = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.resolutions) v.encode(i, e.uint32(10).fork()).ldelim();
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ai();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.resolutions.push(v.decode(i, i.uint32()));
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {resolutions: globalThis.Array.isArray(u == null ? void 0 : u.resolutions) ? u.resolutions.map(e => v.fromJSON(e)) : []}
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.resolutions) != null && i.length && (e.resolutions = u.resolutions.map(n => v.toJSON(n))), e
    }, create(u) {
        return iu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = ai();
        return e.resolutions = ((i = u.resolutions) == null ? void 0 : i.map(n => v.fromPartial(n))) || [], e
    }
};

function ni() {
    return {
        display: 0,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        cursor_embedded: !1,
        resolutions: void 0,
        original_resolution: void 0
    }
}

const Mu = {
    encode(u, e = r.Writer.create()) {
        return u.display !== 0 && e.uint32(8).int32(u.display), u.x !== 0 && e.uint32(16).sint32(u.x), u.y !== 0 && e.uint32(24).sint32(u.y), u.width !== 0 && e.uint32(32).int32(u.width), u.height !== 0 && e.uint32(40).int32(u.height), u.cursor_embedded !== !1 && e.uint32(48).bool(u.cursor_embedded), u.resolutions !== void 0 && iu.encode(u.resolutions, e.uint32(58).fork()).ldelim(), u.original_resolution !== void 0 && v.encode(u.original_resolution, e.uint32(66).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ni();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.display = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.x = i.sint32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.y = i.sint32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.width = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.height = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.cursor_embedded = i.bool();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.resolutions = iu.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.original_resolution = v.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            display: o(u.display) ? globalThis.Number(u.display) : 0,
            x: o(u.x) ? globalThis.Number(u.x) : 0,
            y: o(u.y) ? globalThis.Number(u.y) : 0,
            width: o(u.width) ? globalThis.Number(u.width) : 0,
            height: o(u.height) ? globalThis.Number(u.height) : 0,
            cursor_embedded: o(u.cursor_embedded) ? globalThis.Boolean(u.cursor_embedded) : !1,
            resolutions: o(u.resolutions) ? iu.fromJSON(u.resolutions) : void 0,
            original_resolution: o(u.original_resolution) ? v.fromJSON(u.original_resolution) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.display !== 0 && (e.display = Math.round(u.display)), u.x !== 0 && (e.x = Math.round(u.x)), u.y !== 0 && (e.y = Math.round(u.y)), u.width !== 0 && (e.width = Math.round(u.width)), u.height !== 0 && (e.height = Math.round(u.height)), u.cursor_embedded !== !1 && (e.cursor_embedded = u.cursor_embedded), u.resolutions !== void 0 && (e.resolutions = iu.toJSON(u.resolutions)), u.original_resolution !== void 0 && (e.original_resolution = v.toJSON(u.original_resolution)), e
    }, create(u) {
        return Mu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E;
        const e = ni();
        return e.display = (i = u.display) != null ? i : 0, e.x = (n = u.x) != null ? n : 0, e.y = (a = u.y) != null ? a : 0, e.width = (t = u.width) != null ? t : 0, e.height = (s = u.height) != null ? s : 0, e.cursor_embedded = (E = u.cursor_embedded) != null ? E : !1, e.resolutions = u.resolutions !== void 0 && u.resolutions !== null ? iu.fromPartial(u.resolutions) : void 0, e.original_resolution = u.original_resolution !== void 0 && u.original_resolution !== null ? v.fromPartial(u.original_resolution) : void 0, e
    }
};

function oi() {
    return {add: [], sub: [], set: []}
}

const Lu = {
    encode(u, e = r.Writer.create()) {
        e.uint32(10).fork();
        for (const i of u.add) e.int32(i);
        e.ldelim(), e.uint32(18).fork();
        for (const i of u.sub) e.int32(i);
        e.ldelim(), e.uint32(26).fork();
        for (const i of u.set) e.int32(i);
        return e.ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = oi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t === 8) {
                        a.add.push(i.int32());
                        continue
                    }
                    if (t === 10) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.add.push(i.int32());
                        continue
                    }
                    break;
                case 2:
                    if (t === 16) {
                        a.sub.push(i.int32());
                        continue
                    }
                    if (t === 18) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.sub.push(i.int32());
                        continue
                    }
                    break;
                case 3:
                    if (t === 24) {
                        a.set.push(i.int32());
                        continue
                    }
                    if (t === 26) {
                        const s = i.uint32() + i.pos;
                        for (; i.pos < s;) a.set.push(i.int32());
                        continue
                    }
                    break
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            add: globalThis.Array.isArray(u == null ? void 0 : u.add) ? u.add.map(e => globalThis.Number(e)) : [],
            sub: globalThis.Array.isArray(u == null ? void 0 : u.sub) ? u.sub.map(e => globalThis.Number(e)) : [],
            set: globalThis.Array.isArray(u == null ? void 0 : u.set) ? u.set.map(e => globalThis.Number(e)) : []
        }
    }, toJSON(u) {
        var i, n, a;
        const e = {};
        return (i = u.add) != null && i.length && (e.add = u.add.map(t => Math.round(t))), (n = u.sub) != null && n.length && (e.sub = u.sub.map(t => Math.round(t))), (a = u.set) != null && a.length && (e.set = u.set.map(t => Math.round(t))), e
    }, create(u) {
        return Lu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = oi();
        return e.add = ((i = u.add) == null ? void 0 : i.map(t => t)) || [], e.sub = ((n = u.sub) == null ? void 0 : n.map(t => t)) || [], e.set = ((a = u.set) == null ? void 0 : a.map(t => t)) || [], e
    }
};

function ri() {
    return {display: 0, on: !1}
}

const Wu = {
    encode(u, e = r.Writer.create()) {
        return u.display !== 0 && e.uint32(8).int32(u.display), u.on !== !1 && e.uint32(16).bool(u.on), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ri();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.display = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.on = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {display: o(u.display) ? globalThis.Number(u.display) : 0, on: o(u.on) ? globalThis.Boolean(u.on) : !1}
    }, toJSON(u) {
        const e = {};
        return u.display !== 0 && (e.display = Math.round(u.display)), u.on !== !1 && (e.on = u.on), e
    }, create(u) {
        return Wu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = ri();
        return e.display = (i = u.display) != null ? i : 0, e.on = (n = u.on) != null ? n : !1, e
    }
};

function si() {
    return {impl_key: "", on: !1}
}

const Vu = {
    encode(u, e = r.Writer.create()) {
        return u.impl_key !== "" && e.uint32(10).string(u.impl_key), u.on !== !1 && e.uint32(16).bool(u.on), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = si();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.impl_key = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.on = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            impl_key: o(u.impl_key) ? globalThis.String(u.impl_key) : "",
            on: o(u.on) ? globalThis.Boolean(u.on) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.impl_key !== "" && (e.impl_key = u.impl_key), u.on !== !1 && (e.on = u.on), e
    }, create(u) {
        return Vu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = si();
        return e.impl_key = (i = u.impl_key) != null ? i : "", e.on = (n = u.on) != null ? n : !1, e
    }
};

function Ei() {
    return {permission: 0, enabled: !1}
}

const T0 = {
    encode(u, e = r.Writer.create()) {
        return u.permission !== 0 && e.uint32(8).int32(u.permission), u.enabled !== !1 && e.uint32(16).bool(u.enabled), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ei();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.permission = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.enabled = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            permission: o(u.permission) ? Oa(u.permission) : 0,
            enabled: o(u.enabled) ? globalThis.Boolean(u.enabled) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.permission !== 0 && (e.permission = Ua(u.permission)), u.enabled !== !1 && (e.enabled = u.enabled), e
    }, create(u) {
        return T0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Ei();
        return e.permission = (i = u.permission) != null ? i : 0, e.enabled = (n = u.enabled) != null ? n : !1, e
    }
};

function li() {
    return {
        ability_vp9: 0,
        ability_h264: 0,
        ability_h265: 0,
        prefer: 0,
        ability_vp8: 0,
        ability_av1: 0,
        i444: void 0,
        prefer_chroma: 0
    }
}

const qu = {
    encode(u, e = r.Writer.create()) {
        return u.ability_vp9 !== 0 && e.uint32(8).int32(u.ability_vp9), u.ability_h264 !== 0 && e.uint32(16).int32(u.ability_h264), u.ability_h265 !== 0 && e.uint32(24).int32(u.ability_h265), u.prefer !== 0 && e.uint32(32).int32(u.prefer), u.ability_vp8 !== 0 && e.uint32(40).int32(u.ability_vp8), u.ability_av1 !== 0 && e.uint32(48).int32(u.ability_av1), u.i444 !== void 0 && G.encode(u.i444, e.uint32(58).fork()).ldelim(), u.prefer_chroma !== 0 && e.uint32(64).int32(u.prefer_chroma), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = li();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.ability_vp9 = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.ability_h264 = i.int32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.ability_h265 = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.prefer = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.ability_vp8 = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.ability_av1 = i.int32();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.i444 = G.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 64) break;
                    a.prefer_chroma = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            ability_vp9: o(u.ability_vp9) ? globalThis.Number(u.ability_vp9) : 0,
            ability_h264: o(u.ability_h264) ? globalThis.Number(u.ability_h264) : 0,
            ability_h265: o(u.ability_h265) ? globalThis.Number(u.ability_h265) : 0,
            prefer: o(u.prefer) ? Ma(u.prefer) : 0,
            ability_vp8: o(u.ability_vp8) ? globalThis.Number(u.ability_vp8) : 0,
            ability_av1: o(u.ability_av1) ? globalThis.Number(u.ability_av1) : 0,
            i444: o(u.i444) ? G.fromJSON(u.i444) : void 0,
            prefer_chroma: o(u.prefer_chroma) ? xa(u.prefer_chroma) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.ability_vp9 !== 0 && (e.ability_vp9 = Math.round(u.ability_vp9)), u.ability_h264 !== 0 && (e.ability_h264 = Math.round(u.ability_h264)), u.ability_h265 !== 0 && (e.ability_h265 = Math.round(u.ability_h265)), u.prefer !== 0 && (e.prefer = La(u.prefer)), u.ability_vp8 !== 0 && (e.ability_vp8 = Math.round(u.ability_vp8)), u.ability_av1 !== 0 && (e.ability_av1 = Math.round(u.ability_av1)), u.i444 !== void 0 && (e.i444 = G.toJSON(u.i444)), u.prefer_chroma !== 0 && (e.prefer_chroma = ya(u.prefer_chroma)), e
    }, create(u) {
        return qu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l;
        const e = li();
        return e.ability_vp9 = (i = u.ability_vp9) != null ? i : 0, e.ability_h264 = (n = u.ability_h264) != null ? n : 0, e.ability_h265 = (a = u.ability_h265) != null ? a : 0, e.prefer = (t = u.prefer) != null ? t : 0, e.ability_vp8 = (s = u.ability_vp8) != null ? s : 0, e.ability_av1 = (E = u.ability_av1) != null ? E : 0, e.i444 = u.i444 !== void 0 && u.i444 !== null ? G.fromPartial(u.i444) : void 0, e.prefer_chroma = (l = u.prefer_chroma) != null ? l : 0, e
    }
};

function Di() {
    return {
        image_quality: 0,
        lock_after_session_end: 0,
        show_remote_cursor: 0,
        privacy_mode: 0,
        block_input: 0,
        custom_image_quality: 0,
        disable_audio: 0,
        disable_clipboard: 0,
        enable_file_transfer: 0,
        supported_decoding: void 0,
        custom_fps: 0,
        disable_keyboard: 0,
        follow_remote_cursor: 0,
        follow_remote_window: 0,
        disable_camera: 0
    }
}

const R = {
    encode(u, e = r.Writer.create()) {
        return u.image_quality !== 0 && e.uint32(8).int32(u.image_quality), u.lock_after_session_end !== 0 && e.uint32(16).int32(u.lock_after_session_end), u.show_remote_cursor !== 0 && e.uint32(24).int32(u.show_remote_cursor), u.privacy_mode !== 0 && e.uint32(32).int32(u.privacy_mode), u.block_input !== 0 && e.uint32(40).int32(u.block_input), u.custom_image_quality !== 0 && e.uint32(48).int32(u.custom_image_quality), u.disable_audio !== 0 && e.uint32(56).int32(u.disable_audio), u.disable_clipboard !== 0 && e.uint32(64).int32(u.disable_clipboard), u.enable_file_transfer !== 0 && e.uint32(72).int32(u.enable_file_transfer), u.supported_decoding !== void 0 && qu.encode(u.supported_decoding, e.uint32(82).fork()).ldelim(), u.custom_fps !== 0 && e.uint32(88).int32(u.custom_fps), u.disable_keyboard !== 0 && e.uint32(96).int32(u.disable_keyboard), u.follow_remote_cursor !== 0 && e.uint32(120).int32(u.follow_remote_cursor), u.follow_remote_window !== 0 && e.uint32(128).int32(u.follow_remote_window), u.disable_camera !== 0 && e.uint32(136).int32(u.disable_camera), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Di();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.image_quality = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.lock_after_session_end = i.int32();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.show_remote_cursor = i.int32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.privacy_mode = i.int32();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.block_input = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.custom_image_quality = i.int32();
                    continue;
                case 7:
                    if (t !== 56) break;
                    a.disable_audio = i.int32();
                    continue;
                case 8:
                    if (t !== 64) break;
                    a.disable_clipboard = i.int32();
                    continue;
                case 9:
                    if (t !== 72) break;
                    a.enable_file_transfer = i.int32();
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.supported_decoding = qu.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 88) break;
                    a.custom_fps = i.int32();
                    continue;
                case 12:
                    if (t !== 96) break;
                    a.disable_keyboard = i.int32();
                    continue;
                case 15:
                    if (t !== 120) break;
                    a.follow_remote_cursor = i.int32();
                    continue;
                case 16:
                    if (t !== 128) break;
                    a.follow_remote_window = i.int32();
                    continue;
                case 17:
                    if (t !== 136) break;
                    a.disable_camera = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            image_quality: o(u.image_quality) ? Ia(u.image_quality) : 0,
            lock_after_session_end: o(u.lock_after_session_end) ? X(u.lock_after_session_end) : 0,
            show_remote_cursor: o(u.show_remote_cursor) ? X(u.show_remote_cursor) : 0,
            privacy_mode: o(u.privacy_mode) ? X(u.privacy_mode) : 0,
            block_input: o(u.block_input) ? X(u.block_input) : 0,
            custom_image_quality: o(u.custom_image_quality) ? globalThis.Number(u.custom_image_quality) : 0,
            disable_audio: o(u.disable_audio) ? X(u.disable_audio) : 0,
            disable_clipboard: o(u.disable_clipboard) ? X(u.disable_clipboard) : 0,
            enable_file_transfer: o(u.enable_file_transfer) ? X(u.enable_file_transfer) : 0,
            supported_decoding: o(u.supported_decoding) ? qu.fromJSON(u.supported_decoding) : void 0,
            custom_fps: o(u.custom_fps) ? globalThis.Number(u.custom_fps) : 0,
            disable_keyboard: o(u.disable_keyboard) ? X(u.disable_keyboard) : 0,
            follow_remote_cursor: o(u.follow_remote_cursor) ? X(u.follow_remote_cursor) : 0,
            follow_remote_window: o(u.follow_remote_window) ? X(u.follow_remote_window) : 0,
            disable_camera: o(u.disable_camera) ? X(u.disable_camera) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.image_quality !== 0 && (e.image_quality = Ta(u.image_quality)), u.lock_after_session_end !== 0 && (e.lock_after_session_end = Y(u.lock_after_session_end)), u.show_remote_cursor !== 0 && (e.show_remote_cursor = Y(u.show_remote_cursor)), u.privacy_mode !== 0 && (e.privacy_mode = Y(u.privacy_mode)), u.block_input !== 0 && (e.block_input = Y(u.block_input)), u.custom_image_quality !== 0 && (e.custom_image_quality = Math.round(u.custom_image_quality)), u.disable_audio !== 0 && (e.disable_audio = Y(u.disable_audio)), u.disable_clipboard !== 0 && (e.disable_clipboard = Y(u.disable_clipboard)), u.enable_file_transfer !== 0 && (e.enable_file_transfer = Y(u.enable_file_transfer)), u.supported_decoding !== void 0 && (e.supported_decoding = qu.toJSON(u.supported_decoding)), u.custom_fps !== 0 && (e.custom_fps = Math.round(u.custom_fps)), u.disable_keyboard !== 0 && (e.disable_keyboard = Y(u.disable_keyboard)), u.follow_remote_cursor !== 0 && (e.follow_remote_cursor = Y(u.follow_remote_cursor)), u.follow_remote_window !== 0 && (e.follow_remote_window = Y(u.follow_remote_window)), u.disable_camera !== 0 && (e.disable_camera = Y(u.disable_camera)), e
    }, create(u) {
        return R.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d, c, p, B, F, b, x;
        const e = Di();
        return e.image_quality = (i = u.image_quality) != null ? i : 0, e.lock_after_session_end = (n = u.lock_after_session_end) != null ? n : 0, e.show_remote_cursor = (a = u.show_remote_cursor) != null ? a : 0, e.privacy_mode = (t = u.privacy_mode) != null ? t : 0, e.block_input = (s = u.block_input) != null ? s : 0, e.custom_image_quality = (E = u.custom_image_quality) != null ? E : 0, e.disable_audio = (l = u.disable_audio) != null ? l : 0, e.disable_clipboard = (d = u.disable_clipboard) != null ? d : 0, e.enable_file_transfer = (c = u.enable_file_transfer) != null ? c : 0, e.supported_decoding = u.supported_decoding !== void 0 && u.supported_decoding !== null ? qu.fromPartial(u.supported_decoding) : void 0, e.custom_fps = (p = u.custom_fps) != null ? p : 0, e.disable_keyboard = (B = u.disable_keyboard) != null ? B : 0, e.follow_remote_cursor = (F = u.follow_remote_cursor) != null ? F : 0, e.follow_remote_window = (b = u.follow_remote_window) != null ? b : 0, e.disable_camera = (x = u.disable_camera) != null ? x : 0, e
    }
};

function di() {
    return {time: 0, from_client: !1, last_delay: 0, target_bitrate: 0}
}

const j0 = {
    encode(u, e = r.Writer.create()) {
        return u.time !== 0 && e.uint32(8).int64(u.time), u.from_client !== !1 && e.uint32(16).bool(u.from_client), u.last_delay !== 0 && e.uint32(24).uint32(u.last_delay), u.target_bitrate !== 0 && e.uint32(32).uint32(u.target_bitrate), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = di();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.time = q(i.int64());
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.from_client = i.bool();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.last_delay = i.uint32();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.target_bitrate = i.uint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            time: o(u.time) ? globalThis.Number(u.time) : 0,
            from_client: o(u.from_client) ? globalThis.Boolean(u.from_client) : !1,
            last_delay: o(u.last_delay) ? globalThis.Number(u.last_delay) : 0,
            target_bitrate: o(u.target_bitrate) ? globalThis.Number(u.target_bitrate) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.time !== 0 && (e.time = Math.round(u.time)), u.from_client !== !1 && (e.from_client = u.from_client), u.last_delay !== 0 && (e.last_delay = Math.round(u.last_delay)), u.target_bitrate !== 0 && (e.target_bitrate = Math.round(u.target_bitrate)), e
    }, create(u) {
        return j0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = di();
        return e.time = (i = u.time) != null ? i : 0, e.from_client = (n = u.from_client) != null ? n : !1, e.last_delay = (a = u.last_delay) != null ? a : 0, e.target_bitrate = (t = u.target_bitrate) != null ? t : 0, e
    }
};

function ci() {
    return {asymmetric_value: new Uint8Array(0), symmetric_value: new Uint8Array(0)}
}

const H = {
    encode(u, e = r.Writer.create()) {
        return u.asymmetric_value.length !== 0 && e.uint32(10).bytes(u.asymmetric_value), u.symmetric_value.length !== 0 && e.uint32(18).bytes(u.symmetric_value), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ci();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.asymmetric_value = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.symmetric_value = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            asymmetric_value: o(u.asymmetric_value) ? z(u.asymmetric_value) : new Uint8Array(0),
            symmetric_value: o(u.symmetric_value) ? z(u.symmetric_value) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.asymmetric_value.length !== 0 && (e.asymmetric_value = P(u.asymmetric_value)), u.symmetric_value.length !== 0 && (e.symmetric_value = P(u.symmetric_value)), e
    }, create(u) {
        return H.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = ci();
        return e.asymmetric_value = (i = u.asymmetric_value) != null ? i : new Uint8Array(0), e.symmetric_value = (n = u.symmetric_value) != null ? n : new Uint8Array(0), e
    }
};

function Ci() {
    return {id: new Uint8Array(0)}
}

const N0 = {
    encode(u, e = r.Writer.create()) {
        return u.id.length !== 0 && e.uint32(10).bytes(u.id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ci();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? z(u.id) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.id.length !== 0 && (e.id = P(u.id)), e
    }, create(u) {
        return N0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Ci();
        return e.id = (i = u.id) != null ? i : new Uint8Array(0), e
    }
};

function pi() {
    return {sample_rate: 0, channels: 0}
}

const O0 = {
    encode(u, e = r.Writer.create()) {
        return u.sample_rate !== 0 && e.uint32(8).uint32(u.sample_rate), u.channels !== 0 && e.uint32(16).uint32(u.channels), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = pi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.sample_rate = i.uint32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.channels = i.uint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            sample_rate: o(u.sample_rate) ? globalThis.Number(u.sample_rate) : 0,
            channels: o(u.channels) ? globalThis.Number(u.channels) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.sample_rate !== 0 && (e.sample_rate = Math.round(u.sample_rate)), u.channels !== 0 && (e.channels = Math.round(u.channels)), e
    }, create(u) {
        return O0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = pi();
        return e.sample_rate = (i = u.sample_rate) != null ? i : 0, e.channels = (n = u.channels) != null ? n : 0, e
    }
};

function Bi() {
    return {data: new Uint8Array(0)}
}

const U0 = {
    encode(u, e = r.Writer.create()) {
        return u.data.length !== 0 && e.uint32(10).bytes(u.data), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Bi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.data = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {data: o(u.data) ? z(u.data) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.data.length !== 0 && (e.data = P(u.data)), e
    }, create(u) {
        return U0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Bi();
        return e.data = (i = u.data) != null ? i : new Uint8Array(0), e
    }
};

function Ai() {
    return {msgtype: "", title: "", text: "", link: ""}
}

const M0 = {
    encode(u, e = r.Writer.create()) {
        return u.msgtype !== "" && e.uint32(10).string(u.msgtype), u.title !== "" && e.uint32(18).string(u.title), u.text !== "" && e.uint32(26).string(u.text), u.link !== "" && e.uint32(34).string(u.link), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ai();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.msgtype = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.title = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.text = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.link = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            msgtype: o(u.msgtype) ? globalThis.String(u.msgtype) : "",
            title: o(u.title) ? globalThis.String(u.title) : "",
            text: o(u.text) ? globalThis.String(u.text) : "",
            link: o(u.link) ? globalThis.String(u.link) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.msgtype !== "" && (e.msgtype = u.msgtype), u.title !== "" && (e.title = u.title), u.text !== "" && (e.text = u.text), u.link !== "" && (e.link = u.link), e
    }, create(u) {
        return M0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = Ai();
        return e.msgtype = (i = u.msgtype) != null ? i : "", e.title = (n = u.title) != null ? n : "", e.text = (a = u.text) != null ? a : "", e.link = (t = u.link) != null ? t : "", e
    }
};

function mi() {
    return {privacy_mode_state: void 0, block_input_state: void 0, details: "", impl_key: ""}
}

const L0 = {
    encode(u, e = r.Writer.create()) {
        return u.privacy_mode_state !== void 0 && e.uint32(8).int32(u.privacy_mode_state), u.block_input_state !== void 0 && e.uint32(16).int32(u.block_input_state), u.details !== "" && e.uint32(26).string(u.details), u.impl_key !== "" && e.uint32(34).string(u.impl_key), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = mi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.privacy_mode_state = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.block_input_state = i.int32();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.details = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.impl_key = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            privacy_mode_state: o(u.privacy_mode_state) ? qa(u.privacy_mode_state) : void 0,
            block_input_state: o(u.block_input_state) ? Wa(u.block_input_state) : void 0,
            details: o(u.details) ? globalThis.String(u.details) : "",
            impl_key: o(u.impl_key) ? globalThis.String(u.impl_key) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.privacy_mode_state !== void 0 && (e.privacy_mode_state = Ka(u.privacy_mode_state)), u.block_input_state !== void 0 && (e.block_input_state = Va(u.block_input_state)), u.details !== "" && (e.details = u.details), u.impl_key !== "" && (e.impl_key = u.impl_key), e
    }, create(u) {
        return L0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = mi();
        return e.privacy_mode_state = (i = u.privacy_mode_state) != null ? i : void 0, e.block_input_state = (n = u.block_input_state) != null ? n : void 0, e.details = (a = u.details) != null ? a : "", e.impl_key = (t = u.impl_key) != null ? t : "", e
    }
};

function Fi() {
    return {username: "", password: ""}
}

const Ku = {
    encode(u, e = r.Writer.create()) {
        return u.username !== "" && e.uint32(10).string(u.username), u.password !== "" && e.uint32(18).string(u.password), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Fi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.username = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.password = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            username: o(u.username) ? globalThis.String(u.username) : "",
            password: o(u.password) ? globalThis.String(u.password) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.username !== "" && (e.username = u.username), u.password !== "" && (e.password = u.password), e
    }, create(u) {
        return Ku.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Fi();
        return e.username = (i = u.username) != null ? i : "", e.password = (n = u.password) != null ? n : "", e
    }
};

function _i() {
    return {direct: void 0, logon: void 0}
}

const pu = {
    encode(u, e = r.Writer.create()) {
        return u.direct !== void 0 && e.uint32(8).bool(u.direct), u.logon !== void 0 && Ku.encode(u.logon, e.uint32(18).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = _i();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.direct = i.bool();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.logon = Ku.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            direct: o(u.direct) ? globalThis.Boolean(u.direct) : void 0,
            logon: o(u.logon) ? Ku.fromJSON(u.logon) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.direct !== void 0 && (e.direct = u.direct), u.logon !== void 0 && (e.logon = Ku.toJSON(u.logon)), e
    }, create(u) {
        return pu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = _i();
        return e.direct = (i = u.direct) != null ? i : void 0, e.logon = u.logon !== void 0 && u.logon !== null ? Ku.fromPartial(u.logon) : void 0, e
    }
};

function vi() {
    return {uuid: new Uint8Array(0)}
}

const W0 = {
    encode(u, e = r.Writer.create()) {
        return u.uuid.length !== 0 && e.uint32(10).bytes(u.uuid), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = vi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.uuid = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {uuid: o(u.uuid) ? z(u.uuid) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.uuid.length !== 0 && (e.uuid = P(u.uuid)), e
    }, create(u) {
        return W0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = vi();
        return e.uuid = (i = u.uuid) != null ? i : new Uint8Array(0), e
    }
};

function gi() {
    return {uuid: new Uint8Array(0), lr: void 0}
}

const V0 = {
    encode(u, e = r.Writer.create()) {
        return u.uuid.length !== 0 && e.uint32(10).bytes(u.uuid), u.lr !== void 0 && J.encode(u.lr, e.uint32(18).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = gi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.uuid = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.lr = J.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {uuid: o(u.uuid) ? z(u.uuid) : new Uint8Array(0), lr: o(u.lr) ? J.fromJSON(u.lr) : void 0}
    }, toJSON(u) {
        const e = {};
        return u.uuid.length !== 0 && (e.uuid = P(u.uuid)), u.lr !== void 0 && (e.lr = J.toJSON(u.lr)), e
    }, create(u) {
        return V0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = gi();
        return e.uuid = (i = u.uuid) != null ? i : new Uint8Array(0), e.lr = u.lr !== void 0 && u.lr !== null ? J.fromPartial(u.lr) : void 0, e
    }
};

function ki() {
    return {}
}

const q0 = {
    encode(u, e = r.Writer.create()) {
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ki();
        for (; i.pos < n;) {
            const t = i.uint32();
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {}
    }, toJSON(u) {
        return {}
    }, create(u) {
        return q0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        return ki()
    }
};

function hi() {
    return {id: "", content: new Uint8Array(0)}
}

const K0 = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.content.length !== 0 && e.uint32(18).bytes(u.content), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = hi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.content = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: o(u.id) ? globalThis.String(u.id) : "", content: o(u.content) ? z(u.content) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.content.length !== 0 && (e.content = P(u.content)), e
    }, create(u) {
        return K0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = hi();
        return e.id = (i = u.id) != null ? i : "", e.content = (n = u.content) != null ? n : new Uint8Array(0), e
    }
};

function fi() {
    return {id: "", name: "", msg: ""}
}

const H0 = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.name !== "" && e.uint32(18).string(u.name), u.msg !== "" && e.uint32(26).string(u.msg), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = fi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.name = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.msg = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: o(u.id) ? globalThis.String(u.id) : "",
            name: o(u.name) ? globalThis.String(u.name) : "",
            msg: o(u.msg) ? globalThis.String(u.msg) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.name !== "" && (e.name = u.name), u.msg !== "" && (e.msg = u.msg), e
    }, create(u) {
        return H0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = fi();
        return e.id = (i = u.id) != null ? i : "", e.name = (n = u.name) != null ? n : "", e.msg = (a = u.msg) != null ? a : "", e
    }
};

function xi() {
    return {sessions: [], current_sid: 0}
}

const J0 = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.sessions) c0.encode(i, e.uint32(10).fork()).ldelim();
        return u.current_sid !== 0 && e.uint32(16).uint32(u.current_sid), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = xi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.sessions.push(c0.decode(i, i.uint32()));
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.current_sid = i.uint32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            sessions: globalThis.Array.isArray(u == null ? void 0 : u.sessions) ? u.sessions.map(e => c0.fromJSON(e)) : [],
            current_sid: o(u.current_sid) ? globalThis.Number(u.current_sid) : 0
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.sessions) != null && i.length && (e.sessions = u.sessions.map(n => c0.toJSON(n))), u.current_sid !== 0 && (e.current_sid = Math.round(u.current_sid)), e
    }, create(u) {
        return J0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = xi();
        return e.sessions = ((i = u.sessions) == null ? void 0 : i.map(a => c0.fromPartial(a))) || [], e.current_sid = (n = u.current_sid) != null ? n : 0, e
    }
};

function yi() {
    return {switch_display: 0}
}

const G0 = {
    encode(u, e = r.Writer.create()) {
        return u.switch_display !== 0 && e.uint32(8).int32(u.switch_display), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = yi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.switch_display = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {switch_display: o(u.switch_display) ? globalThis.Number(u.switch_display) : 0}
    }, toJSON(u) {
        const e = {};
        return u.switch_display !== 0 && (e.switch_display = Math.round(u.switch_display)), e
    }, create(u) {
        return G0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = yi();
        return e.switch_display = (i = u.switch_display) != null ? i : 0, e
    }
};

function bi() {
    return {
        chat_message: void 0,
        switch_display: void 0,
        permission_info: void 0,
        option: void 0,
        audio_format: void 0,
        close_reason: void 0,
        refresh_video: void 0,
        video_received: void 0,
        back_notification: void 0,
        restart_remote_device: void 0,
        uac: void 0,
        foreground_window_elevated: void 0,
        stop_service: void 0,
        elevation_request: void 0,
        elevation_response: void 0,
        portable_service_running: void 0,
        switch_sides_request: void 0,
        switch_back: void 0,
        change_resolution: void 0,
        plugin_request: void 0,
        plugin_failure: void 0,
        full_speed_fps: void 0,
        auto_adjust_fps: void 0,
        client_record_status: void 0,
        capture_displays: void 0,
        refresh_video_display: void 0,
        toggle_virtual_display: void 0,
        toggle_privacy_mode: void 0,
        supported_encoding: void 0,
        selected_sid: void 0,
        change_display_resolution: void 0,
        message_query: void 0,
        follow_current_display: void 0
    }
}

const f = {
    encode(u, e = r.Writer.create()) {
        return u.chat_message !== void 0 && gu.encode(u.chat_message, e.uint32(34).fork()).ldelim(), u.switch_display !== void 0 && Mu.encode(u.switch_display, e.uint32(42).fork()).ldelim(), u.permission_info !== void 0 && T0.encode(u.permission_info, e.uint32(50).fork()).ldelim(), u.option !== void 0 && R.encode(u.option, e.uint32(58).fork()).ldelim(), u.audio_format !== void 0 && O0.encode(u.audio_format, e.uint32(66).fork()).ldelim(), u.close_reason !== void 0 && e.uint32(74).string(u.close_reason), u.refresh_video !== void 0 && e.uint32(80).bool(u.refresh_video), u.video_received !== void 0 && e.uint32(96).bool(u.video_received), u.back_notification !== void 0 && L0.encode(u.back_notification, e.uint32(106).fork()).ldelim(), u.restart_remote_device !== void 0 && e.uint32(112).bool(u.restart_remote_device), u.uac !== void 0 && e.uint32(120).bool(u.uac), u.foreground_window_elevated !== void 0 && e.uint32(128).bool(u.foreground_window_elevated), u.stop_service !== void 0 && e.uint32(136).bool(u.stop_service), u.elevation_request !== void 0 && pu.encode(u.elevation_request, e.uint32(146).fork()).ldelim(), u.elevation_response !== void 0 && e.uint32(154).string(u.elevation_response), u.portable_service_running !== void 0 && e.uint32(160).bool(u.portable_service_running), u.switch_sides_request !== void 0 && W0.encode(u.switch_sides_request, e.uint32(170).fork()).ldelim(), u.switch_back !== void 0 && q0.encode(u.switch_back, e.uint32(178).fork()).ldelim(), u.change_resolution !== void 0 && v.encode(u.change_resolution, e.uint32(194).fork()).ldelim(), u.plugin_request !== void 0 && K0.encode(u.plugin_request, e.uint32(202).fork()).ldelim(), u.plugin_failure !== void 0 && H0.encode(u.plugin_failure, e.uint32(210).fork()).ldelim(), u.full_speed_fps !== void 0 && e.uint32(216).uint32(u.full_speed_fps), u.auto_adjust_fps !== void 0 && e.uint32(224).uint32(u.auto_adjust_fps), u.client_record_status !== void 0 && e.uint32(232).bool(u.client_record_status), u.capture_displays !== void 0 && Lu.encode(u.capture_displays, e.uint32(242).fork()).ldelim(), u.refresh_video_display !== void 0 && e.uint32(248).int32(u.refresh_video_display), u.toggle_virtual_display !== void 0 && Wu.encode(u.toggle_virtual_display, e.uint32(258).fork()).ldelim(), u.toggle_privacy_mode !== void 0 && Vu.encode(u.toggle_privacy_mode, e.uint32(266).fork()).ldelim(), u.supported_encoding !== void 0 && Z.encode(u.supported_encoding, e.uint32(274).fork()).ldelim(), u.selected_sid !== void 0 && e.uint32(280).uint32(u.selected_sid), u.change_display_resolution !== void 0 && Uu.encode(u.change_display_resolution, e.uint32(290).fork()).ldelim(), u.message_query !== void 0 && G0.encode(u.message_query, e.uint32(298).fork()).ldelim(), u.follow_current_display !== void 0 && e.uint32(304).int32(u.follow_current_display), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = bi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 4:
                    if (t !== 34) break;
                    a.chat_message = gu.decode(i, i.uint32());
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.switch_display = Mu.decode(i, i.uint32());
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.permission_info = T0.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.option = R.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.audio_format = O0.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 74) break;
                    a.close_reason = i.string();
                    continue;
                case 10:
                    if (t !== 80) break;
                    a.refresh_video = i.bool();
                    continue;
                case 12:
                    if (t !== 96) break;
                    a.video_received = i.bool();
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.back_notification = L0.decode(i, i.uint32());
                    continue;
                case 14:
                    if (t !== 112) break;
                    a.restart_remote_device = i.bool();
                    continue;
                case 15:
                    if (t !== 120) break;
                    a.uac = i.bool();
                    continue;
                case 16:
                    if (t !== 128) break;
                    a.foreground_window_elevated = i.bool();
                    continue;
                case 17:
                    if (t !== 136) break;
                    a.stop_service = i.bool();
                    continue;
                case 18:
                    if (t !== 146) break;
                    a.elevation_request = pu.decode(i, i.uint32());
                    continue;
                case 19:
                    if (t !== 154) break;
                    a.elevation_response = i.string();
                    continue;
                case 20:
                    if (t !== 160) break;
                    a.portable_service_running = i.bool();
                    continue;
                case 21:
                    if (t !== 170) break;
                    a.switch_sides_request = W0.decode(i, i.uint32());
                    continue;
                case 22:
                    if (t !== 178) break;
                    a.switch_back = q0.decode(i, i.uint32());
                    continue;
                case 24:
                    if (t !== 194) break;
                    a.change_resolution = v.decode(i, i.uint32());
                    continue;
                case 25:
                    if (t !== 202) break;
                    a.plugin_request = K0.decode(i, i.uint32());
                    continue;
                case 26:
                    if (t !== 210) break;
                    a.plugin_failure = H0.decode(i, i.uint32());
                    continue;
                case 27:
                    if (t !== 216) break;
                    a.full_speed_fps = i.uint32();
                    continue;
                case 28:
                    if (t !== 224) break;
                    a.auto_adjust_fps = i.uint32();
                    continue;
                case 29:
                    if (t !== 232) break;
                    a.client_record_status = i.bool();
                    continue;
                case 30:
                    if (t !== 242) break;
                    a.capture_displays = Lu.decode(i, i.uint32());
                    continue;
                case 31:
                    if (t !== 248) break;
                    a.refresh_video_display = i.int32();
                    continue;
                case 32:
                    if (t !== 258) break;
                    a.toggle_virtual_display = Wu.decode(i, i.uint32());
                    continue;
                case 33:
                    if (t !== 266) break;
                    a.toggle_privacy_mode = Vu.decode(i, i.uint32());
                    continue;
                case 34:
                    if (t !== 274) break;
                    a.supported_encoding = Z.decode(i, i.uint32());
                    continue;
                case 35:
                    if (t !== 280) break;
                    a.selected_sid = i.uint32();
                    continue;
                case 36:
                    if (t !== 290) break;
                    a.change_display_resolution = Uu.decode(i, i.uint32());
                    continue;
                case 37:
                    if (t !== 298) break;
                    a.message_query = G0.decode(i, i.uint32());
                    continue;
                case 38:
                    if (t !== 304) break;
                    a.follow_current_display = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            chat_message: o(u.chat_message) ? gu.fromJSON(u.chat_message) : void 0,
            switch_display: o(u.switch_display) ? Mu.fromJSON(u.switch_display) : void 0,
            permission_info: o(u.permission_info) ? T0.fromJSON(u.permission_info) : void 0,
            option: o(u.option) ? R.fromJSON(u.option) : void 0,
            audio_format: o(u.audio_format) ? O0.fromJSON(u.audio_format) : void 0,
            close_reason: o(u.close_reason) ? globalThis.String(u.close_reason) : void 0,
            refresh_video: o(u.refresh_video) ? globalThis.Boolean(u.refresh_video) : void 0,
            video_received: o(u.video_received) ? globalThis.Boolean(u.video_received) : void 0,
            back_notification: o(u.back_notification) ? L0.fromJSON(u.back_notification) : void 0,
            restart_remote_device: o(u.restart_remote_device) ? globalThis.Boolean(u.restart_remote_device) : void 0,
            uac: o(u.uac) ? globalThis.Boolean(u.uac) : void 0,
            foreground_window_elevated: o(u.foreground_window_elevated) ? globalThis.Boolean(u.foreground_window_elevated) : void 0,
            stop_service: o(u.stop_service) ? globalThis.Boolean(u.stop_service) : void 0,
            elevation_request: o(u.elevation_request) ? pu.fromJSON(u.elevation_request) : void 0,
            elevation_response: o(u.elevation_response) ? globalThis.String(u.elevation_response) : void 0,
            portable_service_running: o(u.portable_service_running) ? globalThis.Boolean(u.portable_service_running) : void 0,
            switch_sides_request: o(u.switch_sides_request) ? W0.fromJSON(u.switch_sides_request) : void 0,
            switch_back: o(u.switch_back) ? q0.fromJSON(u.switch_back) : void 0,
            change_resolution: o(u.change_resolution) ? v.fromJSON(u.change_resolution) : void 0,
            plugin_request: o(u.plugin_request) ? K0.fromJSON(u.plugin_request) : void 0,
            plugin_failure: o(u.plugin_failure) ? H0.fromJSON(u.plugin_failure) : void 0,
            full_speed_fps: o(u.full_speed_fps) ? globalThis.Number(u.full_speed_fps) : void 0,
            auto_adjust_fps: o(u.auto_adjust_fps) ? globalThis.Number(u.auto_adjust_fps) : void 0,
            client_record_status: o(u.client_record_status) ? globalThis.Boolean(u.client_record_status) : void 0,
            capture_displays: o(u.capture_displays) ? Lu.fromJSON(u.capture_displays) : void 0,
            refresh_video_display: o(u.refresh_video_display) ? globalThis.Number(u.refresh_video_display) : void 0,
            toggle_virtual_display: o(u.toggle_virtual_display) ? Wu.fromJSON(u.toggle_virtual_display) : void 0,
            toggle_privacy_mode: o(u.toggle_privacy_mode) ? Vu.fromJSON(u.toggle_privacy_mode) : void 0,
            supported_encoding: o(u.supported_encoding) ? Z.fromJSON(u.supported_encoding) : void 0,
            selected_sid: o(u.selected_sid) ? globalThis.Number(u.selected_sid) : void 0,
            change_display_resolution: o(u.change_display_resolution) ? Uu.fromJSON(u.change_display_resolution) : void 0,
            message_query: o(u.message_query) ? G0.fromJSON(u.message_query) : void 0,
            follow_current_display: o(u.follow_current_display) ? globalThis.Number(u.follow_current_display) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.chat_message !== void 0 && (e.chat_message = gu.toJSON(u.chat_message)), u.switch_display !== void 0 && (e.switch_display = Mu.toJSON(u.switch_display)), u.permission_info !== void 0 && (e.permission_info = T0.toJSON(u.permission_info)), u.option !== void 0 && (e.option = R.toJSON(u.option)), u.audio_format !== void 0 && (e.audio_format = O0.toJSON(u.audio_format)), u.close_reason !== void 0 && (e.close_reason = u.close_reason), u.refresh_video !== void 0 && (e.refresh_video = u.refresh_video), u.video_received !== void 0 && (e.video_received = u.video_received), u.back_notification !== void 0 && (e.back_notification = L0.toJSON(u.back_notification)), u.restart_remote_device !== void 0 && (e.restart_remote_device = u.restart_remote_device), u.uac !== void 0 && (e.uac = u.uac), u.foreground_window_elevated !== void 0 && (e.foreground_window_elevated = u.foreground_window_elevated), u.stop_service !== void 0 && (e.stop_service = u.stop_service), u.elevation_request !== void 0 && (e.elevation_request = pu.toJSON(u.elevation_request)), u.elevation_response !== void 0 && (e.elevation_response = u.elevation_response), u.portable_service_running !== void 0 && (e.portable_service_running = u.portable_service_running), u.switch_sides_request !== void 0 && (e.switch_sides_request = W0.toJSON(u.switch_sides_request)), u.switch_back !== void 0 && (e.switch_back = q0.toJSON(u.switch_back)), u.change_resolution !== void 0 && (e.change_resolution = v.toJSON(u.change_resolution)), u.plugin_request !== void 0 && (e.plugin_request = K0.toJSON(u.plugin_request)), u.plugin_failure !== void 0 && (e.plugin_failure = H0.toJSON(u.plugin_failure)), u.full_speed_fps !== void 0 && (e.full_speed_fps = Math.round(u.full_speed_fps)), u.auto_adjust_fps !== void 0 && (e.auto_adjust_fps = Math.round(u.auto_adjust_fps)), u.client_record_status !== void 0 && (e.client_record_status = u.client_record_status), u.capture_displays !== void 0 && (e.capture_displays = Lu.toJSON(u.capture_displays)), u.refresh_video_display !== void 0 && (e.refresh_video_display = Math.round(u.refresh_video_display)), u.toggle_virtual_display !== void 0 && (e.toggle_virtual_display = Wu.toJSON(u.toggle_virtual_display)), u.toggle_privacy_mode !== void 0 && (e.toggle_privacy_mode = Vu.toJSON(u.toggle_privacy_mode)), u.supported_encoding !== void 0 && (e.supported_encoding = Z.toJSON(u.supported_encoding)), u.selected_sid !== void 0 && (e.selected_sid = Math.round(u.selected_sid)), u.change_display_resolution !== void 0 && (e.change_display_resolution = Uu.toJSON(u.change_display_resolution)), u.message_query !== void 0 && (e.message_query = G0.toJSON(u.message_query)), u.follow_current_display !== void 0 && (e.follow_current_display = Math.round(u.follow_current_display)), e
    }, create(u) {
        return f.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d, c, p, B, F, b, x, k;
        const e = bi();
        return e.chat_message = u.chat_message !== void 0 && u.chat_message !== null ? gu.fromPartial(u.chat_message) : void 0, e.switch_display = u.switch_display !== void 0 && u.switch_display !== null ? Mu.fromPartial(u.switch_display) : void 0, e.permission_info = u.permission_info !== void 0 && u.permission_info !== null ? T0.fromPartial(u.permission_info) : void 0, e.option = u.option !== void 0 && u.option !== null ? R.fromPartial(u.option) : void 0, e.audio_format = u.audio_format !== void 0 && u.audio_format !== null ? O0.fromPartial(u.audio_format) : void 0, e.close_reason = (i = u.close_reason) != null ? i : void 0, e.refresh_video = (n = u.refresh_video) != null ? n : void 0, e.video_received = (a = u.video_received) != null ? a : void 0, e.back_notification = u.back_notification !== void 0 && u.back_notification !== null ? L0.fromPartial(u.back_notification) : void 0, e.restart_remote_device = (t = u.restart_remote_device) != null ? t : void 0, e.uac = (s = u.uac) != null ? s : void 0, e.foreground_window_elevated = (E = u.foreground_window_elevated) != null ? E : void 0, e.stop_service = (l = u.stop_service) != null ? l : void 0, e.elevation_request = u.elevation_request !== void 0 && u.elevation_request !== null ? pu.fromPartial(u.elevation_request) : void 0, e.elevation_response = (d = u.elevation_response) != null ? d : void 0, e.portable_service_running = (c = u.portable_service_running) != null ? c : void 0, e.switch_sides_request = u.switch_sides_request !== void 0 && u.switch_sides_request !== null ? W0.fromPartial(u.switch_sides_request) : void 0, e.switch_back = u.switch_back !== void 0 && u.switch_back !== null ? q0.fromPartial(u.switch_back) : void 0, e.change_resolution = u.change_resolution !== void 0 && u.change_resolution !== null ? v.fromPartial(u.change_resolution) : void 0, e.plugin_request = u.plugin_request !== void 0 && u.plugin_request !== null ? K0.fromPartial(u.plugin_request) : void 0, e.plugin_failure = u.plugin_failure !== void 0 && u.plugin_failure !== null ? H0.fromPartial(u.plugin_failure) : void 0, e.full_speed_fps = (p = u.full_speed_fps) != null ? p : void 0, e.auto_adjust_fps = (B = u.auto_adjust_fps) != null ? B : void 0, e.client_record_status = (F = u.client_record_status) != null ? F : void 0, e.capture_displays = u.capture_displays !== void 0 && u.capture_displays !== null ? Lu.fromPartial(u.capture_displays) : void 0, e.refresh_video_display = (b = u.refresh_video_display) != null ? b : void 0, e.toggle_virtual_display = u.toggle_virtual_display !== void 0 && u.toggle_virtual_display !== null ? Wu.fromPartial(u.toggle_virtual_display) : void 0, e.toggle_privacy_mode = u.toggle_privacy_mode !== void 0 && u.toggle_privacy_mode !== null ? Vu.fromPartial(u.toggle_privacy_mode) : void 0, e.supported_encoding = u.supported_encoding !== void 0 && u.supported_encoding !== null ? Z.fromPartial(u.supported_encoding) : void 0, e.selected_sid = (x = u.selected_sid) != null ? x : void 0, e.change_display_resolution = u.change_display_resolution !== void 0 && u.change_display_resolution !== null ? Uu.fromPartial(u.change_display_resolution) : void 0, e.message_query = u.message_query !== void 0 && u.message_query !== null ? G0.fromPartial(u.message_query) : void 0, e.follow_current_display = (k = u.follow_current_display) != null ? k : void 0, e
    }
};

function wi() {
    return {req_timestamp: 0, is_connect: !1}
}

const Z0 = {
    encode(u, e = r.Writer.create()) {
        return u.req_timestamp !== 0 && e.uint32(8).int64(u.req_timestamp), u.is_connect !== !1 && e.uint32(16).bool(u.is_connect), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = wi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.req_timestamp = q(i.int64());
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.is_connect = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            req_timestamp: o(u.req_timestamp) ? globalThis.Number(u.req_timestamp) : 0,
            is_connect: o(u.is_connect) ? globalThis.Boolean(u.is_connect) : !1
        }
    }, toJSON(u) {
        const e = {};
        return u.req_timestamp !== 0 && (e.req_timestamp = Math.round(u.req_timestamp)), u.is_connect !== !1 && (e.is_connect = u.is_connect), e
    }, create(u) {
        return Z0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = wi();
        return e.req_timestamp = (i = u.req_timestamp) != null ? i : 0, e.is_connect = (n = u.is_connect) != null ? n : !1, e
    }
};

function Si() {
    return {accepted: !1, req_timestamp: 0, ack_timestamp: 0}
}

const Q0 = {
    encode(u, e = r.Writer.create()) {
        return u.accepted !== !1 && e.uint32(8).bool(u.accepted), u.req_timestamp !== 0 && e.uint32(16).int64(u.req_timestamp), u.ack_timestamp !== 0 && e.uint32(24).int64(u.ack_timestamp), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Si();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.accepted = i.bool();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.req_timestamp = q(i.int64());
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.ack_timestamp = q(i.int64());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            accepted: o(u.accepted) ? globalThis.Boolean(u.accepted) : !1,
            req_timestamp: o(u.req_timestamp) ? globalThis.Number(u.req_timestamp) : 0,
            ack_timestamp: o(u.ack_timestamp) ? globalThis.Number(u.ack_timestamp) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.accepted !== !1 && (e.accepted = u.accepted), u.req_timestamp !== 0 && (e.req_timestamp = Math.round(u.req_timestamp)), u.ack_timestamp !== 0 && (e.ack_timestamp = Math.round(u.ack_timestamp)), e
    }, create(u) {
        return Q0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = Si();
        return e.accepted = (i = u.accepted) != null ? i : !1, e.req_timestamp = (n = u.req_timestamp) != null ? n : 0, e.ack_timestamp = (a = u.ack_timestamp) != null ? a : 0, e
    }
};

function zi() {
    return {display: 0, sid: ""}
}

const X0 = {
    encode(u, e = r.Writer.create()) {
        return u.display !== 0 && e.uint32(8).int32(u.display), u.sid !== "" && e.uint32(18).string(u.sid), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = zi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.display = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.sid = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {display: o(u.display) ? globalThis.Number(u.display) : 0, sid: o(u.sid) ? globalThis.String(u.sid) : ""}
    }, toJSON(u) {
        const e = {};
        return u.display !== 0 && (e.display = Math.round(u.display)), u.sid !== "" && (e.sid = u.sid), e
    }, create(u) {
        return X0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = zi();
        return e.display = (i = u.display) != null ? i : 0, e.sid = (n = u.sid) != null ? n : "", e
    }
};

function Pi() {
    return {sid: "", msg: "", data: new Uint8Array(0)}
}

const Y0 = {
    encode(u, e = r.Writer.create()) {
        return u.sid !== "" && e.uint32(10).string(u.sid), u.msg !== "" && e.uint32(18).string(u.msg), u.data.length !== 0 && e.uint32(26).bytes(u.data), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Pi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.sid = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.msg = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.data = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            sid: o(u.sid) ? globalThis.String(u.sid) : "",
            msg: o(u.msg) ? globalThis.String(u.msg) : "",
            data: o(u.data) ? z(u.data) : new Uint8Array(0)
        }
    }, toJSON(u) {
        const e = {};
        return u.sid !== "" && (e.sid = u.sid), u.msg !== "" && (e.msg = u.msg), u.data.length !== 0 && (e.data = P(u.data)), e
    }, create(u) {
        return Y0.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = Pi();
        return e.sid = (i = u.sid) != null ? i : "", e.msg = (n = u.msg) != null ? n : "", e.data = (a = u.data) != null ? a : new Uint8Array(0), e
    }
};

function Ri() {
    return {
        signed_id: void 0,
        public_key: void 0,
        test_delay: void 0,
        video_frame: void 0,
        login_request: void 0,
        login_response: void 0,
        hash: void 0,
        mouse_event: void 0,
        audio_frame: void 0,
        cursor_data: void 0,
        cursor_position: void 0,
        cursor_id: void 0,
        key_event: void 0,
        clipboard: void 0,
        file_action: void 0,
        file_response: void 0,
        misc: void 0,
        cliprdr: void 0,
        message_box: void 0,
        switch_sides_response: void 0,
        voice_call_request: void 0,
        voice_call_response: void 0,
        peer_info: void 0,
        pointer_device_event: void 0,
        auth_2fa: void 0,
        multi_clipboards: void 0,
        screenshot_request: void 0,
        screenshot_response: void 0
    }
}

const au = {
    encode(u, e = r.Writer.create()) {
        return u.signed_id !== void 0 && N0.encode(u.signed_id, e.uint32(26).fork()).ldelim(), u.public_key !== void 0 && H.encode(u.public_key, e.uint32(34).fork()).ldelim(), u.test_delay !== void 0 && j0.encode(u.test_delay, e.uint32(42).fork()).ldelim(), u.video_frame !== void 0 && s0.encode(u.video_frame, e.uint32(50).fork()).ldelim(), u.login_request !== void 0 && J.encode(u.login_request, e.uint32(58).fork()).ldelim(), u.login_response !== void 0 && C0.encode(u.login_response, e.uint32(66).fork()).ldelim(), u.hash !== void 0 && k0.encode(u.hash, e.uint32(74).fork()).ldelim(), u.mouse_event !== void 0 && ku.encode(u.mouse_event, e.uint32(82).fork()).ldelim(), u.audio_frame !== void 0 && U0.encode(u.audio_frame, e.uint32(90).fork()).ldelim(), u.cursor_data !== void 0 && v0.encode(u.cursor_data, e.uint32(98).fork()).ldelim(), u.cursor_position !== void 0 && g0.encode(u.cursor_position, e.uint32(106).fork()).ldelim(), u.cursor_id !== void 0 && e.uint32(112).uint64(u.cursor_id), u.key_event !== void 0 && S.encode(u.key_event, e.uint32(122).fork()).ldelim(), u.clipboard !== void 0 && W.encode(u.clipboard, e.uint32(130).fork()).ldelim(), u.file_action !== void 0 && I.encode(u.file_action, e.uint32(138).fork()).ldelim(), u.file_response !== void 0 && ou.encode(u.file_response, e.uint32(146).fork()).ldelim(), u.misc !== void 0 && f.encode(u.misc, e.uint32(154).fork()).ldelim(), u.cliprdr !== void 0 && I0.encode(u.cliprdr, e.uint32(162).fork()).ldelim(), u.message_box !== void 0 && M0.encode(u.message_box, e.uint32(170).fork()).ldelim(), u.switch_sides_response !== void 0 && V0.encode(u.switch_sides_response, e.uint32(178).fork()).ldelim(), u.voice_call_request !== void 0 && Z0.encode(u.voice_call_request, e.uint32(186).fork()).ldelim(), u.voice_call_response !== void 0 && Q0.encode(u.voice_call_response, e.uint32(194).fork()).ldelim(), u.peer_info !== void 0 && uu.encode(u.peer_info, e.uint32(202).fork()).ldelim(), u.pointer_device_event !== void 0 && _0.encode(u.pointer_device_event, e.uint32(210).fork()).ldelim(), u.auth_2fa !== void 0 && vu.encode(u.auth_2fa, e.uint32(218).fork()).ldelim(), u.multi_clipboards !== void 0 && hu.encode(u.multi_clipboards, e.uint32(226).fork()).ldelim(), u.screenshot_request !== void 0 && X0.encode(u.screenshot_request, e.uint32(234).fork()).ldelim(), u.screenshot_response !== void 0 && Y0.encode(u.screenshot_response, e.uint32(242).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ri();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 3:
                    if (t !== 26) break;
                    a.signed_id = N0.decode(i, i.uint32());
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.public_key = H.decode(i, i.uint32());
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.test_delay = j0.decode(i, i.uint32());
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.video_frame = s0.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.login_request = J.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.login_response = C0.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 74) break;
                    a.hash = k0.decode(i, i.uint32());
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.mouse_event = ku.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.audio_frame = U0.decode(i, i.uint32());
                    continue;
                case 12:
                    if (t !== 98) break;
                    a.cursor_data = v0.decode(i, i.uint32());
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.cursor_position = g0.decode(i, i.uint32());
                    continue;
                case 14:
                    if (t !== 112) break;
                    a.cursor_id = q(i.uint64());
                    continue;
                case 15:
                    if (t !== 122) break;
                    a.key_event = S.decode(i, i.uint32());
                    continue;
                case 16:
                    if (t !== 130) break;
                    a.clipboard = W.decode(i, i.uint32());
                    continue;
                case 17:
                    if (t !== 138) break;
                    a.file_action = I.decode(i, i.uint32());
                    continue;
                case 18:
                    if (t !== 146) break;
                    a.file_response = ou.decode(i, i.uint32());
                    continue;
                case 19:
                    if (t !== 154) break;
                    a.misc = f.decode(i, i.uint32());
                    continue;
                case 20:
                    if (t !== 162) break;
                    a.cliprdr = I0.decode(i, i.uint32());
                    continue;
                case 21:
                    if (t !== 170) break;
                    a.message_box = M0.decode(i, i.uint32());
                    continue;
                case 22:
                    if (t !== 178) break;
                    a.switch_sides_response = V0.decode(i, i.uint32());
                    continue;
                case 23:
                    if (t !== 186) break;
                    a.voice_call_request = Z0.decode(i, i.uint32());
                    continue;
                case 24:
                    if (t !== 194) break;
                    a.voice_call_response = Q0.decode(i, i.uint32());
                    continue;
                case 25:
                    if (t !== 202) break;
                    a.peer_info = uu.decode(i, i.uint32());
                    continue;
                case 26:
                    if (t !== 210) break;
                    a.pointer_device_event = _0.decode(i, i.uint32());
                    continue;
                case 27:
                    if (t !== 218) break;
                    a.auth_2fa = vu.decode(i, i.uint32());
                    continue;
                case 28:
                    if (t !== 226) break;
                    a.multi_clipboards = hu.decode(i, i.uint32());
                    continue;
                case 29:
                    if (t !== 234) break;
                    a.screenshot_request = X0.decode(i, i.uint32());
                    continue;
                case 30:
                    if (t !== 242) break;
                    a.screenshot_response = Y0.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            signed_id: o(u.signed_id) ? N0.fromJSON(u.signed_id) : void 0,
            public_key: o(u.public_key) ? H.fromJSON(u.public_key) : void 0,
            test_delay: o(u.test_delay) ? j0.fromJSON(u.test_delay) : void 0,
            video_frame: o(u.video_frame) ? s0.fromJSON(u.video_frame) : void 0,
            login_request: o(u.login_request) ? J.fromJSON(u.login_request) : void 0,
            login_response: o(u.login_response) ? C0.fromJSON(u.login_response) : void 0,
            hash: o(u.hash) ? k0.fromJSON(u.hash) : void 0,
            mouse_event: o(u.mouse_event) ? ku.fromJSON(u.mouse_event) : void 0,
            audio_frame: o(u.audio_frame) ? U0.fromJSON(u.audio_frame) : void 0,
            cursor_data: o(u.cursor_data) ? v0.fromJSON(u.cursor_data) : void 0,
            cursor_position: o(u.cursor_position) ? g0.fromJSON(u.cursor_position) : void 0,
            cursor_id: o(u.cursor_id) ? globalThis.Number(u.cursor_id) : void 0,
            key_event: o(u.key_event) ? S.fromJSON(u.key_event) : void 0,
            clipboard: o(u.clipboard) ? W.fromJSON(u.clipboard) : void 0,
            file_action: o(u.file_action) ? I.fromJSON(u.file_action) : void 0,
            file_response: o(u.file_response) ? ou.fromJSON(u.file_response) : void 0,
            misc: o(u.misc) ? f.fromJSON(u.misc) : void 0,
            cliprdr: o(u.cliprdr) ? I0.fromJSON(u.cliprdr) : void 0,
            message_box: o(u.message_box) ? M0.fromJSON(u.message_box) : void 0,
            switch_sides_response: o(u.switch_sides_response) ? V0.fromJSON(u.switch_sides_response) : void 0,
            voice_call_request: o(u.voice_call_request) ? Z0.fromJSON(u.voice_call_request) : void 0,
            voice_call_response: o(u.voice_call_response) ? Q0.fromJSON(u.voice_call_response) : void 0,
            peer_info: o(u.peer_info) ? uu.fromJSON(u.peer_info) : void 0,
            pointer_device_event: o(u.pointer_device_event) ? _0.fromJSON(u.pointer_device_event) : void 0,
            auth_2fa: o(u.auth_2fa) ? vu.fromJSON(u.auth_2fa) : void 0,
            multi_clipboards: o(u.multi_clipboards) ? hu.fromJSON(u.multi_clipboards) : void 0,
            screenshot_request: o(u.screenshot_request) ? X0.fromJSON(u.screenshot_request) : void 0,
            screenshot_response: o(u.screenshot_response) ? Y0.fromJSON(u.screenshot_response) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.signed_id !== void 0 && (e.signed_id = N0.toJSON(u.signed_id)), u.public_key !== void 0 && (e.public_key = H.toJSON(u.public_key)), u.test_delay !== void 0 && (e.test_delay = j0.toJSON(u.test_delay)), u.video_frame !== void 0 && (e.video_frame = s0.toJSON(u.video_frame)), u.login_request !== void 0 && (e.login_request = J.toJSON(u.login_request)), u.login_response !== void 0 && (e.login_response = C0.toJSON(u.login_response)), u.hash !== void 0 && (e.hash = k0.toJSON(u.hash)), u.mouse_event !== void 0 && (e.mouse_event = ku.toJSON(u.mouse_event)), u.audio_frame !== void 0 && (e.audio_frame = U0.toJSON(u.audio_frame)), u.cursor_data !== void 0 && (e.cursor_data = v0.toJSON(u.cursor_data)), u.cursor_position !== void 0 && (e.cursor_position = g0.toJSON(u.cursor_position)), u.cursor_id !== void 0 && (e.cursor_id = Math.round(u.cursor_id)), u.key_event !== void 0 && (e.key_event = S.toJSON(u.key_event)), u.clipboard !== void 0 && (e.clipboard = W.toJSON(u.clipboard)), u.file_action !== void 0 && (e.file_action = I.toJSON(u.file_action)), u.file_response !== void 0 && (e.file_response = ou.toJSON(u.file_response)), u.misc !== void 0 && (e.misc = f.toJSON(u.misc)), u.cliprdr !== void 0 && (e.cliprdr = I0.toJSON(u.cliprdr)), u.message_box !== void 0 && (e.message_box = M0.toJSON(u.message_box)), u.switch_sides_response !== void 0 && (e.switch_sides_response = V0.toJSON(u.switch_sides_response)), u.voice_call_request !== void 0 && (e.voice_call_request = Z0.toJSON(u.voice_call_request)), u.voice_call_response !== void 0 && (e.voice_call_response = Q0.toJSON(u.voice_call_response)), u.peer_info !== void 0 && (e.peer_info = uu.toJSON(u.peer_info)), u.pointer_device_event !== void 0 && (e.pointer_device_event = _0.toJSON(u.pointer_device_event)), u.auth_2fa !== void 0 && (e.auth_2fa = vu.toJSON(u.auth_2fa)), u.multi_clipboards !== void 0 && (e.multi_clipboards = hu.toJSON(u.multi_clipboards)), u.screenshot_request !== void 0 && (e.screenshot_request = X0.toJSON(u.screenshot_request)), u.screenshot_response !== void 0 && (e.screenshot_response = Y0.toJSON(u.screenshot_response)), e
    }, create(u) {
        return au.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Ri();
        return e.signed_id = u.signed_id !== void 0 && u.signed_id !== null ? N0.fromPartial(u.signed_id) : void 0, e.public_key = u.public_key !== void 0 && u.public_key !== null ? H.fromPartial(u.public_key) : void 0, e.test_delay = u.test_delay !== void 0 && u.test_delay !== null ? j0.fromPartial(u.test_delay) : void 0, e.video_frame = u.video_frame !== void 0 && u.video_frame !== null ? s0.fromPartial(u.video_frame) : void 0, e.login_request = u.login_request !== void 0 && u.login_request !== null ? J.fromPartial(u.login_request) : void 0, e.login_response = u.login_response !== void 0 && u.login_response !== null ? C0.fromPartial(u.login_response) : void 0, e.hash = u.hash !== void 0 && u.hash !== null ? k0.fromPartial(u.hash) : void 0, e.mouse_event = u.mouse_event !== void 0 && u.mouse_event !== null ? ku.fromPartial(u.mouse_event) : void 0, e.audio_frame = u.audio_frame !== void 0 && u.audio_frame !== null ? U0.fromPartial(u.audio_frame) : void 0, e.cursor_data = u.cursor_data !== void 0 && u.cursor_data !== null ? v0.fromPartial(u.cursor_data) : void 0, e.cursor_position = u.cursor_position !== void 0 && u.cursor_position !== null ? g0.fromPartial(u.cursor_position) : void 0, e.cursor_id = (i = u.cursor_id) != null ? i : void 0, e.key_event = u.key_event !== void 0 && u.key_event !== null ? S.fromPartial(u.key_event) : void 0, e.clipboard = u.clipboard !== void 0 && u.clipboard !== null ? W.fromPartial(u.clipboard) : void 0, e.file_action = u.file_action !== void 0 && u.file_action !== null ? I.fromPartial(u.file_action) : void 0, e.file_response = u.file_response !== void 0 && u.file_response !== null ? ou.fromPartial(u.file_response) : void 0, e.misc = u.misc !== void 0 && u.misc !== null ? f.fromPartial(u.misc) : void 0, e.cliprdr = u.cliprdr !== void 0 && u.cliprdr !== null ? I0.fromPartial(u.cliprdr) : void 0, e.message_box = u.message_box !== void 0 && u.message_box !== null ? M0.fromPartial(u.message_box) : void 0, e.switch_sides_response = u.switch_sides_response !== void 0 && u.switch_sides_response !== null ? V0.fromPartial(u.switch_sides_response) : void 0, e.voice_call_request = u.voice_call_request !== void 0 && u.voice_call_request !== null ? Z0.fromPartial(u.voice_call_request) : void 0, e.voice_call_response = u.voice_call_response !== void 0 && u.voice_call_response !== null ? Q0.fromPartial(u.voice_call_response) : void 0, e.peer_info = u.peer_info !== void 0 && u.peer_info !== null ? uu.fromPartial(u.peer_info) : void 0, e.pointer_device_event = u.pointer_device_event !== void 0 && u.pointer_device_event !== null ? _0.fromPartial(u.pointer_device_event) : void 0, e.auth_2fa = u.auth_2fa !== void 0 && u.auth_2fa !== null ? vu.fromPartial(u.auth_2fa) : void 0, e.multi_clipboards = u.multi_clipboards !== void 0 && u.multi_clipboards !== null ? hu.fromPartial(u.multi_clipboards) : void 0, e.screenshot_request = u.screenshot_request !== void 0 && u.screenshot_request !== null ? X0.fromPartial(u.screenshot_request) : void 0, e.screenshot_response = u.screenshot_response !== void 0 && u.screenshot_response !== null ? Y0.fromPartial(u.screenshot_response) : void 0, e
    }
};

function z(u) {
    if (globalThis.Buffer) return Uint8Array.from(globalThis.Buffer.from(u, "base64"));
    {
        const e = globalThis.atob(u), i = new Uint8Array(e.length);
        for (let n = 0; n < e.length; ++n) i[n] = e.charCodeAt(n);
        return i
    }
}

function P(u) {
    if (globalThis.Buffer) return globalThis.Buffer.from(u).toString("base64");
    {
        const e = [];
        return u.forEach(i => {
            e.push(globalThis.String.fromCharCode(i))
        }), globalThis.btoa(e.join(""))
    }
}

function q(u) {
    if (u.gt(globalThis.Number.MAX_SAFE_INTEGER)) throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
    if (u.lt(globalThis.Number.MIN_SAFE_INTEGER)) throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
    return u.toNumber()
}

r.util.Long !== K4 && (r.util.Long = K4, r.configure());

function o(u) {
    return u != null
}

var je = (u => (u[u.DEFAULT_CONN = 0] = "DEFAULT_CONN", u[u.FILE_TRANSFER = 1] = "FILE_TRANSFER", u[u.PORT_FORWARD = 2] = "PORT_FORWARD", u[u.RDP = 3] = "RDP", u[u.VIEW_CAMERA = 4] = "VIEW_CAMERA", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(je || {});

function xt(u) {
    switch (u) {
        case 0:
        case"DEFAULT_CONN":
            return 0;
        case 1:
        case"FILE_TRANSFER":
            return 1;
        case 2:
        case"PORT_FORWARD":
            return 2;
        case 3:
        case"RDP":
            return 3;
        case 4:
        case"VIEW_CAMERA":
            return 4;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function yt(u) {
    switch (u) {
        case 0:
            return "DEFAULT_CONN";
        case 1:
            return "FILE_TRANSFER";
        case 2:
            return "PORT_FORWARD";
        case 3:
            return "RDP";
        case 4:
            return "VIEW_CAMERA";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var bt = (u => (u[u.UNKNOWN_NAT = 0] = "UNKNOWN_NAT", u[u.ASYMMETRIC = 1] = "ASYMMETRIC", u[u.SYMMETRIC = 2] = "SYMMETRIC", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))(bt || {});

function i4(u) {
    switch (u) {
        case 0:
        case"UNKNOWN_NAT":
            return 0;
        case 1:
        case"ASYMMETRIC":
            return 1;
        case 2:
        case"SYMMETRIC":
            return 2;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function t4(u) {
    switch (u) {
        case 0:
            return "UNKNOWN_NAT";
        case 1:
            return "ASYMMETRIC";
        case 2:
            return "SYMMETRIC";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

function Ha(u) {
    switch (u) {
        case 0:
        case"OK":
            return 0;
        case 2:
        case"UUID_MISMATCH":
            return 2;
        case 3:
        case"ID_EXISTS":
            return 3;
        case 4:
        case"TOO_FREQUENT":
            return 4;
        case 5:
        case"INVALID_ID_FORMAT":
            return 5;
        case 6:
        case"NOT_SUPPORT":
            return 6;
        case 7:
        case"SERVER_ERROR":
            return 7;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Ja(u) {
    switch (u) {
        case 0:
            return "OK";
        case 2:
            return "UUID_MISMATCH";
        case 3:
            return "ID_EXISTS";
        case 4:
            return "TOO_FREQUENT";
        case 5:
            return "INVALID_ID_FORMAT";
        case 6:
            return "NOT_SUPPORT";
        case 7:
            return "SERVER_ERROR";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

var $0 = (u => (u[u.ID_NOT_EXIST = 0] = "ID_NOT_EXIST", u[u.OFFLINE = 2] = "OFFLINE", u[u.LICENSE_MISMATCH = 3] = "LICENSE_MISMATCH", u[u.LICENSE_OVERUSE = 4] = "LICENSE_OVERUSE", u[u.UNRECOGNIZED = -1] = "UNRECOGNIZED", u))($0 || {});

function Ga(u) {
    switch (u) {
        case 0:
        case"ID_NOT_EXIST":
            return 0;
        case 2:
        case"OFFLINE":
            return 2;
        case 3:
        case"LICENSE_MISMATCH":
            return 3;
        case 4:
        case"LICENSE_OVERUSE":
            return 4;
        case-1:
        case"UNRECOGNIZED":
        default:
            return -1
    }
}

function Za(u) {
    switch (u) {
        case 0:
            return "ID_NOT_EXIST";
        case 2:
            return "OFFLINE";
        case 3:
            return "LICENSE_MISMATCH";
        case 4:
            return "LICENSE_OVERUSE";
        case-1:
        default:
            return "UNRECOGNIZED"
    }
}

function Ii() {
    return {id: "", serial: 0}
}

const ue = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.serial !== 0 && e.uint32(16).int32(u.serial), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ii();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.serial = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {id: C(u.id) ? globalThis.String(u.id) : "", serial: C(u.serial) ? globalThis.Number(u.serial) : 0}
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.serial !== 0 && (e.serial = Math.round(u.serial)), e
    }, create(u) {
        return ue.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Ii();
        return e.id = (i = u.id) != null ? i : "", e.serial = (n = u.serial) != null ? n : 0, e
    }
};

function Ti() {
    return {request_pk: !1}
}

const ee = {
    encode(u, e = r.Writer.create()) {
        return u.request_pk !== !1 && e.uint32(16).bool(u.request_pk), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ti();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 2:
                    if (t !== 16) break;
                    a.request_pk = i.bool();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {request_pk: C(u.request_pk) ? globalThis.Boolean(u.request_pk) : !1}
    }, toJSON(u) {
        const e = {};
        return u.request_pk !== !1 && (e.request_pk = u.request_pk), e
    }, create(u) {
        return ee.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Ti();
        return e.request_pk = (i = u.request_pk) != null ? i : !1, e
    }
};

function ji() {
    return {id: "", nat_type: 0, licence_key: "", conn_type: 0, token: "", version: ""}
}

const Hu = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.nat_type !== 0 && e.uint32(16).int32(u.nat_type), u.licence_key !== "" && e.uint32(26).string(u.licence_key), u.conn_type !== 0 && e.uint32(32).int32(u.conn_type), u.token !== "" && e.uint32(42).string(u.token), u.version !== "" && e.uint32(50).string(u.version), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ji();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.nat_type = i.int32();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.licence_key = i.string();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.conn_type = i.int32();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.token = i.string();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.version = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: C(u.id) ? globalThis.String(u.id) : "",
            nat_type: C(u.nat_type) ? i4(u.nat_type) : 0,
            licence_key: C(u.licence_key) ? globalThis.String(u.licence_key) : "",
            conn_type: C(u.conn_type) ? xt(u.conn_type) : 0,
            token: C(u.token) ? globalThis.String(u.token) : "",
            version: C(u.version) ? globalThis.String(u.version) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.nat_type !== 0 && (e.nat_type = t4(u.nat_type)), u.licence_key !== "" && (e.licence_key = u.licence_key), u.conn_type !== 0 && (e.conn_type = yt(u.conn_type)), u.token !== "" && (e.token = u.token), u.version !== "" && (e.version = u.version), e
    }, create(u) {
        return Hu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E;
        const e = ji();
        return e.id = (i = u.id) != null ? i : "", e.nat_type = (n = u.nat_type) != null ? n : 0, e.licence_key = (a = u.licence_key) != null ? a : "", e.conn_type = (t = u.conn_type) != null ? t : 0, e.token = (s = u.token) != null ? s : "", e.version = (E = u.version) != null ? E : "", e
    }
};

function Ni() {
    return {socket_addr: new Uint8Array(0), relay_server: "", nat_type: 0}
}

const ie = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.relay_server !== "" && e.uint32(18).string(u.relay_server), u.nat_type !== 0 && e.uint32(24).int32(u.nat_type), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ni();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.relay_server = i.string();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.nat_type = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            nat_type: C(u.nat_type) ? i4(u.nat_type) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.relay_server !== "" && (e.relay_server = u.relay_server), u.nat_type !== 0 && (e.nat_type = t4(u.nat_type)), e
    }, create(u) {
        return ie.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a;
        const e = Ni();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.relay_server = (n = u.relay_server) != null ? n : "", e.nat_type = (a = u.nat_type) != null ? a : 0, e
    }
};

function Oi() {
    return {serial: 0}
}

const te = {
    encode(u, e = r.Writer.create()) {
        return u.serial !== 0 && e.uint32(8).int32(u.serial), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Oi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.serial = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {serial: C(u.serial) ? globalThis.Number(u.serial) : 0}
    }, toJSON(u) {
        const e = {};
        return u.serial !== 0 && (e.serial = Math.round(u.serial)), e
    }, create(u) {
        return te.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Oi();
        return e.serial = (i = u.serial) != null ? i : 0, e
    }
};

function Ui() {
    return {port: 0, cu: void 0}
}

const ae = {
    encode(u, e = r.Writer.create()) {
        return u.port !== 0 && e.uint32(8).int32(u.port), u.cu !== void 0 && tu.encode(u.cu, e.uint32(18).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ui();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.port = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.cu = tu.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {port: C(u.port) ? globalThis.Number(u.port) : 0, cu: C(u.cu) ? tu.fromJSON(u.cu) : void 0}
    }, toJSON(u) {
        const e = {};
        return u.port !== 0 && (e.port = Math.round(u.port)), u.cu !== void 0 && (e.cu = tu.toJSON(u.cu)), e
    }, create(u) {
        return ae.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Ui();
        return e.port = (i = u.port) != null ? i : 0, e.cu = u.cu !== void 0 && u.cu !== null ? tu.fromPartial(u.cu) : void 0, e
    }
};

function Mi() {
    return {socket_addr: new Uint8Array(0), id: "", relay_server: "", nat_type: 0, version: ""}
}

const ne = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.id !== "" && e.uint32(18).string(u.id), u.relay_server !== "" && e.uint32(26).string(u.relay_server), u.nat_type !== 0 && e.uint32(32).int32(u.nat_type), u.version !== "" && e.uint32(42).string(u.version), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Mi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.id = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.relay_server = i.string();
                    continue;
                case 4:
                    if (t !== 32) break;
                    a.nat_type = i.int32();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.version = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            id: C(u.id) ? globalThis.String(u.id) : "",
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            nat_type: C(u.nat_type) ? i4(u.nat_type) : 0,
            version: C(u.version) ? globalThis.String(u.version) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.id !== "" && (e.id = u.id), u.relay_server !== "" && (e.relay_server = u.relay_server), u.nat_type !== 0 && (e.nat_type = t4(u.nat_type)), u.version !== "" && (e.version = u.version), e
    }, create(u) {
        return ne.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = Mi();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.id = (n = u.id) != null ? n : "", e.relay_server = (a = u.relay_server) != null ? a : "", e.nat_type = (t = u.nat_type) != null ? t : 0, e.version = (s = u.version) != null ? s : "", e
    }
};

function Li() {
    return {id: "", uuid: new Uint8Array(0), pk: new Uint8Array(0), old_id: ""}
}

const oe = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.uuid.length !== 0 && e.uint32(18).bytes(u.uuid), u.pk.length !== 0 && e.uint32(26).bytes(u.pk), u.old_id !== "" && e.uint32(34).string(u.old_id), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Li();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.uuid = i.bytes();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.pk = i.bytes();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.old_id = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: C(u.id) ? globalThis.String(u.id) : "",
            uuid: C(u.uuid) ? O(u.uuid) : new Uint8Array(0),
            pk: C(u.pk) ? O(u.pk) : new Uint8Array(0),
            old_id: C(u.old_id) ? globalThis.String(u.old_id) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.uuid.length !== 0 && (e.uuid = U(u.uuid)), u.pk.length !== 0 && (e.pk = U(u.pk)), u.old_id !== "" && (e.old_id = u.old_id), e
    }, create(u) {
        return oe.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t;
        const e = Li();
        return e.id = (i = u.id) != null ? i : "", e.uuid = (n = u.uuid) != null ? n : new Uint8Array(0), e.pk = (a = u.pk) != null ? a : new Uint8Array(0), e.old_id = (t = u.old_id) != null ? t : "", e
    }
};

function Wi() {
    return {result: 0, keep_alive: 0}
}

const re = {
    encode(u, e = r.Writer.create()) {
        return u.result !== 0 && e.uint32(8).int32(u.result), u.keep_alive !== 0 && e.uint32(16).int32(u.keep_alive), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Wi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.result = i.int32();
                    continue;
                case 2:
                    if (t !== 16) break;
                    a.keep_alive = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            result: C(u.result) ? Ha(u.result) : 0,
            keep_alive: C(u.keep_alive) ? globalThis.Number(u.keep_alive) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.result !== 0 && (e.result = Ja(u.result)), u.keep_alive !== 0 && (e.keep_alive = Math.round(u.keep_alive)), e
    }, create(u) {
        return re.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Wi();
        return e.result = (i = u.result) != null ? i : 0, e.keep_alive = (n = u.keep_alive) != null ? n : 0, e
    }
};

function Vi() {
    return {
        socket_addr: new Uint8Array(0),
        pk: new Uint8Array(0),
        failure: 0,
        relay_server: "",
        nat_type: void 0,
        is_local: void 0,
        other_failure: "",
        feedback: 0
    }
}

const se = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.pk.length !== 0 && e.uint32(18).bytes(u.pk), u.failure !== 0 && e.uint32(24).int32(u.failure), u.relay_server !== "" && e.uint32(34).string(u.relay_server), u.nat_type !== void 0 && e.uint32(40).int32(u.nat_type), u.is_local !== void 0 && e.uint32(48).bool(u.is_local), u.other_failure !== "" && e.uint32(58).string(u.other_failure), u.feedback !== 0 && e.uint32(64).int32(u.feedback), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Vi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.pk = i.bytes();
                    continue;
                case 3:
                    if (t !== 24) break;
                    a.failure = i.int32();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.relay_server = i.string();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.nat_type = i.int32();
                    continue;
                case 6:
                    if (t !== 48) break;
                    a.is_local = i.bool();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.other_failure = i.string();
                    continue;
                case 8:
                    if (t !== 64) break;
                    a.feedback = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            pk: C(u.pk) ? O(u.pk) : new Uint8Array(0),
            failure: C(u.failure) ? Ga(u.failure) : 0,
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            nat_type: C(u.nat_type) ? i4(u.nat_type) : void 0,
            is_local: C(u.is_local) ? globalThis.Boolean(u.is_local) : void 0,
            other_failure: C(u.other_failure) ? globalThis.String(u.other_failure) : "",
            feedback: C(u.feedback) ? globalThis.Number(u.feedback) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.pk.length !== 0 && (e.pk = U(u.pk)), u.failure !== 0 && (e.failure = Za(u.failure)), u.relay_server !== "" && (e.relay_server = u.relay_server), u.nat_type !== void 0 && (e.nat_type = t4(u.nat_type)), u.is_local !== void 0 && (e.is_local = u.is_local), u.other_failure !== "" && (e.other_failure = u.other_failure), u.feedback !== 0 && (e.feedback = Math.round(u.feedback)), e
    }, create(u) {
        return se.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = Vi();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.pk = (n = u.pk) != null ? n : new Uint8Array(0), e.failure = (a = u.failure) != null ? a : 0, e.relay_server = (t = u.relay_server) != null ? t : "", e.nat_type = (s = u.nat_type) != null ? s : void 0, e.is_local = (E = u.is_local) != null ? E : void 0, e.other_failure = (l = u.other_failure) != null ? l : "", e.feedback = (d = u.feedback) != null ? d : 0, e
    }
};

function qi() {
    return {serial: 0, rendezvous_servers: []}
}

const tu = {
    encode(u, e = r.Writer.create()) {
        u.serial !== 0 && e.uint32(8).int32(u.serial);
        for (const i of u.rendezvous_servers) e.uint32(18).string(i);
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = qi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 8) break;
                    a.serial = i.int32();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.rendezvous_servers.push(i.string());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            serial: C(u.serial) ? globalThis.Number(u.serial) : 0,
            rendezvous_servers: globalThis.Array.isArray(u == null ? void 0 : u.rendezvous_servers) ? u.rendezvous_servers.map(e => globalThis.String(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.serial !== 0 && (e.serial = Math.round(u.serial)), (i = u.rendezvous_servers) != null && i.length && (e.rendezvous_servers = u.rendezvous_servers), e
    }, create(u) {
        return tu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = qi();
        return e.serial = (i = u.serial) != null ? i : 0, e.rendezvous_servers = ((n = u.rendezvous_servers) == null ? void 0 : n.map(a => a)) || [], e
    }
};

function Ki() {
    return {
        id: "",
        uuid: "",
        socket_addr: new Uint8Array(0),
        relay_server: "",
        secure: !1,
        licence_key: "",
        conn_type: 0,
        token: ""
    }
}

const Ju = {
    encode(u, e = r.Writer.create()) {
        return u.id !== "" && e.uint32(10).string(u.id), u.uuid !== "" && e.uint32(18).string(u.uuid), u.socket_addr.length !== 0 && e.uint32(26).bytes(u.socket_addr), u.relay_server !== "" && e.uint32(34).string(u.relay_server), u.secure !== !1 && e.uint32(40).bool(u.secure), u.licence_key !== "" && e.uint32(50).string(u.licence_key), u.conn_type !== 0 && e.uint32(56).int32(u.conn_type), u.token !== "" && e.uint32(66).string(u.token), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ki();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.uuid = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.relay_server = i.string();
                    continue;
                case 5:
                    if (t !== 40) break;
                    a.secure = i.bool();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.licence_key = i.string();
                    continue;
                case 7:
                    if (t !== 56) break;
                    a.conn_type = i.int32();
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.token = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: C(u.id) ? globalThis.String(u.id) : "",
            uuid: C(u.uuid) ? globalThis.String(u.uuid) : "",
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            secure: C(u.secure) ? globalThis.Boolean(u.secure) : !1,
            licence_key: C(u.licence_key) ? globalThis.String(u.licence_key) : "",
            conn_type: C(u.conn_type) ? xt(u.conn_type) : 0,
            token: C(u.token) ? globalThis.String(u.token) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.id !== "" && (e.id = u.id), u.uuid !== "" && (e.uuid = u.uuid), u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.relay_server !== "" && (e.relay_server = u.relay_server), u.secure !== !1 && (e.secure = u.secure), u.licence_key !== "" && (e.licence_key = u.licence_key), u.conn_type !== 0 && (e.conn_type = yt(u.conn_type)), u.token !== "" && (e.token = u.token), e
    }, create(u) {
        return Ju.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = Ki();
        return e.id = (i = u.id) != null ? i : "", e.uuid = (n = u.uuid) != null ? n : "", e.socket_addr = (a = u.socket_addr) != null ? a : new Uint8Array(0), e.relay_server = (t = u.relay_server) != null ? t : "", e.secure = (s = u.secure) != null ? s : !1, e.licence_key = (E = u.licence_key) != null ? E : "", e.conn_type = (l = u.conn_type) != null ? l : 0, e.token = (d = u.token) != null ? d : "", e
    }
};

function Hi() {
    return {
        socket_addr: new Uint8Array(0),
        uuid: "",
        relay_server: "",
        id: void 0,
        pk: void 0,
        refuse_reason: "",
        version: "",
        feedback: 0
    }
}

const Ee = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.uuid !== "" && e.uint32(18).string(u.uuid), u.relay_server !== "" && e.uint32(26).string(u.relay_server), u.id !== void 0 && e.uint32(34).string(u.id), u.pk !== void 0 && e.uint32(42).bytes(u.pk), u.refuse_reason !== "" && e.uint32(50).string(u.refuse_reason), u.version !== "" && e.uint32(58).string(u.version), u.feedback !== 0 && e.uint32(72).int32(u.feedback), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Hi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.uuid = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.relay_server = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.id = i.string();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.pk = i.bytes();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.refuse_reason = i.string();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.version = i.string();
                    continue;
                case 9:
                    if (t !== 72) break;
                    a.feedback = i.int32();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            uuid: C(u.uuid) ? globalThis.String(u.uuid) : "",
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            id: C(u.id) ? globalThis.String(u.id) : void 0,
            pk: C(u.pk) ? O(u.pk) : void 0,
            refuse_reason: C(u.refuse_reason) ? globalThis.String(u.refuse_reason) : "",
            version: C(u.version) ? globalThis.String(u.version) : "",
            feedback: C(u.feedback) ? globalThis.Number(u.feedback) : 0
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.uuid !== "" && (e.uuid = u.uuid), u.relay_server !== "" && (e.relay_server = u.relay_server), u.id !== void 0 && (e.id = u.id), u.pk !== void 0 && (e.pk = U(u.pk)), u.refuse_reason !== "" && (e.refuse_reason = u.refuse_reason), u.version !== "" && (e.version = u.version), u.feedback !== 0 && (e.feedback = Math.round(u.feedback)), e
    }, create(u) {
        return Ee.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l, d;
        const e = Hi();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.uuid = (n = u.uuid) != null ? n : "", e.relay_server = (a = u.relay_server) != null ? a : "", e.id = (t = u.id) != null ? t : void 0, e.pk = (s = u.pk) != null ? s : void 0, e.refuse_reason = (E = u.refuse_reason) != null ? E : "", e.version = (l = u.version) != null ? l : "", e.feedback = (d = u.feedback) != null ? d : 0, e
    }
};

function Ji() {
    return {url: ""}
}

const le = {
    encode(u, e = r.Writer.create()) {
        return u.url !== "" && e.uint32(10).string(u.url), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Ji();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.url = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {url: C(u.url) ? globalThis.String(u.url) : ""}
    }, toJSON(u) {
        const e = {};
        return u.url !== "" && (e.url = u.url), e
    }, create(u) {
        return le.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Ji();
        return e.url = (i = u.url) != null ? i : "", e
    }
};

function Gi() {
    return {socket_addr: new Uint8Array(0), relay_server: ""}
}

const De = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.relay_server !== "" && e.uint32(18).string(u.relay_server), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Gi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.relay_server = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.relay_server !== "" && (e.relay_server = u.relay_server), e
    }, create(u) {
        return De.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Gi();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.relay_server = (n = u.relay_server) != null ? n : "", e
    }
};

function Zi() {
    return {socket_addr: new Uint8Array(0), local_addr: new Uint8Array(0), relay_server: "", id: "", version: ""}
}

const de = {
    encode(u, e = r.Writer.create()) {
        return u.socket_addr.length !== 0 && e.uint32(10).bytes(u.socket_addr), u.local_addr.length !== 0 && e.uint32(18).bytes(u.local_addr), u.relay_server !== "" && e.uint32(26).string(u.relay_server), u.id !== "" && e.uint32(34).string(u.id), u.version !== "" && e.uint32(42).string(u.version), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Zi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.socket_addr = i.bytes();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.local_addr = i.bytes();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.relay_server = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.id = i.string();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.version = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            socket_addr: C(u.socket_addr) ? O(u.socket_addr) : new Uint8Array(0),
            local_addr: C(u.local_addr) ? O(u.local_addr) : new Uint8Array(0),
            relay_server: C(u.relay_server) ? globalThis.String(u.relay_server) : "",
            id: C(u.id) ? globalThis.String(u.id) : "",
            version: C(u.version) ? globalThis.String(u.version) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.socket_addr.length !== 0 && (e.socket_addr = U(u.socket_addr)), u.local_addr.length !== 0 && (e.local_addr = U(u.local_addr)), u.relay_server !== "" && (e.relay_server = u.relay_server), u.id !== "" && (e.id = u.id), u.version !== "" && (e.version = u.version), e
    }, create(u) {
        return de.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s;
        const e = Zi();
        return e.socket_addr = (i = u.socket_addr) != null ? i : new Uint8Array(0), e.local_addr = (n = u.local_addr) != null ? n : new Uint8Array(0), e.relay_server = (a = u.relay_server) != null ? a : "", e.id = (t = u.id) != null ? t : "", e.version = (s = u.version) != null ? s : "", e
    }
};

function Qi() {
    return {cmd: "", mac: "", id: "", username: "", hostname: "", platform: "", misc: ""}
}

const ce = {
    encode(u, e = r.Writer.create()) {
        return u.cmd !== "" && e.uint32(10).string(u.cmd), u.mac !== "" && e.uint32(18).string(u.mac), u.id !== "" && e.uint32(26).string(u.id), u.username !== "" && e.uint32(34).string(u.username), u.hostname !== "" && e.uint32(42).string(u.hostname), u.platform !== "" && e.uint32(50).string(u.platform), u.misc !== "" && e.uint32(58).string(u.misc), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Qi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.cmd = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.mac = i.string();
                    continue;
                case 3:
                    if (t !== 26) break;
                    a.id = i.string();
                    continue;
                case 4:
                    if (t !== 34) break;
                    a.username = i.string();
                    continue;
                case 5:
                    if (t !== 42) break;
                    a.hostname = i.string();
                    continue;
                case 6:
                    if (t !== 50) break;
                    a.platform = i.string();
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.misc = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            cmd: C(u.cmd) ? globalThis.String(u.cmd) : "",
            mac: C(u.mac) ? globalThis.String(u.mac) : "",
            id: C(u.id) ? globalThis.String(u.id) : "",
            username: C(u.username) ? globalThis.String(u.username) : "",
            hostname: C(u.hostname) ? globalThis.String(u.hostname) : "",
            platform: C(u.platform) ? globalThis.String(u.platform) : "",
            misc: C(u.misc) ? globalThis.String(u.misc) : ""
        }
    }, toJSON(u) {
        const e = {};
        return u.cmd !== "" && (e.cmd = u.cmd), u.mac !== "" && (e.mac = u.mac), u.id !== "" && (e.id = u.id), u.username !== "" && (e.username = u.username), u.hostname !== "" && (e.hostname = u.hostname), u.platform !== "" && (e.platform = u.platform), u.misc !== "" && (e.misc = u.misc), e
    }, create(u) {
        return ce.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n, a, t, s, E, l;
        const e = Qi();
        return e.cmd = (i = u.cmd) != null ? i : "", e.mac = (n = u.mac) != null ? n : "", e.id = (a = u.id) != null ? a : "", e.username = (t = u.username) != null ? t : "", e.hostname = (s = u.hostname) != null ? s : "", e.platform = (E = u.platform) != null ? E : "", e.misc = (l = u.misc) != null ? l : "", e
    }
};

function Xi() {
    return {id: "", peers: []}
}

const Gu = {
    encode(u, e = r.Writer.create()) {
        u.id !== "" && e.uint32(10).string(u.id);
        for (const i of u.peers) e.uint32(18).string(i);
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Xi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.id = i.string();
                    continue;
                case 2:
                    if (t !== 18) break;
                    a.peers.push(i.string());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            id: C(u.id) ? globalThis.String(u.id) : "",
            peers: globalThis.Array.isArray(u == null ? void 0 : u.peers) ? u.peers.map(e => globalThis.String(e)) : []
        }
    }, toJSON(u) {
        var i;
        const e = {};
        return u.id !== "" && (e.id = u.id), (i = u.peers) != null && i.length && (e.peers = u.peers), e
    }, create(u) {
        return Gu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i, n;
        const e = Xi();
        return e.id = (i = u.id) != null ? i : "", e.peers = ((n = u.peers) == null ? void 0 : n.map(a => a)) || [], e
    }
};

function Yi() {
    return {states: new Uint8Array(0)}
}

const Ce = {
    encode(u, e = r.Writer.create()) {
        return u.states.length !== 0 && e.uint32(10).bytes(u.states), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = Yi();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.states = i.bytes();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {states: C(u.states) ? O(u.states) : new Uint8Array(0)}
    }, toJSON(u) {
        const e = {};
        return u.states.length !== 0 && (e.states = U(u.states)), e
    }, create(u) {
        return Ce.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = Yi();
        return e.states = (i = u.states) != null ? i : new Uint8Array(0), e
    }
};

function $i() {
    return {keys: []}
}

const pe = {
    encode(u, e = r.Writer.create()) {
        for (const i of u.keys) e.uint32(10).bytes(i);
        return e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = $i();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.keys.push(i.bytes());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {keys: globalThis.Array.isArray(u == null ? void 0 : u.keys) ? u.keys.map(e => O(e)) : []}
    }, toJSON(u) {
        var i;
        const e = {};
        return (i = u.keys) != null && i.length && (e.keys = u.keys.map(n => U(n))), e
    }, create(u) {
        return pe.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = $i();
        return e.keys = ((i = u.keys) == null ? void 0 : i.map(n => n)) || [], e
    }
};

function ut() {
    return {token: ""}
}

const Zu = {
    encode(u, e = r.Writer.create()) {
        return u.token !== "" && e.uint32(10).string(u.token), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = ut();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 1:
                    if (t !== 10) break;
                    a.token = i.string();
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {token: C(u.token) ? globalThis.String(u.token) : ""}
    }, toJSON(u) {
        const e = {};
        return u.token !== "" && (e.token = u.token), e
    }, create(u) {
        return Zu.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        var i;
        const e = ut();
        return e.token = (i = u.token) != null ? i : "", e
    }
};

function et() {
    return {
        register_peer: void 0,
        register_peer_response: void 0,
        punch_hole_request: void 0,
        punch_hole: void 0,
        punch_hole_sent: void 0,
        punch_hole_response: void 0,
        fetch_local_addr: void 0,
        local_addr: void 0,
        configure_update: void 0,
        register_pk: void 0,
        register_pk_response: void 0,
        software_update: void 0,
        request_relay: void 0,
        relay_response: void 0,
        test_nat_request: void 0,
        test_nat_response: void 0,
        peer_discovery: void 0,
        online_request: void 0,
        online_response: void 0,
        key_exchange: void 0,
        hc: void 0
    }
}

const Ne = {
    encode(u, e = r.Writer.create()) {
        return u.register_peer !== void 0 && ue.encode(u.register_peer, e.uint32(50).fork()).ldelim(), u.register_peer_response !== void 0 && ee.encode(u.register_peer_response, e.uint32(58).fork()).ldelim(), u.punch_hole_request !== void 0 && Hu.encode(u.punch_hole_request, e.uint32(66).fork()).ldelim(), u.punch_hole !== void 0 && ie.encode(u.punch_hole, e.uint32(74).fork()).ldelim(), u.punch_hole_sent !== void 0 && ne.encode(u.punch_hole_sent, e.uint32(82).fork()).ldelim(), u.punch_hole_response !== void 0 && se.encode(u.punch_hole_response, e.uint32(90).fork()).ldelim(), u.fetch_local_addr !== void 0 && De.encode(u.fetch_local_addr, e.uint32(98).fork()).ldelim(), u.local_addr !== void 0 && de.encode(u.local_addr, e.uint32(106).fork()).ldelim(), u.configure_update !== void 0 && tu.encode(u.configure_update, e.uint32(114).fork()).ldelim(), u.register_pk !== void 0 && oe.encode(u.register_pk, e.uint32(122).fork()).ldelim(), u.register_pk_response !== void 0 && re.encode(u.register_pk_response, e.uint32(130).fork()).ldelim(), u.software_update !== void 0 && le.encode(u.software_update, e.uint32(138).fork()).ldelim(), u.request_relay !== void 0 && Ju.encode(u.request_relay, e.uint32(146).fork()).ldelim(), u.relay_response !== void 0 && Ee.encode(u.relay_response, e.uint32(154).fork()).ldelim(), u.test_nat_request !== void 0 && te.encode(u.test_nat_request, e.uint32(162).fork()).ldelim(), u.test_nat_response !== void 0 && ae.encode(u.test_nat_response, e.uint32(170).fork()).ldelim(), u.peer_discovery !== void 0 && ce.encode(u.peer_discovery, e.uint32(178).fork()).ldelim(), u.online_request !== void 0 && Gu.encode(u.online_request, e.uint32(186).fork()).ldelim(), u.online_response !== void 0 && Ce.encode(u.online_response, e.uint32(194).fork()).ldelim(), u.key_exchange !== void 0 && pe.encode(u.key_exchange, e.uint32(202).fork()).ldelim(), u.hc !== void 0 && Zu.encode(u.hc, e.uint32(210).fork()).ldelim(), e
    }, decode(u, e) {
        const i = u instanceof r.Reader ? u : r.Reader.create(u);
        let n = e === void 0 ? i.len : i.pos + e;
        const a = et();
        for (; i.pos < n;) {
            const t = i.uint32();
            switch (t >>> 3) {
                case 6:
                    if (t !== 50) break;
                    a.register_peer = ue.decode(i, i.uint32());
                    continue;
                case 7:
                    if (t !== 58) break;
                    a.register_peer_response = ee.decode(i, i.uint32());
                    continue;
                case 8:
                    if (t !== 66) break;
                    a.punch_hole_request = Hu.decode(i, i.uint32());
                    continue;
                case 9:
                    if (t !== 74) break;
                    a.punch_hole = ie.decode(i, i.uint32());
                    continue;
                case 10:
                    if (t !== 82) break;
                    a.punch_hole_sent = ne.decode(i, i.uint32());
                    continue;
                case 11:
                    if (t !== 90) break;
                    a.punch_hole_response = se.decode(i, i.uint32());
                    continue;
                case 12:
                    if (t !== 98) break;
                    a.fetch_local_addr = De.decode(i, i.uint32());
                    continue;
                case 13:
                    if (t !== 106) break;
                    a.local_addr = de.decode(i, i.uint32());
                    continue;
                case 14:
                    if (t !== 114) break;
                    a.configure_update = tu.decode(i, i.uint32());
                    continue;
                case 15:
                    if (t !== 122) break;
                    a.register_pk = oe.decode(i, i.uint32());
                    continue;
                case 16:
                    if (t !== 130) break;
                    a.register_pk_response = re.decode(i, i.uint32());
                    continue;
                case 17:
                    if (t !== 138) break;
                    a.software_update = le.decode(i, i.uint32());
                    continue;
                case 18:
                    if (t !== 146) break;
                    a.request_relay = Ju.decode(i, i.uint32());
                    continue;
                case 19:
                    if (t !== 154) break;
                    a.relay_response = Ee.decode(i, i.uint32());
                    continue;
                case 20:
                    if (t !== 162) break;
                    a.test_nat_request = te.decode(i, i.uint32());
                    continue;
                case 21:
                    if (t !== 170) break;
                    a.test_nat_response = ae.decode(i, i.uint32());
                    continue;
                case 22:
                    if (t !== 178) break;
                    a.peer_discovery = ce.decode(i, i.uint32());
                    continue;
                case 23:
                    if (t !== 186) break;
                    a.online_request = Gu.decode(i, i.uint32());
                    continue;
                case 24:
                    if (t !== 194) break;
                    a.online_response = Ce.decode(i, i.uint32());
                    continue;
                case 25:
                    if (t !== 202) break;
                    a.key_exchange = pe.decode(i, i.uint32());
                    continue;
                case 26:
                    if (t !== 210) break;
                    a.hc = Zu.decode(i, i.uint32());
                    continue
            }
            if ((t & 7) === 4 || t === 0) break;
            i.skipType(t & 7)
        }
        return a
    }, fromJSON(u) {
        return {
            register_peer: C(u.register_peer) ? ue.fromJSON(u.register_peer) : void 0,
            register_peer_response: C(u.register_peer_response) ? ee.fromJSON(u.register_peer_response) : void 0,
            punch_hole_request: C(u.punch_hole_request) ? Hu.fromJSON(u.punch_hole_request) : void 0,
            punch_hole: C(u.punch_hole) ? ie.fromJSON(u.punch_hole) : void 0,
            punch_hole_sent: C(u.punch_hole_sent) ? ne.fromJSON(u.punch_hole_sent) : void 0,
            punch_hole_response: C(u.punch_hole_response) ? se.fromJSON(u.punch_hole_response) : void 0,
            fetch_local_addr: C(u.fetch_local_addr) ? De.fromJSON(u.fetch_local_addr) : void 0,
            local_addr: C(u.local_addr) ? de.fromJSON(u.local_addr) : void 0,
            configure_update: C(u.configure_update) ? tu.fromJSON(u.configure_update) : void 0,
            register_pk: C(u.register_pk) ? oe.fromJSON(u.register_pk) : void 0,
            register_pk_response: C(u.register_pk_response) ? re.fromJSON(u.register_pk_response) : void 0,
            software_update: C(u.software_update) ? le.fromJSON(u.software_update) : void 0,
            request_relay: C(u.request_relay) ? Ju.fromJSON(u.request_relay) : void 0,
            relay_response: C(u.relay_response) ? Ee.fromJSON(u.relay_response) : void 0,
            test_nat_request: C(u.test_nat_request) ? te.fromJSON(u.test_nat_request) : void 0,
            test_nat_response: C(u.test_nat_response) ? ae.fromJSON(u.test_nat_response) : void 0,
            peer_discovery: C(u.peer_discovery) ? ce.fromJSON(u.peer_discovery) : void 0,
            online_request: C(u.online_request) ? Gu.fromJSON(u.online_request) : void 0,
            online_response: C(u.online_response) ? Ce.fromJSON(u.online_response) : void 0,
            key_exchange: C(u.key_exchange) ? pe.fromJSON(u.key_exchange) : void 0,
            hc: C(u.hc) ? Zu.fromJSON(u.hc) : void 0
        }
    }, toJSON(u) {
        const e = {};
        return u.register_peer !== void 0 && (e.register_peer = ue.toJSON(u.register_peer)), u.register_peer_response !== void 0 && (e.register_peer_response = ee.toJSON(u.register_peer_response)), u.punch_hole_request !== void 0 && (e.punch_hole_request = Hu.toJSON(u.punch_hole_request)), u.punch_hole !== void 0 && (e.punch_hole = ie.toJSON(u.punch_hole)), u.punch_hole_sent !== void 0 && (e.punch_hole_sent = ne.toJSON(u.punch_hole_sent)), u.punch_hole_response !== void 0 && (e.punch_hole_response = se.toJSON(u.punch_hole_response)), u.fetch_local_addr !== void 0 && (e.fetch_local_addr = De.toJSON(u.fetch_local_addr)), u.local_addr !== void 0 && (e.local_addr = de.toJSON(u.local_addr)), u.configure_update !== void 0 && (e.configure_update = tu.toJSON(u.configure_update)), u.register_pk !== void 0 && (e.register_pk = oe.toJSON(u.register_pk)), u.register_pk_response !== void 0 && (e.register_pk_response = re.toJSON(u.register_pk_response)), u.software_update !== void 0 && (e.software_update = le.toJSON(u.software_update)), u.request_relay !== void 0 && (e.request_relay = Ju.toJSON(u.request_relay)), u.relay_response !== void 0 && (e.relay_response = Ee.toJSON(u.relay_response)), u.test_nat_request !== void 0 && (e.test_nat_request = te.toJSON(u.test_nat_request)), u.test_nat_response !== void 0 && (e.test_nat_response = ae.toJSON(u.test_nat_response)), u.peer_discovery !== void 0 && (e.peer_discovery = ce.toJSON(u.peer_discovery)), u.online_request !== void 0 && (e.online_request = Gu.toJSON(u.online_request)), u.online_response !== void 0 && (e.online_response = Ce.toJSON(u.online_response)), u.key_exchange !== void 0 && (e.key_exchange = pe.toJSON(u.key_exchange)), u.hc !== void 0 && (e.hc = Zu.toJSON(u.hc)), e
    }, create(u) {
        return Ne.fromPartial(u != null ? u : {})
    }, fromPartial(u) {
        const e = et();
        return e.register_peer = u.register_peer !== void 0 && u.register_peer !== null ? ue.fromPartial(u.register_peer) : void 0, e.register_peer_response = u.register_peer_response !== void 0 && u.register_peer_response !== null ? ee.fromPartial(u.register_peer_response) : void 0, e.punch_hole_request = u.punch_hole_request !== void 0 && u.punch_hole_request !== null ? Hu.fromPartial(u.punch_hole_request) : void 0, e.punch_hole = u.punch_hole !== void 0 && u.punch_hole !== null ? ie.fromPartial(u.punch_hole) : void 0, e.punch_hole_sent = u.punch_hole_sent !== void 0 && u.punch_hole_sent !== null ? ne.fromPartial(u.punch_hole_sent) : void 0, e.punch_hole_response = u.punch_hole_response !== void 0 && u.punch_hole_response !== null ? se.fromPartial(u.punch_hole_response) : void 0, e.fetch_local_addr = u.fetch_local_addr !== void 0 && u.fetch_local_addr !== null ? De.fromPartial(u.fetch_local_addr) : void 0, e.local_addr = u.local_addr !== void 0 && u.local_addr !== null ? de.fromPartial(u.local_addr) : void 0, e.configure_update = u.configure_update !== void 0 && u.configure_update !== null ? tu.fromPartial(u.configure_update) : void 0, e.register_pk = u.register_pk !== void 0 && u.register_pk !== null ? oe.fromPartial(u.register_pk) : void 0, e.register_pk_response = u.register_pk_response !== void 0 && u.register_pk_response !== null ? re.fromPartial(u.register_pk_response) : void 0, e.software_update = u.software_update !== void 0 && u.software_update !== null ? le.fromPartial(u.software_update) : void 0, e.request_relay = u.request_relay !== void 0 && u.request_relay !== null ? Ju.fromPartial(u.request_relay) : void 0, e.relay_response = u.relay_response !== void 0 && u.relay_response !== null ? Ee.fromPartial(u.relay_response) : void 0, e.test_nat_request = u.test_nat_request !== void 0 && u.test_nat_request !== null ? te.fromPartial(u.test_nat_request) : void 0, e.test_nat_response = u.test_nat_response !== void 0 && u.test_nat_response !== null ? ae.fromPartial(u.test_nat_response) : void 0, e.peer_discovery = u.peer_discovery !== void 0 && u.peer_discovery !== null ? ce.fromPartial(u.peer_discovery) : void 0, e.online_request = u.online_request !== void 0 && u.online_request !== null ? Gu.fromPartial(u.online_request) : void 0, e.online_response = u.online_response !== void 0 && u.online_response !== null ? Ce.fromPartial(u.online_response) : void 0, e.key_exchange = u.key_exchange !== void 0 && u.key_exchange !== null ? pe.fromPartial(u.key_exchange) : void 0, e.hc = u.hc !== void 0 && u.hc !== null ? Zu.fromPartial(u.hc) : void 0, e
    }
};

function O(u) {
    if (globalThis.Buffer) return Uint8Array.from(globalThis.Buffer.from(u, "base64"));
    {
        const e = globalThis.atob(u), i = new Uint8Array(e.length);
        for (let n = 0; n < e.length; ++n) i[n] = e.charCodeAt(n);
        return i
    }
}

function U(u) {
    if (globalThis.Buffer) return globalThis.Buffer.from(u).toString("base64");
    {
        const e = [];
        return u.forEach(i => {
            e.push(globalThis.String.fromCharCode(i))
        }), globalThis.btoa(e.join(""))
    }
}

function C(u) {
    return u != null
}

class Ve {
    constructor(e, i = !0, n = "") {
        D(this, "_websocket");
        D(this, "_eventHandlers");
        D(this, "_buf");
        D(this, "_status");
        D(this, "_latency");
        D(this, "_secretKey");
        D(this, "_uri");
        D(this, "_isRendezvous");
        D(this, "_recvDataCount");
        D(this, "_tag");
        D(this, "_isProcessing");
        this._eventHandlers = {
            message: void 0,
            open: void 0,
            close: void 0,
            error: void 0,
            status_change: void 0
        }, this._uri = e, this._status = "", this._buf = [], this._websocket = new WebSocket(e), this._websocket.onmessage = this._recv_message.bind(this), this._websocket.binaryType = "arraybuffer", this._latency = new Date().getTime(), this._isRendezvous = i, this._recvDataCount = 0, this._tag = n, this._isProcessing = !1
    }

    resetRecvDataCount() {
        this._recvDataCount = 0
    }

    getRecvDataCount() {
        return this._recvDataCount
    }

    latency() {
        return this._latency
    }

    setSecretKey(e) {
        this._secretKey = [e, 0, 0]
    }

    sendMessage(e) {
        let i = au.encode(au.fromPartial(e)).finish(), n = this._secretKey;
        n && (n[1] += 1, i = vt(i, n[1], n[0])), this._websocket.send(i)
    }

    sendRendezvous(e) {
        this._websocket.send(Ne.encode(Ne.fromPartial(e)).finish())
    }

    sendBytes(e) {
        let i = this._secretKey;
        i && (i[1] += 1, e = vt(e, i[1], i[0])), this._websocket.send(e)
    }

    parseMessage(e) {
        return au.decode(e)
    }

    parseRendezvous(e) {
        return Ne.decode(e)
    }

    off(e) {
        this._eventHandlers[e] = void 0
    }

    on(e, i) {
        this._eventHandlers[e] = i
    }

    setStatus(e) {
        this._status = e, this._eventHandlers.status_change && this._eventHandlers.status_change(e)
    }

    async open(e = 12e3) {
        return new Promise((i, n) => {
            setTimeout(() => {
                this._status != "open" && n(this._status || "Timeout")
            }, e), this._websocket.onopen = () => {
                var a;
                this._latency = new Date().getTime() - this._latency, this.setStatus("open"), console.debug(">> WebSock.onopen " + this._tag), (a = this._websocket) != null && a.protocol && console.info("Server " + this._tag + " choose sub-protocol: " + this._websocket.protocol), this._eventHandlers.open && this._eventHandlers.open(), console.info("WebSock.onopen " + this._tag), i(this)
            }, this._websocket.onclose = a => {
                this._status == "open", this.setStatus(a), this._tag == "query onlines" ? console.info("WebSock.onclose " + this._tag) : a.code == 1e3 ? console.info("WebSock.onclose " + this._tag + ": " + a.reason) : (console.error("WebSock.onclose: " + this._tag), console.error(a)), this._eventHandlers.close && this._eventHandlers.close(a), n("Reset by the peer")
            }, this._websocket.onerror = a => {
                if (!this._status) {
                    n("Failed to connect to " + (this._isRendezvous ? "rendezvous" : "relay") + " server, " + this._uri);
                    return
                }
                this.setStatus(a), console.error("WebSock.onerror: " + this._tag), console.error(a), this._eventHandlers.error && this._eventHandlers.error(a)
            }
        })
    }

    async next(e = 12e3) {
        let i = this._eventHandlers.message;
        this.off("message");
        try {
            let n = await this._next(e);
            return this.on("message", i), n
        } catch (n) {
            throw this.on("message", i), n
        }
    }

    async _next(e = 12e3) {
        const i = (n, a, t) => {
            if (this._buf.length) n(this._buf[0]), this._buf.splice(0, 1); else {
                if (this._status != "open") {
                    a(this._status);
                    return
                }
                new Date().getTime() > t + e ? a("Timeout") : setTimeout(() => i(n, a, t), 1)
            }
        };
        return new Promise((n, a) => {
            i(n, a, new Date().getTime())
        })
    }

    close() {
        this.setStatus(""), this._websocket && ((this._websocket.readyState === WebSocket.OPEN || this._websocket.readyState === WebSocket.CONNECTING) && (console.info("Closing WebSocket(" + this._tag + ") connection"), this._websocket.close(1e3, "Normal closure")), this._websocket.onmessage = () => {
        })
    }

    _recv_message(e) {
        if (e.data instanceof window.ArrayBuffer) {
            let i = new Uint8Array(e.data);
            this._recvDataCount += i.length;
            const n = this._secretKey;
            n && (n[2] += 1, i = _r(i, n[2], n[0]));
            let a;
            i.length == 0 ? a = new Uint8Array : a = this._isRendezvous ? this.parseRendezvous(i) : this.parseMessage(i), this._buf.push(a), this._eventHandlers.message && (this._isProcessing || this.processQueue())
        }
    }

    async processQueue() {
        this._isProcessing = !0;
        try {
            for (; this._buf.length > 0 && this._eventHandlers.message;) {
                const e = this._buf.shift();
                await this._eventHandlers.message(e)
            }
        } catch (e) {
            console.log("Error in processQueue: " + e)
        }
        this._isProcessing = !1
    }
}

let Au = null;
const it = ".";
var $, Bu, u0, $e, lu, u4, wt, we;

class Qa {
    constructor() {
        Cu(this, u4);
        Cu(this, $, null);
        Cu(this, Bu, {});
        Cu(this, u0, {});
        Cu(this, $e, 0);
        Cu(this, lu, []);
        Cu(this, we, async (e, i) => {
            const n = await (await fetch(e)).arrayBuffer(), a = new Blob([n], {type: i});
            return URL.createObjectURL(a)
        })
    }

    async load() {
        if (!h(this, $)) {
            _e(this, $, new Worker("./ffmpeg.js?v=dddac33a", {type: "module"})), q4(this, u4, wt).call(this);
            const e = await h(this, we).call(this, `${it}/ffmpeg-core.js?v=16fa4bb1`, "text/javascript"),
                i = await h(this, we).call(this, `${it}/ffmpeg-core.wasm?v=241ebe18`, "application/wasm");
            return this.send({type: "LOAD", data: {coreURL: e, wasmURL: i}})
        }
    }

    async decode(e, i) {
        let n = [i];
        var a = null;
        return h(this, lu).length > 0 && (a = h(this, lu).pop(), n.push(a)), this.send({
            type: "DECODE",
            data: {codec: e, data: i, arrayBuffer: a}
        }, n)
    }

    async send({type: e, data: i}, n) {
        return h(this, $) ? new Promise((a, t) => {
            const s = V4(this, $e)._++;
            h(this, Bu)[s] = a, h(this, u0)[s] = t, h(this, $).postMessage({id: s, type: e, data: i}, n)
        }) : Promise.reject("FFmpeg not loaded")
    }

    close() {
        h(this, $) && (this.send({type: "CLOSE", data: {}}), h(this, $).terminate(), _e(this, $, null))
    }
}

$ = new WeakMap, Bu = new WeakMap, u0 = new WeakMap, $e = new WeakMap, lu = new WeakMap, u4 = new WeakSet, wt = function () {
    h(this, $).onmessage = ({data: {id: e, type: i, data: n}}) => {
        i == "LOAD" ? (console.log("FFmpeg loaded"), h(this, Bu)[e](n)) : i == "DECODE" ? (h(this, lu).push(n.data.data), h(this, lu).length > 8 && h(this, lu).shift(), h(this, Bu)[e](n)) : i == "CLOSE" ? (_e(this, lu, []), h(this, Bu)[e](n)) : i == "ERROR" ? h(this, u0)[e](n) : h(this, u0)[e](n), delete h(this, Bu)[e], delete h(this, u0)[e]
    }
}, we = new WeakMap;

async function Xa() {
    try {
        return Au = new Qa, Au ? Au.load() : Promise.reject("Failed to create FFmpeg instance")
    } catch (u) {
        return console.log("Failed to load FFmpeg", u), Promise.reject("Failed to load FFmpeg")
    }
}

async function Ya(u, e) {
    return Au ? Au.decode(u, e) : Promise.reject("FFmpeg is uninitialized")
}

async function $a() {
    Au && (Au.close(), Au = null)
}

const un = "Desktop session not ready", en = "Desktop xsession failed", tn = "Desktop session another user login",
    an = "Desktop xorg not found", nn = "Desktop none", on = "Desktop session not ready, password empty",
    rn = "Desktop session not ready, password wrong", sn = "Empty Password", En = "Wrong Password",
    ln = "Wrong 2FA Code", tt = "2FA Required", Dn = "No Password Access", dn = "Wayland login screen is not supported",
    cn = "x11 expected", St = "https://rustdesk.com/docs/en/manual/linux/#x11-required",
    Cn = "https://rustdesk.com/docs/en/", pn = St,
    Bn = "https://github.com/rustdesk/rustdesk/wiki/Headless-Linux-Support",
    at = {"rustdesk docs home": Cn, "rustdesk docs x11-required": pn, "rustdesk x11 headless": Bn},
    nt = "Input source 1", An = "map", ot = "translate", mn = "ShiftLeft", Fn = "ShiftRight", ke = "ControlLeft",
    zt = "ControlRight", v4 = "AltLeft", Pt = "AltRight", Rt = "MetaLeft", It = "MetaRight", a4 = "Windows",
    g4 = "Linux", k4 = "Mac OS", Tt = "Android", _n = "iOS", vn = "web", gn = "ISO", kn = 1, hn = 2, rt = 3, st = 4,
    Pe = 1, Re = 2, fn = 4, xn = 8, yn = 16, r4 = "public", Et = "OeVuKk5nlHiXp+APNn0Y3pC1Iwpwn44JGqrQCsWqmBw=",
    bn = 1e3, wn = 6e4, d4 = lang, Sn = langIds;

function zn(u, e, i, n) {
    return u == "error" && e == "Connection Error" && ((i.indexOf("10054") < 0 || i.indexOf("104") < 0) && n || i.toLowerCase().indexOf("offline") < 0 && i.toLowerCase().indexOf("exist") < 0 && i.toLowerCase().indexOf("handshake") < 0 && i.toLowerCase().indexOf("failed") < 0 && i.toLowerCase().indexOf("resolve") < 0 && i.toLowerCase().indexOf("mismatch") < 0 && i.toLowerCase().indexOf("manually") < 0 && i.toLowerCase().indexOf("not allowed") < 0)
}

const Pn = {
    VK_A: "a",
    VK_B: "b",
    VK_C: "c",
    VK_D: "d",
    VK_E: "e",
    VK_F: "f",
    VK_G: "g",
    VK_H: "h",
    VK_I: "i",
    VK_J: "j",
    VK_K: "k",
    VK_L: "l",
    VK_M: "m",
    VK_N: "n",
    VK_O: "o",
    VK_P: "p",
    VK_Q: "q",
    VK_R: "r",
    VK_S: "s",
    VK_T: "t",
    VK_U: "u",
    VK_V: "v",
    VK_W: "w",
    VK_X: "x",
    VK_Y: "y",
    VK_Z: "z",
    VK_0: "0",
    VK_1: "1",
    VK_2: "2",
    VK_3: "3",
    VK_4: "4",
    VK_5: "5",
    VK_6: "6",
    VK_7: "7",
    VK_8: "8",
    VK_9: "9",
    VK_COMMA: ",",
    VK_SLASH: "/",
    VK_SEMICOLON: ";",
    VK_QUOTE: "'",
    VK_LBRACKET: "[",
    VK_RBRACKET: "]",
    VK_BACKSLASH: "\\",
    VK_MINUS: "-",
    VK_PLUS: "=",
    VK_DIVIDE: "Divide",
    VK_MULTIPLY: "Multiply",
    VK_SUBTRACT: "Subtract",
    VK_ADD: "Add",
    VK_DECIMAL: "Decimal",
    VK_F1: "F1",
    VK_F2: "F2",
    VK_F3: "F3",
    VK_F4: "F4",
    VK_F5: "F5",
    VK_F6: "F6",
    VK_F7: "F7",
    VK_F8: "F8",
    VK_F9: "F9",
    VK_F10: "F10",
    VK_F11: "F11",
    VK_F12: "F12",
    VK_ENTER: "Return",
    VK_CANCEL: "Cancel",
    VK_BACK: "Backspace",
    VK_TAB: "Tab",
    VK_CLEAR: "Clear",
    VK_RETURN: "Return",
    VK_SHIFT: "Shift",
    VK_CONTROL: "Control",
    VK_MENU: "Alt",
    VK_PAUSE: "Pause",
    VK_CAPITAL: "CapsLock",
    VK_KANA: "Kana",
    VK_HANGUL: "Hangul",
    VK_JUNJA: "Junja",
    VK_FINAL: "Final",
    VK_HANJA: "Hanja",
    VK_KANJI: "Kanji",
    VK_ESCAPE: "Escape",
    VK_CONVERT: "Convert",
    VK_SPACE: "Space",
    VK_PRIOR: "PageUp",
    VK_NEXT: "PageDown",
    VK_END: "End",
    VK_HOME: "Home",
    VK_LEFT: "LeftArrow",
    VK_UP: "UpArrow",
    VK_RIGHT: "RightArrow",
    VK_DOWN: "DownArrow",
    VK_SELECT: "Select",
    VK_PRINT: "Print",
    VK_EXECUTE: "Execute",
    VK_SNAPSHOT: "Snapshot",
    VK_SCROLL: "Scroll",
    VK_INSERT: "Insert",
    VK_DELETE: "Delete",
    VK_HELP: "Help",
    VK_SLEEP: "Sleep",
    VK_SEPARATOR: "Separator",
    VK_NUMPAD0: "Numpad0",
    VK_NUMPAD1: "Numpad1",
    VK_NUMPAD2: "Numpad2",
    VK_NUMPAD3: "Numpad3",
    VK_NUMPAD4: "Numpad4",
    VK_NUMPAD5: "Numpad5",
    VK_NUMPAD6: "Numpad6",
    VK_NUMPAD7: "Numpad7",
    VK_NUMPAD8: "Numpad8",
    VK_NUMPAD9: "Numpad9",
    Apps: "Apps",
    Meta: "Meta",
    RAlt: "RAlt",
    RWin: "RWin",
    RControl: "RControl",
    RShift: "RShift",
    CTRL_ALT_DEL: "CtrlAltDel",
    LOCK_SCREEN: "LockScreen"
}, c4 = "1.4.0", Rn = "2025-05-11 20:56";

class m {
    static setItem(e, i) {
        localStorage.setItem(this.prefix + e, i)
    }

    static getItem(e) {
        return localStorage.getItem(this.prefix + e)
    }

    static removeItem(e) {
        localStorage.removeItem(this.prefix + e)
    }

    static clear() {
        for (let e = localStorage.length - 1; e >= 0; e--) {
            const i = localStorage.key(e);
            i && i.startsWith(this.prefix) && localStorage.removeItem(i)
        }
    }
}

D(m, "prefix", "wc-");

class N {
    static async init() {
        if (!this.db) return new Promise((e, i) => {
            const n = indexedDB.open(this.dbName, 1);
            n.onupgradeneeded = a => {
                const t = a.target.result;
                t.objectStoreNames.contains(this.storeName) || t.createObjectStore(this.storeName)
            }, n.onsuccess = async a => {
                this.db = a.target.result;
                try {
                    await this.loadCache(), e()
                } catch (t) {
                    i(t)
                }
            }, n.onerror = a => {
                i(a.target.error)
            }
        })
    }

    static async loadCache() {
        return new Promise((e, i) => {
            const a = this.db.transaction([this.storeName], "readonly").objectStore(this.storeName), t = a.getAllKeys();
            t.onsuccess = s => {
                const l = s.target.result.map(d => new Promise((c, p) => {
                    const B = a.get(d);
                    B.onsuccess = F => {
                        this.cache[d] = F.target.result, c()
                    }, B.onerror = F => {
                        p(F.target.error)
                    }
                }));
                Promise.all(l).then(() => e()).catch(i)
            }, t.onerror = s => {
                i(s.target.error)
            }
        })
    }

    static setItem(e, i) {
        this.cache[this.prefix + e] = i;
        const t = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName).put(i, this.prefix + e);
        t.onerror = s => {
            console.error("IndexedDB setItem error:", s.target.error)
        }
    }

    static getItem(e) {
        var i;
        return (i = this.cache[this.prefix + e]) != null ? i : null
    }

    static removeItem(e) {
        delete this.cache[this.prefix + e];
        const a = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName).delete(this.prefix + e);
        a.onerror = t => {
            console.error("IndexedDB removeItem error:", t.target.error)
        }
    }

    static clear() {
        this.cache = {};
        const n = this.db.transaction([this.storeName], "readwrite").objectStore(this.storeName).clear();
        n.onerror = a => {
            console.error("IndexedDB clear error:", a.target.error)
        }
    }
}

D(N, "dbName", "wc-database"), D(N, "storeName", "wc-store"), D(N, "prefix", "wc-"), D(N, "db", null), D(N, "cache", {});
const cu = () => {
    try {
        return JSON.parse(N.getItem("peers")) || {}
    } catch {
        return {}
    }
}, h4 = u => {
    N.setItem("peers", JSON.stringify(u))
}, In = u => {
    const e = cu();
    delete e[u], h4(e)
}, C4 = u => cu()[u], Tn = (u, e) => {
    const i = cu();
    i[u] = e, h4(i)
}, jn = (u, e) => {
    var n;
    return (n = C4(u)[e]) != null ? n : e0(e)
}, jt = (u, e, i) => {
    const n = cu(), a = n[u] || {};
    i == null ? delete a[e] : a[e] = i, a.tm = new Date().getTime(), n[u] = a, h4(n)
}, f4 = u => m.getItem(`option:local:${u}`), Nt = (u, e) => {
    m.setItem(`option:local:${u}`, e)
}, Nn = u => m.getItem(`option:flutter:local:${u}`), On = (u, e) => {
    m.setItem(`option:flutter:local:${u}`, e)
}, Ot = async u => {
    const e = Ea(), i = Yu.publicKey, n = n4(0), a = e.from_string(u), t = await ca(a),
        s = e.crypto_secretbox_easy(t, n, i);
    return Q(s)
}, Ut = async u => {
    const e = Ea(), i = Yu.publicKey, n = Be(u), a = e.crypto_secretbox_open_easy(n, n4(0), i), t = await Ca(a);
    return e.to_string(t)
}, Un = async u => {
    let e = await Ot(u);
    N.setItem("ab", e)
}, Mt = async () => {
    try {
        let u = N.getItem("ab");
        if (u) return JSON.parse(await Ut(u))
    } catch (u) {
        console.error("loadAb error", u)
    }
    return {access_token: "", ab_entries: []}
}, Mn = () => {
    N.removeItem("ab")
}, Ln = async u => {
    let e = await Ot(u);
    N.setItem("group", e)
}, Wn = async () => {
    try {
        let u = N.getItem("group");
        if (u) return JSON.parse(await Ut(u))
    } catch (u) {
        console.error("loadGroup error", u)
    }
    return {access_token: "", users: [], peers: []}
}, Vn = () => {
    N.removeItem("group")
}, qn = u => u.name == "My address book" || u.name == "Legacy address book";
var Lt = Vt();

function Kn() {
    Lt = Vt()
}

const Wt = {};

function Hn(u) {
    const e = /\{(.*?)\}/, i = u.match(e);
    if (i && i[1] !== void 0) {
        const n = u.replace(e, "{}"), a = i[1];
        return [n, a]
    }
    return [u, null]
}

function Jn(u, e) {
    var l;
    let i = (Lt || "").toLowerCase();
    i || (u = u.toLowerCase(), u.startsWith("zh") ? i = u.includes("tw") ? "zh-tw" : "zh-cn" : i = ((l = u.split("-")[0]) == null ? void 0 : l.split("_")[0]) || "en");
    const [n, a] = Hn(e);
    let t = d4[i];
    const s = d4.en;
    let E = "";
    return t && t[n] ? E = t[n] : i !== "en" && s[n] ? E = s[n] : E = n, a !== null && (E = E.replace("{}", a)), E
}

const Gn = "z".charCodeAt(0), Zn = "a".charCodeAt(0);

function Qn(u, e) {
    const i = Pn[u] || u;
    if (i.length == 1) {
        const a = i.charCodeAt(0);
        return !e && (a > Gn || a < Zn) ? S.fromPartial({unicode: a}) : S.fromPartial({chr: a})
    }
    const n = fe(i);
    return n == j.UNRECOGNIZED && console.error("Unknown control key " + i), S.fromPartial({control_key: n})
}

async function s4(u) {
    await new Promise(e => setTimeout(e, u))
}

function Vt() {
    let u = m.getItem("option:local:lang");
    if (u && (u.includes("-") && (u = u.split("-")[1]), u.includes("_") && (u = u.split("_")[1]), d4.hasOwnProperty(u))) return u;
    try {
        const e = window.location.search;
        return new URLSearchParams(e).get("lang") || ""
    } catch {
        return ""
    }
}

var Yu = {privateKey: new Uint8Array([]), publicKey: new Uint8Array([])};

async function Xn() {
    try {
        const u = "app-data";
        try {
            const i = m.getItem(u);
            if (i) {
                const n = JSON.parse(i);
                if (Yu = {
                    privateKey: new Uint8Array(Be(n.a)),
                    publicKey: new Uint8Array(Be(n.b))
                }, Yu.publicKey.length === 32 && Yu.privateKey.length === 64) return
            }
        } catch (i) {
            console.error(i)
        }
        const e = await Yn();
        m.setItem(u, JSON.stringify({a: Q(e.privateKey), b: Q(e.publicKey)})), Yu = e
    } catch (u) {
        console.error("failed to init key pair", u)
    }
}

function Q(u) {
    return Br(u)
}

function Be(u) {
    return be(u)
}

async function Yn() {
    return await br()
}

function qe() {
    return "web"
}

function qt() {
    return "web"
}

function Kt() {
    return Q(Yu.publicKey)
}

function $n() {
    return Qu([Kt()])
}

function Qu(u) {
    const e = new ga.exports.Hash;
    return u.forEach(i => (typeof i == "string" && (i = new TextEncoder().encode(i)), e.update(i))), e.digest()
}

function Ht() {
    const u = navigator.userAgent.toLowerCase();
    return u.includes("win") ? a4 : u.includes("mac") ? k4 : u.includes("linux") ? g4 : u.includes("android") ? Tt : u.includes("iphone") || u.includes("ipad") ? _n : "Unknown OS"
}

async function uo(u, e) {
    for (let i = 0; i < 2; i++) {
        const a = e === void 0 ? await u.next() : await u.next(e);
        if (!(!a || (a == null ? void 0 : a.key_exchange))) return a
    }
}

function Jt() {
    return eo() || Wt.key || void 0
}

function eo() {
    return m.getItem("key") || void 0
}

function Gt() {
    return m.getItem("option:local:access_token") || void 0
}

function io() {
    return m.getItem("option:local:user_info") || void 0
}

function he() {
    return $u
}

function lt(u) {
    Wt.key = u
}

const x4 = {
        Alt: 56,
        AltGr: 57400,
        Backspace: 14,
        CapsLock: 58,
        ControlLeft: 29,
        ControlRight: 57373,
        Delete: 57427,
        UpArrow: 57416,
        DownArrow: 57424,
        LeftArrow: 57419,
        RightArrow: 57421,
        End: 57423,
        Escape: 1,
        F1: 59,
        F2: 60,
        F3: 61,
        F4: 62,
        F5: 63,
        F6: 64,
        F7: 65,
        F8: 66,
        F9: 67,
        F10: 68,
        F11: 87,
        F12: 88,
        F13: 100,
        F14: 101,
        F15: 102,
        F16: 103,
        F17: 104,
        F18: 105,
        F19: 106,
        F20: 107,
        F21: 108,
        F22: 109,
        F23: 110,
        F24: 118,
        Home: 57415,
        MetaLeft: 57435,
        PageDown: 57425,
        PageUp: 57417,
        Return: 28,
        ShiftLeft: 42,
        ShiftRight: 54,
        Space: 57,
        Tab: 15,
        PrintScreen: 57399,
        ScrollLock: 70,
        NumLock: 69,
        BackQuote: 41,
        Num1: 2,
        Num2: 3,
        Num3: 4,
        Num4: 5,
        Num5: 6,
        Num6: 7,
        Num7: 8,
        Num8: 9,
        Num9: 10,
        Num0: 11,
        Minus: 12,
        Equal: 13,
        KeyQ: 16,
        KeyW: 17,
        KeyE: 18,
        KeyR: 19,
        KeyT: 20,
        KeyY: 21,
        KeyU: 22,
        KeyI: 23,
        KeyO: 24,
        KeyP: 25,
        LeftBracket: 26,
        RightBracket: 27,
        BackSlash: 43,
        KeyA: 30,
        KeyS: 31,
        KeyD: 32,
        KeyF: 33,
        KeyG: 34,
        KeyH: 35,
        KeyJ: 36,
        KeyK: 37,
        KeyL: 38,
        SemiColon: 39,
        Quote: 40,
        IntlBackslash: 86,
        IntlRo: 115,
        IntlYen: 125,
        KanaMode: 112,
        KeyZ: 44,
        KeyX: 45,
        KeyC: 46,
        KeyV: 47,
        KeyB: 48,
        KeyN: 49,
        KeyM: 50,
        Comma: 51,
        Dot: 52,
        Slash: 53,
        Insert: 57426,
        KpMinus: 74,
        KpPlus: 78,
        KpMultiply: 55,
        KpDivide: 57397,
        KpDecimal: 83,
        KpReturn: 57372,
        KpEqual: 89,
        KpComma: 126,
        Kp0: 82,
        Kp1: 79,
        Kp2: 80,
        Kp3: 81,
        Kp4: 75,
        Kp5: 76,
        Kp6: 77,
        Kp7: 71,
        Kp8: 72,
        Kp9: 73,
        MetaRight: 57436,
        Apps: 57437,
        VolumeUp: 57392,
        VolumeDown: 57390,
        VolumeMute: 57376,
        Lang1: 123,
        Lang2: 121,
        Lang3: 120,
        Lang4: 119,
        Lang5: 118,
        Kana: 128,
        Hanja: 241
    }, to = {
        Alt: 64,
        AltGr: 108,
        Backspace: 22,
        CapsLock: 66,
        ControlLeft: 37,
        ControlRight: 105,
        Delete: 119,
        DownArrow: 116,
        End: 115,
        Escape: 9,
        F1: 67,
        F10: 76,
        F11: 95,
        F12: 96,
        F13: 191,
        F14: 192,
        F15: 193,
        F16: 194,
        F17: 195,
        F18: 196,
        F19: 197,
        F20: 198,
        F21: 199,
        F22: 200,
        F23: 201,
        F24: 202,
        F2: 68,
        F3: 69,
        F4: 70,
        F5: 71,
        F6: 72,
        F7: 73,
        F8: 74,
        F9: 75,
        Home: 110,
        LeftArrow: 113,
        MetaLeft: 133,
        PageDown: 117,
        PageUp: 112,
        Return: 36,
        RightArrow: 114,
        ShiftLeft: 50,
        ShiftRight: 62,
        Space: 65,
        Tab: 23,
        UpArrow: 111,
        PrintScreen: 107,
        ScrollLock: 78,
        Pause: 127,
        NumLock: 77,
        BackQuote: 49,
        Num1: 10,
        Num2: 11,
        Num3: 12,
        Num4: 13,
        Num5: 14,
        Num6: 15,
        Num7: 16,
        Num8: 17,
        Num9: 18,
        Num0: 19,
        Minus: 20,
        Equal: 21,
        KeyQ: 24,
        KeyW: 25,
        KeyE: 26,
        KeyR: 27,
        KeyT: 28,
        KeyY: 29,
        KeyU: 30,
        KeyI: 31,
        KeyO: 32,
        KeyP: 33,
        LeftBracket: 34,
        RightBracket: 35,
        KeyA: 38,
        KeyS: 39,
        KeyD: 40,
        KeyF: 41,
        KeyG: 42,
        KeyH: 43,
        KeyJ: 44,
        KeyK: 45,
        KeyL: 46,
        SemiColon: 47,
        Quote: 48,
        BackSlash: 51,
        IntlBackslash: 94,
        IntlRo: 97,
        IntlYen: 132,
        KanaMode: 101,
        KeyZ: 52,
        KeyX: 53,
        KeyC: 54,
        KeyV: 55,
        KeyB: 56,
        KeyN: 57,
        KeyM: 58,
        Comma: 59,
        Dot: 60,
        Slash: 61,
        Insert: 118,
        KpDecimal: 91,
        KpReturn: 104,
        KpMinus: 82,
        KpPlus: 86,
        KpMultiply: 63,
        KpDivide: 106,
        KpEqual: 125,
        KpComma: 129,
        Kp0: 90,
        Kp1: 87,
        Kp2: 88,
        Kp3: 89,
        Kp4: 83,
        Kp5: 84,
        Kp6: 85,
        Kp7: 79,
        Kp8: 80,
        Kp9: 81,
        MetaRight: 134,
        Apps: 135,
        VolumeUp: 123,
        VolumeDown: 122,
        VolumeMute: 121,
        Lang1: 102,
        Lang2: 100,
        Lang3: 98,
        Lang4: 99,
        Lang5: 93
    }, ao = {
        Alt: 57,
        AltGr: 58,
        Backspace: 67,
        CapsLock: 115,
        ControlLeft: 113,
        ControlRight: 114,
        Delete: 112,
        DownArrow: 20,
        End: 123,
        Escape: 111,
        F1: 131,
        F10: 140,
        F11: 141,
        F12: 142,
        F2: 132,
        F3: 133,
        F4: 134,
        F5: 135,
        F6: 136,
        F7: 137,
        F8: 138,
        F9: 139,
        Home: 3,
        LeftArrow: 21,
        MetaLeft: 117,
        PageDown: 93,
        PageUp: 92,
        Return: 66,
        RightArrow: 22,
        ShiftLeft: 59,
        ShiftRight: 60,
        Space: 62,
        Tab: 61,
        UpArrow: 19,
        PrintScreen: 120,
        ScrollLock: 116,
        NumLock: 143,
        Pause: 121,
        BackQuote: 75,
        Num1: 8,
        Num2: 9,
        Num3: 10,
        Num4: 11,
        Num5: 12,
        Num6: 13,
        Num7: 14,
        Num8: 15,
        Num9: 16,
        Num0: 7,
        Minus: 69,
        Equal: 70,
        KeyA: 29,
        KeyB: 30,
        KeyC: 31,
        KeyD: 32,
        KeyE: 33,
        KeyF: 34,
        KeyG: 35,
        KeyH: 36,
        KeyI: 37,
        KeyJ: 38,
        KeyK: 39,
        KeyL: 40,
        KeyM: 41,
        KeyN: 42,
        KeyO: 43,
        KeyP: 44,
        KeyQ: 45,
        KeyR: 46,
        KeyS: 47,
        KeyT: 48,
        KeyU: 49,
        KeyV: 50,
        KeyW: 51,
        KeyX: 52,
        KeyY: 53,
        KeyZ: 54,
        LeftBracket: 71,
        RightBracket: 72,
        SemiColon: 74,
        Quote: 75,
        BackSlash: 73,
        KanaMode: 218,
        Comma: 55,
        Dot: 56,
        Slash: 76,
        Insert: 124
    }, no = {
        226: "Alt",
        230: "AltGr",
        42: "Backspace",
        57: "CapsLock",
        224: "ControlLeft",
        228: "ControlRight",
        76: "Delete",
        82: "UpArrow",
        81: "DownArrow",
        80: "LeftArrow",
        79: "RightArrow",
        77: "End",
        41: "Escape",
        58: "F1",
        59: "F2",
        60: "F3",
        61: "F4",
        62: "F5",
        63: "F6",
        64: "F7",
        65: "F8",
        66: "F9",
        67: "F10",
        68: "F11",
        69: "F12",
        104: "F13",
        105: "F14",
        106: "F15",
        107: "F16",
        108: "F17",
        109: "F18",
        110: "F19",
        111: "F20",
        112: "F21",
        113: "F22",
        114: "F23",
        115: "F24",
        74: "Home",
        227: "MetaLeft",
        78: "PageDown",
        75: "PageUp",
        40: "Return",
        225: "ShiftLeft",
        229: "ShiftRight",
        44: "Space",
        43: "Tab",
        70: "PrintScreen",
        71: "ScrollLock",
        83: "NumLock",
        53: "BackQuote",
        30: "Num1",
        31: "Num2",
        32: "Num3",
        33: "Num4",
        34: "Num5",
        35: "Num6",
        36: "Num7",
        37: "Num8",
        38: "Num9",
        39: "Num0",
        45: "Minus",
        46: "Equal",
        20: "KeyQ",
        26: "KeyW",
        8: "KeyE",
        21: "KeyR",
        23: "KeyT",
        28: "KeyY",
        24: "KeyU",
        12: "KeyI",
        18: "KeyO",
        19: "KeyP",
        47: "LeftBracket",
        48: "RightBracket",
        49: "BackSlash",
        4: "KeyA",
        22: "KeyS",
        7: "KeyD",
        9: "KeyF",
        10: "KeyG",
        11: "KeyH",
        13: "KeyJ",
        14: "KeyK",
        15: "KeyL",
        51: "SemiColon",
        52: "Quote",
        100: "IntlBackslash",
        135: "IntlRo",
        137: "IntlYen",
        29: "KeyZ",
        27: "KeyX",
        6: "KeyC",
        25: "KeyV",
        5: "KeyB",
        17: "KeyN",
        16: "KeyM",
        54: "Comma",
        55: "Dot",
        56: "Slash",
        73: "Insert",
        86: "KpMinus",
        87: "KpPlus",
        85: "KpMultiply",
        84: "KpDivide",
        99: "KpDecimal",
        88: "KpReturn",
        103: "KpEqual",
        133: "KpComma",
        98: "Kp0",
        89: "Kp1",
        90: "Kp2",
        91: "Kp3",
        92: "Kp4",
        93: "Kp5",
        94: "Kp6",
        95: "Kp7",
        96: "Kp8",
        97: "Kp9",
        231: "MetaRight",
        128: "VolumeUp",
        129: "VolumeDown",
        127: "VolumeMute",
        139: "Lang1",
        138: "Lang2",
        146: "Lang3",
        147: "Lang4",
        148: "Lang5",
        155: "Cancel",
        156: "Clear",
        136: "Kana",
        145: "Hanja",
        119: "Select",
        116: "Execute",
        117: "Help",
        159: "Separator"
    }, oo = {
        KeyA: 0,
        KeyS: 1,
        KeyD: 2,
        KeyF: 3,
        KeyH: 4,
        KeyG: 5,
        KeyZ: 6,
        KeyX: 7,
        KeyC: 8,
        KeyV: 9,
        IntlBackslash: 10,
        KeyB: 11,
        KeyQ: 12,
        KeyW: 13,
        KeyE: 14,
        KeyR: 15,
        KeyY: 16,
        KeyT: 17,
        Num1: 18,
        Num2: 19,
        Num3: 20,
        Num4: 21,
        Num6: 22,
        Num5: 23,
        Equal: 24,
        Num9: 25,
        Num7: 26,
        Minus: 27,
        Num8: 28,
        Num0: 29,
        RightBracket: 30,
        KeyO: 31,
        KeyU: 32,
        LeftBracket: 33,
        KeyI: 34,
        KeyP: 35,
        Return: 36,
        KeyL: 37,
        KeyJ: 38,
        Quote: 39,
        KeyK: 40,
        SemiColon: 41,
        BackSlash: 42,
        Comma: 43,
        Slash: 44,
        KeyN: 45,
        KeyM: 46,
        Dot: 47,
        Tab: 48,
        Space: 49,
        BackQuote: 50,
        Backspace: 51,
        Escape: 53,
        MetaRight: 54,
        MetaLeft: 55,
        ShiftLeft: 56,
        CapsLock: 57,
        Alt: 58,
        ControlLeft: 59,
        ShiftRight: 60,
        AltGr: 61,
        ControlRight: 62,
        Function: 63,
        F17: 64,
        KpDecimal: 65,
        KpMultiply: 67,
        KpPlus: 69,
        NumLock: 71,
        VolumeUp: 72,
        VolumeDown: 73,
        VolumeMute: 74,
        KpDivide: 75,
        KpReturn: 76,
        KpMinus: 78,
        F18: 79,
        F19: 80,
        KpEqual: 81,
        Kp0: 82,
        Kp1: 83,
        Kp2: 84,
        Kp3: 85,
        Kp4: 86,
        Kp5: 87,
        Kp6: 88,
        Kp7: 89,
        F20: 90,
        Kp8: 91,
        Kp9: 92,
        IntlYen: 93,
        IntlRo: 94,
        KpComma: 95,
        F5: 96,
        F6: 97,
        F7: 98,
        F3: 99,
        F8: 100,
        F9: 101,
        Lang2: 102,
        F11: 103,
        Lang1: 104,
        F13: 105,
        F16: 106,
        F14: 107,
        F10: 109,
        F12: 111,
        F15: 113,
        Insert: 114,
        Home: 115,
        PageUp: 116,
        Delete: 117,
        F4: 118,
        End: 119,
        F2: 120,
        PageDown: 121,
        F1: 122,
        LeftArrow: 123,
        RightArrow: 124,
        DownArrow: 125,
        UpArrow: 126,
        Apps: 110
    }, ro = {
        AltLeft: "Alt",
        AltRight: "AltGr",
        Backspace: "Backspace",
        CapsLock: "CapsLock",
        ControlLeft: "ControlLeft",
        ControlRight: "ControlRight",
        Delete: "Delete",
        ArrowUp: "UpArrow",
        ArrowDown: "DownArrow",
        ArrowLeft: "LeftArrow",
        ArrowRight: "RightArrow",
        End: "End",
        Escape: "Escape",
        F1: "F1",
        F2: "F2",
        F3: "F3",
        F4: "F4",
        F5: "F5",
        F6: "F6",
        F7: "F7",
        F8: "F8",
        F9: "F9",
        F10: "F10",
        F11: "F11",
        F12: "F12",
        F13: "F13",
        F14: "F14",
        F15: "F15",
        F16: "F16",
        F17: "F17",
        F18: "F18",
        F19: "F19",
        F20: "F20",
        F21: "F21",
        F22: "F22",
        F23: "F23",
        F24: "F24",
        Home: "Home",
        MetaLeft: "MetaLeft",
        PageDown: "PageDown",
        PageUp: "PageUp",
        Enter: "Return",
        ShiftLeft: "ShiftLeft",
        ShiftRight: "ShiftRight",
        Space: "Space",
        Tab: "Tab",
        PrintScreen: "PrintScreen",
        ScrollLock: "ScrollLock",
        NumLock: "NumLock",
        Backquote: "BackQuote",
        Digit1: "Num1",
        Digit2: "Num2",
        Digit3: "Num3",
        Digit4: "Num4",
        Digit5: "Num5",
        Digit6: "Num6",
        Digit7: "Num7",
        Digit8: "Num8",
        Digit9: "Num9",
        Digit0: "Num0",
        Minus: "Minus",
        Equal: "Equal",
        KeyQ: "KeyQ",
        KeyW: "KeyW",
        KeyE: "KeyE",
        KeyR: "KeyR",
        KeyT: "KeyT",
        KeyY: "KeyY",
        KeyU: "KeyU",
        KeyI: "KeyI",
        KeyO: "KeyO",
        KeyP: "KeyP",
        BracketLeft: "LeftBracket",
        BracketRight: "RightBracket",
        Backslash: "BackSlash",
        KeyA: "KeyA",
        KeyS: "KeyS",
        KeyD: "KeyD",
        KeyF: "KeyF",
        KeyG: "KeyG",
        KeyH: "KeyH",
        KeyJ: "KeyJ",
        KeyK: "KeyK",
        KeyL: "KeyL",
        Semicolon: "SemiColon",
        Quote: "Quote",
        IntlBackslash: "IntlBackslash",
        IntlRo: "IntlRo",
        IntlYen: "IntlYen",
        KanaMode: "KanaMode",
        KeyZ: "KeyZ",
        KeyX: "KeyX",
        KeyC: "KeyC",
        KeyV: "KeyV",
        KeyB: "KeyB",
        KeyN: "KeyN",
        KeyM: "KeyM",
        Comma: "Comma",
        Period: "Dot",
        Slash: "Slash",
        Insert: "Insert",
        NumpadSubtract: "KpMinus",
        NumpadAdd: "KpPlus",
        NumpadMultiply: "KpMultiply",
        NumpadDivide: "KpDivide",
        NumpadDecimal: "KpDecimal",
        NumpadEnter: "KpReturn",
        NumpadEqual: "KpEqual",
        NumpadComma: "KpComma",
        Numpad0: "Kp0",
        Numpad1: "Kp1",
        Numpad2: "Kp2",
        Numpad3: "Kp3",
        Numpad4: "Kp4",
        Numpad5: "Kp5",
        Numpad6: "Kp6",
        Numpad7: "Kp7",
        Numpad8: "Kp8",
        Numpad9: "Kp9",
        MetaRight: "MetaRight",
        ContextMenu: "Apps",
        AudioVolumeUp: "VolumeUp",
        AudioVolumeDown: "VolumeDown",
        AudioVolumeMute: "VolumeMute",
        NonConvert: "Lang1",
        Convert: "Lang2",
        Lang3: "Lang3",
        Lang4: "Lang4",
        Lang5: "Lang5"
    },
    so = new Set(["BackQuote", "Num1", "Num2", "Num3", "Num4", "Num5", "Num6", "Num7", "Num8", "Num9", "Num0", "Minus", "Equal", "KeyA", "KeyB", "KeyC", "KeyD", "KeyE", "KeyF", "KeyG", "KeyH", "KeyI", "KeyJ", "KeyK", "KeyL", "KeyM", "KeyN", "KeyO", "KeyP", "KeyQ", "KeyR", "KeyS", "KeyT", "KeyU", "KeyV", "KeyW", "KeyX", "KeyY", "KeyZ", "LeftBracket", "RightBracket", "BackSlash", "SemiColon", "Quote", "Comma", "Dot", "Slash", "IntlBackslash", "Space"]),
    Eo = new Set(["Kp0", "Kp1", "Kp2", "Kp3", "Kp4", "Kp5", "Kp6", "Kp7", "Kp8", "Kp9", "KpMinus", "KpMultiply", "KpDivide", "KpPlus", "KpDecimal"]);
let ve = !1, ru = !1;
const w = {};
w[mn] = !1;
w[Fn] = !1;
w[ke] = !1;
w[zt] = !1;
w[v4] = !1;
w[Pt] = !1;
w[Rt] = !1;
w[It] = !1;
const xe = {}, y4 = u => Eo.has(u), b4 = u => so.has(u), lo = () => w[ke] || w[zt] || w[v4] || w[Pt] || w[Rt] || w[It];
let _, Ke = !1;

function Do() {
    if (Ke) {
        console.info("Keyboard event listener is already started");
        return
    }
    document.addEventListener("keydown", He), document.addEventListener("keyup", He), _ || (_ = document.createElement("div"), _.setAttribute("contenteditable", "true"), _.id = "hiddenInput", _.style.position = "absolute", _.style.left = "-9999px", _.style.height = "1px", _.style.width = "1px", document.body.appendChild(_), $u ? _.addEventListener("input", Je) : (Ye || Xu) && _.addEventListener("compositionend", Je), _.focus()), Ke = !0, console.info("Keyboard event listener started")
}

function p4() {
    if (!Ke) {
        console.info("Keyboard event listener is not started");
        return
    }
    document.removeEventListener("keydown", He), document.removeEventListener("keyup", He), _ && ($u || Ye ? _.removeEventListener("input", Je) : Xu && _.removeEventListener("compositionend", Je), _.remove(), _ = void 0), Ke = !1, console.info("Keyboard event listener stopped")
}

function w4(u, e) {
    u.sendMessage({key_event: e})
}

function He(u) {
    const e = i0();
    if (!e) return;
    const i = u.type === "keydown";
    i && !ru && u.preventDefault(), Zt(e, u, i)
}

function Je(u) {
    var a, t;
    const e = i0();
    if (!e) return;
    u.preventDefault();
    let i = null;
    if ((u instanceof InputEvent || u instanceof CompositionEvent) && (i = u.data), !i) return;
    const n = S.fromPartial({seq: i, mode: Fe.Translate, down: !0, press: !1});
    w4(e, n), ((t = (a = _ == null ? void 0 : _.textContent) == null ? void 0 : a.length) != null ? t : 0) > 10 && (_.textContent = "")
}

function Zt(u, e, i) {
    const n = po(u, e, i);
    for (const a of n) w4(u, a)
}

function co(u, e, i, n) {
    const a = no[e];
    if (!a) {
        console.error("Unknown USB HID code " + e);
        return
    }
    const t = Ge(u, a, i);
    if (!t) return;
    const s = y4(a), E = b4(a);
    (E || s) && Qt(t, n, s, E);
    for (const l of t) w4(u, l)
}

function Co() {
    const u = i0();
    if (!!u) for (const e in xe) {
        const i = xe[e];
        i && Zt(u, i, !1)
    }
}

function po(u, e, i) {
    var d;
    const n = e.code, a = ro[n];
    if (!a) return console.error("Key code is not supported " + n), [];
    const t = u.getOption("keyboard_mode"), s = Bo(e);
    mo(e, i), i ? xe[n] = e : delete xe[n];
    let E = [];
    switch (t) {
        case An:
            E = (d = Ge(u, a, i)) != null ? d : [];
            break;
        case ot:
            E = Fo(u, e, a, i);
            break
    }
    if (!E) return [];
    const l = y4(a);
    if (t !== ot || l) {
        const c = b4(a);
        Qt(E, s, l, c)
    }
    return E
}

function Qt(u, e, i, n) {
    for (const s of u) n && (e & 1 << 1) != 0 && s.modifiers.push(j.CapsLock), i && (e & 1 << 2) != 0 && s.modifiers.push(j.NumLock)
}

function Bo(u) {
    let a = 0;
    return u.getModifierState("CapsLock") && (a |= 1 << 1), u.getModifierState("NumLock") && (a |= 1 << 2), u.getModifierState("ScrollLock") && (a |= 1 << 3), a
}

function Ao(u, e) {
    return u == a4 ? x4[e] : u == g4 ? to[e] : u == Tt ? ao[e] : u == k4 ? (m.getItem("option:local:kb_layout") == gn && (e == "IntlBackslash" ? e = "BackQuote" : e == "BackQuote" && (e = "IntlBackslash")), oo[e]) : null
}

function mo(u, e) {
    const i = u.code;
    i in w && (w[i] = e)
}

function Ge(u, e, i) {
    const n = u.getPeerPlatform(), a = u.isSwapControlCommand();
    e == "ControlLeft" || e == "ControlRight" ? a && (e = "MetaLeft") : (e == "MetaLeft" || e == "MetaRight") && a && (e = "ControlLeft");
    const t = Ao(n, e);
    return t == null ? (console.error("Unknown key code " + e + " for platform " + n), []) : [S.fromPartial({
        chr: t,
        mode: Fe.Map,
        down: i,
        press: !1
    })]
}

function Fo(u, e, i, n) {
    const a = _ === document.activeElement;
    if (_ && _.focus(), Ye && _ && a && e.key === "Process") return [];
    const t = b4(i), s = e.key === "Dead";
    if (n && ru && t) return Xu ? ru = s : ru = !1, [];
    if (s) return n && (Xu ? ru = !0 : ru = !ru), ru && _ && !a && $u && _.dispatchEvent(new KeyboardEvent(e.type, {...e})), [];
    if (ru = !1, !Xu && y4(i)) return Ge(u, i, n);
    if (Xu && e.code === "AltRight") return [];
    if (e.key === "AltGraph") return ve && !n && (ve = !1), !ve && n && w[ke] ? (ve = !0, w[ke] = !1, delete xe[ke], [S.fromPartial({
        chr: x4.ControlLeft,
        mode: Fe.Map,
        down: !1,
        press: !1
    })]) : [];
    const l = u.getPeerPlatform();
    let d = [];
    return $u && (d = _o(l, e, n)), ($u || Ye) && d.length === 0 && n && t && (d = Dt(e, n)), $u && ve || (Xu && n && t && !w[v4] && d.push(...Dt(e, n)), d.length === 0 && d.push(...Ge(u, i, n))), d
}

function _o(u, e, i) {
    if (u !== a4 || !lo()) return [];
    let n;
    const a = x4[e.code];
    return a === void 0 ? (console.error("Key code cannot be converted to scan code: " + e.code), []) : (i ? e.key.length === 1 && (n = e.key.charCodeAt(0) & 65535 | a << 16) : n = a << 16, n === void 0 ? [] : [S.fromPartial({
        win2win_hotkey: n,
        mode: Fe.Translate,
        down: i,
        press: !1
    })])
}

function Dt(u, e) {
    return u.key ? [S.fromPartial({seq: u.key, mode: Fe.Translate, down: e, press: !1})] : []
}

class vo {
    constructor(e, i, n, a) {
        D(this, "_uri");
        D(this, "_feedback");
        D(this, "_key");
        D(this, "_token");
        D(this, "_ws");
        D(this, "_interval");
        D(this, "_keepAlive");
        D(this, "_lastRecvMsg");
        D(this, "_aliveFailed");
        this._uri = e, this._feedback = i, this._key = n, this._token = a, this._keepAlive = wn, this._lastRecvMsg = new Date, this._aliveFailed = !1
    }

    close() {
        var e;
        this._interval && (clearInterval(this._interval), this._interval = void 0), (e = this._ws) == null || e.close(), this._ws = void 0
    }

    async start() {
        if (this._feedback == 0 || !this._uri || !this._token || !this._key) return;
        const e = new Ve(this._uri, !0, "health check");
        await e.open(), console.log(new Date + ": Connected to relay server"), this._ws = e;
        const i = Zu.fromPartial({token: this._token});
        e.sendRendezvous({hc: i}), this.startInterval(), await this.msgLoop(), this.close()
    }

    startInterval() {
        this._interval = setInterval(() => {
            new Date().getTime() - this._lastRecvMsg.getTime() > this._keepAlive * 3 / 2 && (this._aliveFailed = !0)
        }, bn)
    }

    async msgLoop() {
        var e;
        for (this._lastRecvMsg = new Date; ;) {
            if (!this._ws) {
                console.info("HC connection is closed as controlling connection exits");
                break
            }
            try {
                const i = await ((e = this._ws) == null ? void 0 : e.next(300));
                i && (this._lastRecvMsg = new Date, this.handleMsg(i))
            } catch (i) {
                if (i === "Timeout") {
                    if (this._aliveFailed) {
                        console.error("HC connection is timeout");
                        break
                    }
                } else {
                    console.error("An error occurred on health check:", i);
                    break
                }
            }
        }
    }

    handleMsg(e) {
        var i;
        if (e instanceof Uint8Array) {
            (i = this._ws) == null || i.sendBytes(new Uint8Array);
            return
        } else {
            const n = e.register_pk_response;
            n && n.keep_alive > 0 && (this._keepAlive = n.keep_alive * 1e3, console.log("keep_alive: " + this._keepAlive + "ms"))
        }
    }
}

let Ae = [], me = "", Ze = [], ye = [], Qe, B4 = !1;
const S4 = ["text/plain", "text/html", "image/svg+xml", "image/png"];

function z4() {
    Ze = [], ye = [], Qe = void 0
}

function go(u) {
    B4 = u
}

async function ko() {
    try {
        Ae = await navigator.clipboard.read(), Ae.length === 0 && (me = await navigator.clipboard.readText())
    } catch (u) {
        console.error("Failed to read clipboard items before connection, ", u)
    }
}

async function Xt(u) {
    if (!B4) {
        var e = [], i = "";
        for (let n = 0; n < 3; n++) try {
            e = await navigator.clipboard.read(), e.length === 0 && (i = await navigator.clipboard.readText());
            break
        } catch (a) {
            if (a.name === "NotAllowedError" && a.message.includes("Document is not focused")) await new Promise(t => setTimeout(t, 300)); else return
        }
        e.length === 0 && i === "" || (B4 = !0, await ho(e) ? (Ae = e, await xo(u)) : i !== me && (me = i, await yo(u)))
    }
}

async function ho(u) {
    if (u.length !== Ae.length) return !0;
    for (let e = 0; e < u.length; e++) {
        const i = u[e], n = Ae[e];
        if (!await fo(i, n)) return !0
    }
    return !1
}

async function fo(u, e) {
    if (u.types.length !== e.types.length) return !1;
    for (let i = 0; i < u.types.length; i++) {
        if (u.types[i] !== e.types[i]) return !1;
        if (!S4.includes(u.types[i])) continue;
        const n = await u.getType(u.types[i]), a = await e.getType(e.types[i]);
        if (n.size !== a.size) return !1;
        const t = new Uint8Array(await n.arrayBuffer()), s = new Uint8Array(await a.arrayBuffer());
        for (let E = 0; E < t.length; E++) if (t[E] !== s[E]) return !1
    }
    return !0
}

function Yt(u) {
    switch (u) {
        case"text/plain":
            return Du.Text;
        case"text/html":
            return Du.Html;
        case"image/svg+xml":
            return Du.ImageSvg;
        case"image/png":
            return Du.ImagePng;
        default:
            return Du.UNRECOGNIZED
    }
}

async function xo(u) {
    const e = [], i = (await Promise.all(Ae.map(async n => {
        const a = [];
        for (const t of n.types) {
            if (!S4.includes(t)) continue;
            const s = await n.getType(t);
            e.push(t), a.push(new Uint8Array(await s.arrayBuffer()))
        }
        return a
    }))).flat();
    e.length !== 0 && da(i, !0, n => {
        const a = n.map((t, s) => {
            let E = !1;
            t && (E = t.length < me.length);
            const l = E && t != null ? t : i[s];
            return W.fromPartial({content: l, compress: E, format: Yt(e[s])})
        });
        u.sendMessage(au.fromPartial({multi_clipboards: hu.fromPartial({clipboards: a})}))
    })
}

async function yo(u) {
    const e = new TextEncoder().encode(me);
    da(e, !1, i => {
        let n = !1;
        i && (n = i.length < me.length);
        const a = n && i != null ? i : e;
        let t = W.fromPartial({content: a, compress: n, format: Du.Text});
        u.sendMessage(au.fromPartial({clipboard: t}))
    })
}

function P4(u, e = void 0) {
    const i = () => {
        try {
            xr(new TextDecoder().decode(u.content)), z4(), e == null || e()
        } catch (n) {
            console.error("Failed to copy to clipboard, ", n), document.hasFocus() || (Qe = u)
        }
    };
    u.compress ? M4(u.content, !1, n => {
        n && (u.content = n, i())
    }) : i()
}

const Oe = document.createElement("canvas"), E4 = Oe.getContext("2d");

function bo(u, e, i) {
    if (Oe.width = e, Oe.height = i, !E4) return new Uint8Array(0);
    const n = E4.createImageData(e, i);
    return n.data.set(u), E4.putImageData(n, 0, 0), Uint8Array.from(atob(Oe.toDataURL("image/png").split(",")[1]), a => a.charCodeAt(0))
}

function wo(u, e = void 0) {
    z4();
    const i = u.clipboards, n = i.filter(a => a.compress).map(a => a.content);
    M4(n, !0, async a => {
        var d;
        let t = 0;
        for (const c of i) c.compress && (c.content = (d = a[t]) != null ? d : c.content, t++), c.compress = !1;
        const s = {};
        for (const c of i) {
            const p = S4.find(B => c.format === Yt(B));
            if (p) {
                const B = new Blob([c.content], {type: p});
                s[p] = B
            }
        }
        if (!(s["image/png"] !== void 0)) {
            for (const c of i) if (c.format === Du.ImageRgba) {
                const p = bo(c.content, c.width, c.height);
                p.length > 0 && (s["image/png"] = new Blob([p], {type: "image/png"}));
                break
            }
        }
        if (Object.keys(s).length === 0) return;
        const l = new ClipboardItem(s);
        await $t(i, l, e)
    })
}

async function $t(u, e, i = void 0) {
    if (!document.hasFocus()) {
        Ze = u, ye = [e];
        return
    }
    try {
        await navigator.clipboard.write([e]), z4(), i == null || i()
    } catch (n) {
        if (console.error("Failed to write to clipboard, ", n), !document.hasFocus()) {
            Ze = u, ye = [e];
            return
        }
        const a = u.find(t => t.format === Du.Text);
        a && P4(a, i)
    }
}

function dt() {
    pr("info", "Clipboard is synchronized", 2e3)
}

window.addEventListener("focus", function () {
    ye.length > 0 ? $t(Ze, ye[0], dt) : Qe && P4(Qe, dt)
});

class So {
    constructor({id: e, path: i}) {
        D(this, "id");
        D(this, "path");
        D(this, "empty_dirs");
        this.id = e, this.path = i, this.empty_dirs = void 0
    }
}

const su = class {
    constructor({
                    id: e,
                    remote: i,
                    path: n,
                    show_hidden: a,
                    is_remote: t,
                    is_last_job: s,
                    file_num: E,
                    files: l,
                    conn_id: d,
                    total_size: c,
                    finished_size: p,
                    transferred: B,
                    enable_overwrite_detection: F,
                    file_confirmed: b,
                    file_skipped: x,
                    file_is_waiting: k,
                    is_dir: M
                }) {
        D(this, "id");
        D(this, "remote");
        D(this, "path");
        D(this, "show_hidden");
        D(this, "is_remote");
        D(this, "is_last_job");
        D(this, "file_num");
        D(this, "files");
        D(this, "conn_id");
        D(this, "total_size");
        D(this, "finished_size");
        D(this, "transferred");
        D(this, "lastTransferred");
        D(this, "enable_overwrite_detection");
        D(this, "file_confirmed");
        D(this, "file_skipped");
        D(this, "file_is_waiting");
        D(this, "default_overwrite_strategy");
        D(this, "is_dir");
        D(this, "stream");
        D(this, "writer");
        D(this, "zip");
        D(this, "currentData");
        D(this, "fileHandles");
        D(this, "currentReader");
        D(this, "write", async (e, i) => {
            var t;
            if (e.id !== this.id) throw new Error("Wrong id");
            const n = e.file_num;
            if (n >= this.files.length) throw new Error("Wrong file number");
            const a = this.is_dir;
            if (n !== this.file_num || a && !this.zip || !a && !this.writer) if (a) {
                if (this.zip || (this.zip = new H4), this.currentData) {
                    const s = this.files[this.file_num];
                    this.zip.file(s.name, this.currentData), this.currentData = void 0
                }
                this.file_num = e.file_num
            } else {
                this.writer && await this.writer.close(), this.stream && (this.stream = void 0), this.file_num = e.file_num;
                const s = this.files[n], E = su.join(this.path, s.name);
                this.stream = streamSaver.createWriteStream(E, {size: s.size}), this.writer = (t = this.stream) == null ? void 0 : t.getWriter()
            }
            if (e.compressed) {
                const s = await Ca(e.data);
                if (!s) throw new Error("Failed to decompress");
                if (a) this.currentData ? this.currentData = new Uint8Array([...this.currentData, ...s]) : this.currentData = s; else {
                    if (!this.writer) throw new Error("file is None");
                    try {
                        await this.writer.write(s)
                    } catch (E) {
                        throw A4(this.id, "write failed", this.file_num), i(), E
                    }
                }
                this.finished_size += s.length
            } else {
                if (a) this.currentData ? this.currentData = new Uint8Array([...this.currentData, ...e.data]) : this.currentData = e.data; else {
                    if (!this.writer) throw new Error("file is None");
                    try {
                        await this.writer.write(e.data)
                    } catch (s) {
                        throw A4(this.id, "write failed", this.file_num), i(), s
                    }
                }
                this.finished_size += e.data.length
            }
            this.transferred += e.data.length
        });
        D(this, "read", async e => {
            var d;
            let i = this.file_num;
            if (i >= this.files.length) {
                (d = this.currentReader) == null || d.cancel(), this.currentReader = void 0;
                return
            }
            let n = this.files[i];
            if (!this.currentReader) {
                if (!this.fileHandles || !this.fileHandles[i]) throw new Error("file is None");
                let p = (await this.fileHandles[i].getFile()).stream();
                this.currentReader = p.getReader({mode: "byob"}), this.file_confirmed = !1, this.file_is_waiting = !1
            }
            if (this.enable_overwrite_detection && !this.file_confirmed) {
                this.file_is_waiting || (this.send_current_digest(e), this.file_is_waiting = !0);
                return
            }
            const a = 128 * 1024;
            let t = new ArrayBuffer(a), s = !1, E = 0;
            for (; E < t.byteLength;) {
                const {value: c, done: p} = await this.currentReader.read(new Uint8Array(t, E, t.byteLength - E));
                if (!c) {
                    this.file_num += 1, this.file_confirmed = !1, this.file_is_waiting = !1, this.currentReader = void 0, t = new ArrayBuffer(0);
                    break
                }
                if (E += c.byteLength, t = c.buffer, p) break
            }
            let l = new Uint8Array(t, 0, E);
            if (E === 0) this.file_num += 1, this.currentReader = void 0, this.file_confirmed = !1, this.file_is_waiting = !1; else {
                if (this.finished_size += E, !Jo(su.join(this.path, n.name))) {
                    const c = await ca(new Uint8Array(t, 0, E));
                    if (c) c.length < E && (l = new Uint8Array(c), s = !0); else throw new Error("Failed to compress")
                }
                this.transferred += E
            }
            return zu.fromPartial({id: this.id, file_num: i, data: l, compressed: s})
        });
        D(this, "send_current_digest", async e => {
            if (!this.fileHandles || !this.fileHandles[this.file_num]) throw new Error("file is None");
            let i = await this.fileHandles[this.file_num].getFile();
            if (!i) throw new Error("file is None");
            let n = Math.floor(i.lastModified / 1e3), a = i.size,
                t = Su.fromPartial({id: this.id, file_num: this.file_num, last_modified: n, file_size: a}),
                s = ou.fromPartial({digest: t}), E = au.fromPartial({file_response: s});
            e(E)
        });
        D(this, "read_digest", e => {
            let i = this.files[e.file_num], n = su.join(this.path, i.name), a = this.default_overwrite_strategy;
            if (a !== void 0) {
                let t = du.fromPartial({
                    id: e.id,
                    file_num: e.file_num,
                    offset_blk: a ? 0 : void 0,
                    skip: a ? void 0 : !0
                });
                return this.confirm(t), su.new_send_confirm(t)
            } else {
                Go(e.id, e.file_num, n, !0, e.is_identical);
                return
            }
        });
        D(this, "write_digest", e => {
            let i = du.fromPartial({id: e.id, file_num: e.file_num, offset_blk: 0});
            return this.confirm(i), su.new_send_confirm(i)
        });
        D(this, "write_done", (e, i, n) => {
            if (this.writer) {
                this.writer.close();
                return
            }
            if (this.zip || (this.zip = new H4), this.currentData) {
                const t = this.files[this.file_num];
                this.zip.file(t.name, this.currentData), this.currentData = void 0
            }
            if (i != null) {
                const t = i();
                if (t != null) if (t.empty_dirs != null) for (let s of t.empty_dirs) {
                    var a = s.substring(t.path.length + 1);
                    he() ? a = a.replace(/\//g, "\\") : a = a.replace(/\\/g, "/"), this.zip.folder(a)
                } else {
                    setTimeout(() => {
                        this.write_done(e, i, n)
                    }, 1e3);
                    return
                }
            }
            this.zip.generateAsync({type: "blob"}).then(t => {
                ka.exports.saveAs(t, `${this.path}.zip`)
            }), n()
        });
        D(this, "confirm", e => (this.file_num !== e.file_num ? console.log("file num truncated, ignoring") : e.skip !== void 0 ? e.skip ? this.set_file_skipped() : this.set_file_confirmed(!0) : e.offset_blk !== void 0 && this.set_file_confirmed(!0), !0));
        D(this, "set_file_skipped", () => {
            var e;
            (e = this.writer) == null || e.abort(), this.writer = void 0, this.stream = void 0, this.set_file_confirmed(!1), this.set_file_is_waiting(!1), this.file_num += 1, this.file_skipped = !0
        });
        D(this, "set_file_confirmed", e => {
            this.file_confirmed = e, this.file_skipped = !1
        });
        D(this, "set_file_is_waiting", e => {
            this.file_is_waiting = e
        });
        D(this, "update_job_status", e => {
            if (e <= 0) return;
            let i = Math.floor((this.transferred - this.lastTransferred) / (e * 1 / 1e3));
            this.lastTransferred = this.transferred;
            let n = this.file_num - 1;
            this.job_progress(this.id, n, i, this.finished_size)
        });
        D(this, "job_progress", (e, i, n, a) => {
            A("job_progress", {
                id: e.toString(),
                file_num: i.toString(),
                speed: n.toString(),
                finished_size: a.toString()
            })
        });
        D(this, "job_skipped", () => this.file_skipped && this.files.length === 1);
        D(this, "job_error", () => {
            if (this.job_skipped()) return "skipped"
        });
        D(this, "job_completed", () => !this.enable_overwrite_detection || !this.file_confirmed && !this.file_is_waiting);
        D(this, "remove_download_file", () => {
            if (this.writer) try {
                this.writer.abort()
            } catch {
            }
            this.writer = void 0, this.stream = void 0, this.currentData = void 0, this.zip = void 0
        });
        this.id = e, this.remote = i, this.path = n, this.show_hidden = a, this.is_remote = t, this.is_last_job = s, this.file_num = E, this.files = l, this.conn_id = d, this.total_size = c, this.finished_size = p, this.transferred = B, this.lastTransferred = 0, this.enable_overwrite_detection = F, this.file_confirmed = b, this.file_skipped = x, this.file_is_waiting = k, this.is_dir = M
    }
};
let Eu = su;
D(Eu, "newWrite", (e, i, n, a, t, s, E, l, d) => {
    let c = E.reduce((B, F) => B + F.size, 0);
    return new su({
        id: e,
        remote: i,
        path: n,
        file_num: a,
        show_hidden: t,
        is_remote: s,
        files: E,
        total_size: c,
        enable_overwrite_detection: l,
        is_dir: d,
        is_last_job: !1,
        conn_id: 0,
        finished_size: 0,
        transferred: 0,
        file_confirmed: !1,
        file_skipped: !1,
        file_is_waiting: !1
    })
}), D(Eu, "newRead", (e, i, n, a, t, s, E, l, d) => {
    let c = E.reduce((B, F) => B + F.size, 0), p = new su({
        id: e,
        remote: i,
        path: n,
        file_num: a,
        show_hidden: t,
        is_remote: s,
        files: E,
        total_size: c,
        enable_overwrite_detection: l,
        is_dir: !1,
        is_last_job: !1,
        conn_id: 0,
        finished_size: 0,
        transferred: 0,
        file_confirmed: !1,
        file_skipped: !1,
        file_is_waiting: !1
    });
    return p.fileHandles = d, p
}), D(Eu, "new_send_confirm", e => au.fromPartial({file_action: I.fromPartial({send_confirm: e})})), D(Eu, "join", (e, i) => i === "" ? e : e.endsWith("/") || e.endsWith("\\") ? e + i : he() ? e + "\\" + i : e + "/" + i);
const zo = (u, e, i, n) => {
    let a = Ru.fromPartial({id: u, path: e, include_hidden: n, file_num: i});
    return I.fromPartial({send: a})
}, ct = (u, e, i, n) => {
    if (!n) return;
    let a = Nu.fromPartial({id: u, path: e, file_num: i});
    return I.fromPartial({remove_file: a})
}, Po = (u, e, i) => {
    let n = yu.fromPartial({id: u, path: e, include_hidden: i});
    return I.fromPartial({all_files: n})
}, Ro = (u, e) => {
    let i = Ou.fromPartial({id: u, path: e});
    return I.fromPartial({create: i})
}, Io = u => {
    let e = wu.fromPartial({id: u});
    return I.fromPartial({cancel: e})
}, To = (u, e) => {
    let i = ju.fromPartial({id: u, path: e, recursive: !0});
    return I.fromPartial({remove_dir: i})
}, jo = (u, e, i) => {
    let n = bu.fromPartial({id: u, path: e, new_name: i});
    return I.fromPartial({rename: n})
}, No = (u, e, i, n, a) => {
    let t = Tu.fromPartial({id: u, path: e, file_num: i, files: n, total_size: a});
    return I.fromPartial({receive: t})
}, Oo = u => {
    let e = ou.fromPartial({block: u});
    return au.fromPartial({file_response: e})
}, Ct = (u, e, i) => {
    let n = ou.fromPartial({error: Pu.fromPartial({id: u, error: e, file_num: i})});
    return au.fromPartial({file_response: n})
}, Uo = (u, e) => {
    let i = ou.fromPartial({done: Iu.fromPartial({id: u, file_num: e})});
    return au.fromPartial({file_response: i})
}, Mo = (u, e) => {
    let i = xu.fromPartial({path: u, include_hidden: e});
    return I.fromPartial({read_empty_dirs: i})
}, pt = (u, e, i, n, a) => {
    a ? A("update_folder_files", {info: Lo(u, e, a)}) : A("file_dir", {is_local: "false", value: Wo(u, i, e)})
}, Lo = (u, e, i) => {
    let n = {
        id: u,
        entries: e.map(a => ({name: a.name, type: a.entry_type, time: a.modified_time, size: a.size})),
        total_size: e.reduce((a, t) => a + t.size, 0)
    };
    return i && (n.num_entries = e.length, delete n.entries), JSON.stringify(n)
}, Wo = (u, e, i) => {
    let n = {
        id: u,
        path: e,
        entries: i.map(a => ({entry_type: a.entry_type, name: a.name, size: a.size, modified_time: a.modified_time}))
    };
    return JSON.stringify(n)
}, A4 = (u, e, i) => {
    A("job_error", {id: u.toString(), err: e, file_num: i.toString()})
}, Vo = (u, e) => {
    A("job_done", {id: u.toString(), file_num: e.toString()})
};
var t0 = 0;
const qo = async (u, e) => {
    try {
        if (u) {
            const i = await window.showDirectoryPicker();
            let n = {name: i.name, size: 0, entry_type: 2, modified_time: 0};
            t0++, e(t0, i), A("selected_files", {handleIndex: t0, file: n})
        } else {
            const i = {multiple: !0}, n = await window.showOpenFilePicker(i);
            for (const a of n) {
                const t = await a.getFile();
                let s = {name: t.name, size: t.size, entry_type: 4, modified_time: Math.floor(t.lastModified / 1e3)};
                t0++, e(t0, a), A("selected_files", {handleIndex: t0, file: s})
            }
        }
    } catch (i) {
        console.error("Failed to choose file:", i)
    }
}, Ko = async (u, e) => {
    let i = [];
    for (let n of u) if (!n.is_last_job) try {
        let a = await n.read(e);
        if (a) e(Oo(a)); else if (n.job_completed()) {
            i.push(n.id);
            let t = n.job_error();
            e(t ? Ct(n.id, t, n.file_num) : Uo(n.id, n.file_num))
        }
    } catch (a) {
        e(Ct(n.id, (a != null ? a : "read failed").toString(), n.file_num))
    }
    return i
}, Ho = u => {
    let e = u.lastIndexOf(".");
    return e >= 0 ? u.substring(e + 1) : ""
}, Jo = u => {
    let e = Ho(u);
    return e === "xz" || e === "gz" || e === "zip" || e === "7z" || e === "rar" || e === "bz2" || e === "tgz" || e === "png" || e === "jpg"
}, Go = (u, e, i, n, a) => {
    A("override_file_confirm", {
        id: u.toString(),
        file_num: e.toString(),
        read_path: i,
        is_upload: n.toString(),
        is_identical: a.toString()
    })
}, Xe = (u, e) => u === "" ? e : Eu.join(u, e), ua = async (u, e) => {
    const i = [];
    let n = [];
    for await(const a of u.values()) if (a.kind === "file") i.push(a.getFile().then(t => {
        n.push({
            entry: V.fromPartial({
                name: Xe(e, t.name),
                size: t.size,
                entry_type: ft.File,
                modified_time: Math.floor(t.lastModified / 1e3)
            }), handle: a
        })
    })); else if (a.kind === "directory") {
        let t = Xe(e, a.name);
        const s = await ua(a, t);
        n = n.concat(s)
    }
    return await Promise.all(i), n
}, ea = async (u, e) => {
    let i = [], n = !0;
    for await(const a of u.values()) {
        if (a.kind === "directory") {
            let t = Xe(e, a.name);
            const s = await ea(a, t);
            i = i.concat(s)
        }
        n = !1
    }
    return n && i.push(Xe(e, "")), i
}, Bt = 21116, ia = "rs-ny.rustdesk.com";

function Zo() {
    const u = window.location.host;
    if (u.indexOf("rustdesk.com") >= 0) return ia;
    if (window.location.host.indexOf("localhost:") == 0) return "127.0.0.1";
    const e = u.split(":");
    return e.length > 1 ? e[0] + ":" + (parseInt(e[1]) + 2) : u
}

const Qo = Zo(), At = 100, Ie = "trust-this-device";

class ta {
    constructor() {
        D(this, "_msgs");
        D(this, "_ws");
        D(this, "_interval");
        D(this, "_updateInterval");
        D(this, "_id");
        D(this, "_otherServer");
        D(this, "_hash");
        D(this, "_msgbox");
        D(this, "_draw");
        D(this, "_peerInfo");
        D(this, "_firstFrame");
        D(this, "_frameCount");
        D(this, "_videoFormat");
        D(this, "_password");
        D(this, "_presetPassword");
        D(this, "_sharedPassword");
        D(this, "_passwordSource");
        D(this, "_options");
        D(this, "_fpsCalc");
        D(this, "_updateTs");
        D(this, "_serverPerms");
        D(this, "_elevationRequested");
        D(this, "_supportedEncoding");
        D(this, "_i444");
        D(this, "_healthCheck");
        D(this, "_sessionId");
        D(this, "_isFileTransfer");
        D(this, "_isViewCamera");
        D(this, "_readJobs");
        D(this, "_writeJobs");
        D(this, "_removeJobs");
        D(this, "_readRemoteEmptyDirsJobs");
        D(this, "_last_update_jobs_ms");
        D(this, "_fileHandles");
        D(this, "_ftTimer");
        D(this, "_restartingRemoteDevice");
        D(this, "_enableTrustedDevices");
        D(this, "_lastChangeDisplay");
        D(this, "_lastSendFps");
        D(this, "_videoQueue");
        D(this, "_decodingVideo");
        D(this, "_selectedWindowsSessionId");
        D(this, "enableEmptyDirs", () => {
            var e;
            return L((e = this._peerInfo) == null ? void 0 : e.version) >= L("1.3.3")
        });
        D(this, "enableOverwriteDetection", () => {
            var e;
            return L((e = this._peerInfo) == null ? void 0 : e.version) >= L("1.1.10")
        });
        this._msgbox = aa, this._draw = F4, this._msgs = [], this._id = "", this._frameCount = {}, this._fpsCalc = {
            videoTestSpeed: [0, 0],
            skipBegining: 0,
            fps: void 0
        }, this._updateTs = new Date().getTime(), this._serverPerms = {
            keyboardEnabled: !0,
            fileTransferEnabled: !0,
            clipboardEnabled: !0
        }, this._elevationRequested = !1, this._supportedEncoding = Z.fromPartial({}), this._sessionId = 0, this._isFileTransfer = !1, this._isViewCamera = !1, this._readJobs = [], this._writeJobs = [], this._removeJobs = {}, this._readRemoteEmptyDirsJobs = [], this._last_update_jobs_ms = 0, this._fileHandles = {}, this._restartingRemoteDevice = !1, this._enableTrustedDevices = !1, this._passwordSource = {type: "Undefined"}, this._videoQueue = [], this._decodingVideo = !1
    }

    getPeerPlatform() {
        var e, i;
        return (i = (e = this._peerInfo) == null ? void 0 : e.platform) != null ? i : ""
    }

    isSupportVirtualDisplay() {
        if (!this._peerInfo || !this._peerInfo.platform_additions) return !1;
        try {
            const e = JSON.parse(this._peerInfo.platform_additions), i = e.is_installed, n = e.idd_impl;
            return i && this._peerInfo.platform == "Windows" && (n == "rustdesk_idd" || n == "amyuni_idd")
        } catch (e) {
            return console.error("Failed to check virtual display support, ", e), !1
        }
    }

    isSupportViewCamera() {
        if (!this._peerInfo || !this._peerInfo.platform_additions) return !1;
        try {
            return JSON.parse(this._peerInfo.platform_additions).support_view_camera
        } catch (e) {
            return console.error("Failed to check view camera support, ", e), !1
        }
    }

    sendMessage(e) {
        var i;
        (i = this._ws) == null || i.sendMessage(e)
    }

    handleRelayId(e) {
        return e.endsWith("\\r") || e.endsWith("/r") ? e.substring(0, e.length - 2) : e
    }

    setRemoteId(e) {
        var n, a, t, s, E;
        let i = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
        if (i == 0 && (i = 1), this._sessionId = i, this._restartingRemoteDevice = !1, this._id = e, e.includes("@")) {
            const l = e.split("@"), d = l[0], c = ((n = l[1]) != null ? n : "").split("?"),
                p = (a = c[0]) != null ? a : "", B = (t = c[1]) != null ? t : "",
                F = p == r4 ? Et : (s = B.split("&").reduce((x, k) => {
                    const M = k.indexOf("=");
                    if (M != -1) {
                        const Se = k.substring(0, M).toLowerCase(), ze = k.substring(M + 1);
                        x[Se] = ze
                    }
                    return x
                }, {}).key) != null ? s : "", b = this.handleRelayId(d);
            this._otherServer = {realId: b, server: p, key: F}, this._id = `${b}@${p}`
        } else this._id = this.handleRelayId(e);
        if (this._options = (E = cu()[this._id]) != null ? E : this.getUserDefaultToggleOptions(), this._otherServer && !this._otherServer.key) {
            const l = this.getOption("other-server-key");
            l && (this._otherServer.key = l)
        }
    }

    setSessionInfo(e) {
        this._isFileTransfer = e.isFileTransfer, this._isViewCamera = e.isViewCamera, e.is_shared_password ? this._sharedPassword = e.password : this._presetPassword = e.password
    }

    async start() {
        if (Ba(!1)) {
            qr(), ma();
            return
        }
        try {
            ko(), await this._start()
        } catch (e) {
            this.msgbox("error", "Connection Error", e.type == "close" ? "Reset by the peer" : String(e))
        }
    }

    getId() {
        var e, i;
        return (i = (e = this._otherServer) == null ? void 0 : e.realId) != null ? i : this._id
    }

    async _start() {
        var F, b;
        let e = this.getId(), i = Jt(), n = Gt(), a = (F = this._otherServer) == null ? void 0 : F.server;
        this._otherServer && (i = this._otherServer.key, n = "");
        let t = "";
        a ? a == r4 ? t = Me(ia) : t = Me(a) : t = Ue(), this._options || (this._options = (b = cu()[this._id]) != null ? b : this.getUserDefaultToggleOptions()), this._interval = setInterval(() => {
            var x;
            for (; this._msgs.length;) (x = this._ws) == null || x.sendMessage(this._msgs[0]), this._msgs.splice(0, 1)
        }, 1);
        const s = new Ve(t, !0, "rendezvous");
        this._ws = s, console.log(new Date + ": Connecting to rendezvous server: " + t + ", for " + e), await s.open(), console.log(new Date + ": Connected to rendezvous server");
        const E = this._isFileTransfer ? je.FILE_TRANSFER : this._isViewCamera ? je.VIEW_CAMERA : je.DEFAULT_CONN,
            l = bt.SYMMETRIC,
            d = Hu.fromPartial({id: e, licence_key: i, conn_type: E, nat_type: l, token: n, version: c4});
        s.sendRendezvous({punch_hole_request: d});
        const c = await s.next();
        s.close(), console.log(new Date + ": Got relay response");
        const p = c.punch_hole_response, B = c.relay_response;
        if (p) {
            if (p != null && p.other_failure) {
                this.msgbox("error", "Error", p == null ? void 0 : p.other_failure);
                return
            }
            if (p.failure != $0.UNRECOGNIZED) switch (p == null ? void 0 : p.failure) {
                case $0.ID_NOT_EXIST:
                    this.msgbox("error", "Error", "ID does not exist");
                    break;
                case $0.OFFLINE:
                    this.msgbox("error", "Error", "Remote desktop is offline");
                    break;
                case $0.LICENSE_MISMATCH:
                    this.msgbox("error", "Error", "Key mismatch");
                    break;
                case $0.LICENSE_OVERUSE:
                    this.msgbox("error", "Error", "Key overuse");
                    break
            }
        } else if (B) {
            if (!B.version) {
                this.msgbox("error", "Error", "Remote version is low, not support web");
                return
            }
            this._healthCheck = new vo(t, B.feedback, i, n), this._healthCheck.start(), await this.connectRelay(B, i)
        }
    }

    async connectRelay(e, i) {
        var d, c;
        const n = e.pk;
        let a = e.relay_server;
        a ? a = Me(a, !0) : a = Ue(!0);
        const t = e.uuid;
        console.log(new Date + ": Connecting to relay server: " + a);
        const s = new Ve(a, !1, "relay");
        await s.open(), console.log(new Date + ": Connected to relay server"), this._ws = s;
        const E = Ju.fromPartial({licence_key: i, uuid: t});
        s.sendRendezvous({request_relay: E});
        const l = await this.secure(n, i) || !1;
        A("connection_ready", {secure: l, direct: !1}), this._updateInterval = setInterval(() => {
            this.updateStatus()
        }, 1e3), (d = this._ws) == null || d.on("message", this.msgHandler.bind(this)), (c = this._ws) == null || c.on("status_change", this.onStatusChange.bind(this))
    }

    async secure(e, i) {
        var F, b, x, k, M, Se, ze, W4;
        if (e) {
            try {
                if (e = await _4(e, i || Et), e) {
                    const T = D4.decode(e);
                    T.id == this.getId() && (e = T.pk)
                }
                (e == null ? void 0 : e.length) != 32 && (e = void 0)
            } catch (T) {
                console.error("Failed to verify id pk, ", T), e = void 0
            }
            e || console.error("Handshake failed: invalid public key from rendezvous server")
        }
        if (!e) {
            const T = H.fromPartial({});
            (F = this._ws) == null || F.sendMessage({public_key: T});
            return
        }
        const n = await ((b = this._ws) == null ? void 0 : b.next());
        let a = n == null ? void 0 : n.signed_id;
        if (!a) {
            console.error("Handshake failed: invalid message type");
            const T = H.fromPartial({});
            (x = this._ws) == null || x.sendMessage({public_key: T});
            return
        }
        try {
            a = await _4(a.id, Uint8Array.from(e))
        } catch (T) {
            console.error("Failed to verify signed id pk, ", T), console.error("pk mismatch, fall back to non-secure");
            const Fa = H.fromPartial({});
            (k = this._ws) == null || k.sendMessage({public_key: Fa});
            return
        }
        const t = D4.decode(a), s = t.id, E = t.pk;
        if (s != this.getId()) {
            console.error("Handshake failed: sign failure");
            const T = H.fromPartial({});
            (M = this._ws) == null || M.sendMessage({public_key: T});
            return
        }
        if (E.length != 32) {
            console.error("Handshake failed: invalid public box key length from peer");
            const T = H.fromPartial({});
            (Se = this._ws) == null || Se.sendMessage({public_key: T});
            return
        }
        const [l, d] = Ar(), c = mr(), p = Fr(c, E, l), B = H.fromPartial({asymmetric_value: d, symmetric_value: p});
        return (ze = this._ws) == null || ze.sendMessage({public_key: B}), (W4 = this._ws) == null || W4.setSecretKey(c), console.log("secured"), !0
    }

    async msgHandler(e) {
        var i;
        if (this._ws) {
            if (e != null && e.hash) await this.handleHash(e.hash); else if (e != null && e.test_delay) {
                const n = e == null ? void 0 : e.test_delay;
                n.from_client || (A("update_quality_status", {
                    delay: `${n.last_delay}`,
                    target_bitrate: `${n.target_bitrate}`
                }), (i = this._ws) == null || i.sendMessage({test_delay: n}))
            } else if (e != null && e.login_response) this.handleLoginResponse(e == null ? void 0 : e.login_response); else if (e != null && e.video_frame) this.handleVideoFrame(e == null ? void 0 : e.video_frame); else if (e != null && e.clipboard) P4(e == null ? void 0 : e.clipboard); else if (e != null && e.multi_clipboards) wo(e == null ? void 0 : e.multi_clipboards); else if (e != null && e.cursor_data) {
                const n = e == null ? void 0 : e.cursor_data;
                M4(n.colors, !1, a => {
                    a && (n.colors = a, A("cursor_data", n))
                })
            } else if (e != null && e.cursor_id) A("cursor_id", {id: e == null ? void 0 : e.cursor_id}); else if (e != null && e.cursor_position) A("cursor_position", e == null ? void 0 : e.cursor_position); else if (e != null && e.misc) this.handleMisc(e == null ? void 0 : e.misc); else if (e != null && e.audio_frame) hr(e == null ? void 0 : e.audio_frame.data); else if (e != null && e.message_box) this.handleMsgBox(e == null ? void 0 : e.message_box); else if (e != null && e.peer_info) this.handleSyncPeerInfo(e.peer_info); else if (e.file_response) await this.handleFileResponse(e.file_response); else if (e.file_action) {
                const n = e.file_action;
                await this.handleFileAction(n)
            }
        }
    }

    onStatusChange(e) {
        if (e === "" || e === "open") return;
        if (this._restartingRemoteDevice) {
            this.msgbox("restarting", "Restarting remote device", "remote_restarting_tip", "");
            return
        }
        if (e instanceof CloseEvent && e.code == 1e3 || !this._ws) return;
        e && console.error("msgLoop error: ", e);
        const i = "Connection Error";
        let n = "";
        if (e === "Timeout") n = "Connection timeout"; else if (e instanceof CloseEvent) {
            let a = `code: ${e.code}`;
            e.reason && (a += `, reason: ${e.reason}`), n = `Connection closed, ${a}`
        } else e instanceof Error ? n = e.message : typeof e.toString == "function" ? n = e.toString() : n = "";
        this.msgbox("error", i, n, "")
    }

    enterOrLeave(e) {
        e === !1 ? (Co(), p4(), go(!1)) : (m4(), Xt(this))
    }

    makeDisplaysMsg(e) {
        let i = [];
        return e.forEach(n => {
            let a = {};
            a.x = n.x, a.y = n.y, a.width = n.width, a.height = n.height, a.cursor_embedded = n.cursor_embedded ? 1 : 0, n.original_resolution && (a.original_width = n.original_resolution.width, a.original_height = n.original_resolution.height), a.scale = Math.floor(n.scale * 100), i.push(a)
        }), JSON.stringify(i)
    }

    handleSyncPeerInfo(e) {
        this._peerInfo && (this._peerInfo.displays = e.displays), A("sync_peer_info", {displays: this.makeDisplaysMsg(e.displays)}), A("sync_platform_additions", {platform_additions: e.platform_additions})
    }

    handleMsgBox(e) {
        let i = e.link;
        i in at ? i = at[i] : (console.warn("Message box ignore link " + i + " for security"), i = ""), this.msgbox(e.msgtype, e.title, e.text, i)
    }

    updateStatus() {
        var s, E;
        const e = new Date().getTime(), i = e - this._updateTs;
        if (i < 1e3) return;
        this._updateTs = e;
        const n = ((s = this._ws) == null ? void 0 : s.getRecvDataCount()) || 0;
        (E = this._ws) == null || E.resetRecvDataCount();
        const a = `${(n / 1024 / i * 1e3).toFixed(2)} kb/s`, t = {};
        for (const l in this._frameCount) if (this._frameCount.hasOwnProperty(l)) {
            const d = this._frameCount[l];
            t[l] = Math.floor(d / (i / 1e3))
        }
        this._frameCount = {}, A("update_quality_status", {speed: a, fps: JSON.stringify(t)})
    }

    handleLoginResponse(e) {
        const i = {
            [dn]: {
                msgtype: "error",
                title: "Login Error",
                text: "Login screen using Wayland is not supported",
                link: "https://rustdesk.com/docs/en/manual/linux/#login-screen",
                try_again: !0
            },
            [un]: {msgtype: "session-login", title: "", text: "", link: "", try_again: !0},
            [en]: {msgtype: "session-re-login", title: "", text: "", link: "", try_again: !0},
            [tn]: {
                msgtype: "info-nocancel",
                title: "another_user_login_title_tip",
                text: "another_user_login_text_tip",
                link: "",
                try_again: !1
            },
            [an]: {
                msgtype: "info-nocancel",
                title: "xorg_not_found_title_tip",
                text: "xorg_not_found_text_tip",
                link: "https://rustdesk.com/docs/en/manual/linux/#login-screen",
                try_again: !0
            },
            [nn]: {
                msgtype: "info-nocancel",
                title: "no_desktop_title_tip",
                text: "no_desktop_text_tip",
                link: "https://rustdesk.com/docs/en/manual/linux/#login-screen",
                try_again: !0
            },
            [on]: {msgtype: "session-login-password", title: "", text: "", link: "", try_again: !0},
            [rn]: {msgtype: "session-login-re-password", title: "", text: "", link: "", try_again: !0},
            [Dn]: {
                msgtype: "wait-remote-accept-nook",
                title: "Prompt",
                text: "Please wait for the remote side to accept your session request...",
                link: "",
                try_again: !0
            }
        }, n = e.error;
        if (n) if (n == tt && (this._enableTrustedDevices = e.enable_trusted_devices), n == sn && (this._password = void 0, this.msgbox("input-password", "Password Required", "", "")), n == En) this._password = void 0, this.msgbox("re-input-password", n, "Do you want to enter again?"); else if (n == ln || n == tt) this.getOption(Ie) == "Y" && this.setOption(Ie, void 0), this.msgbox("input-2fa", n, ""); else if (n in i) {
            const a = i[n];
            this.msgbox(a.msgtype, a.title, a.text, a.link)
        } else n.includes(cn) ? this.msgbox("error", "Login Error", n, St) : this.msgbox("error", "Login Error", n); else e.peer_info && (this._firstFrame = !1, this.handlePeerInfo(e.peer_info))
    }

    enableTrustedDevices() {
        return this._enableTrustedDevices
    }

    msgbox(e, i, n, a = "") {
        var t;
        (t = this._msgbox) == null || t.call(this, e, i, n, a)
    }

    cancelMsgbox(e) {
        A("cancel_msgbox", {tag: e})
    }

    draw(e, i) {
        F4(e, new Uint8Array(i.data))
    }

    close() {
        var e, i;
        this._msgs = [], this._interval && (clearInterval(this._interval), this._interval = void 0), this._updateInterval && (clearInterval(this._updateInterval), this._updateInterval = void 0), this._ftTimer && (clearTimeout(this._ftTimer), this._ftTimer = void 0), (e = this._ws) == null || e.close(), this._ws = void 0, (i = this._healthCheck) == null || i.close(), this._healthCheck = void 0, this._readJobs = [], this._writeJobs = [], this._removeJobs = {}, this._fileHandles = {}, this._readRemoteEmptyDirsJobs = [], p4(), this._lastChangeDisplay = void 0, this._lastSendFps = void 0, this._videoQueue = [], this._decodingVideo = !1
    }

    refresh() {
        var i;
        const e = f.fromPartial({refresh_video: !0});
        (i = this._ws) == null || i.sendMessage({misc: e})
    }

    setMsgbox(e) {
        this._msgbox = e
    }

    setDraw(e) {
        this._draw = e
    }

    async handleHash(e) {
        this._hash = e;
        let i = this._password;
        (!i || i.length === 0) && this._presetPassword && (i = Qu([this._presetPassword, e.salt]), this._passwordSource = {type: "Undefined"});
        let n = this._sharedPassword;
        if (this._sharedPassword = void 0, n && (i = Qu([n, e.salt]), this._passwordSource = {
            type: "SharedAb",
            value: n
        }), !i || i.length === 0) {
            const E = this.getOption("password");
            typeof E == "string" && E.length > 0 && (i = Be(E), this._passwordSource = {type: "Undefined"})
        }
        if (!i || i.length === 0) {
            let E = f4("access_token"), l = await Mt();
            if (E && E === l.access_token) {
                let d = l.ab_entries.find(c => qn(c));
                if (d) {
                    let c = d.peers.find(p => p.id == this._id);
                    if (c) {
                        let p = Be(c.hash);
                        p.length > 0 && (i = p, this._passwordSource = {type: "PersonalAb", value: p})
                    }
                }
            }
        }
        this._password = i;
        let a;
        !i || i.length === 0 ? (a = new Uint8Array(0), this.msgbox("input-password", "Password Required", "")) : a = Qu([i, e.challenge]);
        let t = this.getOption("os-username") || "", s = this.getOption("os-password") || "";
        this._sendLoginMessage({os_login: {username: t, password: s}, password: a})
    }

    handle_login_from_ui(e, i, n, a) {
        let t;
        if (n === "") {
            let E = this._password;
            if (!E || E.length === 0) {
                const l = this.getOption("password");
                typeof l == "string" && l.length > 0 && (E = Be(l), this._passwordSource = {type: "Undefined"})
            }
            t = E
        } else this._passwordSource = {type: "Undefined"}, t = Qu([n, this._hash.salt]), this.setRemember(a);
        this._password = t;
        let s = Qu([t != null ? t : Uint8Array.from([]), this._hash.challenge]);
        this._sendLoginMessage({os_login: {username: e, password: i}, password: s})
    }

    changePreferCodec() {
        var a;
        const e = this.getSupportedDecoding(), i = R.fromPartial({supported_decoding: e}),
            n = f.fromPartial({option: i});
        (a = this._ws) == null || a.sendMessage({misc: n})
    }

    async reconnect() {
        this.close(), await this.start()
    }

    _getHwid(e = void 0) {
        return (e != null ? e : this.getOption(Ie) == "Y") ? $n() : new Uint8Array
    }

    _sendLoginMessage(e) {
        var d;
        const i = this._otherServer ? `${qe()}@${Ue()}` : qe(), n = io();
        let a = qt();
        if (n) try {
            const c = JSON.parse(n);
            c.name && (a = c.name)
        } catch (c) {
            console.error("Failed to get user info, ", c)
        }
        let t;
        if (this._isFileTransfer) {
            let c = this.getOption("remote_dir"), p = this.getOption("remote_show_hidden") === "Y";
            t = Fu.fromPartial({dir: c, show_hidden: p})
        }
        let s;
        this._isViewCamera && (s = _u.fromPartial({}));
        const E = this._getHwid(), l = J.fromPartial({
            username: this.getId(),
            my_id: i,
            my_name: a,
            session_id: this._sessionId,
            password: e.password,
            option: this.getOptionMessage(),
            video_ack_required: !0,
            os_login: e.os_login,
            version: c4,
            my_platform: vn,
            file_transfer: t,
            view_camera: s,
            hwid: E
        });
        (d = this._ws) == null || d.sendMessage({login_request: l})
    }

    getOptionMessage() {
        if (this._isFileTransfer) return;
        let e = 0;
        const i = R.fromPartial({}), n = this.getImageQuality(), a = this.getImageQualityEnum(n, !0), t = y.Yes;
        if (a != null) i.image_quality = a, e += 1; else if (n === "custom") {
            let E = 50, l = this.getOption("custom_image_quality");
            if (l) try {
                E = parseInt(l)
            } catch {
            }
            i.custom_image_quality = E << 8, e += 1;
            let d = this.getOption("custom-fps");
            if (d) try {
                i.custom_fps = parseInt(d), this._lastSendFps = i.custom_fps, e += 1
            } catch {
            }
        }
        const s = this.getOption("view-only");
        return s && (i.disable_keyboard = t), (s || this._options["show-remote-cursor"]) && (i.show_remote_cursor = t, e += 1), this._options["follow-remote-cursor"] && (i.follow_remote_cursor = t, e += 1), this._options["follow-remote-window"] && (i.follow_remote_window = t, e += 1), !s && this._options["lock-after-session-end"] && (i.lock_after_session_end = t, e += 1), this._options["disable-audio"] && (i.disable_audio = t, e += 1), (s || this._options["disable-clipboard"]) && (i.disable_clipboard = t, e += 1), i.supported_decoding = this.getSupportedDecoding(), e += 1, e > 0 ? i : void 0
    }

    sendVideoReceived() {
        var i;
        const e = f.fromPartial({video_received: !0});
        (i = this._ws) == null || i.sendMessage({misc: e})
    }

    getCodecFormat(e) {
        return e.vp9s ? "VP9" : e.vp8s ? "VP8" : e.av1s ? "AV1" : e.h264s ? "H264" : e.h265s ? "H265" : "Unknown"
    }

    getSupportedEncoding() {
        return this._supportedEncoding
    }

    getSupportedDecoding() {
        let e = this.getOption("codec-preference");
        e == "vp8" ? e = mu.VP8 : e == "vp9" ? e = mu.VP9 : e == "av1" ? e = mu.AV1 : e == "h264" ? e = mu.H264 : e == "h265" ? e = mu.H265 : e = mu.Auto;
        let i = this.getOption("i444") == "Y" ? l4.I444 : l4.I420;
        return qu.fromPartial({
            ability_vp8: 1,
            ability_vp9: 1,
            ability_av1: 1,
            ability_h264: 1,
            ability_h265: 1,
            prefer: e,
            prefer_chroma: i,
            i444: G.fromPartial({vp9: !0, av1: !0})
        })
    }

    getAlternativeCodecs() {
        const e = this.getSupportedEncoding(), i = this.getSupportedDecoding();
        return JSON.stringify({
            vp8: e.vp8 && i.ability_vp8 == 1,
            av1: e.av1 && i.ability_av1 == 1,
            h264: e.h264 && i.ability_h264 == 1,
            h265: e.h265 && i.ability_h265 == 1
        })
    }

    fpsCalculate(e, i) {
        if (e) {
            this._fpsCalc.skipBegining = 0, this._fpsCalc.videoTestSpeed = [0, 0];
            return
        }
        if (this._fpsCalc.skipBegining < 3) {
            this._fpsCalc.skipBegining += 1;
            return
        }
        this._fpsCalc.videoTestSpeed[1] += i, this._fpsCalc.videoTestSpeed[0] += 1, this._fpsCalc.videoTestSpeed[0] % 10 == 0 && i > 0 && (this._fpsCalc.fps = Math.floor(this._fpsCalc.videoTestSpeed[0] * 1e3 / this._fpsCalc.videoTestSpeed[1]), console.log("max decode fps: " + this._fpsCalc.fps)), this._fpsCalc.videoTestSpeed[0] >= 30 && (this._fpsCalc.videoTestSpeed = [0, 0])
    }

    handleVideoFrame(e) {
        if (!this._firstFrame) {
            this.msgbox("", "", ""), this._firstFrame = !0, this.sendToggleVirtualDisplayMsg(), this.sendTogglePrivacyModeMsg(), m4();
            const i = 0;
            for (let n = 0; n < i; n++) this.sendVideoReceived();
            console.log(`send ${i} video received in advance for high fps`)
        }
        this._videoQueue.push(e), this._decodingVideo || this.processVideoQueue()
    }

    async processVideoQueue() {
        this._decodingVideo = !0;
        try {
            for (; this._videoQueue.length > 0;) await this.handleOneVideoFrame(this._videoQueue.shift())
        } catch (e) {
            console.error("deal video queue failed", e)
        }
        this._decodingVideo = !1
    }

    async handleOneVideoFrame(e) {
        const i = this.getCodecFormat(e), n = this._videoFormat != i;
        n && (this._videoFormat = i, A("update_quality_status", {codec_format: i}));
        var a = new Date().getTime(), t = 0, s = void 0;
        if (e.vp8s) t = 0, s = e.vp8s; else if (e.vp9s) t = 1, s = e.vp9s; else if (e.av1s) t = 2, s = e.av1s; else if (e.h264s) t = 3, s = e.h264s; else if (e.h265s) t = 4, s = e.h265s; else {
            console.log("unknown codec");
            return
        }
        const E = s == null ? void 0 : s.frames.length;
        this._frameCount[e.display] = (this._frameCount[e.display] || 0) + E, this.sendVideoReceived();
        try {
            for (let l = 0; l < E; l++) {
                let d = s.frames[l];
                const c = await Ya(t, d.data.slice(0).buffer);
                if (c.data && E - 1 == l) {
                    this.draw(e.display, c.data);
                    const p = new Date().getTime();
                    this.fpsCalculate(n, p - a);
                    const B = c.data.yuvFormat == 5;
                    this._i444 != B && (this._i444 = B, A("update_quality_status", {chroma: B ? "4:4:4" : "4:2:0"}))
                }
            }
        } catch (l) {
            console.error("decode error: ", l)
        }
    }

    sendToggleVirtualDisplayMsg() {
        if (!this.isSupportVirtualDisplay()) return;
        const e = this.getOption("virtual-display");
        !e || e.split(",").forEach(i => {
            const n = Number(i);
            isNaN(n) || this._sendToggleVirtualDisplayMsg(n, !0)
        })
    }

    sendTogglePrivacyModeMsg() {
        if (!!this._peerInfo && !(L(this._peerInfo.version) < L("1.2.4")) && this.getOption("privacy-mode")) {
            const e = this.getOption("privacy-mode-impl-key");
            if (e == "privacy_mode_impl_virtual_display" && this.isSupportVirtualDisplay()) return;
            this._sendTogglePrivacyModeMsg(e, !0)
        }
    }

    handlePeerInfo(e) {
        var a, t, s;
        if (this._peerInfo = e, this._isViewCamera && !this.isSupportViewCamera()) {
            L(e.version) < L("1.3.9") && (e.platform == "Windows" || e.platform == "Linux") ? this.msgbox("error", "Download new version", "upgrade_remote_rustdesk_client_to_{1.3.9}_tip") : this.msgbox("error", "Error", "view_camera_unsupported_tip"), this.lcHandlePeerInfo(e), this.close();
            return
        }
        if (e.current_display > e.displays.length && (e.current_display = 0), L(e.version) < L("1.1.10") && this.setPermission("restart", !1), this._isFileTransfer) {
            if (!e.username.length && !((a = e.windows_sessions) != null && a.sessions.length)) {
                this.msgbox("error", "Error", "No active console user logged on, please connect and logon first.");
                return
            }
        } else if (e.displays.length == 0) {
            this.lcHandlePeerInfo(e), A("update_privacy_mode", {}), this.msgbox("error", "Remote Error", "No Display");
            return
        }
        A("peer_info", {
            ...e,
            displays: this.makeDisplaysMsg(e.displays),
            resolutions: JSON.stringify(e.resolutions)
        }), this._isFileTransfer || (this.msgbox("success", "Successful", "Connected, waiting for image..."), this.tryChangeInitResolution(e.current_display));
        const i = this.shouldAutoLogin();
        i && this.inputOsPassword(i);
        const n = (t = this.getOption("info")) == null ? void 0 : t.username;
        n && !e.username && (e.username = n), A("update_privacy_mode", {}), this.lcHandlePeerInfo(e), (s = e.windows_sessions) != null && s.sessions.length && (this._selectedWindowsSessionId == e.windows_sessions.current_sid ? this.sendSelectedSessionId(e.windows_sessions.current_sid.toString()) : this.setMultipleWindowsSession(e.windows_sessions.sessions))
    }

    lcHandlePeerInfo(e) {
        var E;
        let i = C4(this._id) || {};
        i.info = {username: e.username, hostname: e.hostname, platform: e.platform};
        let n = this._password, a = i.password, t = this.getRemember(), s = this._hash;
        t ? n && n.length > 0 && Q(n) !== a && !mt(this._passwordSource, n, s) && (i.password = Q(n), console.log("remember password of " + this._id)) : n && n.length > 0 && Ft(this._passwordSource, n) ? (i.password = Q(n), console.log("save ab password of " + this._id + " to recent")) : a && (i.password = void 0, console.log("remove password of " + this._id)), (E = this._otherServer) != null && E.server && this._otherServer.server != r4 && this.setOption("other-server-key", this._otherServer.key), i.password && n && n.length > 0 && !mt(this._passwordSource, n, s) && !Ft(this._passwordSource, n) && A("sync_peer_hash_password_to_personal_ab", {
            id: this._id,
            hash: Q(n)
        }), this.saveConfig(i), e.encoding && (this._supportedEncoding = e.encoding)
    }

    setPermission(e, i) {
        A("permission", {[e]: i})
    }

    shouldAutoLogin() {
        const e = this.getOption("lock-after-session-end"), i = !!this.getOption("auto-login"),
            n = this.getOption("os-password");
        return n && e && i ? n : ""
    }

    handleMisc(e) {
        if (e.audio_format) kr(e.audio_format.channels, e.audio_format.sample_rate); else if (e.chat_message) A("chat_client_mode", {text: e.chat_message.text}); else if (e.permission_info) {
            const i = e.permission_info;
            console.info("Change permission " + i.permission + " -> " + i.enabled);
            let n;
            switch (i.permission) {
                case a0.Keyboard:
                    this._serverPerms.keyboardEnabled = i.enabled, n = "keyboard";
                    break;
                case a0.Clipboard:
                    this._serverPerms.clipboardEnabled = i.enabled, n = "clipboard";
                    break;
                case a0.Audio:
                    n = "audio";
                    break;
                case a0.Restart:
                    n = "restart";
                    break;
                case a0.BlockInput:
                    n = "block_input";
                    break;
                default:
                    return !0
            }
            this.setPermission(n, i.enabled)
        } else if (e.switch_display) A("switch_display", e.switch_display), this.setCustomResolution(e.switch_display); else {
            if (e.close_reason) return this.msgbox("error", "Connection Error", e.close_reason), this.close(), !1;
            if (e.back_notification) {
                if (!this.handleBackNotification(e.back_notification)) return this.close(), !1
            } else e.uac !== void 0 ? e.uac && this._serverPerms.keyboardEnabled ? this.msgbox("on-uac", "Prompt", "Please wait for confirmation of UAC...", "") : (this.cancelMsgbox("on-uac"), this.cancelMsgbox("wait-uac"), this.cancelMsgbox("elevation-error")) : e.foreground_window_elevated !== void 0 ? e.foreground_window_elevated && this._serverPerms.keyboardEnabled ? this.msgbox("on-foreground-elevated", "Prompt", "elevated_foreground_window_tip", "") : (this.cancelMsgbox("on-foreground-elevated"), this.cancelMsgbox("wait-uac"), this.cancelMsgbox("elevation-error")) : e.elevation_response !== void 0 ? e.elevation_response === "" ? this.msgbox("wait-uac", "", "", "") : (this.cancelMsgbox("wait-uac"), this.msgbox("elevation-error", "Elevation Error", e.elevation_response, "")) : e.portable_service_running !== void 0 ? (this.portableServiceRunning(e.portable_service_running), this._elevationRequested && e.portable_service_running && this.msgbox("custom-nocancel-success", "Successful", "Elevate successfully", "")) : e.supported_encoding ? this._supportedEncoding = e.supported_encoding : e.follow_current_display !== void 0 && this.handleFollowCurrentDisplay(e.follow_current_display)
        }
        return !0
    }

    portableServiceRunning(e) {
        A("portable_service_running", {running: e.toString()})
    }

    handleFollowCurrentDisplay(e) {
        A("follow_current_display", {display_idx: e.toString()})
    }

    handleBackNotification(e) {
        if (e.block_input_state) this.handleBackMsgBlockInput(e.block_input_state, e.details); else if (e.privacy_mode_state) return this.handleBackMsgPrivacyMode(e.privacy_mode_state, e.details, e.impl_key);
        return !0
    }

    updateBlockInputState(e) {
        A("update_block_input_state", {input_state: e ? "on" : "off"})
    }

    handleBackMsgBlockInput(e, i) {
        switch (e) {
            case ge.BlkOnSucceeded:
                this.updateBlockInputState(!0);
                break;
            case ge.BlkOnFailed:
                this.msgbox("custom-error", "Block user input", i == "" ? "Failed" : i, ""), this.updateBlockInputState(!1);
                break;
            case ge.BlkOffSucceeded:
                this.updateBlockInputState(!1);
                break;
            case ge.BlkOffFailed:
                this.msgbox("custom-error", "Unblock user input", i == "" ? "Failed" : i, "");
                break
        }
    }

    updatePrivacyMode(e, i) {
        i && (e == "" && (e = "privacy_mode_impl_mag"), this.setOption("privacy-mode-impl-key", e)), this.setOption("privacy-mode", i), A("update_privacy_mode", {})
    }

    handleBackMsgPrivacyMode(e, i, n) {
        switch (e) {
            case nu.PrvOnByOther:
                return this.msgbox("error", "Connecting...", "Someone turns on privacy mode, exit", ""), !1;
            case nu.PrvNotSupported:
                this.msgbox("custom-error", "Privacy mode", "Unsupported", ""), this.updatePrivacyMode(n, !1);
                break;
            case nu.PrvOnSucceeded:
                this.msgbox("custom-nocancel", "Privacy mode", "Enter privacy mode", ""), this.updatePrivacyMode(n, !0);
                break;
            case nu.PrvOnFailedDenied:
                this.msgbox("custom-error", "Privacy mode", "Peer denied", ""), this.updatePrivacyMode(n, !1);
                break;
            case nu.PrvOnFailedPlugin:
                this.msgbox("custom-error", "Privacy mode", "Please install plugins", ""), this.updatePrivacyMode(n, !1);
                break;
            case nu.PrvOnFailed:
                this.msgbox("custom-error", "Privacy mode", i == "" ? "Failed" : i, ""), this.updatePrivacyMode(n, !1);
                break;
            case nu.PrvOffSucceeded:
                this.msgbox("custom-nocancel", "Privacy mode", "Exit privacy mode", ""), this.updatePrivacyMode(n, !1);
                break;
            case nu.PrvOffFailed:
                this.msgbox("custom-error", "Privacy mode", i == "" ? "Failed to turn off" : i, "");
                break;
            case nu.PrvOffUnknown:
                this.msgbox("custom-error", "Privacy mode", "Turned off", ""), this.updatePrivacyMode(n, !1);
                break
        }
        return !0
    }

    getRemember() {
        return this._options.remember || !1
    }

    setRemember(e) {
        this.setOption("remember", e)
    }

    getOption(e) {
        var i;
        return (i = this._options[e]) != null ? i : e0(e)
    }

    getUserDefaultToggleOptions() {
        const e = {}, i = {
            "show-remote-cursor": "show_remote_cursor",
            "lock-after-session-end": "lock_after_session_end",
            "privacy-mode": "privacy_mode",
            "enable-file-copy-paste": "enable-file-copy-paste",
            "disable-audio": "disable_audio",
            "disable-clipboard": "disable_clipboard",
            "show-quality-monitor": "show_quality_monitor",
            allow_swap_key: "allow_swap_key",
            "view-only": "view_only",
            "follow-remote-cursor": "follow_remote_cursor",
            "follow-remote-window": "follow_remote_window"
        };
        for (const [a, t] of Object.entries(i)) e[a] = e0(t) == "Y";
        const n = ["codec-preference", "custom-fps", "zoom-cursor", "touch-mode", "i444", "swap-left-right-mouse", "collapse_toolbar"];
        for (const a of n) e[a] = e0(a);
        return e
    }

    getToggleOption(e) {
        const i = ["show-remote-cursor", "privacy-mode", "enable-file-copy-paste"], n = this._options[e];
        return typeof n == "string" ? n != "" : n != null ? n : !!i.includes(e)
    }

    getStatus() {
        return JSON.stringify({status_num: 10})
    }

    checkConnStatus() {
    }

    saveConfig(e) {
        this._options = e, this._options.tm = new Date().getTime(), Tn(this._id, e)
    }

    loadConfig() {
        return C4(this._id) || {}
    }

    setOption(e, i) {
        i == null ? delete this._options[e] : this._options[e] = i, this._options.tm = new Date().getTime(), jt(this._id, e, i)
    }

    setFlutterUiOption(e, i) {
        this.setOption(`flutter_ui:${e}`, i)
    }

    getFlutterUiOption(e) {
        return this.getOption(`flutter_ui:${e}`)
    }

    inputKey(e, i, n, a, t, s, E) {
        var d;
        const l = Qn(e, Cr());
        !l || (a && (e == "VK_MENU" || e == "RAlt") && (a = !1), t && (e == "VK_CONTROL" || e == "RControl") && (t = !1), s && (e == "VK_SHIFT" || e == "RShift") && (s = !1), E && (e == "Meta" || e == "RWin") && (E = !1), l.down = i, l.press = n, l.modifiers = this.getMod(a, t, s, E), (d = this._ws) == null || d.sendMessage({key_event: l}))
    }

    ctrlAltDel() {
        var i, n;
        const e = S.fromPartial({down: !0});
        ((i = this._peerInfo) == null ? void 0 : i.platform) == "Windows" ? e.control_key = j.CtrlAltDel : (e.control_key = j.Delete, e.modifiers = this.getMod(!0, !0, !1, !1)), (n = this._ws) == null || n.sendMessage({key_event: e})
    }

    restart() {
        var i;
        this._restartingRemoteDevice = !0;
        const e = f.fromPartial({});
        e.restart_remote_device = !0, (i = this._ws) == null || i.sendMessage({misc: e})
    }

    inputString(e) {
        var n;
        const i = S.fromPartial({seq: e});
        (n = this._ws) == null || n.sendMessage({key_event: i})
    }

    send2fa(e) {
        var i;
        try {
            const n = JSON.parse(e), a = n.code, t = n.trust_this_device;
            t && this.setOption(Ie, "Y");
            const s = this._getHwid(t), E = vu.fromPartial({code: a, hwid: s});
            (i = this._ws) == null || i.sendMessage({auth_2fa: E})
        } catch {
            console.log('Failed to switch display, invalid param "' + e + '"')
        }
    }

    _captureDisplays({add: e, sub: i, set: n}) {
        var s;
        const a = Lu.fromPartial({add: e, sub: i, set: n}), t = f.fromPartial({capture_displays: a});
        (s = this._ws) == null || s.sendMessage({misc: t})
    }

    switchDisplay(e) {
        var i;
        try {
            const n = JSON.parse(e), a = n.value, t = n.isDesktop;
            if (a.length == 1) {
                let s = this.getCustomResolution(a[0]);
                const E = Mu.fromPartial({display: a[0], width: s ? s[0] : void 0, height: s ? s[1] : void 0}),
                    l = f.fromPartial({switch_display: E});
                (i = this._ws) == null || i.sendMessage({misc: l}), t || this._captureDisplays({set: a})
            } else this._captureDisplays({set: a})
        } catch {
            console.log('Failed to switch display, invalid param "' + e + '"')
        }
    }

    elevateDirect() {
        var n;
        const e = pu.fromPartial({direct: !0}), i = f.fromPartial({elevation_request: e});
        (n = this._ws) == null || n.sendMessage({misc: i}), this._elevationRequested = !0
    }

    elevateWithLogon(e) {
        var i;
        try {
            const n = JSON.parse(e), a = Ku.fromPartial({username: n.username, password: n.password}),
                t = pu.fromPartial({logon: a}), s = f.fromPartial({elevation_request: t});
            (i = this._ws) == null || i.sendMessage({misc: s}), this._elevationRequested = !0
        } catch {
            console.log('Failed to elevate with logon, invalid param "' + e + '"')
        }
    }

    async inputOsPassword(e) {
        var a, t;
        this.inputMouse(), await s4(50), this.inputMouse(0, 3, 3), await s4(50), this.inputMouse(1 | 1 << 3), this.inputMouse(2 | 1 << 3), await s4(1200);
        const i = S.fromPartial({press: !0, seq: e});
        (a = this._ws) == null || a.sendMessage({key_event: i});
        const n = S.fromPartial({press: !0, control_key: j.Return});
        (t = this._ws) == null || t.sendMessage({key_event: n})
    }

    lockScreen() {
        var i;
        const e = S.fromPartial({down: !0, control_key: j.LockScreen});
        (i = this._ws) == null || i.sendMessage({key_event: e})
    }

    isSwapControlCommand() {
        return this.getToggleOption("allow_swap_key")
    }

    getMod(e, i, n, a) {
        const t = [];
        return e && t.push(j.Alt), i && (this.isSwapControlCommand() ? t.push(j.Meta) : t.push(j.Control)), n && t.push(j.Shift), a && (this.isSwapControlCommand() ? t.push(j.Control) : t.push(j.Meta)), t
    }

    inputMouse(e = 0, i = 0, n = 0, a = !1, t = !1, s = !1, E = !1) {
        var d;
        const l = ku.fromPartial({mask: e, x: i, y: n, modifiers: this.getMod(a, t, s, E)});
        (d = this._ws) == null || d.sendMessage({mouse_event: l})
    }

    toggleOption(e) {
        var s;
        const i = !this._options[e], n = R.fromPartial({}), a = i ? y.Yes : y.No;
        switch (e) {
            case"show-remote-cursor":
                n.show_remote_cursor = a;
                break;
            case"follow-remote-cursor":
                n.follow_remote_cursor = a;
                break;
            case"follow-remote-window":
                n.follow_remote_window = a;
                break;
            case"disable-audio":
                n.disable_audio = a;
                break;
            case"disable-clipboard":
                n.disable_clipboard = a;
                break;
            case"lock-after-session-end":
                n.lock_after_session_end = a;
                break;
            case"privacy-mode":
                n.privacy_mode = a;
                break;
            case"enable-file-copy-paste":
                n.enable_file_transfer = a;
                break;
            case"block-input":
                n.block_input = y.Yes;
                break;
            case"unblock-input":
                n.block_input = y.No;
                break;
            case"show-quality-monitor":
            case"allow_swap_key":
                break;
            case"view-only":
                i ? (n.disable_keyboard = y.Yes, n.disable_clipboard = y.Yes, n.show_remote_cursor = y.Yes, n.enable_file_transfer = y.No, n.lock_after_session_end = y.No) : (n.disable_keyboard = y.No, n.disable_clipboard = this.getToggleOption("disable-clipboard") ? y.Yes : y.No, n.show_remote_cursor = this.getToggleOption("show-remote-cursor") ? y.Yes : y.No, n.enable_file_transfer = this.getToggleOption("enable-file-copy-paste") ? y.Yes : y.No, n.lock_after_session_end = this.getToggleOption("lock-after-session-end") ? y.Yes : y.No);
                break;
            default:
                this.setOption(e, this._options[e] ? void 0 : "Y");
                return
        }
        e.indexOf("block-input") < 0 && this.setOption(e, i);
        const t = f.fromPartial({option: n});
        (s = this._ws) == null || s.sendMessage({misc: t})
    }

    toggleVirtualDisplay(e) {
        try {
            const i = JSON.parse(e);
            this._sendToggleVirtualDisplayMsg(i.index, i.on), this.updateVirtualDisplay(i.index, i.on)
        } catch {
            console.log('Failed to toggle virtual display, invalid param "' + e + '"')
        }
    }

    togglePrivacyMode(e) {
        try {
            const i = JSON.parse(e);
            this._sendTogglePrivacyModeMsg(i.impl_key, i.on)
        } catch {
            console.log('Failed to toggle privacy mode, invalid param "' + e + '"')
        }
    }

    _sendToggleVirtualDisplayMsg(e, i) {
        var t;
        const n = Wu.fromPartial({display: e, on: i}), a = f.fromPartial({toggle_virtual_display: n});
        (t = this._ws) == null || t.sendMessage({misc: a})
    }

    _sendTogglePrivacyModeMsg(e, i) {
        var t;
        const n = Vu.fromPartial({impl_key: e, on: i}), a = f.fromPartial({toggle_privacy_mode: n});
        (t = this._ws) == null || t.sendMessage({misc: a})
    }

    updateVirtualDisplay(e, i) {
        const n = "virtual-display", a = this.getOption(n);
        if (i) {
            const t = a.split(","), s = t.length;
            e == 0 ? t.splice(0, t.length) : t.indexOf(e.toString()) < 0 && t.push(e.toString()), t.length != s && this.setOption(n, t.join(","))
        } else if (e == -1) a != "" && this.setOption(n, ""); else {
            const t = a.split(","), s = t.length;
            if (e == 0) t.pop(); else {
                const E = t.indexOf(e.toString());
                E >= 0 && t.splice(E, 1)
            }
            t.length != s && this.setOption(n, t.join(","))
        }
    }

    getImageQuality() {
        return this.getOption("image_quality")
    }

    getImageQualityEnum(e, i) {
        switch (e) {
            case"low":
                return Te.Low;
            case"best":
                return Te.Best;
            case"balanced":
                return i ? void 0 : Te.Balanced;
            default:
                return
        }
    }

    setImageQuality(e) {
        var t;
        this.setOption("image_quality", e);
        const i = this.getImageQualityEnum(e, !1);
        if (i == null) return;
        const n = R.fromPartial({image_quality: i}), a = f.fromPartial({option: n});
        (t = this._ws) == null || t.sendMessage({misc: a}), this._lastSendFps != 30 && this.setCustomFps(30, !1)
    }

    setCustomImageQuality(e) {
        var t;
        const i = e << 8, n = R.fromPartial({custom_image_quality: i}), a = f.fromPartial({option: n});
        (t = this._ws) == null || t.sendMessage({misc: a}), this.setOption("custom_image_quality", e.toString()), this.setOption("image_quality", "custom")
    }

    setCustomFps(e, i) {
        var s;
        const n = e, a = R.fromPartial({custom_fps: n}), t = f.fromPartial({option: a});
        (s = this._ws) == null || s.sendMessage({misc: t}), this._lastSendFps = n, i && this.setOption("custom-fps", e.toString())
    }

    sendNote(e, i) {
        let n = i;
        fetch(e, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({id: this._id, session_id: this._sessionId, note: n})
        }).then(a => {
            if (!a.ok) throw new Error(a.statusText);
            return a.text()
        }).then(a => {
            console.log("Send note response:", a)
        }).catch(a => {
            console.error("Failed to send note:", a)
        })
    }

    getPlatform() {
        var e;
        return ((e = this._peerInfo) == null ? void 0 : e.platform) || ""
    }

    async handleFileResponse(e) {
        var i, n;
        if (e.dir) {
            let a = e.dir, t = a.entries;
            if (!he() && this.getPeerPlatform() == "Windows") for (let s = 0; s < t.length; s++) t[s].name = t[s].name.replace(/\\/g, "/");
            pt(a.id, t, a.path, !1, !1), this._writeJobs.forEach(s => {
                s.id == a.id && (s.files = t)
            }), this._removeJobs[a.id] && (this._removeJobs[a.id].files = t)
        } else if (e.empty_dirs != null) {
            const a = e.empty_dirs;
            for (let t = 0; t < this._readRemoteEmptyDirsJobs.length; t++) this._readRemoteEmptyDirsJobs[t].path == a.path && (this._readRemoteEmptyDirsJobs[t].empty_dirs = a.empty_dirs.map(s => s.path))
        } else if (e.block) {
            const a = e.block, t = this._writeJobs.find(s => s.id == a.id);
            if (t) try {
                await t.write(a, () => {
                    console.log(`cancel job ${t.id} due to write failed`), this.cancelJob(t.id)
                })
            } catch (s) {
                console.log("write file failed", s)
            }
            this.update_jobs_status()
        } else if (e.digest) {
            const a = e.digest;
            if (a.is_upload) {
                const t = this._readJobs.find(s => s.id == a.id);
                if (t) {
                    const s = t.read_digest(a);
                    s && ((i = this._ws) == null || i.sendMessage(s))
                }
            } else {
                const t = this._writeJobs.find(s => s.id == a.id);
                if (t) {
                    const s = t.write_digest(a);
                    s && ((n = this._ws) == null || n.sendMessage(s))
                }
            }
        } else if (e.done) {
            const a = e.done, t = this._writeJobs.find(E => E.id == a.id);
            let s;
            t && (t.write_done(a, () => this._readRemoteEmptyDirsJobs.find(E => E.id == a.id), () => this.removeReadRemoteEmptryDirJob(a.id)), s = t.job_error(), this._writeJobs = this._writeJobs.filter(E => E.id != a.id)), this.handle_job_status(a.id, a.file_num, s)
        } else if (e.error) {
            const a = e.error;
            this._writeJobs = this._writeJobs.filter(t => t.id != a.id), this.removeReadRemoteEmptryDirJob(a.id), this.handle_job_status(a.id, a.file_num, a.error)
        }
    }

    removeReadRemoteEmptryDirJob(e) {
        this._readRemoteEmptyDirsJobs = this._readRemoteEmptyDirsJobs.filter(i => i.id != e)
    }

    readRemoteDir(e) {
        var i;
        try {
            const n = JSON.parse(e),
                a = I.fromPartial({read_dir: fu.fromPartial({path: n.path, include_hidden: n.include_hidden})});
            (i = this._ws) == null || i.sendMessage({file_action: a})
        } catch (n) {
            console.error("Failed to read remote dir:", n)
        }
    }

    async sendFiles(e) {
        var i;
        try {
            const n = JSON.parse(e), {
                id: a,
                path: t,
                to: s,
                file_num: E,
                include_hidden: l,
                is_remote: d,
                is_dir: c
            } = n, p = this.enableOverwriteDetection();
            if (d) {
                this._writeJobs.push(Eu.newWrite(a, t, s, E, l, d, [], p, c));
                const B = zo(a, t, E, l);
                (i = this._ws) == null || i.sendMessage({file_action: B}), c && this.enableEmptyDirs() && (this._readRemoteEmptyDirsJobs.find(F => F.id == a) == null && this._readRemoteEmptyDirsJobs.push(new So({
                    id: a,
                    path: t
                })), this.sendMessage({file_action: Mo(t, l)}))
            }
        } catch (n) {
            console.error("Failed to send files:", n)
        }
    }

    async sendLocalFiles(e) {
        try {
            const i = JSON.parse(e), {
                handle_index: n,
                id: a,
                path: t,
                to: s,
                file_num: E,
                include_hidden: l,
                is_remote: d
            } = i, c = this.enableOverwriteDetection();
            if (!d) try {
                let p = this._fileHandles[n];
                if (!p) throw new Error("Failed to get file handle");
                let B = [], F = [];
                if (p instanceof FileSystemFileHandle) {
                    let k = await p.getFile();
                    B = [V.fromPartial({
                        size: k.size,
                        entry_type: 4,
                        modified_time: Math.floor(k.lastModified / 1e3)
                    })], F = [p]
                } else {
                    let k = await ua(p, "");
                    B = k.map(M => M.entry), F = k.map(M => M.handle)
                }
                let b = Eu.newRead(a, t, s, E, l, d, B, c, F);
                pt(a, B, t, !d, !0), this._readJobs.push(b), this._ftTimer || (this._ftTimer = setTimeout(this.readJobTimerCallback.bind(this), At));
                let x = [...B];
                if (he() && this.getPeerPlatform() != "Windows") for (let k = 0; k < x.length; k++) x[k].name = x[k].name.replace(/\\/g, "/");
                if (this.sendMessage({file_action: No(a, s, E, x, b.total_size)}), this.enableEmptyDirs()) {
                    const k = await ea(p, p.name);
                    k.length > 0 && A("send_emptry_dirs", {dirs: k})
                }
            } catch (p) {
                console.error("Failed to send files:", p), this.handle_job_status(a, -1, (p != null ? p : "Failed to send files").toString())
            }
        } catch (i) {
            console.error("Failed to send files:", i)
        }
    }

    async readJobTimerCallback() {
        let e = await Ko(this._readJobs, this.sendMessage.bind(this));
        this._readJobs = this._readJobs.filter(i => !e.includes(i.id)), this.update_jobs_status(), this._readJobs.length == 0 ? (clearTimeout(this._ftTimer), this._ftTimer = void 0) : this._ftTimer = setTimeout(this.readJobTimerCallback.bind(this), At)
    }

    update_jobs_status() {
        const e = new Date().getTime() - this._last_update_jobs_ms;
        e >= 1e3 && (this._readJobs.forEach(i => {
            i.update_job_status(e)
        }), this._writeJobs.forEach(i => {
            i.update_job_status(e)
        }), this._last_update_jobs_ms = new Date().getTime())
    }

    handle_job_status(e, i, n) {
        var a;
        if (this._removeJobs[e] && this._removeJobs[e].no_confirm) {
            const t = this._removeJobs[e].files;
            if (i + 1 < t.length) {
                const s = this._removeJobs[e].path + this._removeJobs[e].sep + t[i + 1].name;
                if ((a = this._ws) == null || a.sendMessage({file_action: ct(e, s, i + 1, this._removeJobs[e].is_remote)}), new Date().getTime() - this._removeJobs[e].last_update_job_status >= 1e3) this._removeJobs[e].last_update_job_status = new Date().getTime(); else return
            } else delete this._removeJobs[e], console.log("remove jobs:", this._removeJobs)
        }
        n ? A4(e, n, i) : Vo(e, i)
    }

    cancelJob(e) {
        var n;
        (n = this._ws) == null || n.sendMessage({file_action: Io(e)});
        let i = this._writeJobs.find(a => a.id == e);
        i && i.remove_download_file(), this._writeJobs = this._writeJobs.filter(a => a.id != e), this._readJobs = this._readJobs.filter(a => a.id != e), delete this._removeJobs[e]
    }

    removeAllEmptyDirs(e) {
        var i;
        try {
            const n = JSON.parse(e);
            (i = this._ws) == null || i.sendMessage({file_action: To(n.id, n.path)})
        } catch (n) {
            console.error("Failed to remove all empty dirs:", n)
        }
    }

    removeFile(e) {
        var i;
        try {
            const n = JSON.parse(e), {id: a, path: t, file_num: s, is_remote: E} = n;
            E && ((i = this._ws) == null || i.sendMessage({file_action: ct(a, t, s, E)}))
        } catch (n) {
            console.error("Failed to remove files:", n)
        }
    }

    readDirToRemoveRecursive(e) {
        var i;
        try {
            const n = JSON.parse(e), {id: a, path: t, is_remote: s, show_hidden: E} = n;
            if (s) {
                (i = this._ws) == null || i.sendMessage({file_action: Po(a, t, E)});
                const l = (d, c) => (d ? c === "Windows" : he()) ? "\\" : "/";
                this._removeJobs[a] = {
                    path: t,
                    files: [],
                    no_confirm: !1,
                    is_remote: s,
                    sep: l(s, this.getPeerPlatform()),
                    last_update_job_status: new Date().getTime()
                }
            }
        } catch (n) {
            console.error("Failed to read dir to remove recursive:", n)
        }
    }

    createDir(e) {
        var i;
        try {
            const n = JSON.parse(e), {id: a, path: t, is_remote: s} = n;
            s && ((i = this._ws) == null || i.sendMessage({file_action: Ro(a, t)}))
        } catch (n) {
            console.error("Failed to create dir:", n)
        }
    }

    renameFile(e) {
        var i;
        try {
            const n = JSON.parse(e), {id: a, path: t, new_name: s, is_remote: E} = n;
            E && ((i = this._ws) == null || i.sendMessage({file_action: jo(a, t, s)}))
        } catch (n) {
            console.error("Failed to rename file:", n)
        }
    }

    async seletFiles(e) {
        await qo(e, (i, n) => {
            this._fileHandles[i] = n
        })
    }

    async handleFileAction(e) {
        if (e.send_confirm) {
            const i = e.send_confirm, n = this._readJobs.find(a => a.id == i.id);
            n && n.confirm(i)
        }
    }

    async confirmOverrideFile(e) {
        try {
            const i = JSON.parse(e), {id: n, file_num: a, need_override: t, remember: s, is_upload: E} = i;
            if (E) {
                const l = this._readJobs.find(d => d.id == n);
                l && (s && (l.default_overwrite_strategy = t), l.confirm(du.fromPartial({
                    id: n,
                    file_num: a,
                    offset_blk: t ? 0 : void 0,
                    skip: t ? void 0 : !0
                })))
            }
        } catch (i) {
            console.error("Failed to confirm override file:", i)
        }
    }

    sendChat(e) {
        const i = gu.fromPartial({text: e}), n = f.fromPartial({chat_message: i});
        this.sendMessage({misc: n})
    }

    changeResolution(e) {
        var i;
        try {
            const n = JSON.parse(e), a = v.fromPartial({width: n.width, height: n.height});
            let t;
            this._peerInfo && L(this._peerInfo.version) >= L("1.2.4") ? t = f.fromPartial({
                change_display_resolution: Uu.fromPartial({
                    display: n.display,
                    resolution: a
                })
            }) : t = f.fromPartial({change_resolution: a}), (i = this._ws) == null || i.sendMessage({misc: t}), this._lastChangeDisplay = {
                display: n.display,
                width: n.width,
                height: n.height,
                time: new Date().getTime()
            }
        } catch (n) {
            console.error("Failed to change resolution:", n)
        }
    }

    setCustomResolution(e) {
        var a, t;
        const i = (s, E) => {
            const l = s.toString(), d = this.loadConfig();
            d.custom_resolutions || (d.custom_resolutions = {}), E ? d.custom_resolutions[l] = {
                w: E[0],
                h: E[1]
            } : delete d.custom_resolutions[l], this.saveConfig(d)
        }, n = () => {
            var s, E, l;
            return ((s = this._lastChangeDisplay) == null ? void 0 : s.display) == e.display && ((E = this._lastChangeDisplay) == null ? void 0 : E.width) == e.width && ((l = this._lastChangeDisplay) == null ? void 0 : l.height) == e.height && new Date().getTime() - this._lastChangeDisplay.time < 15e3
        };
        if (e.width == ((a = e.original_resolution) == null ? void 0 : a.width) && e.height == ((t = e.original_resolution) == null ? void 0 : t.height)) i(e.display, void 0); else {
            const s = this._lastChangeDisplay;
            if ((s == null ? void 0 : s.display) == e.display) {
                const E = n() ? [e.width, e.height] : void 0;
                i(e.display, E)
            }
        }
    }

    getCustomResolution(e) {
        const n = this.loadConfig().custom_resolutions;
        if (n) {
            const a = n[e.toString()];
            if (a && a.w && a.h) return [a.w, a.h]
        }
    }

    tryChangeInitResolution(e) {
        const i = this.getCustomResolution(e);
        i && this.changeResolution(JSON.stringify({display: e, width: i[0], height: i[1]}))
    }

    setMultipleWindowsSession(e) {
        let i = [];
        e.forEach(n => {
            let a = {};
            a.sid = n.sid.toString(), a.name = n.name, i.push(a)
        }), A("set_multiple_windows_session", {windows_sessions: JSON.stringify(i)})
    }

    sendSelectedSessionId(e) {
        var n, a;
        const i = parseInt(e);
        if (isNaN(i)) console.error("selected invalid sid: ", e); else {
            this._selectedWindowsSessionId = i;
            const t = f.fromPartial({selected_sid: i});
            (n = this._ws) == null || n.sendMessage({misc: t});
            const s = this._peerInfo;
            s && ((a = s.windows_sessions) == null ? void 0 : a.current_sid) == i && (this._isFileTransfer ? s.username || this.msgbox("error", "Error", "No active console user logged on, please connect and logon first.") : this.msgbox("success", "Successful", "Connected, waiting for image..."))
        }
    }
}

function Ue(u = !1) {
    const e = m.getItem("custom-rendezvous-server");
    return Me(e || Qo, u)
}

const Xo = 21118, Yo = 21119;

function $o(u) {
    return /^(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d+)?$/.test(u)
}

function ur(u) {
    return /^((([a-fA-F0-9]{1,4}:{1,2})+[a-fA-F0-9]{1,4})|(\[([a-fA-F0-9]{1,4}:{1,2})+[a-fA-F0-9]{1,4}\]:\d+))$/.test(u)
}

function er(u) {
    return /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z-]{0,61}[a-z]:\d{1,5}$/i.test(u)
}

function ir(u) {
    return /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z-]{0,61}[a-z]$/i.test(u)
}

function tr(u) {
    return u.startsWith("ws://") || u.startsWith("wss://")
}

function ar() {
    return window.location.protocol === "https:"
}

function isHttps() {
    return window.location.protocol === "https:"
}
function getUriFromRs(uri, isRelay = false) {
    if (window.ws_host) {
        return window.ws_host + "/ws/" + (isRelay ? "relay" : "id")
    }
    const p = isHttps() ? "wss://" : "ws://"
    const [domain, uriport] = uri.split(":")
    if (!isHttps()) {
        // http 直接走端口
        if (uriport) {
            const port = parseInt(uriport)
            return p + domain + ":" + (port + 2)
        }
        return p + domain + ":" + (defaultIdServerPort + (isRelay ? 3 : 2))
    }
    // https 分情况
    if (!window.location.port) {
        // 443
        return p + domain + "/ws/" + (isRelay ? "relay" : "id")
    }
    // 非443
    return p + domain + ":" + window.location.port + "/ws/" + (isRelay ? "relay" : "id")
}
function Me(u, e = !1) {
    if (tr(u)) return u;
    return getUriFromRs(u, e)
    const i = e ? Yo : Xo, n = e ? "/ws/relay" : "/ws/id", a = ar() ? "wss" : "ws";
    if ($o(u)) { //是纯ip
        const t = u.indexOf(":");
        if (t !== -1) {
            //带端口
            const s = u.substring(0, t), E = u.substring(t + 1), l = parseInt(E);
            return isNaN(l) ? `${a}://${s}:${i}` : `${a}://${s}:${l + 2}`
        } else return `${a}://${u}:${i}`
    }
    if (ur(u)) {
        const t = u.lastIndexOf("]");
        if (t !== -1) {
            const s = u.substring(0, t + 1), E = u.substring(t + 2), l = parseInt(E);
            return isNaN(l) ? `${a}://${s}:${i}` : `${a}://${s}:${l + 2}`
        } else return u.startsWith("[") ? `${a}://${u}:${i}` : `${a}://[${u}]:${i}`
    }
    if (u.includes(":")) {
        const [t, s] = u.split(":");
        if (er(u)) return `${a}://${t}${n}`
    } else if (ir(u)) return `${a}://${u}${n}`;
    return u
}

const mt = (u, e, i) => e && u.type == "SharedAb" ? Q(Qu([u.value, i.salt])) === Q(e) : !1,
    Ft = (u, e) => e && u.type == "PersonalAb" ? Q(u.value) === Q(e) : !1;

function nr() {
    return Ue()
}

function _t(u, e) {
    I4("callback_query_onlines", {onlines: u.join(","), offlines: e.join(",")})
}
const onlineCache = {}

// Query onlines
async function myQueryOnline(id) {
    const last_online = onlineCache[id]
    if (last_online && new Date().getTime() - last_online < 20 * 1000) {
        return true
    }
    // 映射 方便后期更新
    const maps = {
        uri: Ue(),
        ws: Ve,
        conn_type: je.DEFAULT_CONN,
        nat_type: bt.SYMMETRIC,
        token: Gt(),
        version: c4,
        licence_key: Jt(),
        rendezvousPunchHoleRequest: Hu,
        rendezvousPunchHoleResponse_Failure: $0
    }

    const s = new maps.ws(maps.uri, !0, "rendezvous");
    await s.open();
    const punch_hole_request = maps.rendezvousPunchHoleRequest.fromPartial({
        id: id,
        licence_key: maps.licence_key,
        conn_type: maps.conn_type,
        nat_type: maps.nat_type,
        token: maps.token,
        version: maps.version
    });
    s.sendRendezvous({punch_hole_request: punch_hole_request});
    const msg = await s.next();
    s.close();
    let online = false
    const phr = msg.punch_hole_response, rr = msg.relay_response;
    if (phr) {
        online = true
        if (phr != null && phr.other_failure) {
            online = false
            return online
        }
        if (phr.failure != maps.rendezvousPunchHoleResponse_Failure.UNRECOGNIZED) switch (phr == null ? void 0 : phr.failure) {
            case maps.rendezvousPunchHoleResponse_Failure.ID_NOT_EXIST:
            case maps.rendezvousPunchHoleResponse_Failure.OFFLINE:
            case maps.rendezvousPunchHoleResponse_Failure.LICENSE_MISMATCH:
            case maps.rendezvousPunchHoleResponse_Failure.LICENSE_OVERUSE:
                online = false
                break
        }
    } else if (rr) {
        online = true
        if (!rr.version) {
            online = false
            return online
        }
    }
    if (online) {
        onlineCache[id] = new Date().getTime()
    } else if (onlineCache[id]) {
        delete onlineCache[id]
    }
    return online
}

async function or(u) {
    let e = [];
    try {
        e = JSON.parse(u)
    } catch (a) {
        console.error("Failed to query onlines, ", a);
        return
    }
    if (e.length === 0) return;

    if (window.webclient_magic_queryonline) {
        const onlines = []
        const offlines = []
        for (let i = 0; i < e.length; i++) {
            let online = await myQueryOnline(e[i])
            if (online) {
                onlines.push(e[i])
            } else {
                offlines.push(e[i])
            }
        }
        _t(onlines, offlines)
    } else {
        const i = nr(), n = new Ve(i, !0, "query onlines");
        try {
            await n.open();
            const a = Gu.fromPartial({id: qe(), peers: e});
            n.sendRendezvous({online_request: a})
        } catch (a) {
            console.error("Failed to query onlines, ", a), _t([], e), n.close();
            return
        }
        for (let a = 0; a < 2; a++) {
            const t = await uo(n, 3e3);
            if (!t || (t == null ? void 0 : t.key_exchange) || (t == null ? void 0 : t.online_response) === void 0) continue;
            const s = t.online_response.states;
            let E = [], l = [];
            for (let d = 0; d < e.length; d++) {
                const c = 1 << 7 - d % 8;
                (s[d / 8] & c) === c ? E.push(e[d]) : l.push(e[d])
            }
            _t(E, l), n.close();
            return
        }
        n.close(), console.error("Failed to query online states, no online response")
    }
}

const rr = "rustdesk-client";

function sr() {
    if (typeof navigator != "undefined") {
        const u = navigator.platform.toLowerCase();
        return u.includes("win") ? "windows" : u.includes("mac") ? "macos" : u.includes("linux") ? "linux" : u
    }
    return "unknown"
}

function Er() {
    const u = sr();
    return u === "windows" ? navigator.userAgent.includes("Win64") ? "x86_64" : "x86" : u === "macos" ? navigator.userAgent.includes("Intel") ? "x86_64" : "arm64" : navigator.userAgent.includes("x64") ? "x86_64" : "x86"
}

function lr() {
    const u = navigator.userAgent;
    let e = "", i = "";
    if (u.includes("Windows")) {
        e = "windows";
        const n = u.match(/Windows NT (\d+\.\d+)/);
        n && (i = n[1])
    } else if (u.includes("Mac OS X")) {
        e = "macos";
        const n = u.match(/Mac OS X (\d+[._]\d+[._]\d+)/);
        n && (i = n[1].replace(/_/g, "."))
    } else if (u.includes("Linux")) {
        e = "linux";
        const n = u.match(/Linux\s*([\d.]+)?/);
        n && n[1] && (i = n[1])
    } else e = "unknown", i = "";
    return e += "-" + navigator.userAgent, {os: e, os_version: i}
}

async function Dr(u) {
    const e = "https://api.rustdesk.com/version/latest", {os: i, os_version: n} = lr(), a = Er();
    return [{os: i, os_version: n, arch: a, device_id: [], typ: u, host: window.location.host}, e]
}

async function dr() {
    try {
        const [u, e] = await Dr(rr);
        return await (await fetch(e, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(u)
        })).json()
    } catch {
        return null
    }
}

window.curConn = void 0;
window.isMobile = () => /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4));
const R4 = Ht(), $u = R4 === a4, Ye = R4 === g4, Xu = R4 === k4, cr = window.location.host;

function Cr() {
    return !isMobile()
}

function aa(u, e, i, n) {
    if (!(!u || u == "error" && !i)) {
        i.toLowerCase();
        var a = zn(u, e, i) ? "true" : "";
        onGlobalEvent(JSON.stringify({
            name: "msgbox",
            type: u,
            title: e,
            text: i,
            link: n != null ? n : "",
            hasRetry: a
        }))
    }
}

function pr(u, e, i) {
    onGlobalEvent(JSON.stringify({name: "toast", type: u, text: e, dur_msec: i}))
}

function na(u) {
    var e = {};
    for (const [i, n] of Object.entries(u)) !i || (n instanceof String || typeof n == "string" ? e[i] = n : n instanceof Uint8Array ? e[i] = "[" + n.toString() + "]" : e[i] = JSON.stringify(n));
    return e
}

function A(u, e) {
    e = na(e), e.name = u, onGlobalEvent(JSON.stringify(e))
}

function m4() {
    var e;
    ((e = f4("input-source")) != null ? e : nt) === nt ? Do() : p4()
}

function I4(u, e) {
    e = na(e), e.name = u, onRegisteredEvent(JSON.stringify(e))
}

function F4(u, e) {
    onRgba(u, e)
}

function T4(u) {
    window.curConn = u
}

function i0() {
    return window.curConn
}

async function oa() {
    await curConn.start()
}

function j4() {
    var u;
    (u = i0()) == null || u.close(), T4(void 0)
}

function ra() {
    var e;
    (e = window.curConn) == null || e.close();
    const u = new ta;
    return T4(u), u
}

let K;

async function sa() {
    try {
        K || (await Le.ready, K = Le)
    } catch (u) {
        console.error("Failed to init sodium: " + u.message)
    }
}

function Ea() {
    return K
}

async function _4(u, e) {
    return await sa(), typeof u == "string" && (u = be(u)), typeof e == "string" && (e = be(e)), K.crypto_sign_open(u, e)
}

function be(u) {
    return K.from_base64(u, K.base64_variants.ORIGINAL)
}

function Br(u) {
    return K.to_base64(u, K.base64_variants.ORIGINAL)
}

function Ar() {
    const u = K.crypto_box_keypair(), e = u.privateKey, i = u.publicKey;
    return [e, i]
}

function mr() {
    return K.crypto_secretbox_keygen()
}

function Fr(u, e, i) {
    const n = Uint8Array.from(Array(24).fill(0));
    return K.crypto_box_easy(u, n, e, i)
}

function n4(u) {
    for (var e = Array(24).fill(0), i = 0; i < e.length && u > 0; i++) {
        var n = u & 255;
        e[i] = n, u = (u - n) / 256
    }
    return Uint8Array.from(e)
}

function vt(u, e, i) {
    return K.crypto_secretbox_easy(u, n4(e), i)
}

function _r(u, e, i) {
    return K.crypto_secretbox_open_easy(u, n4(e), i)
}

window.setByName = (u, e) => {
    switch (u) {
        case"connect":
            ra(), oa();
            break;
        case"login":
            e = JSON.parse(e), curConn.handle_login_from_ui(e.os_username, e.os_password, e.password, e.remember);
            break;
        case"close":
            j4();
            break;
        case"refresh":
            curConn.refresh();
            break;
        case"reconnect":
            curConn == null || curConn.reconnect();
            break;
        case"toggle_virtual_display":
            curConn.toggleVirtualDisplay(e);
            break;
        case"toggle_privacy_mode":
            curConn.togglePrivacyMode(e);
            break;
        case"image_quality":
            curConn.setImageQuality(e);
            break;
        case"custom_image_quality":
            curConn.setCustomImageQuality(e);
            break;
        case"custom-fps":
            curConn.setCustomFps(e, !0);
            break;
        case"lock_screen":
            curConn.lockScreen();
            break;
        case"ctrl_alt_del":
            curConn.ctrlAltDel();
            break;
        case"switch_display":
            curConn.switchDisplay(e);
            break;
        case"remove_peer":
            In(e);
            break;
        case"input_key":
            e = JSON.parse(e), curConn.inputKey(e.name, e.down == "true", e.press == "true", e.alt == "true", e.ctrl == "true", e.shift == "true", e.command == "true");
            break;
        case"input_string":
            curConn.inputString(e);
            break;
        case"flutter_key_event":
            e = JSON.parse(e), co(curConn, e.usb_hid, e.down == "true", e.lock_modes);
            break;
        case"send_mouse":
            vr(e);
            break;
        case"send_2fa":
            curConn == null || curConn.send2fa(e);
            break;
        case"option":
            e = JSON.parse(e), m.setItem(e.name, e.value);
            break;
        case"options":
            e = JSON.parse(e);
            for (const [n, a] of Object.entries(a)) m.setItem(n, a);
            break;
        case"option:local": {
            let n = JSON.parse(e);
            if (n.name == 'access_token' && n.value) {
                getServerConf(n.value)
            }
            n.name === "verifier" && kt(n.value), n.name === "user_info" && (n.value || kt("")), Nt(n.name, n.value), n.name === "input-source" && m4(), n.name == "lang" && Kn()
        }
            break;
        case"option:flutter:local":
            e = JSON.parse(e), On(e.name, e.value);
            break;
        case"option:flutter:peer":
            e = JSON.parse(e), curConn.setFlutterUiOption(e.name, e.value);
            break;
        case"option:user:default":
            wr(e);
            break;
        case"option:session":
            e = JSON.parse(e), curConn.setOption(e.name, e.value);
            break;
        case"option:peer":
            try {
                e = JSON.parse(e), jt(e.id, e.name, e.value)
            } catch (n) {
                console.error('Failed to set peer option: "' + e + '", ' + n.message)
            }
            break;
        case"option:toggle":
            return curConn.toggleOption(e);
        case"input_os_password":
            curConn.inputOsPassword(e);
            break;
        case"session_add_sync":
            return Pr(e);
        case"session_start":
            Rr();
            break;
        case"session_close":
            Ir();
            break;
        case"elevate_direct":
            curConn.elevateDirect();
            break;
        case"elevate_with_logon":
            curConn.elevateWithLogon(e);
            break;
        case"peer_exists":
            return !!cu()[e];
        case"restart":
            curConn.restart();
            break;
        case"fav":
            return m.setItem("fav", e);
        case"query_onlines":
            or(e);
            break;
        case"change_prefer_codec":
            curConn.changePreferCodec(e);
            break;
        case"cursor":
            yr(e);
            break;
        case"enter_or_leave":
            curConn == null || curConn.enterOrLeave(e);
            break;
        case"fullscreen":
            e == "Y" ? jr() : Nr();
            break;
        case"send_note":
            const i = Da("conn");
            i && (curConn == null || curConn.sendNote(i, e));
            break;
        case"read_remote_dir":
            curConn == null || curConn.readRemoteDir(e);
            break;
        case"send_files":
            curConn == null || curConn.sendFiles(e);
            break;
        case"send_local_files":
            curConn == null || curConn.sendLocalFiles(e);
            break;
        case"cancel_job":
            curConn == null || curConn.cancelJob(e);
            break;
        case"remove_all_empty_dirs":
            curConn == null || curConn.removeAllEmptyDirs(e);
            break;
        case"remove_file":
            curConn == null || curConn.removeFile(e);
            break;
        case"create_dir":
            curConn == null || curConn.createDir(e);
            break;
        case"rename_file":
            curConn == null || curConn.renameFile(e);
            break;
        case"read_dir_to_remove_recursive":
            curConn == null || curConn.readDirToRemoveRecursive(e);
            break;
        case"select_files":
            curConn == null || curConn.seletFiles(e);
            break;
        case"confirm_override_file":
            curConn == null || curConn.confirmOverrideFile(e);
            break;
        case"send_chat":
            curConn == null || curConn.sendChat(e);
            break;
        case"load_ab":
            Mr();
            break;
        case"save_ab":
            Un(e);
            break;
        case"clear_ab":
            Mn();
            break;
        case"load_group":
            Lr();
            break;
        case"save_group":
            Ln(e);
            break;
        case"clear_group":
            Vn();
            break;
        case"change_resolution":
            curConn == null || curConn.changeResolution(e);
            break;
        case"selected_sid":
            curConn == null || curConn.sendSelectedSessionId(e);
            break
    }
};

function vr(u) {
    if (!curConn) return;
    let e = 0;
    switch (u = JSON.parse(u), u.type) {
        case"down":
            e = kn, setTimeout(() => {
                Xt(curConn)
            }, 100);
            break;
        case"up":
            e = hn;
            break;
        case"wheel":
            e = rt;
            break;
        case"trackpad":
            e = st;
            break
    }
    switch (u.buttons) {
        case"left":
            e |= Pe << 3;
            break;
        case"right":
            e |= Re << 3;
            break;
        case"wheel":
            e |= fn << 3;
            break;
        case"back":
            e |= xn << 3;
            break;
        case"forward":
            e |= yn << 3;
            break
    }
    let i = parseInt(u.x || "0"), n = parseInt(u.y || "0");
    (e == rt || e == st) && curConn.getOption("reverse_mouse_wheel") == "Y" && (i = -i, n = -n);
    const a = (e & Pe << 3) > 0 ? 1 : 0, t = (e & Re << 3) > 0 ? 1 : 0;
    a ^ t && curConn.getToggleOption("swap-left-right-mouse") && (a ? e = e & ~(Pe << 3) | Re << 3 : e = e & ~(Re << 3) | Pe << 3), curConn.inputMouse(e, i, n, u.alt == "true", u.ctrl == "true", u.shift == "true", u.command == "true")
}

window.getByName = (u, e) => {
    let i = gr(u, e);
    return typeof i == "string" || i instanceof String ? i : i == null || i == null ? "" : JSON.stringify(i)
};

function gr(u, e) {
    var n, a, t, s;
    switch (u) {
        case"remember":
            return curConn.getRemember();
        case"option":
            return m.getItem(e);
        case"options":
            const E = ["custom-rendezvous-server", "relay-server", "api-server", "key"], l = {};
            return E.forEach(c => {
                const p = m.getItem(c);
                p && (l[c] = p)
            }), JSON.stringify(l);
        case"option:local":
            const res = f4(e) || "";
            if (e == 'access_token' && res) {
                getServerConf(res)
            }
            return res;
        case"option:flutter:local":
            return Nn(e) || "";
        case"option:flutter:peer":
            return curConn.getFlutterUiOption(e) || "";
        case"image_quality":
            return curConn.getImageQuality();
        case"translate":
            return e = JSON.parse(e), Jn(e.locale, e.text);
        case"option:user:default":
            return e0(e);
        case"option:session":
            return curConn ? curConn.getOption(e) : e0(e);
        case"option:peer":
            try {
                const c = JSON.parse(e);
                return (n = jn(c.id, c.name)) != null ? n : e0(c.name)
            } catch (c) {
                return console.error('Failed to get peer option: "' + e + '", ' + c.message), ""
            }
        case"option:toggle":
            return curConn == null ? void 0 : curConn.getToggleOption(e);
        case"get_conn_status":
            return curConn ? curConn.getStatus() : JSON.stringify({status_num: 0});
        case"test_if_valid_server":
            break;
        case"version":
            return c4;
        case"load_recent_peers":
            Sr();
            break;
        case"load_fav_peers":
            zr();
            break;
        case"fav":
            return (a = m.getItem("fav")) != null ? a : "[]";
        case"load_recent_peers_sync":
            return JSON.stringify({peers: JSON.stringify(O4())});
        case"api_server":
            return U4();
        case"is_using_public_server":
            return !m.getItem("custom-rendezvous-server");
        case"get_version_number":
            return L(e);
        case"audit_server":
            return Da(e);
        case"alternative_codecs":
            return curConn.getAlternativeCodecs();
        case"screen_info":
            return JSON.stringify({
                frame: {
                    l: window.screenX,
                    t: window.screenY,
                    r: window.screenX + window.innerWidth,
                    b: window.screenY + window.innerHeight
                },
                visibleFrame: {
                    l: window.screen.availLeft,
                    t: window.screen.availTop,
                    r: window.screen.availLeft + window.screen.availWidth,
                    b: window.screen.availTop + window.screen.availHeight
                },
                scaleFactor: window.devicePixelRatio
            });
        case"main_display":
            return JSON.stringify({
                w: window.screen.availWidth,
                h: window.screen.availHeight,
                scaleFactor: window.devicePixelRatio
            });
        case"langs":
            var i = Object.entries(Sn).map(([c, p]) => [c, `${p} (${c})`]);
            return i.sort((c, p) => c[0].localeCompare(p[0])), JSON.stringify(i);
        case"build_date":
            return Rn;
        case"my_id":
            return qe();
        case"my_name":
            return qt();
        case"uuid":
            return Kt();
        case"local_os":
            return Ht();
        case"peer_has_password":
            return ((t = (cu()[e] || {}).password) != null ? t : "") !== "";
        case"fullscreen":
            return Or() ? "Y" : "N";
        case"platform":
            return curConn.getPlatform();
        case"enable_trusted_devices":
            return (s = curConn == null ? void 0 : curConn.enableTrustedDevices()) != null && s ? "Y" : "N"
    }
    return ""
}

let N4 = new Worker("./libopus.js?v=02816afa"), la;

function kr(u, e) {
    la = fr(u, e), N4.postMessage({channels: u, sampleRate: e})
}

function hr(u) {
    N4.postMessage(u, [u.buffer])
}

window.init = async () => {
    try {
        N4.onmessage = u => {
            la.feed(u.data)
        }, await sa(), await Xn(), await Xa(), await N.init(), console.log("init done"), onInitFinished(), dr(), await Vr(), Ba(!0)
    } catch (u) {
        console.error("Failed to init: " + u.message), onInitFinished()
    }
};
window.onunload = () => {
    console.log("window close"), $a()
};

function fr(u, e) {
    return new ha({channels: u, sampleRate: e, flushingTime: 2e3})
}

function xr(u) {
    if (window.clipboardData && window.clipboardData.setData) return window.clipboardData.setData("Text", u);
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var e = document.createElement("textarea");
        e.textContent = u, e.style.position = "fixed", document.body.appendChild(e), e.select();
        try {
            return document.execCommand("copy")
        } catch (i) {
            console.warn("Copy to clipboard failed.", i)
        } finally {
            document.body.removeChild(e)
        }
    }
}

function L(u) {
    try {
        let e = u.split("-"), i = 0;
        if (e.length > 0) {
            let n = 0;
            for (let a of e[0].split(".")) n = parseInt(a) || 0, i = i * 1e3 + n;
            i -= n, i += n * 10
        }
        return e.length > 1 && (i += parseInt(e[1]) || 0), i
    } catch (e) {
        return console.error('Failed to parse version number: "' + u + '" ' + e.message), 0
    }
}

function yr(u) {
    let e = "auto";
    if (u != "auto") try {
        const t = JSON.parse(u);
        if (!t.url) return;
        e = `url(${t.url}) ${t.hotx} ${t.hoty}, auto`
    } catch (t) {
        console.error("Failed to set custom cursor: " + t.message);
        return
    }
    for (var i = document.body, n = 0; n < i.children.length; n++) {
        var a = i.children[n];
        a.tagName == "FLUTTER-VIEW" && (a.style.cursor = e)
    }
}

async function br() {
    await Le.ready;
    const u = Le.crypto_sign_keypair();
    return {publicKey: u.publicKey, privateKey: u.privateKey}
}

function wr(u) {
    try {
        const e = JSON.parse(u), i = JSON.parse(m.getItem("user-default-options")) || {};
        i[e.name] = e.value, m.setItem("user-default-options", JSON.stringify(i))
    } catch (e) {
        console.error("Failed to set user default options: " + e.message)
    }
}

function e0(u) {
    var i, n, a;
    const e = {
        view_style: "original",
        scroll_style: "scrollauto",
        image_quality: "balanced",
        "codec-preference": "auto",
        custom_image_quality: "50",
        "custom-fps": "30"
    };
    try {
        return (n = (i = (JSON.parse(m.getItem("user-default-options")) || {})[u]) != null ? i : e[u]) != null ? n : ""
    } catch (t) {
        return console.error("Failed to get user default options: " + t.message), (a = e[u]) != null ? a : ""
    }
}

function O4() {
    const u = [];
    for (const [e, i] of Object.entries(cu())) {
        if (!e) continue;
        const n = i.tm, a = i.info, t = {
            id: e,
            username: a.username || "",
            hostname: a.hostname || "",
            platform: a.platform || "",
            alias: i.alias || ""
        };
        !n || !t || u.push([n, e, t])
    }
    return u.sort().reverse().map(e => e[2])
}

function Sr() {
    const u = O4();
    u && I4("load_recent_peers", {peers: JSON.stringify(u)})
}

function zr() {
    var u;
    try {
        const e = (u = m.getItem("fav")) != null ? u : "[]", i = JSON.parse(e), n = O4().filter(a => i.includes(a.id));
        n && I4("load_fav_peers", {peers: JSON.stringify(n)})
    } catch (e) {
        console.error("Failed to load fav peers: " + e.message)
    }
}

function Pr(u) {
    var e;
    try {
        const i = JSON.parse(u), n = i.id;
        if (n) {
            (e = window.curConn) == null || e.close();
            const a = new ta;
            return a.setRemoteId(n), a.setSessionInfo(i), T4(a), Nt("last_remote_id", n), ""
        } else return "No id found in session data " + u
    } catch (i) {
        return i.message
    }
}

function Rr(u) {
    try {
        if (!i0()) return;
        oa()
    } catch (e) {
        aa("error", "Error", e.message, "")
    }
}

function Ir(u) {
    j4()
}

function Tr(u, e) {
    function i(n) {
        return /^([0-9a-fA-F]{0,4}:){1,7}[0-9a-fA-F]{0,4}$/.test(n)
    }

    if (i(u)) {
        if (u.startsWith("[")) {
            let n = u.split("]:");
            if (n.length === 2) {
                let a = parseInt(n[1]) || 0;
                if (a > 0) return `${n[0]}]:${a + e}`
            }
        }
    } else if (u.includes(":")) {
        let n = u.split(":");
        if (n.length === 2) {
            let a = parseInt(n[1]) || 0;
            if (a > 0) return `${n[0]}:${a + e}`
        }
    }
    return u
}

function U4() {
    const u = m.getItem("api-server");
    if (u) return u;
    const e = m.getItem("custom-rendezvous-server");
    if (e) {
        let i = Tr(e, -2);
        return i == e ? `http://${i}:${Bt - 2}` : `http://${i}`
    }
    return window.location.host.indexOf("localhost:") == 0 ? `http://localhost:${Bt - 2}` : window.location.origin
}

function Da(u) {
    return U4() + "/api/audit/" + u
}

function da(u, e, i) {
    try {
        e4.exports.ZstdCodec.run(a => {
            var t = new a.Simple;
            i(e ? u.map(s => t.compress(s, 3)) : t.compress(u, 3))
        })
    } catch (n) {
        console.error("Compress failed: ", n)
    }
}

function M4(u, e, i) {
    try {
        e4.exports.ZstdCodec.run(n => {
            var a = new n.Simple;
            i(e ? u.map(t => a.decompress(t)) : a.decompress(u))
        })
    } catch (n) {
        console.error("Decompress failed: ", n)
    }
}

async function ca(u, e) {
    return new Promise((i, n) => {
        try {
            e4.exports.ZstdCodec.run(a => {
                var t = new a.Simple;
                i(t.compress(u, 3))
            })
        } catch (a) {
            n(a)
        }
    })
}

async function Ca(u, e) {
    return new Promise((i, n) => {
        try {
            e4.exports.ZstdCodec.run(a => {
                var t = new a.Simple;
                i(t.decompress(u))
            })
        } catch (a) {
            n(a)
        }
    })
}

function jr() {
    const u = document.documentElement;
    u.requestFullscreen ? u.requestFullscreen() : u.mozRequestFullScreen ? u.mozRequestFullScreen() : u.webkitRequestFullscreen ? u.webkitRequestFullscreen() : u.msRequestFullscreen && u.msRequestFullscreen()
}

function Nr() {
    document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen()
}

function Or() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement
}

var gt = !1;

function Ur() {
    gt || (console.log("listen fullscreen"), gt = !0, document.addEventListener("fullscreenchange", () => onFullscreenChanged(!!document.fullscreenElement)), document.addEventListener("mozfullscreenchange", () => onFullscreenChanged(!!document.mozFullScreen)), document.addEventListener("webkitfullscreenchange", () => onFullscreenChanged(!!document.webkitFullscreenElement)), document.addEventListener("msfullscreenchange", () => onFullscreenChanged(!!document.msFullscreenElement)))
}

Ur();

async function Mr() {
    try {
        let u = await Mt();
        onLoadAbFinished(JSON.stringify(u))
    } catch (u) {
        console.error("Failed to load ab: " + u.message), onLoadAbFinished("")
    }
}

async function Lr() {
    try {
        let u = await Wn();
        onLoadGroupFinished(JSON.stringify(u))
    } catch (u) {
        console.error("Failed to load group: " + u.message), onLoadGroupFinished("")
    }
}

function pa() {
    return cr.indexOf(new TextDecoder().decode(be("cnVzdGRlc2suY29t"))) < 0
}

function Ba(u) {
    return pa() && (!Gt() && !Jt() || L4 < 400) ? (u && setTimeout(ma, 100), !0) : !1
}

let L4 = 0;

function Wr() {
    return new TextDecoder().decode(be("L2FwaS9saWMvd2M="))
}

async function Vr() {
    if (pa()) try {
        const u = U4() + Wr(), i = await (await fetch(u)).text(), n = await Aa(i);
        L4 = parseInt(n[0])
    } catch {
    }
}

async function kt(u) {
    if (!u) {
        lt("");
        return
    }
    try {
        const i = (await Aa(u))[2];
        lt(i)
    } catch (e) {
        console.error("Failed to decode verifier: " + e.message)
    }
}

async function Aa(u) {
    try {
        return new TextDecoder().decode(await _4(u, "IycjQd4TmWvjjLnYd796Rd+XkK+KG+7GU1Ia7u4+vSw=")).split(":")
    } catch (e) {
        return console.error("Failed to decode: " + e.message), []
    }
}

function qr() {
    window.closeConnection()
}

function ma() {
    if (L4 < 400) {
        window.dialog("error", "License Warning", "To run the web client, you need a license supporting at least 10 users and 300 devices, or an equivalent plan.");
        return
    }
    window.loginDialog()
}

const ht = document.querySelector("#app");
if (ht) {
    let e = function (i, n, a) {
        !i0() || (i == "input-password" ? (document.querySelector("div#status").style.display = "none", document.querySelector("div#password").style.display = "block") : i ? i == "error" ? (document.querySelector("div#status").style.display = "block", document.querySelector("div#canvas").style.display = "none", document.querySelector("div#text").innerHTML = '<div style="color: red; font-weight: bold;">' + a + "</div>") : (document.querySelector("div#password").style.display = "none", document.querySelector("div#status").style.display = "block", document.querySelector("div#text").innerHTML = '<div style="font-weight: bold;">' + a + "</div>") : (document.querySelector("div#canvas").style.display = "block", document.querySelector("div#password").style.display = "none", document.querySelector("div#status").style.display = "none"))
    };
    ht.innerHTML = `
  <div id="connect" style="text-align: center"><table style="display: inline-block">
    <tr><td><span>Host: </span></td><td><input id="host" /></td></tr>
    <tr><td><span>Key: </span></td><td><input id="key" /></td></tr>
    <tr><td><span>Id: </span></td><td><input id="id" /></td></tr>
    <tr><td></td><td><button onclick="connect();">Connect</button></td></tr>
  </table></div>
  <div id="password" style="display: none;">
    <input type="password" id="password" />
    <button id="confirm" onclick="confirm()">Confirm</button>
    <button id="cancel" onclick="cancel();">Cancel</button>
  </div>
  <div id="status" style="display: none;">
    <div id="text" style="line-height: 2em"></div>
    <button id="cancel" onclick="cancel();">Cancel</button>
  </div>
  <div id="canvas" style="display: none;">
    <button id="cancel" onclick="cancel();">Cancel</button>
    <canvas id="player"></canvas>
    <canvas id="test-yuv-decoder-canvas"></canvas>
  </div>
`;
    let u;
    window.init(), document.body.onload = () => {
        const i = document.querySelector("#host");
        i.value = m.getItem("custom-rendezvous-server");
        const n = document.querySelector("#id");
        n.value = m.getItem("id");
        const a = document.querySelector("#key");
        a.value = m.getItem("key"), u = YUVCanvas.attach(document.getElementById("player"))
    }, window.connect = () => {
        const i = document.querySelector("#host");
        m.setItem("custom-rendezvous-server", i.value);
        const n = document.querySelector("#id");
        m.setItem("id", n.value);
        const a = document.querySelector("#key");
        m.setItem("key", a.value), (async () => {
            const s = ra();
            s.setMsgbox(e), s.setDraw(E => {
                F4(E), u.drawFrame(E)
            }), document.querySelector("div#status").style.display = "block", document.querySelector("div#connect").style.display = "none", document.querySelector("div#text").innerHTML = "Connecting ...", s.setPeerId(n.value), await s.start()
        })()
    }, window.cancel = () => {
        j4(), document.querySelector("div#connect").style.display = "block", document.querySelector("div#password").style.display = "none", document.querySelector("div#status").style.display = "none", document.querySelector("div#canvas").style.display = "none"
    }, window.confirm = () => {
        const i = document.querySelector("input#password").value;
        i && (document.querySelector("div#password").style.display = "none", i0().login(i))
    }
}
