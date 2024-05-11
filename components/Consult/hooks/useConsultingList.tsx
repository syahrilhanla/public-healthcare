import { Consult } from "type/consult.type";

const useConsultingList = async (searchParams: {
  posyandu: string;
  konsultasi: string;
  keluhan: string;
}) => {
  const consultQuery = searchParams.konsultasi;
  const posyanduQuery = searchParams.posyandu;
  const keluhanQuery = searchParams.keluhan;

  const endpoint = new URL(`${process.env.HOST}/api/consult`);
  consultQuery && endpoint.searchParams.append("konsultasi", consultQuery);
  posyanduQuery && endpoint.searchParams.append("posyandu", posyanduQuery);
  keluhanQuery && endpoint.searchParams.append("keluhan", keluhanQuery);

  const response = await ((await fetch(endpoint.href, {
    method: "GET",
    cache: "no-store",
  })).json());

  const consults: Consult[] = response.data;

  return { consults }
}

export default useConsultingList;