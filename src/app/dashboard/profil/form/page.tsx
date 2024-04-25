import { Suspense } from "react";
import ProfileForm from "components/Profile/ProfileForm";

const ProfilePage = () => {
  return (
    <Suspense>
      <ProfileForm />
    </Suspense>
  )
}

export default ProfilePage;