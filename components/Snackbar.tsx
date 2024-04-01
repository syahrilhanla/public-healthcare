import useSnackbarStore from "../lib/stores/snackbar.store";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Snackbar = () => {
  const { snackbarState } = useSnackbarStore();

  return (
    <>
      {
        snackbarState.snackbarOpen && (
          <div className="w-screen fixed bottom-10 block ">
            <div className="w-fit max-w-96 mx-auto">
              <Alert
                variant={snackbarState.type === "error" ? "destructive" : "default"}
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