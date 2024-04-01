import { create } from 'zustand';

type SnackbarStore = {
  snackbarState: {
    snackbarOpen: boolean;
    snackbarMessage: string;
    snackbarTitle?: string;
    type?: 'error' | 'success';
    duration?: number;
  }
  updateSnackbarState: (snackbarState: SnackbarStore['snackbarState']) => void;
  closeSnackbar: () => void;
};

const useSnackbarStore = create<SnackbarStore>((set) => ({
  snackbarState: {
    snackbarOpen: false,
    snackbarMessage: "",
    snackbarTitle: "",
    type: 'success',
    duration: 3000,
  },
  updateSnackbarState: (snackbarState) => {
    set({ snackbarState });
    setTimeout(() => {
      set((state) => ({ snackbarState: { ...state.snackbarState, snackbarOpen: false } }));
    }, snackbarState.duration || 3000);
  },
  closeSnackbar: () => set((state) => ({ snackbarState: { ...state.snackbarState, snackbarOpen: false } })),
}));

export default useSnackbarStore;