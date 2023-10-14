import { gql } from "@apollo/client";

const GET_CLIENTS = gql`
    query getClients {
      clients {
        name
      }
    }
  `;


export { GET_CLIENTS }