import { Suspense } from "react";
import InspectionForm from "components/Inspection/InspectionForm";

const InspectionFormPage = () => {
  return (
    <Suspense>
      <InspectionForm />
    </Suspense>
  )
}

export default InspectionFormPage;