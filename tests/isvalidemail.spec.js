// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { isValidEmail } from '../src/js/login/validations/email.js';

describe('Email Validation', () => {

  test('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toEqual(true);
  });

  test('should return false for invalid email', () => {
    expect(isValidEmail('invalid-email')).toEqual(false);
  });

});