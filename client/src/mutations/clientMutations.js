import { gql } from "@apollo/client";

const CREATE_CLIENT = gql`
    mutation createClient ($name: String!, $email: String!, $phone: String!){
        createClient (name: $name, email: $email, phone: $phone) {
            name
        }
    }
`

const DELETE_CLIENT = gql`
    mutation deleteClient($id: ID!){
            deleteClient(id: $id){
                name
            }
        }
`

export { DELETE_CLIENT, CREATE_CLIENT }