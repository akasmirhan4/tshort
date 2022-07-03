import { NextApiRequest, NextApiResponse } from "next";
import { setRequestMeta } from "next/dist/server/request-meta";

import { prisma } from "../../db/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const { slug } = req.query;
	if (!slug || typeof slug !== "string") {
		res.statusCode = 404;

		res.send(JSON.stringify({ message: "please use with a slug" }));
		return;
	}

	const data = await prisma.shortLink.findFirst({
		where: {
			slug: {
				equals: slug,
			},
		},
	});

	if (!data) {
		res.statusCode = 404;

		res.send(JSON.stringify({ message: "slug not found" }));
		return;
	}

	return res.redirect(data.url);
};
