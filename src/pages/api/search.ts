import { NextApiHandler } from "next";
import { forrigebokFetcher } from "../../utils/forrigebokFetcher";
import { WorksResponse } from "../../utils/forrigebokApi";

const api: NextApiHandler<WorksResponse | { message: string }> = async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : undefined;

  if (!query) {
    res.status(400).json({ message: "Du må sende med query" });
    return;
  }

  const data: WorksResponse = await forrigebokFetcher(`/api/v2022-10-10/works?query=${encodeURIComponent(query)}`);

  res.status(200).json(data);
};

export default api;
