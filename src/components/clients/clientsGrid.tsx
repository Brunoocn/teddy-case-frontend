"use client";

import { ParsedClient } from "@/app/(manager)/clientes/page";
import ClientCard from "./clientCard";

interface ClientGridProps {
  clients: ParsedClient[];
}

export default function ClientsGrid({
  clients,
}: ClientGridProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </>
  );
}
