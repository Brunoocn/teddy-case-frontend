import { fetchWrapper } from "@/utils/fetchWrapper";
import { getToken } from "@/utils/getToken";
import FormClient from "@/components/clients/formClient";

export interface IReponseGetClient {
  id: string;
  name: string;
  companyValue: number;
  salary: number;
  isSelect: boolean;
}

async function requestGetClientById(
  clientId: string
): Promise<IReponseGetClient> {
  const token = await getToken();

  const data: IReponseGetClient = await fetchWrapper(`clients/${clientId}`, {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });

  return data;
}

export default async function UpdateClient(props: {
  params?: Promise<{
    clientId: string;
  }>;
}) {
  const params = await props.params;

  if (!params) {
    return;
  }
  
  const currentClient: IReponseGetClient = await requestGetClientById(
    params?.clientId
  );

  return <FormClient currentClient={currentClient} />;
}
