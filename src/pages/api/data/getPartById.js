import { getPartById } from "@/lib/firestore/dataController/dataController";

export default async function handlerGetPartById(req, res) {
  if (req.method === "GET") {
    try {
      const { docId } = req.query;
      const data = await getPartById(docId);
      res.status(200).json(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: "Failed to fetch data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
