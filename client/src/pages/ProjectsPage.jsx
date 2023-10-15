import React from "react";
import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { TailSpin } from "react-loader-spinner";
import { ProjectCard } from "../components/index";

const ProjectsPage = () => {
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
    <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-3 w-[80%] max-sm:w-[70%] mx-auto my-[70px] gap-[40px]">
      {data.projects.map((project) => (
        <ProjectCard {...project} />
      ))}
    </div>
  );
};

export default ProjectsPage;
