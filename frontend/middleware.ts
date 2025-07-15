import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/gestao-trafego")) {
    // Exemplo: pega o usuário do cookie/session (ajuste conforme seu auth)
    const user = request.cookies.get("user")?.value;
    if (user !== "cezar@exemplo.com") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
  return NextResponse.next();
} 