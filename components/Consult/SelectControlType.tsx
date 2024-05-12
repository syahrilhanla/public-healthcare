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
  FormLabel,
  FormMessage
} from "@/components/ui/form";

import { healthControlTypes } from "lib/reusableValues";

interface Props {
  form: any;
}

const SelectControlType = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name={"type"}
      render={({ field }) => (
        <FormItem>
          <FormLabel htmlFor="type">Pilih Tipe Keluhan</FormLabel>
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
                  placeholder={field.value || "Tipe Keluhan"}
                  className="w-full space-x-2 focus-visible:ring-transparent"
                />
              </SelectTrigger>
              <SelectContent>
                {
                  healthControlTypes.map((type) => (
                    <SelectItem key={type} value={type} className="cursor-pointer">
                      {type}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default SelectControlType;