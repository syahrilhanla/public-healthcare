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
}

const Modal = ({
  children, Trigger, title, Footer
}: Props) => {
  return (
    <Dialog modal>
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