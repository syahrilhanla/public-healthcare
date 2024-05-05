import { LoaderCircle } from "lucide-react";

const LoadingIndicator = () => {
  return (
    <div className="w-full flex gap-3 justify-center text-center">
      <LoaderCircle className="animate-spin" /> <p>Loading...</p>
    </div>)
}

export default LoadingIndicator;