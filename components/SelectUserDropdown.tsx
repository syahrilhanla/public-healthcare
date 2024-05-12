import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface Props {
  form: any;
  userDropdown: {
    name: string;
    userId: string;
  }[];
  setSearchUser: (user: string) => void;
}

const SelectUserDropdown = ({
  form, userDropdown, setSearchUser
}: Props) => {
  return (
    <FormField
      control={form.control}
      name={"userId"}
      render={({ field }) => (
        <>
          <FormItem>
            <div className="space-y-2 grid">
              <FormLabel htmlFor="userId">Siswa</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger
                    id="userId"
                    className="w-full h-16 px-2 py-4 text-left
                      border border-gray-300 rounded-md 
                      focus:outline-none focus:ring-0 focus:ring-transparent"
                  >
                    <SelectValue
                      placeholder={"Pilih Siswa"}
                      className="w-full space-x-2 focus-visible:ring-transparent"
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <div className="space-y-2">
                      <Input
                        placeholder="Cari Siswa"
                        className="w-full p-2 border border-gray-300 rounded-md 
                          focus:outline-none focus:ring-0 focus:ring-transparent"
                        onChange={(e) => {
                          const value = e.target.value;
                          setSearchUser(value);
                        }}
                      />
                      {
                        userDropdown.map(({ name, userId }) => (
                          <SelectItem key={userId} value={userId}>
                            <div className="grid gap-1 text-sm text-slate-600">
                              <p>{name}</p>
                              <p className="text-slate-400">{userId}</p>
                            </div>
                          </SelectItem>
                        ))
                      }
                    </div>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        </>
      )}
    />
  )
}

export default SelectUserDropdown;