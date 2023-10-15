import React from "react";
import { BiSolidUser } from "react-icons/bi";
import { AiFillMail } from "react-icons/ai";
import { BsTelephoneFill } from "react-icons/bs";

const ClientInfo = ({ client }) => {
  const { name, email, phone } = client;
  const clientInfoFields = [
    {
      id: "name",
      value: name,
      icon: <BiSolidUser size={20} />,
    },
    {
      id: "email",
      value: email,
      icon: <AiFillMail size={20} />,
    },
    {
      id: "phone",
      value: phone,
      icon: <BsTelephoneFill size={20} />,
    },
  ];

  return (
    <div className="flex flex-col gap-[10px] mt-[50px]">
      <h3 className="text-xl font-semibold">Client Information</h3>
      <div className="flex flex-col">
        {clientInfoFields.map((client) => (
          <div
            key={client.id}
            className="flex items-center gap-[7px] border py-2 px-4"
          >
            {client.icon}
            <p>{client.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientInfo;
