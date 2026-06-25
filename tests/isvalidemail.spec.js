// @vitest-environment jsdom
import { describe, expect, test } from 'vitest';
import { isValidEmail } from '../src/js/login/validations/email.js';

describe('Email Validation', () => {

  test('should return true for valid email', () => {
    expect(isValidEmail('test@example.com')).toEqual(true);
  });

  test('should return false for invalid email missing @', () => {
    expect(isValidEmail('invalid-email')).toEqual(false);
  });

  test('should return false when the email is missing the domain extension', () => {
    // Ejemplo: Tiene arroba pero no tiene el ".com" ni ninguna extensión válida
    expect(isValidEmail('user@domain')).toEqual(false);
  });

  test('should return false when the extension is incomplete', () => {
    // Ejemplo: Tiene el punto pero le faltan los caracteres de la extensión
    expect(isValidEmail('user@domain.')).toEqual(false);
  });

});