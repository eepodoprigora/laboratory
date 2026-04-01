import type { NextApiRequest, NextApiResponse } from "next";
import { getProjects } from "../../server/projects";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        res.setHeader("Allow", "GET");
        res.status(405).json({ status: "error", message: "Method Not Allowed" });
        return;
    }

    const projects = await getProjects();

    res.status(200).json({ status: "success", data: { projects } });
}