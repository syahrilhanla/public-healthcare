import { Suspense } from "react";
import TTDForm from "components/TTD/TTDForm";
import LoadingIndicator from "components/LoadingIndicator";

const TTDFormPage = () => {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <TTDForm />
    </Suspense>
  )
}

export default TTDFormPage;