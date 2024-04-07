import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(4, {
    message: "Masukkan minimal 3 karakter"
  }),
  nik: z.string().min(16, {
    message: "Masukkan NIK yang valid"
  }).max(16, {
    message: "Masukkan NIK yang valid"
  }),
  address: z.string().min(1, { message: "Masukkan alamat yang valid" }),
});

const useProfileForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

  return {
    form,
    onSubmit,
  };
};

export default useProfileForm;