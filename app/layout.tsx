import SideBar from "@/components/SideBar";
import "./globals.css";
import { SessionProvider } from "@/components/SessionProvider";

import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <div className="flex">
              <div className="bg-[#202223] max-w-xs h-screen overflow-y-auto md:min-w-[20rem] ">
                <SideBar></SideBar>
              </div>

              <ClientProvider />
              <div className="bg-[#343541] flex-1 ">{children}</div>
            </div>
          )}
        </SessionProvider>
      </body>
    </html>
  );
}
