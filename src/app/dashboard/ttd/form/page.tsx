import { Suspense } from "react";
import TTDForm from "components/TTD/TTDForm";

const TTDFormPage = () => {
  return (
    <Suspense>
      <TTDForm />
    </Suspense>
  )
}

export default TTDFormPage;