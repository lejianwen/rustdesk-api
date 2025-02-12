package global

import (
	"github.com/BurntSushi/toml"
	"github.com/nicksnyder/go-i18n/v2/i18n"
	"golang.org/x/text/language"
	"os"
)

func InitI18n() {
	bundle := i18n.NewBundle(language.English)
	bundle.RegisterUnmarshalFunc("toml", toml.Unmarshal)
	//读取global.Config.Gin.ResourcesPath下的所有语言文件
	dir := Config.Gin.ResourcesPath + "/i18n"
	fileInfos, err := os.ReadDir(dir)
	if err != nil {
		panic(err)
	}
	for _, fileInfo := range fileInfos {
		//如果文件名不是.toml结尾
		if fileInfo.IsDir() || fileInfo.Name()[len(fileInfo.Name())-5:] != ".toml" {
			continue
		}
		bundle.LoadMessageFile(Config.Gin.ResourcesPath + "/i18n/" + fileInfo.Name())
	}
	Localizer = func(lang string) *i18n.Localizer {
		if lang == "" {
			lang = Config.Lang
		}
		if lang == "en" {
			return i18n.NewLocalizer(bundle, "en")
		} else {
			return i18n.NewLocalizer(bundle, lang, "en")
		}
	}

	//personUnreadEmails := localizer.MustLocalize(&i18n.LocalizeConfig{
	//	DefaultMessage: &i18n.Message{
	//		ID: "PersonUnreadEmails",
	//	},
	//	PluralCount: 6,
	//	TemplateData: map[string]interface{}{
	//		"Name":        "LE",
	//		"PluralCount": 6,
	//	},
	//})
	//personUnreadEmails, err := global.Localizer.LocalizeMessage(&i18n.Message{
	//	ID: "ParamsError",
	//})
	//fmt.Println(err, personUnreadEmails)

}
