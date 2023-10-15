import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_PROJECT } from "../mutations/projectMutation";
import { useNavigate } from "react-router-dom";
import { GET_PROJECTS } from "../queries/projectQueries";

const DeleteProjectButton = ({ projectId }) => {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: {
      id: projectId,
    },
    refetchQueries: [{ query: GET_PROJECTS }],
  });
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();
    deleteProject(projectId);
    navigate("/projects");
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 text-white px-3 py-1 rounded-md font-semibold"
    >
      Delete Project
    </button>
  );
};

export default DeleteProjectButton;
