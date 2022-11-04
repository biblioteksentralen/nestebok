import { NextApiHandler } from "next";
import { WorksResponse } from "../../utils/forrigebokApi";

const api: NextApiHandler<WorksResponse | { message: string }> = async (req, res) => {
  const query = typeof req.query.q === "string" ? req.query.q : undefined;

  if (!query) {
    res.status(400).json({ message: "Du må sende med query" });
    return;
  }

  const data: WorksResponse = await fetch(`https://forrigebok.no/api/v2022-10-10/works?query=${query}`).then(
    (response) => response.json()
  );

  res.status(200).json(data);
};

export default api;
