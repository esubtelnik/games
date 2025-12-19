import { NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';
import { IApiResponse } from '@/types/api';



  export class ApiResponse {
    static success<T>(data: T, status: number = StatusCodes.OK): NextResponse<IApiResponse<T>> {
      return NextResponse.json({
        data,
        successful: true,
        error: null
      }, { status });
    }
  
    static error(message: string, status: number = StatusCodes.BAD_REQUEST): NextResponse<IApiResponse<null>> {
      return NextResponse.json({
        data: null,
        successful: false,
        error: { message }
      }, { status });
    }
  }