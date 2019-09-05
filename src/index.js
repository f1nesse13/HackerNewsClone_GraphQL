const { GraphQLServer } = require('graphql-yoga');

let links = [
  {
    id: 'link-1',
    description: 'test link',
    url: 'www.notaurl.com'
  },
  {
    id: 'link-2',
    description: 'test link 2',
    url: 'www.notaurleither.com'
  }
];

const resolvers = {
  Query: {
    info: () => `This is an API of a HackerNews clone.`,
    feed: () => links
  },

  // Trivial -- GraphQL knows to includes link information
  Link: {
    id: parent => parent.id,
    description: parent => parent.description,
    url: parent => parent.url
  }
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers
});

server.start(() => console.log(`server is running on localhost:4000`));
