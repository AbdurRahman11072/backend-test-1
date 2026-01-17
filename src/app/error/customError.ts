// created custome error so that use can see the error we want to show them. And since the javaScript has it's own error class we took it and and inharite some of it's property and show some of our on error
class customError extends Error {
  public readonly statusCode: number;
  public readonly status: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode <= 500 ? "Failed" : "Error";
    this.message = message;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default customError;
