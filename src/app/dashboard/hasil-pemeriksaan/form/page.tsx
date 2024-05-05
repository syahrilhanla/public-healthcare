import { Suspense } from "react";
import InspectionForm from "components/Inspection/InspectionForm";
import LoadingIndicator from "components/LoadingIndicator";

const InspectionFormPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <InspectionForm />
    </Suspense>
  )
}

export default InspectionFormPage;