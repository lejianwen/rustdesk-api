package logger

import (
	nested "github.com/antonfisher/nested-logrus-formatter"
	log "github.com/sirupsen/logrus"
	"io"
	"os"
)

const (
	DebugMode   = "debug"
	ReleaseMode = "release"
)

type Config struct {
	Path         string
	Level        string
	ReportCaller bool
}

func New(c *Config) *log.Logger {
	log.SetFormatter(&nested.Formatter{
		// HideKeys:        true,
		TimestampFormat: "[2006-01-02 15:04:05]",
		NoColors:        true,
		NoFieldsColors:  true,
		//FieldsOrder:     []string{"name", "age"},
	})

	// 日志文件
	f := c.Path
	var write io.Writer
	if f != "" {
		fwriter, err := os.OpenFile(f, os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0644)
		if err != nil {
			panic("open log file fail!")
		}
		write = io.MultiWriter(fwriter, os.Stdout)
	} else {
		write = os.Stdout
	}

	log.SetOutput(write)

	log.SetReportCaller(c.ReportCaller)

	level, err2 := log.ParseLevel(c.Level)
	if err2 != nil {
		level = log.DebugLevel
	}
	log.SetLevel(level)

	return log.StandardLogger()
}
