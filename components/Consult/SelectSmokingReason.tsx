import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";

import { SmokingReason } from "lib/reusableValues";

interface Props {
  form: any;
}

const SelectSmokingReason = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name={"smokingReason"}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="smokingReason">Apa alasan kamu mulai merokok?</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger
                id="posyandu"
                className="w-full p-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-0 focus:ring-transparent"
              >
                <SelectValue
                  placeholder={field.value || "Jenis Konsultasi"}
                  className="w-full space-x-2 focus-visible:ring-transparent"
                />
              </SelectTrigger>
              <SelectContent>
                {
                  Object.entries(SmokingReason).map(([key, value]) => (
                    <SelectItem key={key} value={value} className="cursor-pointer">
                      {value}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
      )}
    />
  )
}

export default SelectSmokingReason;