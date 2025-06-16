package utils

import (
	"strings"

	"golang.org/x/crypto/bcrypt"
)

var passwordAlgorithm = "bcrypt"

func SetPasswordAlgorithm(algo string) {
	if algo == "" {
		algo = "bcrypt"
	}
	passwordAlgorithm = strings.ToLower(algo)
}

// VerifyPassword verifies the input password against the stored hash.
// It returns ok and a new hash when md5 is verified while bcrypt is enabled.
func VerifyPassword(hash, input string) (bool, string) {
	switch strings.ToLower(passwordAlgorithm) {
	case "bcrypt":
		// Try bcrypt hash
		if strings.HasPrefix(hash, "$2") {
			if bcrypt.CompareHashAndPassword([]byte(hash), []byte(input)) == nil {
				return true, ""
			}
		}
		// fall back to md5 check for legacy passwords
		if hash == Md5(input+"rustdesk-api") {
			b, err := bcrypt.GenerateFromPassword([]byte(input), bcrypt.DefaultCost)
			if err == nil {
				return true, string(b)
			}
			return true, ""
		}
		return false, ""
	default:
		return Md5(input+"rustdesk-api") == hash, ""
	}
}
