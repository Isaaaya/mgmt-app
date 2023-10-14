import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { ClientRow } from "../components/index";

const ClientsPage = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div>
      <table className="max-md:w-[90%] w-[70%] mt-[70px] mx-auto">
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
