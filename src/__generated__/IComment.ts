/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: IComment
// ====================================================

export interface IComment_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface IComment {
  __typename: "Comment";
  id: number;
  user: IComment_user;
  payload: string;
  isMine: boolean;
  createdAt: string;
}
