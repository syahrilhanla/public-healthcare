import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";

import useProfileList from "components/Profile/hooks/useProfileList";
import ProfileListTable from "components/Profile/ProfileListTable";

import { PlusIcon } from "lucide-react";

const ProfileList = async () => {
  const profiles = await useProfileList();

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Profil
      </h1>

      <div className="w-full lg:flex lg:justify-end">
        <Link href={"/dashboard/profil/form"}>
          <Button variant={"outline"}
            className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Profil
          </Button>
        </Link>
      </div>

      <ProfileListTable profiles={profiles} />
    </div>
  )
}

export default ProfileList;