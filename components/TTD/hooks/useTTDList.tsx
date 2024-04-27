import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import parseFirestoreTimestamp from "lib/parseFirestoreTimestamp";

import { TtdType } from "type/ttd.type";

const useTTDList = async () => {
  const TTDs: TtdType[] = [];

  const TTDRef = query(collection
    (db, DatabaseCollections.TTDS), orderBy("updatedAt", "desc")
  );
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