package utils

import (
	"testing"

	"golang.org/x/crypto/bcrypt"
)

func TestVerifyPasswordMD5(t *testing.T) {
	SetPasswordAlgorithm("md5")
	hash := Md5("secret" + "rustdesk-api")
	ok, newHash, err := VerifyPassword(hash, "secret")
	if err != nil {
		t.Fatalf("md5 verify failed: %v", err)
	}
	if !ok {
		t.Fatalf("md5 verify failed")
	}
	if newHash != "" {
		t.Fatalf("unexpected rehash for md5 mode")
	}
}

func TestVerifyPasswordBcrypt(t *testing.T) {
	SetPasswordAlgorithm("bcrypt")
	b, _ := bcrypt.GenerateFromPassword([]byte("pass"), bcrypt.DefaultCost)
	ok, newHash, err := VerifyPassword(string(b), "pass")
	if err != nil || !ok || newHash != "" {
		t.Fatalf("bcrypt verify failed")
	}
}

func TestVerifyPasswordMigrate(t *testing.T) {
	SetPasswordAlgorithm("bcrypt")
	md5hash := Md5("mypass" + "rustdesk-api")
	ok, newHash, err := VerifyPassword(md5hash, "mypass")
	if err != nil || !ok || newHash == "" {
		t.Fatalf("expected bcrypt rehash")
	}
	if bcrypt.CompareHashAndPassword([]byte(newHash), []byte("mypass")) != nil {
		t.Fatalf("rehash not valid bcrypt")
	}
}
