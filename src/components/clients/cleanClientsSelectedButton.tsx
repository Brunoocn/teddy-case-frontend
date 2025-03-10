'use client'
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { fetchWrapper } from "@/utils/fetchWrapper";
import { getCookie } from "cookies-next";

export default function CleanClientsSelectedButton() {
  const router = useRouter();
  async function resetIsSelect(): Promise<void> {
    try {
      const token = getCookie("TEDDY::TOKEN");
      const user = getCookie("TEDDY::USER");
      const formattedUser = JSON.parse(user as string);
      await fetchWrapper(`clients/${formattedUser.id}/select/reset`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      toast({
        variant: "sucess",
        title: "Sucesso!",
        description: (
          <div className="text-sucess-foreground">
            Todos os clientes foram desselecionados.
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
    <Button
      onClick={resetIsSelect}
      className="w-full transform rounded-sm bg-transparent border-orange-500 border-2 px-4 py-2 tracking-wide text-orange-500 transition-colors duration-200 hover:border-color-600 mt-[20px] cursor-pointer"
    >
      Limpar clientes selecionados
    </Button>
  );
}
