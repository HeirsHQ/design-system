import { NextResponse } from "next/server";

type Envelope<T> = {
  data: T;
  message: string;
  responseCode: string;
  statusCode: number;
  success: boolean;
};

function envelope<T>(
  data: T,
  message: string,
  responseCode: string,
  statusCode: number,
  success: boolean,
): Envelope<T> {
  return { data, message, responseCode, statusCode, success };
}

export function ok<T>(data: T, message = "Success") {
  return NextResponse.json(envelope(data, message, "00", 200, true), { status: 200 });
}

export function created<T>(data: T, message = "Created successfully") {
  return NextResponse.json(envelope(data, message, "00", 201, true), { status: 201 });
}

export function noContent() {
  return new NextResponse(null, { status: 204 });
}

export function badRequest(message: string) {
  return NextResponse.json(envelope(null, message, "400", 400, false), { status: 400 });
}

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json(envelope(null, message, "401", 401, false), { status: 401 });
}

export function forbidden(message = "Forbidden") {
  return NextResponse.json(envelope(null, message, "403", 403, false), { status: 403 });
}

export function notFound(message = "Resource not found") {
  return NextResponse.json(envelope(null, message, "404", 404, false), { status: 404 });
}

export function conflict(message: string) {
  return NextResponse.json(envelope(null, message, "409", 409, false), { status: 409 });
}

export function serverError(message = "Internal server error") {
  return NextResponse.json(envelope(null, message, "500", 500, false), { status: 500 });
}

export function paginated<T>(items: T[], total: number, page: number, limit: number) {
  return ok({ data: items, total, page, limit, totalPages: Math.ceil(total / limit) });
}
