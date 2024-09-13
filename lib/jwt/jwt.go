package jwt

import (
	"crypto/rsa"
	"github.com/golang-jwt/jwt/v5"
	"os"
	"time"
)

type Jwt struct {
	privateKey          *rsa.PrivateKey
	TokenExpireDuration time.Duration
}

type UserClaims struct {
	UserId uint `json:"user_id"`
	jwt.RegisteredClaims
}

func NewJwt(privateKeyFile string, tokenExpireDuration time.Duration) *Jwt {
	privateKeyContent, err := os.ReadFile(privateKeyFile)
	if err != nil {
		panic(err)
	}
	privateKey, err := jwt.ParseRSAPrivateKeyFromPEM(privateKeyContent)
	if err != nil {
		panic(err)
	}
	return &Jwt{
		privateKey:          privateKey,
		TokenExpireDuration: tokenExpireDuration,
	}
}

func (s *Jwt) GenerateToken(userId uint) string {
	t := jwt.NewWithClaims(jwt.SigningMethodRS256,
		UserClaims{
			UserId: userId,
			RegisteredClaims: jwt.RegisteredClaims{
				ExpiresAt: jwt.NewNumericDate(time.Now().Add(s.TokenExpireDuration)),
			},
		})
	token, err := t.SignedString(s.privateKey)
	if err != nil {
		return ""
	}
	return token
}

func (s *Jwt) ParseToken(tokenString string) (uint, error) {
	token, err := jwt.ParseWithClaims(tokenString, &UserClaims{}, func(token *jwt.Token) (interface{}, error) {
		return s.privateKey.Public(), nil
	})
	if err != nil {
		return 0, err
	}
	if claims, ok := token.Claims.(*UserClaims); ok && token.Valid {
		return claims.UserId, nil
	}
	return 0, err
}
