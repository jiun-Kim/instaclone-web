/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: createComment
// ====================================================

export interface createComment_createComment {
  __typename: "MutationResponse";
  ok: boolean;
  id: string | null;
}

export interface createComment {
  createComment: createComment_createComment;
}

export interface createCommentVariables {
  id: number;
  payload: string;
}
