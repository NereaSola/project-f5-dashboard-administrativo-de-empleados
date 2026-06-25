// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { isValidPassword } from '../src/js/login/validations/password';

describe('Password Validation', () => {

  test('should return true for a valid password with at least 8 characters and a digit', () => {
    expect(isValidPassword('SecurePass123!')).toEqual(true);
  });

  test('should return false when the password is empty', () => {
    expect(isValidPassword('')).toEqual(false);
  });

  test('should return false when the password is less than 8 characters', () => {
    expect(isValidPassword('P4ss1')).toEqual(false);
  });

  test('should return false when the password has no digits', () => {
    expect(isValidPassword('NoDigitsHere')).toEqual(false);
  });

});
