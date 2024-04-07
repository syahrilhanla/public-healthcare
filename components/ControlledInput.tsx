import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  labelText?: string;
  includeError?: boolean;
  inputId: string;
  placeholder?: string;
  type?: string;
  formSchema: any;
}

const ControlledInput = ({
  includeError,
  labelText,
  formSchema,
  placeholder,
  type = "text",
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
                {
                  type === "textarea" ? (
                    <Textarea
                      {...field}
                      className="focus-visible:ring-transparent"
                      placeholder={placeholder}
                      id={inputId}
                      value={field.value}
                    />
                  ) : (
                    <Input
                      placeholder={placeholder}
                      className="focus-visible:ring-transparent"
                      id={inputId}
                      {...field}
                      value={field.value}
                      type={type}
                      onKeyDown={(e) => {
                        if (type === "number") {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "e") {
                            e.preventDefault();
                          }
                        }
                      }}
                      onWheel={(e) => {
                        if (type === "number") e.currentTarget.blur();
                      }}
                    />
                  )
                }
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