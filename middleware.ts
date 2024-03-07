import { NextRequest, NextResponse } from "next/server";

const socialMedia = [
  {
    name: "github",
    url: "https://github.com/sherbolotarbaev",
  },
  {
    name: "instagram",
    url: "https://www.instagram.com/sherbolotarbaev",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/sherbolotarbaev",
  },
  {
    name: "telegram",
    url: "https://telegram.me/sherbolotarbaev",
  },
  {
    name: "twitter",
    url: "https://twitter.com/sherbolotarbaev",
  },
];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const pathname = url.pathname;
  const searchParams = new URLSearchParams(url.searchParams);
  const responseCookies = response.cookies;
  const requestCookies = request.cookies;
  const next = decodeURIComponent(searchParams.get("next") ?? "/");
  const token = requestCookies.get("token");
  const xff = `${request.headers.get("x-forwarded-for")?.split(",")[0]}`;

  if (pathname === "/redirect") {
    return NextResponse.next();
  }

  let user: User | undefined;

  if (token) {
    try {
      const headers = new Headers();

      headers.append("Cookie", `token=${encodeURIComponent(token.value)}`);
      headers.append("baseurl", `${apiUrl}`);
      headers.append("x-forwarded-for", xff);

      const response = await fetch(`${apiUrl}/me`, {
        method: "GET",
        headers,
      });

      const responseData = await response.json();

      if (responseData.statusCode !== 401) {
        user = responseData;
        responseCookies.set("email", responseData.email);
      } else {
        requestCookies.getAll().map((cookie) => {
          if (cookie.name !== "email") {
            responseCookies.delete(cookie.name);
          }
        });
      }
    } catch (_) {}
  }

  const isAuth = user !== undefined;

  if (isAuth && !user?.isVerified && pathname !== "/email-verification") {
    const redirectUrl = new URL("/email-verification", url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && user?.isVerified && pathname === "/email-verification") {
    const redirectUrl = new URL("/", url);
    return NextResponse.redirect(redirectUrl);
  }

  if (!isAuth && pathname === "/email-verification") {
    const redirectUrl = new URL("/login", url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    isAuth &&
    (pathname === "/login" ||
      pathname === "/password/forgot" ||
      pathname === "/password/reset")
  ) {
    const redirectUrl = new URL(`/redirect?to=${next}`, url);
    return NextResponse.redirect(redirectUrl);
  }

  if (
    !isAuth &&
    pathname !== "/login" &&
    pathname !== "/password/forgot" &&
    pathname !== "/password/reset"
  ) {
    const redirectUrl = new URL(
      pathname !== "/" ? `/login?next=${pathname}` : "/login",
      url
    );
    return NextResponse.redirect(redirectUrl);
  }

  const isSocialMedia =
    socialMedia.find((s) => s.name === pathname.replace("/", "")) || null;

  if (isSocialMedia) {
    const redirectUrl = new URL(
      `/redirect?to=${decodeURIComponent(isSocialMedia.url)}`,
      url
    );
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: "/((?!api|_next/static|favicon.ico).*)",
};
