import { FormLabel } from "@/components/ui/form";
import RadioButtons from "components/RadioButtons";

import { SmokingReason } from "lib/reusableValues";

interface Props {
  form: any;
}

const SelectSmokingReason = ({ form }: Props) => {
  return (
    <div className="grid gap-1">
      <FormLabel htmlFor="reasonToQuit">
        Dari mana kamu tahu tentang merokok?
      </FormLabel>
      <span className="ml-4 space-y-2">
        {
          Object.entries(SmokingReason).map(([key, value]) => (
            <RadioButtons
              formSchema={form}
              inputId={key}
              includeError
              labelText={value}
              options={[
                {
                  value: "YES",
                  label: "Ya"
                },
                {
                  value: "NO",
                  label: "Tidak"
                }
              ]}
            />
          ))
        }
      </span>
    </div>
  )
}

export default SelectSmokingReason;