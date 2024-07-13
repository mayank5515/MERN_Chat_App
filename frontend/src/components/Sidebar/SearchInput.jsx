import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import useGetConversations from "../../hooks/useGetConversations";
export default function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { loading, conversations } = useGetConversations();
  function handleSubmit(e) {
    e.preventDefault();
    if (!search) return;
    if (search < 3) {
      toast.error("Search term must be atleast 3 characters long!!");
    }
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else toast.error("No such user found!");
  }
  return (
    <form className="flex items-center gap-2" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="input input-bordered rounded-full"
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
}

//import { IoSearchSharp } from "react-icons/io5";
// export default function SearchInput() {
//     return (
//       <form className="flex items-center gap-2">
//         <input
//           type="text"
//           placeholder="Search"
//           className="input input-bordered rounded-full"
//         />
//         <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//           <IoSearchSharp className="w-6 h-6 outline-none" />
//         </button>
//       </form>
//     );
//   }
