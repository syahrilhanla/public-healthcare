import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const useProfileForm = () => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => console.log(data);

  return {
    form,
    onSubmit,
  };
};

export default useProfileForm;