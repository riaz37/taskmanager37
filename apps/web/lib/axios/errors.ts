// Custom error types for API handling
export class ApiError extends Error {
  public status: number;
  public code: string;
  public details?: any;

  constructor(message: string, status: number, code: string, details?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ValidationError extends Error {
  public fieldErrors?: Record<string, string[]>;

  constructor(message: string, fieldErrors?: Record<string, string[]>) {
    super(message);
    this.name = "ValidationError";
    this.fieldErrors = fieldErrors;
  }
}

// Error factory functions
export const createApiError = (
  status: number,
  message: string,
  details?: any,
): ApiError => {
  let code = "UNKNOWN_ERROR";

  switch (status) {
    case 400:
      code = "BAD_REQUEST";
      break;
    case 401:
      code = "UNAUTHORIZED";
      break;
    case 403:
      code = "FORBIDDEN";
      break;
    case 404:
      code = "NOT_FOUND";
      break;
    case 422:
      code = "VALIDATION_ERROR";
      break;
    case 429:
      code = "RATE_LIMITED";
      break;
    case 500:
      code = "INTERNAL_SERVER_ERROR";
      break;
    default:
      code = "HTTP_ERROR";
  }

  return new ApiError(message, status, code, details);
};

export const createValidationError = (
  message: string,
  fieldErrors?: Record<string, string[]>,
): ValidationError => {
  return new ValidationError(message, fieldErrors);
};
