package config

type GithubOauth struct {
	ClientId     string `mapstructure:"client-id"`
	ClientSecret string `mapstructure:"client-secret"`
	RedirectUrl  string `mapstructure:"redirect-url"`
}

type GoogleOauth struct {
	ClientId     string `mapstructure:"client-id"`
	ClientSecret string `mapstructure:"client-secret"`
	RedirectUrl  string `mapstructure:"redirect-url"`
}

type OidcOauth struct {
	Issuer       string `mapstructure:"issuer"`
	ClientId     string `mapstructure:"client-id"`
	ClientSecret string `mapstructure:"client-secret"`
	RedirectUrl  string `mapstructure:"redirect-url"`
}

type LinuxdoOauth struct {
	ClientId     string `mapstructure:"client-id"`
	ClientSecret string `mapstructure:"client-secret"`
	RedirectUrl  string `mapstructure:"redirect-url"`
}
