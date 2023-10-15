import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { TailSpin } from "react-loader-spinner";
import { ProjectCard } from "../components/index";
import { AddProjectModal } from "../components/modals/index";

const ProjectsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { loading, error, data } = useQuery(GET_PROJECTS);

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
    <div className="w-[80%] max-sm:w-[70%] mx-auto">
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm mt-[50px] px-5 py-2 rounded-md"
        onClick={() => setShowModal(true)}
      >
        Create project
      </button>
      <AddProjectModal showModal={showModal} setShowModal={setShowModal} />
      <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 gap-[40px] my-[30px]">
        {data.projects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
