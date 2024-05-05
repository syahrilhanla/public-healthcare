import { TtdType } from "type/ttd.type";

const useTTDList = async (searchParams: {
  year: string;
  posyandu: string;
}) => {
  const year = searchParams.year || new Date().getFullYear().toString();
  let endpoint = `${process.env.HOST}/api/ttd?year=${year}`;

  if (searchParams.posyandu) {
    endpoint += `&posyandu=${searchParams.posyandu}`;
  }

  const apiFetch = await ((await fetch(endpoint, {
    method: "GET",
    cache: "no-store",
  })).json());

  const TTDs: TtdType[] = apiFetch.data;

  return TTDs;
}

export default useTTDList;