
import PageHeader from "@/components/header";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teddy - Manager",
  description: "Teddy Manager",
};

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader />
      <main className="mx-[100px] mt-[24px]">{children}</main>
    </>
  );
}
