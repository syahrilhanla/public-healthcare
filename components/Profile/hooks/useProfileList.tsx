import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import { Profile } from "type/profile.type";

const useProfileList = async () => {
  const profiles: Profile[] = [];

  const profileRef = query(collection(db, "users"), orderBy("updatedAt", "desc"));

  const profilesResponse = await getDocs(profileRef);

  profilesResponse.docs.map((doc) => {
    const profile = {
      ...doc.data(),
      birthDate: doc.data().birthDate.toDate().toDateString()
    }

    profiles.push(profile as Profile);
  });

  return profiles;
}

export default useProfileList;