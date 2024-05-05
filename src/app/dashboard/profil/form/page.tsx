import { Suspense } from "react";
import ProfileForm from "components/Profile/ProfileForm";
import LoadingIndicator from "components/LoadingIndicator";

const ProfilePage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ProfileForm />
    </Suspense>
  )
}

export default ProfilePage;