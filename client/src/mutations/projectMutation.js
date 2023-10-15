import { gql } from "@apollo/client";


const CREATE_PROJECT = gql`
    mutation createProject($name: String!, $description: String!, $status: ProjectStatus, $clientId: ID!) {
        createProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            name
        }
    }
`;

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!){
        deleteProject(id: $id){
            name
        }
    }
`

export { CREATE_PROJECT, DELETE_PROJECT };