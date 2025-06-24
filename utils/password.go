package utils

import (
	"errors"
	"golang.org/x/crypto/bcrypt"
)

// EncryptPassword hashes the input password using bcrypt.
// An error is returned if hashing fails.
func EncryptPassword(password string) (string, error) {
	bs, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bs), nil
}

// VerifyPassword checks the input password against the stored hash.
// When a legacy MD5 hash is provided, the password is rehashed with bcrypt
// and the new hash is returned. Any internal bcrypt error is returned.
func VerifyPassword(hash, input string) (bool, string, error) {
	err := bcrypt.CompareHashAndPassword([]byte(hash), []byte(input))
	if err == nil {
		return true, "", nil
	}

	var invalidPrefixErr bcrypt.InvalidHashPrefixError
	if errors.As(err, &invalidPrefixErr) || errors.Is(err, bcrypt.ErrHashTooShort) {
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
}
