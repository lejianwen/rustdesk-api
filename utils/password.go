package utils

import (
	"strings"
	"errors"
	"golang.org/x/crypto/bcrypt"
)

var passwordAlgorithm = "bcrypt"

func SetPasswordAlgorithm(algo string) {
	if algo == "" {
		algo = "bcrypt"
	}
	passwordAlgorithm = strings.ToLower(algo)
}

// EncryptPassword hashes the input password according to the configured
// algorithm. It returns a bcrypt hash when bcrypt is enabled, or an MD5 digest
// otherwise.
func EncryptPassword(password string) string {
	if strings.ToLower(passwordAlgorithm) == "bcrypt" {
		bs, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return ""
		}
		return string(bs)
	}
	return Md5(password + "rustdesk-api")
}

// VerifyPassword verifies the input password against the stored hash.
// It returns ok and a new hash when md5 is verified while bcrypt is enabled.
func VerifyPassword(hash, input string) (bool, string) {
	switch strings.ToLower(passwordAlgorithm) {
	case "bcrypt":
		err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(input))
		if err == nil {
			return true, ""
		}

		var invalidPrefixErr bcrypt.InvalidHashPrefixError
		if errors.As(err, &invalidPrefixErr) {
			// Try fallback to legacy MD5 hash verification
			if hash == Md5(input+"rustdesk-api") {
				newHash, err2 := bcrypt.GenerateFromPassword([]byte(input), bcrypt.DefaultCost)
				if err2 == nil {
					return true, string(newHash)
				}
				return true, ""
			}
		}

		return false, ""

	default:
		return Md5(input+"rustdesk-api") == hash, ""
	}
}
