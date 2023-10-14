import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";

const ClientsPage = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  return (
    <div>
      <button onClick={() => console.log(data.clients)}>test</button>
    </div>
  );
};

export default ClientsPage;
