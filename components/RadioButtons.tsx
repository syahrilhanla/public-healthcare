import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sex } from "lib/firebase.sdk";
import { Label } from "@/components/ui/label";

interface Props {
  formSchema: any;
}

const RadioButtons = ({ formSchema }: Props) => {
  return (
    <FormField
      control={formSchema.control}
      name={"sex"}
      render={({ field }) => (
        <>
          <FormItem className="space-y-2">
            <FormLabel htmlFor="sex">Jenis Kelamin</FormLabel>
            <RadioGroup
              className="flex gap-6 duration-500"
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <FormItem className="space-x-2 flex items-center">
                <Label htmlFor="male" className="space-x-2">
                  <FormControl>
                    <RadioGroupItem
                      value={Sex.MALE}
                      id="male"
                      checked={field.value === Sex.MALE}
                    />
                  </FormControl>
                  <span>
                    {Sex.MALE}
                  </span>
                </Label>
              </FormItem>
              <FormItem className="space-x-2 flex items-center">
                <Label htmlFor="female" className="space-x-2">
                  <FormControl>
                    <RadioGroupItem
                      value={Sex.FEMALE}
                      id="female"
                      checked={field.value === Sex.FEMALE}
                    />
                  </FormControl>
                  <span>
                    {Sex.FEMALE}
                  </span>
                </Label>
              </FormItem>
            </RadioGroup>
            <FormMessage />
          </FormItem>
        </>
      )}
    />
  )
}

export default RadioButtons;