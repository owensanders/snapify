export interface RegisterValidationErrors {
  name?: string[];
  email?: string[];
  password?: string[];
  password_confirmation?: string[];
}

export interface ErrorResponse {
  errors: RegisterValidationErrors;
}
