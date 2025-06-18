package utils

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
	"strings"
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
// otherwise. An error is returned if bcrypt hashing fails.
func EncryptPassword(password string) (string, error) {
	if strings.ToLower(passwordAlgorithm) == "bcrypt" {
		bs, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
		if err != nil {
			return "", err
		}
		return string(bs), nil
	}
	return Md5(password + "rustdesk-api"), nil
}

// VerifyPassword verifies the input password against the stored hash.
// It returns ok and a new hash when md5 is verified while bcrypt is enabled.
// Any internal error encountered during bcrypt operations is returned.
func VerifyPassword(hash, input string) (bool, string, error) {
	switch strings.ToLower(passwordAlgorithm) {
	case "bcrypt":
		err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(input))
		if err == nil {
			return true, "", nil
		}

		var invalidPrefixErr bcrypt.InvalidHashPrefixError
		if errors.As(err, &invalidPrefixErr) {
			// Try fallback to legacy MD5 hash verification
			if hash == Md5(input+"rustdesk-api") {
				newHash, err2 := bcrypt.GenerateFromPassword([]byte(input), bcrypt.DefaultCost)
				if err2 != nil {
					return true, "", err2
				}
				return true, string(newHash), nil
			}
		}
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			return false, "", nil
		}
		return false, "", err

	default:
		return Md5(input+"rustdesk-api") == hash, "", nil
	}
}
