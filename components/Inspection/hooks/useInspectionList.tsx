import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import parseFirestoreTimestamp from "lib/parseFirestoreTimestamp";

import { Inspection } from "type/inspection.type";

const useInspectionList = async () => {
  const inspections: Inspection[] = [];

  const inspectionRef = query(collection(db, DatabaseCollections.INSPECTIONS), orderBy("updatedAt", "desc"));
  const inspectionResponse = await getDocs(inspectionRef);

  inspectionResponse.docs.map((doc) => {
    const inspection = {
      ...doc.data(),
      updatedAt: parseFirestoreTimestamp(doc.data().updatedAt)
    }

    inspections.push(inspection as Inspection);
  });

  return inspections;
}

export default useInspectionList;