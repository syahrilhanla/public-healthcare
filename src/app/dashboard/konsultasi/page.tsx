import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";
import ConsultingListTable from "components/Consult/ConsultingListTable";
import ConsultingFilter from "components/Consult/ConsultingFilter";
import PosyanduFilter from "components/PosyanduFilter";

import useConsultingList from "components/Consult/hooks/useConsultingList";

import { PlusIcon } from "lucide-react";
import { ConsultType, consultingTypes } from "lib/reusableValues";
import ProblemFilter from "components/Consult/ProblemFilter";

interface Props {
  searchParams: {
    posyandu: string;
    konsultasi: string;
    keluhan: string;
  }
}

const ConsultingList = async ({ searchParams }: Props) => {
  const { consults } = await useConsultingList(searchParams);

  return (
    <div className="grid gap-4 px-2 lg:px-6">
      <h1
        className="text-2xl font-semibold text-gray-600"
      >
        Konsultasi
      </h1>

      <div className="w-full flex flex-col lg:flex-row gap-4 justify-end duration-500">
        <div className={`transition-all duration-500 transform ${searchParams.konsultasi === ConsultType.HEALTH_CONTROL ? 'translate-x-0' : 'translate-x-0'}`}>
          <ConsultingFilter selectedConsultation={searchParams.konsultasi} />
        </div>

        <div className={`transition-opacity duration-500 absolute inset-y-0 ${searchParams.konsultasi === ConsultType.HEALTH_CONTROL ? 'opacity-100 relative' : 'opacity-0'}`}>
          <ProblemFilter selectedProblem={searchParams.keluhan} />
        </div>

        <PosyanduFilter selectedPosyandu={searchParams.posyandu} />
        <Link href={"/dashboard/konsultasi/form"}>
          <Button variant={"outline"}
            className="w-full lg:w-fit flex gap-2 rounded-lg text-gray-600"
          >
            <PlusIcon className="h-4 w-4" />
            Tambah Data
          </Button>
        </Link>
      </div>

      {
        consultingTypes.includes(searchParams.konsultasi as ConsultType) ? (
          <ConsultingListTable
            consults={consults}
            isHealthControl={searchParams.konsultasi === ConsultType.HEALTH_CONTROL}
          />
        ) : (
          <div className="h-[40dvh] my-auto flex items-center justify-center text-gray-600">
            Pilih konsultasi terlebih dahulu
          </div>
        )
      }
    </div>
  )
}

export default ConsultingList;