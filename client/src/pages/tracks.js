import { gql, useQuery } from "@apollo/client";
import React from "react";

import { Layout } from "../components";
import TrackCard from "../containers/track-card";

/** TRACKS query to retrieve all tracks */
const TRACKS = gql`
  query GetTracks {
    tracksForHome {
      id
      title
      thumbnail
      length
      modulesCount
      author {
        name
        photo
      }
    }
  }
`;

/**
 * Tracks Page is the Catstronauts home page.
 * We display a grid of tracks fetched with useQuery with the TRACKS query
 */
const Tracks = () => {
  const { data, loading, error } = useQuery(TRACKS);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{`Error! ${error.message}`}</div>;
  }
  return (
    <Layout grid>
      {data?.tracksForHome?.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </Layout>
  );
};

export default Tracks;
