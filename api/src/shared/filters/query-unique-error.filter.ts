import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class QueryUniqueErrorFilter extends BaseExceptionFilter {
  static UNIQUE_ERROR_CODE = '23505';

  catch(exception: any, host: ArgumentsHost): any {
    const detail = exception.detail;
    console.log(exception);
    if (
      typeof detail === 'string' &&
      detail.includes('already exists') &&
      exception.code === QueryUniqueErrorFilter.UNIQUE_ERROR_CODE
    ) {
      const messageStart = exception.table.split('_').join(' ') + ' with';
      const response = host.switchToHttp().getResponse();
      response.status(409).json({
        statusCode: 409,
        message: `global: ${exception.detail}`
          .replace('Key', messageStart)
          .replaceAll(/"/g, '')
          .replaceAll(/[()]/g, ''),
        error: 'Conflict',
      });
    }
    return super.catch(exception, host);
  }
}
