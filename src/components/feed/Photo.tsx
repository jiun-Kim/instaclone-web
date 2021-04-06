import React from "react";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../Avatar";
import { FatText } from "../shared";
import { gql, useMutation } from "@apollo/client";
import {
  toggleLike,
  toggleLikeVariables,
} from "../../__generated__/toggleLike";
import { seeFeed_seeFeed } from "../../__generated__/seeFeed";
import Comments from "./Comments";
import { Link } from "react-router-dom";

const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: white;
  margin-bottom: 20px;
  max-width: 620px;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const PhotoHeader = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid ${(props) => props.theme.borderColor};
`;
const Username = styled(FatText)`
  margin-left: 10px;
`;

const PhotoFile = styled.img`
  min-width: 100%;
  width: 100%;
  margin-top: 0.3px;
`;

const PhotoData = styled.div`
  width: 100%;
  padding: 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;
const PhotoAction = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;

const Likes = styled(FatText)`
  margin-top: 15px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo: React.FunctionComponent<seeFeed_seeFeed> = ({
  id,
  user,
  caption,
  file,
  isLiked,
  likes,
  commentNumbers,
  comments,
}) => {
  const updateCache = (cache: any, result: any) => {
    const {
      data: {
        toggleLike: { ok },
      },
    } = result;

    const photoId = `Photo:${id}`;

    if (ok) {
      cache.modify({
        id: photoId,
        fields: {
          isLiked(prev: boolean) {
            return !prev;
          },
          likes(prev: number) {
            return isLiked ? prev - 1 : prev + 1;
          },
        },
      });
    }
  };
  const [toggleLike] = useMutation<toggleLike, toggleLikeVariables>(
    TOGGLE_LIKE_MUTATION,
    {
      variables: {
        id,
      },
      update: updateCache,
    }
  );
  return (
    <PhotoContainer key={id}>
      <PhotoHeader>
        <Link to={`/users/${user?.username}`}>
          <Avatar url={user?.avatar} lg />
        </Link>
        <Link to={`/users/${user?.username}`}>
          <Username>{user?.username}</Username>
        </Link>
      </PhotoHeader>
      <PhotoFile src={file} />
      <PhotoData>
        <PhotoActions>
          <div>
            <PhotoAction
              onClick={() => toggleLike()}
              style={{ color: isLiked ? "tomato" : "inherit" }}
            >
              <FontAwesomeIcon icon={isLiked ? solid : faHeart} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <FontAwesomeIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <FontAwesomeIcon icon={faBookmark} />
          </div>
        </PhotoActions>
        <Likes>{likes === 1 ? `1 like` : `${likes} likes`}</Likes>
        <Comments
          user={user}
          photoId={id}
          caption={caption}
          commentNumbers={commentNumbers}
          comments={comments}
        />
      </PhotoData>
    </PhotoContainer>
  );
};

export default Photo;
