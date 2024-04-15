import { collection, getDocs } from "firebase/firestore";
import { db } from "lib/firebase.sdk";

const useProfileList = async () => {
  const profiles: Profile[] = [];

  const profilesResponse = await getDocs(collection(db, "users"));
  profilesResponse.docs.map((doc) => {
    profiles.push(doc.data() as unknown as Profile);
  });

  return profiles;
}

export default useProfileList;

type Profile = {
  posyandu: string;
  sex: string;
  birthdate: string;
  address: string;
  fullName: string;
  NIK: string;
  school: string;
  birthplace: string;
};