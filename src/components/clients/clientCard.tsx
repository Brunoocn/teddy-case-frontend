"use client";

import { ParsedClient } from "@/app/(manager)/clientes/page";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { getCookie } from "cookies-next";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import IsSelect from "./isSelect";
import { toast } from "../ui/use-toast";

interface ClientCardProps {
  client: ParsedClient;
}

export default function ClientCard({ client }: ClientCardProps) {
  const router = useRouter();
  async function changeIsSelect() {
    try {
      const token = getCookie("TEDDY::TOKEN");
      await fetchWrapper(`clients/${client.id}/select`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isSelect: !client.isSelect,
        }),
      });
      toast({
        variant: "sucess",
        title: "Sucesso!",
        description: (
          <div className="text-sucess-foreground">
            Cliente {client.name} foi {client.isSelect && "des"}selecionado
          </div>
        ),
      });

      router.refresh();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: (
          <div className="text-destructive-foreground">{error?.message}</div>
        ),
      });
    }
  }

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white max-w-[300px]">
      <div className="flex justify-center flex-col items-center">
        <h3 className="font-semibold text-md text-black">{client.name}</h3>
        <p className="font-medium text-sm text-black">
          Salário: {client.salary}
        </p>
        <p className="font-medium text-sm text-black">
          Empresa: {client.companyValue}
        </p>
      </div>
      <div className="flex justify-between mt-4">
        <IsSelect isSelect={client.isSelect} onClick={changeIsSelect} />
        <button
          className="bg-none cursor-pointer"
          onClick={() => router.push(`/clientes/${client.id}`)}
        >
          <Pencil className="h-[20px] w-[20px] text-black" />
        </button>
        <Trash className="h-[20px] w-[20px] text-red-400" />
      </div>
    </div>
  );
}
