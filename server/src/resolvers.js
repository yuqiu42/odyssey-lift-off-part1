const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, context) => {
      const { dataSources } = context;
      return dataSources.trackAPI.getTracksForHome();
    },
  },
  Track: {
    author: (parent, _, context) => {
      const { authorId } = parent;
      const { dataSources } = context;
      return dataSources.trackAPI.getAuthor(authorId);
    },
  },
};

module.exports = resolvers;
