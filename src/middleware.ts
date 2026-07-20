import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Only check routes under /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const session = request.cookies.get('admin_session')?.value
    
    // Se não tiver sessão (ou se for diferente de true), redireciona pro login
    if (session !== 'true') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}
 
export const config = {
  matcher: ['/admin/:path*'],
}
