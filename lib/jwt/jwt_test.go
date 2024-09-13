package jwt

import (
	"fmt"
	"testing"
	"time"
)

var pk = `-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAnJpq2Sy91iGW3+EuG4V2ke59tITpGINzht0rO8WiRwu11W4p
wakS4K4BbjvmC8YjaxXhKE5LHDw0IXvTdIDN7Fuu4qs9xWXIoK+nC3qWrVBtj/1o
RJrYme1NenTXEgPlN1FOU6/9XQGgvb+1MSNqxknYo7183mHACvsIIuSTMEFhUbUw
XYVQrCtACUILZ9wIDOEzclIY2ZPMTnL1vkvfj629KwGtAvpEyc96Y/HMSH5/VkiG
p6L+k+NSjco9HntAGYTiQkfranvdqxRDUsKS53SbV3QSz1zc0l5OEyZDuxFTL7UC
7v0G/HVqz6mLpMje756PG/WEpwa/lADc/8FJ5QIDAQABAoIBAEsqUt6qevOsa55J
lrfe92pT7kIXCUqazXiN75Jg6eLv2/b1SVWKsWTmIAmo9mHwWE+t0MRnz+VdgCgS
JwxkRnKMDwT87Eky8Xku1h7MWEYXtH7IQqOrLwuyut1r907OT9adT9sbPaDGh0CM
I4vSVA2YpELzUFvszyB2HRGiZINkHfdLsNxUKsHJOdXbv82RItwzmCYcZismnR3J
P8THn06eoBNtlqwdFziuREOzjNnj6J/3glhR5mu4c4+AJoj0hmVaBDfac3GsQsbP
x79QQPrUqH9UZ4szubYHXP0uRi/ARlHQ+GNp6foYIsevC0OtLdau0/ouFlfGkEep
3aIV5oECgYEAyyWrNhw+BhNFXsyPzEQ4/mO5ucup3cE/tAAtLiSckoXjmY8K7PQr
xfKRCkuM1qpcxtYkbTs35aOdK48gL0NVd50QzrWFrQkQkVnpnJ1lYeVgEL1DmalD
B55bwTdShcs0gEoKefZCvmotrmYdSpMGsapqqbZFrysFFzRDyDxnHfcCgYEAxVjA
/dXxCEUjYFVC3i833lI/yiycJrhjIeffc6DqpSReuTU+i8Nh3sLiytaSqPFVASDS
08K3JwVguMTzDgrYkl365lm50WxcBuNgLkSqA90vE/H6gkRZVkuzOb7T+ZdDxf0s
7RH4aqeeOSiOcZ3uC+d53UArJFidETXbgguXkAMCgYA22Ynbx05b15IwYW0mCvmU
fhqkdr/7lvT7RdztC4eW7D2itYOOrPKwtKjCrdluEHuSWDlnoMib4UxLeY6IFFcc
P7VNCqf4K21kwXEZD0pTX1pLyr5Y2+G0SeaeSbCnXVFknhksCvjEbui8oOehvgbd
q5S3E/bGsAfk1wDCLMTuywKBgACHrH0CBhOvm9i2YeeW2N+P+PviAslX1WxR4xe8
ZuTqpBZ7Ph/B9pFSlKlWyi4J9+B45hgLfdJtAUV9welXvh0mg3X657TYRab/FVMK
fCpmfangDHwtEtBYg7K0AH27GkN92pEIa1JeAN7GbRuBARKnHHyrn3IJiuJw8pX2
0gFhAoGBAIquI9sAB2dKEOMW+iQJkLH8Hh8/EWyslow+QJiyIsRe1l9jtkOxC5D3
Hj4yO4j5LOWDMTgDcLsZTxbGiTzkNc/HghrNIevDAQdgjJQNl84zDjyyCA4r/MA7
bYJTtYj8q6J0EDbRdT9b6hMclyzjNXdx2loJxR0R8WUeL1lDEPq8
-----END RSA PRIVATE KEY-----`

// 测试token生成
func TestGenerateToken(t *testing.T) {
	jwtService := NewJwt(pk, time.Second*1000)
	token := jwtService.GenerateToken(1)
	if token == "" {
		t.Fatal("token生成失败")
	}
	fmt.Println(pk, token)
}

// 测试token解析
func TestParseToken(t *testing.T) {
	jwtService := NewJwt(pk, time.Second*1000)
	token := jwtService.GenerateToken(999)
	if token == "" {
		t.Fatal("token生成失败")
	}
	uid, err := jwtService.ParseToken(token)
	if err != nil {

		t.Fatal("token解析失败", err)
	}
	if uid != 999 {
		t.Fatal("token解析失败")
	}
}

func BenchmarkJwtService_GenerateToken(b *testing.B) {
	jwtService := NewJwt(pk, time.Second*1000)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		jwtService.GenerateToken(999)
	}
}

func BenchmarkJwtService_ParseToken(b *testing.B) {
	jwtService := NewJwt(pk, time.Second*1000)
	token := jwtService.GenerateToken(999)
	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = jwtService.ParseToken(token)
	}

}
