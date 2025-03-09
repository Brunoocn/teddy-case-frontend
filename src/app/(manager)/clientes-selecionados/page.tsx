import ClientsGrid from "@/components/clients/clientsGrid";

import { Client } from "@/types/Client";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { formatCurrency } from "@/utils/formatCurrency";
import { getToken } from "@/utils/getToken";
import { getUserId } from "@/utils/getUserId";
import { ParsedClient } from "../clientes/page";

interface IReponseClients {
  list: Client[];
  paging: {
    total: number;
    page: number;
    pages: number;
  };
}

async function requestClientsSelected(pageSize: number, page: number) {
  const token = await getToken();
  const userId = await getUserId();

  const data: IReponseClients = await fetchWrapper(
    `clients?userId=${userId}&pageSize=${pageSize}&page=${page}&isSelect=true`,
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

export default async function SelectClients({
  searchParams,
}: {
  searchParams?: {
    page?: string;
  };
}) {
  const ITEMS_PER_PAGE: number = 12;
  const params = await searchParams;
  const page = Number(params) || 1;
  const response = await requestClientsSelected(ITEMS_PER_PAGE, page);
  const messageQuantityClients =
    response.paging.total === 1 ? "Cliente" : "Clientes";
  const messageTotalClients =
    response.paging.total === 0
      ? "Nenhum cliente selecionado."
      : `${messageQuantityClients} selecionados:`;

  return (
    <main className="p-4">
      <p className="text-black mb-[10px]">{messageTotalClients}</p>
      <ClientsGrid clients={response.clients} />
    </main>
  );
}
