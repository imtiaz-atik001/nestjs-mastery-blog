import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    // Handle MongoDB CastError (invalid ObjectId like "123" instead of proper ID)
    const isCastError =
      exception instanceof Error &&
      exception.name === 'CastError' &&
      (exception as any).path === '_id';

    const finalStatus = isCastError ? HttpStatus.BAD_REQUEST : status;
    const finalMessage = isCastError
      ? 'Invalid ID format'
      : typeof message === 'string'
        ? message
        : (message as any).message || message;

    response.status(finalStatus).json({
      success: false,
      statusCode: finalStatus,
      message: finalMessage,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}