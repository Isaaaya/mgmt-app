const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLList, GraphQLNonNull, GraphQLEnumType } = require('graphql');
const Client = require('../models/Client');
const Project = require('../models/Project');

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: {
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve: (parent, args) => {
                return Client.findById(parent.clientId);
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        clients: {
            type: new GraphQLList(ClientType),
            resolve: () => {
                return Client.find();
            }
        },
        client: {
            type: ClientType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, { id }) {
                return Client.findById(id)
            }
        },
        projects: {
            type: new GraphQLList(ProjectType),
            resolve: () => {
                return Project.find();
            }
        },
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve: (parent, { id }) => {
                return Project.findById(id)
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createClient: {
            type: ClientType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (parent, args) => {
                const { name, email, phone } = args;
                return Client.create({ name, email, phone });
            }
        },
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: (parent, { id }) => {
                return Client.findByIdAndRemove(id);
            }
        },
        updateClient: {
            type: ClientType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                phone: { type: GraphQLString },
            },
            resolve: async (parent, args) => {
                const { id, name, email, phone } = args;
                return await Client.findByIdAndUpdate(
                    id, {
                    $set: {
                        name, email, phone
                    }
                },
                    { new: true }
                )
            }
        },
        createProject: {
            type: ProjectType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            'new': { value: 'Not started' },
                            'progress': { value: 'In progress' },
                            'completed': { value: 'Completed' }
                        }
                    }),
                    defaultValue: 'Not Started',
                },
                clientId: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parent, args) => {
                const { name, description, status, clientId } = args;
                return await Project.create({ name, description, status, clientId });
            }
        },
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatusUpdate',
                        values: {
                            'new': { value: 'Not started' },
                            'progress': { value: 'In progress' },
                            'compeleted': { value: 'Completed' }
                        }
                    }),
                },
            },
            resolve: async (parent, args) => {
                const { id, name, description, status } = args;
                return await Project.findByIdAndUpdate(
                    id,
                    {
                        $set: {
                            name, description, status
                        }
                    },
                    { new: true }
                )
            }
        },
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
            },
            resolve: async (parent, { id }) => {
                return await Project.findByIdAndRemove(id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation,
})
