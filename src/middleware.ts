import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
	if (req.nextUrl.pathname.startsWith("/api/get-url")) {
		console.log("returning early");
		return;
	}

	console.log("Path??", req.nextUrl.pathname);

	const slug = req.nextUrl.pathname.split("/").pop();

	console.log({slug});

	const data = await (await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)).json();

	console.log({data, url: `${req.nextUrl.origin}/api/get-url/${slug}`});

	if (data?.url) {
		return NextResponse.redirect(data.url);
	}
}
