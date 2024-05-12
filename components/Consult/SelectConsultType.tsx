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
  FormItem
} from "@/components/ui/form";

import { consultingTypes } from "lib/reusableValues";

interface Props {
  form: any;
}

const SelectConsultType = ({ form }: Props) => {
  return (
    <FormField
      control={form.control}
      name={"Hb"}
      render={({ field }) => (
        <FormItem>
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
                  consultingTypes.map((type) => (
                    <SelectItem key={type} value={type} className="cursor-pointer">
                      {type}
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

export default SelectConsultType;