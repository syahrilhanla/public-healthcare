import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Props {
  labelText?: string;
  includeError?: boolean;
  inputId: string;
  formSchema: any;
  options: {
    value: string;
    label: string;
  }[];
}

const RadioButtons = ({ formSchema, inputId, includeError, labelText, options }: Props) => {
  return (
    <FormField
      control={formSchema.control}
      name={inputId}
      render={({ field }) => (
        <>
          <FormItem className="space-y-2">
            <FormLabel htmlFor={inputId}>{labelText}</FormLabel>
            <RadioGroup
              className="flex gap-6 duration-500"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              {
                options.map(option => (
                  <FormItem key={option.value} className="space-x-2 flex items-center">
                    <Label htmlFor={option.value.toLowerCase()} className="space-x-2">
                      <FormControl>
                        <RadioGroupItem
                          value={option.value}
                          id={option.value.toLowerCase()}
                          checked={field.value === option.value}
                        />
                      </FormControl>
                      <span>
                        {option.label}
                      </span>
                    </Label>
                  </FormItem>
                ))
              }
            </RadioGroup>
            {
              includeError && <FormMessage />
            }
          </FormItem>
        </>
      )}
    />
  )
}

export default RadioButtons;