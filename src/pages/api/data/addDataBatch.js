import { addDataBatch } from "@/lib/firestore/dataController/dataController";

export default async function handlerAddData(req, res) {
  if (req.method === "POST") {
    try {
      const { name, nik, part, machine, shift, date, jenisNg, jumlahNg, estimasiBerat, status } = req.body;

      const {docRefs, totalData} = await addDataBatch(
        name,
        nik,
        part,
        machine,
        shift,
        date,
        jenisNg,
        jumlahNg,
        estimasiBerat, 
        status
      );
      res.status(200).json({ message: "Data successfully added to Firestore", docRefs, totalData });
    } catch (error) {
      console.error("Error adding data to Firestore:", error);
      res.status(500).json({ message: "Failed to add data to Firestore" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
