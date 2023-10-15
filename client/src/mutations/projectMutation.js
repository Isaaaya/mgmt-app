import { gql } from "@apollo/client";


const CREATE_PROJECT = gql`
    mutation createProject($name: String!, $description: String!, $status: ProjectStatus, $clientId: ID!) {
        createProject(name: $name, description: $description, status: $status, clientId: $clientId) {
            name
        }
    }
`

export { CREATE_PROJECT };