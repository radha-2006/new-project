import { chain } from "@/lib/langchain";

export default async function handler(req, res) {
  const { query } = req.body;
  const result = await chain.invoke({ input: query });
  res.status(200).json({ response: result });
}
