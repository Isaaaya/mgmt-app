import { gql } from "@apollo/client"

const GET_PROJECTS = gql`
     {
        projects {
            id
            name
            description
            status
        }
    }
`;

const GET_PROJECT = gql`
    query getProject($id: ID!) {
        project(id: $id) {
            id
            name
            description
            status
            client{
                name
                email
                phone
            }
        }
    }
`


export { GET_PROJECTS, GET_PROJECT };