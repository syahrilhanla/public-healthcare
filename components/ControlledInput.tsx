import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  labelText?: string;
  includeError?: boolean;
  inputId: string;
  placeholder?: string;
  formSchema: any;
}

const ControlledInput = ({
  includeError,
  labelText,
  formSchema,
  placeholder,
  inputId
}: Props) => {
  return (
    <FormField
      control={formSchema.control}
      name={inputId}
      render={({ field }) => (
        <>
          <FormItem>
            <div className="space-y-2">
              {
                labelText &&
                <FormLabel htmlFor={inputId}>{labelText}</FormLabel>
              }
              <FormControl>
                <Input
                  placeholder={placeholder}
                  className="focus-visible:ring-transparent"
                  id={inputId}
                  {...field}
                  value={field.value}
                />
              </FormControl>

              {
                includeError && <FormMessage />
              }
            </div>
          </FormItem>
        </>
      )}
    />
  )
}

export default ControlledInput;