import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  seeFeed_seeFeed_comments,
  seeFeed_seeFeed_user,
} from "../../__generated__/seeFeed";
import useUser from "../hooks/useUser";
import Comment from "./Comment";

const CommentContainer = styled.div``;
const CommentNumbers = styled.div`
  font-size: 12px;
  opacity: 0.6;
  font-weight: 600;
  margin-top: 15px;
`;
const WriteCommentContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 25px;
  padding: 10px 0;
  input {
    width: 100%;
  }
`;

interface IComments {
  user: seeFeed_seeFeed_user;
  photoId: number;
  caption: string | null;
  commentNumbers: number;
  comments: (seeFeed_seeFeed_comments | null)[] | null;
}

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($id: Int!, $payload: String!) {
    createComment(id: $id, payload: $payload) {
      ok
      id
    }
  }
`;

const Comments: React.FunctionComponent<IComments> = ({
  user,
  photoId,
  caption,
  commentNumbers,
  comments,
}) => {
  const { register, handleSubmit, getValues, setValue } = useForm();
  const { data: userData } = useUser();
  const [createComment, { loading }] = useMutation(CREATE_COMMENT_MUTATION);

  const onValid = () => {
    const { payload } = getValues();
    if (loading) {
      return;
    }
    createComment({
      variables: {
        id: photoId,
        payload,
      },
      update: (cache, result) => {
        const {
          data: {
            createComment: { ok, id },
          },
        } = result;
        if (ok && userData?.me) {
          const newComment = {
            id,
            __typename: "Comment",
            user: {
              ...userData?.me,
            },
            payload,
            isMine: true,
            createdAt: Date.now(),
          };
          const newCacheComment = cache.writeFragment({
            data: newComment,
            fragment: gql`
              fragment IComment on Comment {
                id
                __typename
                user {
                  username
                  avatar
                }
                payload
                isMine
                createdAt
              }
            `,
          });
          cache.modify({
            id: `Photo:${photoId}`,
            fields: {
              comments(prev) {
                return [...prev, newCacheComment];
              },
              commentNumbers(prev) {
                return prev + 1;
              },
            },
          });
        }
      },
    });
    setValue("payload", "");
  };
  return (
    <CommentContainer>
      <Comment username={user?.username} caption={caption} />
      <CommentNumbers>
        <span>
          {commentNumbers === 1 ? `1 comment` : `${commentNumbers} comments`}
        </span>
      </CommentNumbers>
      <>
        {comments?.map((comment) => {
          return comment ? (
            <Comment
              key={Number(comment.id)}
              id={Number(comment.id)}
              photoId={photoId}
              isMine={comment.isMine}
              username={user?.username}
              caption={comment.payload}
            />
          ) : null;
        })}
      </>
      <WriteCommentContainer>
        <form onSubmit={handleSubmit(onValid)}>
          <input
            ref={register({ required: true })}
            name="payload"
            type="text"
            placeholder="Write a comments..."
          />
        </form>
      </WriteCommentContainer>
    </CommentContainer>
  );
};
export default Comments;
