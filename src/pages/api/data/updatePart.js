import { updatePart } from "@/lib/firestore/dataController/dataController";

export default async function handlerUpdatePart(req, res) {
  if (req.method === "PATCH") {
    try {
      const { docId1, kodePart, namaPart, estimasiBeratPart, tolerance } = req.body;

      await updatePart(docId1, kodePart, namaPart, estimasiBeratPart, tolerance);
      res.status(200).json({
        message: "Form data updated in Firestore successfully",
      });
    } catch (error) {
      console.error("Error updating form data in Firestore:", error);
      res
        .status(500)
        .json({ message: "Failed to update form data in Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
