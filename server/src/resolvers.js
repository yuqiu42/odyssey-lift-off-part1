const resolvers = {
  Query: {
    // returns an array of Tracks that will be used to populate
    // the homepage grid of our web client
    tracksForHome: (_, __, context) => {
      const { dataSources } = context;
      return dataSources.trackAPI.getTracksForHome();
    },

    // get a single track by ID, for the track page
    track: (_, args, context) => {
      const { id: trackId } = args;
      const { dataSources } = context;
      return dataSources.trackAPI.getTrack(trackId);
    },
  },

  Mutation: {
    // increments a track's numberOfViews property
    incrementTrackViews: async (_, args, context) => {
      const { id: trackId } = args;
      const { dataSources } = context;
      try {
        const track = await dataSources.trackAPI.incrementTrackViews(trackId);
        return {
          code: 200,
          success: true,
          message: `Successfully incremented number of views for track ${trackId}`,
          track,
        };
      } catch (err) {
        return {
          code: err.extensions.response.status,
          success: false,
          message: err.extensions.response.body,
          track: null,
        };
      }
    },
  },

  Track: {
    author: (parent, _, context) => {
      const { authorId } = parent;
      const { dataSources } = context;
      return dataSources.trackAPI.getAuthor(authorId);
    },
    modules: (parent, _, context) => {
      const { id: trackId } = parent;
      const { dataSources } = context;
      return dataSources.trackAPI.getTrackModules(trackId);
    },
  },
};

module.exports = resolvers;
