import { addPart } from "@/lib/firestore/dataController/dataController";

export default async function handlerAddPart(req, res) {
  if (req.method === "POST") {
    try {
      const { kodePart, namaPart, estimasiBeratPart, tolerance } = req.body;
      await addPart(
        kodePart,
        namaPart,
        estimasiBeratPart,
        tolerance
      );
      res
        .status(200)
        .json({
          message: "Data successfully added to Firestore",
        });
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
      res.status(500).json({ message: "Failed to add data to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
