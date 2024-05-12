"use client"

import {
  useState,
  useEffect,
  useCallback
} from "react";

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
import { useDebounce } from "lib/helpers";
import { collection, getDocs } from "firebase/firestore";
import { DatabaseCollections, db } from "lib/firebase.sdk";
import { Profile } from "type/profile.type";

interface UserDropdown {
  name: string;
  userId: string;
  posyandu: string;
}

interface Props {
  form: any;
  callback?: (data: UserDropdown) => void;
}

const SelectUserDropdown = ({ form, callback }: Props) => {
  const [searchUser, setSearchUser] = useState<string>("");
  const [overallUserData, setOverallUserData] = useState<Profile[]>([]);
  const [userDropdown, setUserDropdown] = useState<UserDropdown[]>([]);

  const userDebounce = useDebounce(searchUser, 700);

  const getUserBySearch = useCallback(() => {
    if (searchUser) {
      const regex = new RegExp(searchUser, "i");

      const filteredUsers = userDropdown.filter((user) => {
        return regex.test(user.name);
      });

      setUserDropdown(filteredUsers);
      return;
    } else {
      setUserDropdown(overallUserData.map((user) => {
        return {
          name: user.name,
          userId: user.nik,
          posyandu: user.posyandu
        }
      }));
    }
  }, [userDebounce, overallUserData, userDropdown, searchUser]);

  useEffect(() => {
    getUserBySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDebounce]);

  const getUserList = useCallback(async () => {
    try {
      const usersCollection = await getDocs(collection(db, DatabaseCollections.USERS));
      const usersData = usersCollection.docs.map((doc) => {
        return {
          name: doc.data().name,
          userId: doc.id,
          posyandu: doc.data().posyandu,
        };
      });

      setUserDropdown(usersData);
      setOverallUserData(usersCollection.docs.map((doc) => doc.data() as Profile));
    } catch (error) {
      console.error("Error to GET INSPECTION list", error);
    }
  }, []);

  useEffect(() => {
    getUserList();
  }, []);

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
                  onValueChange={(value) => {
                    const userData = userDropdown.filter((user) => user.userId === value)[0];
                    callback && callback(userData);
                    field.onChange(value);
                  }}
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
                          <SelectItem key={userId} value={userId} className="cursor-pointer">
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