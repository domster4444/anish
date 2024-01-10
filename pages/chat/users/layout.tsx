//@ts-nocheck
import ToasterContext from "@/app/context/ToasterContext";
import Sidebar from "app/ChatComponents/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToasterContext>
      <Sidebar>
        <div className='h-full'>{children}</div>
      </Sidebar>
    </ToasterContext>
  );
}
