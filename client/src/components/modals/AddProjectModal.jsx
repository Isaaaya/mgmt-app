import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECTS } from "../../queries/projectQueries";
import { TailSpin } from "react-loader-spinner";
import { CREATE_PROJECT } from "../../mutations/projectMutation";

const inputFields = ["name", "description"];

const AddProjectModal = ({ showModal, setShowModal }) => {
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const [project, setProject] = useState({
    name: "",
    description: "",
    status: "new",
    clientId: "",
  });

  const handleChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShowModal(false);
    setProject({ name: "", description: "", status: "new", clientId: "" });
  };

  const [createProject] = useMutation(CREATE_PROJECT, {
    variables: {
      name: project.name,
      description: project.description,
      status: project.status,
      clientId: project.clientId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!project.name || !project.description || !project.clientId) {
      return alert("Fill all fields");
    }
    createProject(
      project.name,
      project.description,
      project.status,
      project.clientId
    );
    setShowModal(false);
  };

  if (loading)
    return (
      <div className="mt-[200px] flex justify-center items-center">
        <TailSpin
          height="20"
          width="20"
          color="black"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );

  if (error) return <p>Something went wrong...</p>;
  else
    return (
      <>
        {showModal ? (
          <>
            <div className="justify-center items-center w-[100%] flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none w-[50%]">
                <div className="flex items-start justify-between py-5 px-10 border-b border-solid rounded-t">
                  <h3 className="text-2xl font-semibold">Create Project</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={handleClose}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto flex flex-col gap-[20px]">
                  {inputFields.map((input) => (
                    <input
                      onChange={handleChange}
                      key={input}
                      className="border shadow-sm py-1 px-3 rounded-md w-[80%] mx-auto"
                      type="text"
                      name={input}
                      placeholder={input.toUpperCase()}
                    />
                  ))}
                  <select
                    className="border shadow-sm py-1 px-3 rounded-md w-[80%] mx-auto"
                    onChange={(e) =>
                      setProject({ ...project, status: e.target.value })
                    }
                  >
                    <option value="new">Not started</option>
                    <option value="progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    className="border shadow-sm py-1 px-3 rounded-md w-[80%] mx-auto"
                    onChange={(e) =>
                      setProject({ ...project, clientId: e.target.value })
                    }
                  >
                    <option>Select Client</option>
                    {data?.clients?.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded"
                    type="button"
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

export default AddProjectModal;
