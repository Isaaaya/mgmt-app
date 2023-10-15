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
`;

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String, $description: String, $status: ProjectStatusUpdate) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
                name
        }
    }
`

export { CREATE_PROJECT, DELETE_PROJECT, UPDATE_PROJECT };