"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "../ui/form";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { getCookie } from "cookies-next";
import { toast } from "../ui/use-toast";
import { IReponseGetClient } from "@/app/(manager)/clientes/[clientId]/page";

interface ICreateClient {
  name: string;
  salary: number;
  companyValue: number;
}

interface IUpdateClient extends ICreateClient {
  id?: string;
  isUpdate?: boolean;
}

interface FormClientProps {
  currentClient?: IReponseGetClient;
}

export default function FormClient({ currentClient }: FormClientProps) {
  const formProps = useForm<ICreateClient | IUpdateClient>();

  const router = useRouter();

  const handleBackPage = () => {
    return router.push("/clientes");
  };

  useEffect(() => {
    if (currentClient) {
      formProps.reset({
        id: currentClient.id,
        name: currentClient.name,
        salary: Number(currentClient.salary),
        companyValue: Number(currentClient.companyValue),
        isUpdate: true,
      });
    }
  }, [formProps, currentClient]);

  const handleCreateClient: SubmitHandler<ICreateClient> = async (data) => {
    try {
      const token = getCookie("TEDDY::TOKEN");
      const user = getCookie("TEDDY::USER");
      const formattedUser = JSON.parse(user as string);

      const payload = {
        ...data,
        userId: formattedUser.id,
      };

      await fetchWrapper(`clients`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast({
        variant: "sucess",
        title: "Sucesso!",
        description: (
          <div className="text-sucess-foreground">
            Cliente {data.name} criado com sucesso!
          </div>
        ),
      });

      router.push("/clientes");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: (
          <div className="text-destructive-foreground">{error?.message}</div>
        ),
      });
    }
  };

  const handleUpdateClient: SubmitHandler<IUpdateClient> = async (data) => {
    try {
      const token = getCookie("TEDDY::TOKEN");
      const user = getCookie("TEDDY::USER");
      const formattedUser = JSON.parse(user as string);

      const payload = {
        ...data,
        userId: formattedUser.id,
      };
      await fetchWrapper(`clients/${data.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      toast({
        variant: "sucess",
        title: "Sucesso!",
        description: (
          <div className="text-sucess-foreground">
            Cliente {data.name} atualizado com sucesso!
          </div>
        ),
      });

      router.push("/clientes");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ops!",
        description: (
          <div className="text-destructive-foreground">{error?.message}</div>
        ),
      });
    }
  };

  return (
    <div className="bg-white p-[20px] ">
      <div className="flex flex-row  items-center">
        <Button
          type="button"
          className="mr-[14px] h-[36px] w-[36px] p-0 text-black bg-none border-gray-100 border-2"
          onClick={handleBackPage}
        >
          <ChevronLeft />
        </Button>

        <p className=" text-[20px] font-semibold text-black">
          {formProps.watch("isUpdate") ? "Atualizar Cliente" : "Criar Cliente"}
        </p>
      </div>

      <Form {...formProps}>
        <form
          onSubmit={
            formProps.watch("isUpdate")
              ? formProps.handleSubmit(handleUpdateClient)
              : formProps.handleSubmit(handleCreateClient)
          }
        >
          <div className="mt-[24px] w-full ">
            <input
              type="text"
              placeholder="Digite o nome"
              className="mt-2 block w-full rounded-md border-gray-300 border bg-white px-2 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 mb-6"
              {...formProps.register("name", { required: true })}
            />
            {formProps.formState.errors.name && (
              <span className="mt-2 text-red-100">Campo Obrigatório</span>
            )}

            <input
              type="number"
              placeholder="Digite o salario"
              className="mt-2 block w-full rounded-md border-gray-300 border bg-white px-2 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40 mb-6"
              {...formProps.register("salary", {
                required: true,
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />
            {formProps.formState.errors.salary && (
              <span className="mt-2 text-red-100">Campo Obrigatório</span>
            )}

            <input
              type="number"
              placeholder="Digite o valor da empresa"
              className="mt-2 block w-full rounded-md border-gray-300 border bg-white px-2 py-2 text-gray-500 focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
              {...formProps.register("companyValue", {
                required: true,
                setValueAs: (v) => (v === "" ? undefined : Number(v)),
              })}
            />

            {formProps.formState.errors.companyValue && (
              <span className="mt-2 text-red-100">Campo Obrigatório</span>
            )}
          </div>
          <div className="flex justify-center mt-[20px]">
            <Button
              type="submit"
              className="w-[200px] transform rounded-sm bg-transparent border-orange-500 border-2 px-4 py-2 tracking-wide text-orange-500 transition-colors duration-200 hover:border-color-600 focus:outline-none mt-[20px] cursor-pointer"
            >
              {formProps.watch("isUpdate") ? "Atualizar" : "Criar"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
