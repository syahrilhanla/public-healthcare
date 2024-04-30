import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import parseFirestoreTimestamp from "lib/parseFirestoreTimestamp";

import { TtdType } from "type/ttd.type";

const useTTDList = async (searchParams: {
  year: string;
}) => {
  let yearQuery = "";
  if (searchParams.year) yearQuery = searchParams.year;

  const TTDs: TtdType[] = [];

  let TTDRef = query(collection(db, DatabaseCollections.TTDS), orderBy("updatedAt", "desc"));

  if (yearQuery) {
    TTDRef = query(collection(db, DatabaseCollections.TTDS), where("years", "array-contains", yearQuery));
  }
  const TTDResponse = await getDocs(TTDRef);

  TTDResponse.docs.map((doc) => {
    const TTD = {
      ...doc.data(),
      updatedAt: parseFirestoreTimestamp(doc.data().updatedAt)
    }

    TTDs.push(TTD as TtdType);
  });

  return TTDs;
}

export default useTTDList;