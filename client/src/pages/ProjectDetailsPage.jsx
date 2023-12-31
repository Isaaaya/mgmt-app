import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { TailSpin } from "react-loader-spinner";
import { ClientInfo, DeleteProjectButton } from "../components/index";
import { EditProjectModal } from "../components/modals/index";

const ProjectDetailsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { projectId } = useParams();
  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { id: projectId },
  });

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

  return (
    <div className="border w-[60%] mx-auto py-[60px] px-[40px] my-[60px] shadow-md rounded-md">
      <Link to="/projects">
        <div className="flex justify-end">
          <button className="bg-gray-100 px-6 py-1 rounded-md mb-[20px]">
            Back
          </button>
        </div>
      </Link>
      <div className="flex flex-col gap-[40px]">
        <div className="flex flex-col gap-[15px]">
          <h1 className="text-4xl font-semibold">{data.project.name}</h1>
          <p>{data.project.description}</p>
        </div>
        <div className="flex flex-col gap-[10px]">
          <p className="text-2xl">Project Status</p>
          <p className="text-xl">{data.project.status}</p>
        </div>
      </div>
      <ClientInfo client={data.project.client} />
      <div className="flex items-center justify-between mt-[30px]">
        <button
          className="bg-pink-500 text-white font-bold uppercase text-sm px-5 py-2 rounded-md"
          onClick={() => setShowModal(true)}
        >
          Edit project
        </button>
        <DeleteProjectButton projectId={data.project.id} />
      </div>
      <EditProjectModal
        showModal={showModal}
        setShowModal={setShowModal}
        project={data.project}
      />
    </div>
  );
};

export default ProjectDetailsPage;
