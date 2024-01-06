import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Session } from "next-auth/types";

//Use query hook to get the data based on the api url
export function useDataQuery(apiUrl: string) {
  const { status, data: session } = useSession();
  return useQuery({
    queryKey: [apiUrl],
    queryFn: () => fetchAll(apiUrl, session),
  });
}

//Fetch function that does the GET request
const fetchAll = async (apiUrl: string, session: Session | null) => {
  const res = await axios.get(apiUrl);
  return res.data;
};
