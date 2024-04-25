import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Props {
  children: React.ReactNode;
  Trigger: React.ReactNode;
  title?: string;
  Footer?: React.ReactNode;
  openState: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const Modal = ({
  children, Trigger, title, Footer, openState
}: Props) => {
  const { open, setOpen } = openState;

  return (
    <Dialog
      modal
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        {Trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {
            title && (
              <DialogTitle>
                {title}
              </DialogTitle>
            )
          }
        </DialogHeader>
        {
          children
        }
        {
          Footer && (
            <DialogFooter>
              {Footer}
            </DialogFooter>
          )
        }
      </DialogContent>
    </Dialog>
  )
}

export default Modal