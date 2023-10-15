import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { TailSpin } from "react-loader-spinner";
import { GET_CLIENTS } from "../../queries/clientQueries";
import { GET_PROJECT } from "../../queries/projectQueries";
import { UPDATE_PROJECT } from "../../mutations/projectMutation";

const EditProjectModal = ({ showModal, setShowModal, project }) => {
  const inputFields = ["name", "description"];
  //   const { loading, error, data } = useQuery(GET_CLIENTS);
  const [editedProject, setEditedProject] = useState({
    name: project.name,
    description: project.description,
    status:
      project.status === "Completed"
        ? "completed"
        : project.status === "In progress"
        ? "progress"
        : "new",
    // clientId: project.client.id,
  });

  const handleChange = (e) => {
    setEditedProject({ ...editedProject, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const [updateProject, { loading, error, data }] = useMutation(
    UPDATE_PROJECT,
    {
      variables: {
        id: project.id,
        name: editedProject.name,
        description: editedProject.description,
        status: editedProject.status,
        //   clientId: editedProject.clientId,
      },
      refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }],
    }
  );

  if (error) return <p>Something went wrong...</p>;

  return (
    <>
      {showModal ? (
        loading ? (
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
        ) : (
          <>
            <div className="justify-center items-center w-[100%] flex  fixed inset-0 z-50 rounded-lg">
              <div className="border-0 shadow-lg relative flex flex-col bg-white w-[50%]">
                <div className="flex items-center justify-between py-5 px-10 border-b">
                  <h3 className="text-2xl font-semibold">Edit Project</h3>
                  <button className="text-3xl" onClick={handleClose}>
                    ×
                  </button>
                </div>
                <div className="relative p-6 flex-auto flex flex-col gap-[20px]">
                  {inputFields.map((input) => (
                    <input
                      value={editedProject[input]}
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
                    value={editedProject.status}
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="new">Not started</option>
                    <option value="progress">In progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  {/* <select
                    value={editedProject.clientId}
                    className="border shadow-sm py-1 px-3 rounded-md w-[80%] mx-auto"
                    onChange={(e) =>
                      setEditedProject({
                        ...editedProject,
                        clientId: e.target.value,
                      })
                    }
                  >
                    {data?.clients?.map((client) => (
                      <option key={client.id} value={client.id}>
                        {client.name}
                      </option>
                    ))}
                  </select> */}
                </div>
                <div className="flex items-center justify-center p-6 border-t border-solid rounded-b">
                  <button
                    className="text-red-500 font-bold uppercase px-6 py-2 mr-1 mb-1"
                    type="button"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleClose();
                      updateProject(
                        project.id,
                        editedProject.name,
                        editedProject.description,
                        editedProject.status
                        // editedProject.clientId
                      );
                    }}
                    className="bg-emerald-500 text-white font-bold uppercase px-5 py-1 rounded"
                    type="button"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )
      ) : null}
    </>
  );
};

export default EditProjectModal;
