import { Consult } from "type/consult.type";

const useConsultingList = async () => {
  const endpoint = `${process.env.HOST}/api/consult`;

  const response = await ((await fetch(endpoint, {
    method: "GET",
    cache: "no-store",
  })).json());

  const consults: Consult[] = response.data;

  return { consults }
}

export default useConsultingList;