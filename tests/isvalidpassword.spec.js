// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { isValidPassword } from '../src/js/login/validations/password.js';

describe('Password Validation', () => {

  test('should return true for a valid password meeting all criteria', () => {
    // Assuming a standard secure password criteria (e.g., min 8 characters)
    expect(isValidPassword('SecurePass123!')).toEqual(true);
  });

  test('should return false for an invalid or weak password', () => {
    expect(isValidPassword('123')).toEqual(false);
  });

});