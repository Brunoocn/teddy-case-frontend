import ClientsGrid from "@/components/clients/clientsGrid";
import { Pagination } from "@/components/pagination";
import { Button } from "@/components/ui/button";
import { Client } from "@/types/Client";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { formatCurrency } from "@/utils/formatCurrency";
import { getToken } from "@/utils/getToken";
import { getUserId } from "@/utils/getUserId";
import Link from "next/link";

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
  userId: string;
};
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
    userId: userId,
  }));

  return {
    clients: parseClients,
    paging: data.paging,
  };
}

export default async function Clients(
  props: {
    searchParams?: Promise<{
      page?: string;
    }>;
  }
) {
  const searchParams = await props.searchParams;
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
      <Link href="/clientes/criar">
        <Button className="w-full transform rounded-sm bg-transparent border-orange-500 border-2 px-4 py-2 tracking-wide text-orange-500 transition-colors duration-200 hover:border-color-600 focus:bg-orange-600 focus:outline-none mt-[20px] cursor-pointer">
          Criar Cliente
        </Button>
      </Link>
      {response.paging.total >= 1 && (
        <Pagination totalCount={totalCountClients || 10} />
      )}
    </main>
  );
}
