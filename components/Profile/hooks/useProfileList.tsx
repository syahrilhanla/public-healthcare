import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase.sdk";
import { Profile } from "type/profile.type";

const useProfileList = async () => {
  const profiles: Profile[] = [];

  const profilesResponse = await getDocs(collection(db, "users"));
  profilesResponse.docs.map((doc) => {
    profiles.push(doc.data() as unknown as Profile);
  });

  return profiles;
}

export default useProfileList;