import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import { HelmetTitle } from "../components/shared";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

import { seeFeed } from "../__generated__/seeFeed";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      ...PhotoFragment
      user {
        username
        avatar
      }
      caption
      comments {
        ...CommentFragment
      }
      createdAt
      isMine
    }
  }
  ${PHOTO_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Home = () => {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <>
      <HelmetTitle title="Home" />
      <div>
        {data?.seeFeed?.map((photo) => {
          return photo ? <Photo key={photo?.id} {...photo} /> : null;
        })}
      </div>
    </>
  );
};

export default Home;
