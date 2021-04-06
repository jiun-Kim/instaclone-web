import React from "react";
import styled from "styled-components";
import { FatText } from "../shared";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const CommentContainer = styled.div`
  margin-top: 15px;
`;
const CommentCaption = styled.span`
  margin-left: 5px;
  font-size: 13px;
  a {
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;
const Button = styled.button`
  border: none;
  background-color: inherit;
  font-size: 10px;
  &:focus {
    outline: none;
  }
`;

interface IComment {
  username: string;
  caption: string | null;
  isMine?: boolean;
  id?: number;
  photoId?: number;
}
const Comment: React.FunctionComponent<IComment> = ({
  username,
  caption,
  isMine,
  id,
  photoId,
}) => {
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;
      if (ok) {
        cache.evict({
          id: `Comment:${id}`,
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            commentNumbers(prev) {
              return prev - 1;
            },
          },
        });
      }
    },
  });
  return (
    <CommentContainer>
      <Link to={`/users/${username}`}>
        <FatText>{username}</FatText>
      </Link>
      <CommentCaption>
        {caption?.split(" ").map((word, index) =>
          /#[\w]+/.test(word) ? (
            <React.Fragment key={index}>
              <Link to={`/hashtags/${word}`}>{word} </Link>
            </React.Fragment>
          ) : (
            <React.Fragment key={index}>{word} </React.Fragment>
          )
        )}
      </CommentCaption>
      {isMine ? (
        <Button onClick={() => !loading && deleteComment()}>❌</Button>
      ) : null}
    </CommentContainer>
  );
};

export default Comment;
