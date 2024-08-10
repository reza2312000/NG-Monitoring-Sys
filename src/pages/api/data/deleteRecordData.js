import { deleteRecordData} from "@/lib/firestore/dataController/dataController";

export default async function handlerDeleteRecordData(req, res) {
  if (req.method === "DELETE") {
    try {
      await deleteRecordData();
      res.status(200).json({ message: "Collection successfully deleted" });
    } catch (error) {
      console.error("Error deleting collection:", error);
      res.status(500).json({ message: "Failed to delete collection" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
