import { Consult } from "type/consult.type";

const useConsultingList = async (searchParams: {
  posyandu: string;
  konsultasi: string;
}) => {
  const consultQuery = searchParams.konsultasi;
  const posyanduQuery = searchParams.posyandu

  const endpoint = new URL(`${process.env.HOST}/api/consult`);
  consultQuery && endpoint.searchParams.append("konsultasi", consultQuery);
  posyanduQuery && endpoint.searchParams.append("posyandu", posyanduQuery);

  const response = await ((await fetch(endpoint.href, {
    method: "GET",
    cache: "no-store",
  })).json());

  const consults: Consult[] = response.data;

  return { consults }
}

export default useConsultingList;