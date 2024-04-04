import useSnackbarStore from "../lib/stores/snackbar.store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Snackbar = () => {
  const { snackbarState } = useSnackbarStore();

  return (
    <>
      {
        snackbarState.snackbarOpen && (
          <div className="w-screen fixed bottom-10 block bg-transparent ">
            <div className="w-fit max-w-96 mx-auto z-50">
              <Alert
                variant={snackbarState.type === "error" ? "destructive" : "default"}
                className={snackbarState.type === "error"
                  ? "bg-red-700 text-white shadow-lg bg-opacity-80"
                  : "bg-green-600 text-white shadow-lg bg-opacity-80"}
              >
                {
                  snackbarState.snackbarTitle && (
                    <AlertTitle>
                      {snackbarState.snackbarTitle}
                    </AlertTitle>
                  )
                }
                <AlertDescription>
                  {snackbarState.snackbarMessage}
                </AlertDescription>
              </Alert>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Snackbar;