import {deleteAndSumData} from "@/lib/firestore/dataController/dataController";

export default async function handlerDeleteDataCollection(req, res) {
  if (req.method === "DELETE") {
    try {
      const {date} = req.query;
      await deleteAndSumData(date);
      res.status(200).json({ message: "Collection successfully deleted" });
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ message: "Failed to delete collection" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
