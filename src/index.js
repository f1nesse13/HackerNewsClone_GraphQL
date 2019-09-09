const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is an API of a HackerNews clone.`,
    feed: (root, args, context, info) => context.prisma.links()
  },

  // Trivial -- GraphQL knows to includes link information
  // Link:
  // id: parent => parent.id
  // description: parent => parent.description
  // url: parent => parent.ur
  //
  //

  Mutation: {
    post: (parent, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      });
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
});

server.start(() => console.log(`server is running on localhost:4000`));
