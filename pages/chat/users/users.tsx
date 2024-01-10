import EmptyState from "@/app/ChatComponents/EmptyState";
import ToasterContext from "@/app/context/ToasterContext";

const Users = () => {
  return (
    <ToasterContext>
      <div className='hidden lg:block lg:pl-80 h-full'>
        <EmptyState />
      </div>
    </ToasterContext>
  );
};

export default Users;
