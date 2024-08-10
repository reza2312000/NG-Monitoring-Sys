import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import app from "../init";

const firestore = getFirestore(app);

export async function addDataBatch(
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
) {
  const batch = writeBatch(firestore);
  const docRefs = [];
  try {
    const docRef1 = doc(collection(firestore, "DataReport"));
    const docRef2 = doc(collection(firestore, "AdminDataReport"));
    const docRef3 = doc(collection(firestore, "RecordData"));

    docRefs.push(docRef1.id);
    docRefs.push(docRef2.id);
    docRefs.push(docRef3.id);

    batch.set(docRef1, {
      adminDataId: docRef2.id,
      recordDataId: docRef3.id,
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      time: serverTimestamp(),
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });

    batch.set(docRef2, {
      userDataReportId: docRef1.id,
      recordDataId: docRef3.id,
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });

    batch.set(docRef3, {
      nama: name,
      nik: nik,
      mesin: machine,
      shift: shift,
      date: date,
      status: status,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
      },
    });

    await batch.commit();

    return docRefs;
  } catch (error) {
    console.error("Error menambahkan dokumen ke Firestore:", error);
    throw new Error("Gagal menambahkan dokumen ke Firestore");
  }
}

export async function addPart(
  kodePart,
  namaPart,
  estimasiBeratPart,
  tolerance
) {
  try {
    const colRef = collection(firestore, "Part");
    const snapshot = await addDoc(colRef, {
      kode: kodePart,
      nama: namaPart,
      estimasiBerat: estimasiBeratPart,
      tolerance: tolerance,
    });
    return snapshot;
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function getAllData() {
  try {
    const docRef = collection(firestore, "AdminDataReport");
    const snapshot = await getDocs(docRef);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllPart() {
  try {
    const docRef = collection(firestore, "Part");
    const snapshot = await getDocs(docRef);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getDataByNik(userNik) {
  try {
    const docRef = collection(firestore, "DataReport");
    const q = query(docRef, where("nik", "==", userNik));
    const snapshot = await getDocs(q);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getRecordData() {
  try {
    const docRef = collection(firestore, "RecordData");
    const snapshot = await getDocs(docRef);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getDataTotal() {
  try {
    const docRef = collection(firestore, "DataTotal");
    const snapshot = await getDocs(docRef);
    const subData = [];
    snapshot.forEach((doc) => {
      subData.push({ id: doc.id, ...doc.data() });
    });
    return subData;
  } catch (error) {
    console.log(error);
  }
}

export async function getDataById(docId) {
  try {
    const docRef = doc(firestore, "DataReport", docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function getAdminDataById(docId) {
  try {
    const docRef = doc(firestore, "AdminDataReport", docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function getPartById(docId) {
  try {
    const docRef = doc(firestore, "Part", docId);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("document does not exist");
    }
  } catch (error) {
    console.error("Error fetching document ID:", error);
    throw new Error("Failed to fetch document ID from Firestore");
  }
}

export async function updateData(
  docId1,
  docId2,
  docId3,
  part,
  machine,
  shift,
  date,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  aktualBerat
) {
  try {
    const docRef = doc(firestore, "DataReport", docId1);
    const snapshot = await updateDoc(docRef, {
      mesin: machine,
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    const docRef3 = doc(firestore, "AdminDataReport", docId2);
    const snapshot3 = await updateDoc(docRef3, {
      mesin: machine,
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    const docRef2 = doc(firestore, "RecordData", docId3);
    const snapshot2 = await updateDoc(docRef2, {
      mesin: machine,
      shift: shift,
      date: date,
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    return {snapshot, snapshot2, snapshot3};
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function updateStatus(docId1, docId2, docId3, status) {
  try {
    const docRef = doc(firestore, "AdminDataReport", docId1);
    await updateDoc(docRef, {
      status: status,
    });

    try {
      const docRef2 = doc(firestore, "DataReport", docId2);
      await updateDoc(docRef2, {
        status: status,
      });
    } catch (error) {
      return null
    }

    const docRef3 = doc(firestore, "RecordData", docId3);
    await updateDoc(docRef3, {
      status: status,
    });
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function updatePart(
  docId1,
  kodePart,
  namaPart,
  estimasiBeratPart,
  tolerance
) {
  try {
    const docRef = doc(firestore, "Part", docId1);
    const snapshot = updateDoc(docRef, {
      kode: kodePart,
      nama: namaPart,
      estimasiBerat: estimasiBeratPart,
      tolerance: tolerance,
    });
    return snapshot;
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function updateActualWeight(
  docId1,
  docId2,
  docId3,
  part,
  jenisNg,
  jumlahNg,
  estimasiBerat,
  aktualBerat
) {
  try {
    const docRef = doc(firestore, "AdminDataReport", docId1);
    const snapshot = await updateDoc(docRef, {
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    const docRef2 = doc(firestore, "DataReport", docId2);
    const snapshot2 = await updateDoc(docRef2, {
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    const docRef3 = doc(firestore, "RecordData", docId3);
    const snapshot3 = await updateDoc(docRef3, {
      data_NG: {
        part: part,
        jenis_NG: jenisNg,
        jumlah_NG: jumlahNg,
        estimasi_berat: estimasiBerat,
        aktual_berat: aktualBerat,
      },
    });

    return {snapshot, snapshot2, snapshot3};
  } catch (error) {
    console.error("Error updating document:", error);
    throw new Error("Failed to update document subcollection to Firestore");
  }
}

export async function deleteData(docId1, docId2) {
  try {
    const docRef1 = doc(firestore, "DataReport", docId1);
    await deleteDoc(docRef1);

    const docRef2 = doc(firestore, "AdminDataReport", docId2);
    await deleteDoc(docRef2);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function deletePart(docId) {
  try {
    const docRef = doc(firestore, "Part", docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function deleteAndSumData(date) {
  try {
    const collectionRef = collection(firestore, "AdminDataReport");
    const snapshot = await getDocs(collectionRef);

    let totalNg = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      totalNg += data.data_NG.jumlah_NG;
    });

    const newData = {
      totalNg,
      date: date,
      time: serverTimestamp(),
    };

    const totalDocRef = collection(firestore, "DataTotal");
    await addDoc(totalDocRef, newData);

    const batch = writeBatch(firestore);

    snapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function deleteUserDataReport() {
  try {
    const collectionRef = collection(firestore, "DataReport");
    const snapshot = await getDocs(collectionRef);

    const batch = writeBatch(firestore);

    snapshot.forEach((doc) => {
      const docRef = doc.ref;
      batch.delete(docRef); 
    });

    await batch.commit();
    console.log("All documents successfully deleted from DataReport.");
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}

export async function deleteRecordData() {
  try {
    const collectionRef = collection(firestore, "RecordData");
    const querySnapshot = await getDocs(collectionRef);

    const batch = writeBatch(firestore);

    querySnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error deleting data:", error);
    throw new Error("Failed to delete data");
  }
}
