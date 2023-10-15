import React from "react";
import { Link } from "react-router-dom";

const ProjectCard = ({ id, name, status }) => {
  return (
    <div className="border flex flex-col p-6 rounded-md shadow-md gap-[10px]">
      <div className="flex justify-between">
        <h3 className="text-xl">{name}</h3>
        <Link to={`/projects/${id}`}>
          <button className="self-start bg-gray-100/[0.6] px-2 py-1 rounded-sm h-min">
            View
          </button>
        </Link>
      </div>
      <p>
        Status: <span className="font-semibold">{status}</span>
      </p>
    </div>
  );
};

export default ProjectCard;
