import { getAllData } from "@/lib/firestore/dataController/dataController";

export default async function handlerGetAllData(req, res) {
  if (req.method === "GET") {
    try {
      const data = await getAllData();
      res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: "Bad request" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
