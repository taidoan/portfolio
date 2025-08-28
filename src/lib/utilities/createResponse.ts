import { NextResponse } from 'next/server';

type ErrorResponse = {
  error: string;
  retryAfter?: number;
};

/**
 * Creates an error response with the given error message and status code.
 * @param error The error message.
 * @param status The status code.
 * @param headers The headers to include in the response.
 * @returns The error response.
 */
export const createErrorResponse = (
  error: string,
  status: number,
  headers?: Record<string, string>,
): NextResponse<ErrorResponse> => {
  return NextResponse.json({ error }, { status, headers });
};
