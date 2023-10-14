import React from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQueries";
import { DELETE_CLIENT } from "../mutations/clientMutations";

import { TailSpin } from "react-loader-spinner";

const ClientRow = ({ id, name, email, phone }) => {
  const [deleteClient, { data, loading, error }] = useMutation(DELETE_CLIENT, {
    variables: { id },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  return (
    <tr className="text-center border-b">
      <td className="py-[20px]">{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td className="pl-[50px]">
        <button
          className="flex justify-center items-center bg-rose-500 text-white h-[40px] w-[40px] rounded-md"
          onClick={deleteClient}
        >
          {!loading ? (
            <FaTrashAlt />
          ) : (
            <TailSpin
              height="20"
              width="20"
              color="white"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          )}
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
