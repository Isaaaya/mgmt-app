import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { TailSpin } from "react-loader-spinner";

const ProjectDetailsPage = () => {
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
    <div>
      <h1>{data.project.name}</h1>
    </div>
  );
};

export default ProjectDetailsPage;
