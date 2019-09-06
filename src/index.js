const { GraphQLServer } = require('graphql-yoga');

let idCount = links.length;
const resolvers = {
  Query: {
    info: () => `This is an API of a HackerNews clone.`,
    feed: (root, args, context, info) => context.prisma.links(),
    link: (parent, args, context, info) => {
      let linkMatch = context.prisma.links();
      linkMatch = linkMatch.filter(l => l.id === args.id);
      return linkMatch[0];
    }
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
  resolvers
});

server.start(() => console.log(`server is running on localhost:4000`));
