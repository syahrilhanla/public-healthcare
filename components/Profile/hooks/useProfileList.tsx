import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import { Profile } from "type/profile.type";

const useProfileList = async () => {
  const profiles: Profile[] = [];

  const profilesResponse = await getDocs(collection(db, "users"));
  profilesResponse.docs.map((doc) => {
    const profile = {
      ...doc.data().data,
      birthDate: doc.data().data.birthDate.toDate().toDateString()
    }

    profiles.push(profile as Profile);
  });

  return profiles;
}

export default useProfileList;