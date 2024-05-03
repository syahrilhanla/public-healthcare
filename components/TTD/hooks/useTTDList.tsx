import { pathname } from "lib/host";
import { TtdType } from "type/ttd.type";

const useTTDList = async (searchParams: {
  year: string;
}) => {
  const year = searchParams.year || new Date().getFullYear().toString();
  const endpoint = `${pathname}/api/ttd?year=${year}`;

  const apiFetch = await ((await fetch(endpoint, {
    method: "GET",
    cache: "no-store",
  })).json());

  const TTDs: TtdType[] = apiFetch.data;

  return TTDs;
}

export default useTTDList;