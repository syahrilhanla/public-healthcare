import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import parseFirestoreTimestamp from "lib/parseFirestoreTimestamp";

import { Inspection } from "type/inspection.type";

const useInspectionList = async () => {
  const inspections: Inspection[] = [];

  const inspectionRef = query(collection(db, "inspections"), orderBy("updatedAt", "desc"));
  const inspectionResponse = await getDocs(inspectionRef);

  inspectionResponse.docs.map((doc) => {
    // console.log(
    //   format(new Date(doc.data().updatedAt.toDate().toDateString()), "dd MMMM yyyy"),
    // )

    const inspection = {
      ...doc.data(),
      // updatedAt: format(new Date(doc.data().updatedAt.toDate().toDateString()), "dd MMMM yyyy")
      updatedAt: parseFirestoreTimestamp(doc.data().updatedAt)
    }

    inspections.push(inspection as Inspection);
  });

  return inspections;
}

export default useInspectionList;