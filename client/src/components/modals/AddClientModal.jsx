import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CLIENT } from "../../mutations/clientMutations";
import { GET_CLIENTS } from "../../queries/clientQueries";

const inputFields = ["name", "email", "phone"];

const AddClientModal = ({ showModal, setShowModal }) => {
  const [client, setClient] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const [createClient] = useMutation(CREATE_CLIENT, {
    variables: { name: client.name, email: client.email, phone: client.phone },
    refetchQueries: [{ query: GET_CLIENTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.name || !client.email || !client.phone) {
      return;
    }
    createClient(client.name, client.email, client.phone);
    setShowModal(false);
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center w-[100%] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[50%]">
              <div className="flex items-start justify-between py-5 px-10 border-b border-solid rounded-t">
                <h3 className="text-2xl font-semibold">Create Client</h3>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto flex flex-col gap-[20px]">
                {inputFields.map((input) => (
                  <input
                    className="border shadow-sm py-1 px-3 rounded-md w-[80%] mx-auto"
                    key={input}
                    type="text"
                    name={input}
                    placeholder={input.toUpperCase()}
                    onChange={handleChange}
                  />
                ))}
              </div>
              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded"
                  type="button"
                  onClick={handleSubmit}
                >
                  Create
                </button>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default AddClientModal;
