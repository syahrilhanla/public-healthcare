import { Suspense } from "react";
import ConsultingForm from "components/Consult/ConsultingForm";
import LoadingIndicator from "components/LoadingIndicator";

const ConsultingFormPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <ConsultingForm />
    </Suspense>
  )
}

export default ConsultingFormPage;