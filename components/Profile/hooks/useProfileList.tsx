import { format } from "date-fns";
import { id } from "date-fns/locale";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { Profile } from "type/profile.type";

const useProfileList = async () => {
  const profiles: Profile[] = [];

  const profileRef = query(collection(db, DatabaseCollections.USERS), orderBy("updatedAt", "desc"));

  const profilesResponse = await getDocs(profileRef);

  profilesResponse.docs.map((doc) => {
    const profile = {
      ...doc.data(),
      birthDate: format(new Date(doc.data().birthDate.toDate().toDateString()),
        "dd MMMM yyyy", {
        locale: id
      }),
      updatedAt: format(new Date(doc.data().updatedAt.toDate().toDateString()), "dd MMMM yyyy")
    }

    profiles.push(profile as Profile);
  });

  return profiles;
}

export default useProfileList;