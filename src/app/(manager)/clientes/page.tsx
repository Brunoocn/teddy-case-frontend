import ClientsGrid from "@/components/clients/clientsGrid";
import { Pagination } from "@/components/pagination";
import { Client } from "@/types/Client";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { formatCurrency } from "@/utils/formatCurrency";
import { getToken } from "@/utils/getToken";
import { cookies } from "next/headers";

interface IReponseClients {
  list: Client[];
  paging: {
    total: number;
    page: number;
    pages: number;
  };
}

export type ParsedClient = {
  id: string;
  name: string;
  companyValue: string;
  salary: string;
  isSelect: boolean;
};

async function getUserId() {
  const nextCookies = await cookies();
  const userInfos = JSON.parse(nextCookies.get("TEDDY::USER")?.value || "{}");
  return userInfos.id;
}
async function requestClients(pageSize: number, page: number) {
  const token = await getToken();
  const userId = await getUserId();

  const data: IReponseClients = await fetchWrapper(
    `clients?userId=${userId}&pageSize=${pageSize}&page=${page}`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const parseClients: ParsedClient[] = data.list?.map((client) => ({
    id: client.id,
    name: client.name,
    companyValue: formatCurrency(client.companyValue),
    salary: formatCurrency(client.salary),
    isSelect: client.isSelect,
  }));

  return {
    clients: parseClients,
    paging: data.paging,
  };
}

export default async function Clients({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const ITEMS_PER_PAGE: number = 12;
  const page = Number(searchParams?.page) || 1;
  const response = await requestClients(ITEMS_PER_PAGE, page);
  const totalCountClients = response.paging.total;

  return (
    <main className="p-4">
      <p className="text-black mb-[10px]">
        <span className="text-black font-semibold mr-[5px]">
          {totalCountClients}
        </span>
        clientes encontrados:
      </p>
      <ClientsGrid clients={response.clients} />
      {response.paging.total >= 1 && (
        <Pagination totalCount={totalCountClients || 10} />
      )}
    </main>
  );
}
