import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ClientRow } from "../components/index";
import { AddClientModal } from "../components/modals/index";

const ClientsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, data } = useQuery(GET_CLIENTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div className="max-md:w-[90%] w-[70%] mx-auto">
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm mt-[50px] px-5 py-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Create client
      </button>
      <AddClientModal showModal={showModal} setShowModal={setShowModal} />
      <table className="w-[100%] mt-[70px] ">
        <thead className="border-b">
          <tr className="h-[60px]">
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client) => (
            <ClientRow key={client.id} {...client} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
