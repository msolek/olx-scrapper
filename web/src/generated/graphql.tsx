import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  announcements: Array<Announcement>;
  announcement?: Maybe<Announcement>;
};


export type QueryAnnouncementArgs = {
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};

export type Announcement = {
  __typename?: 'Announcement';
  id: Scalars['Int'];
  url: Scalars['String'];
  name: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type Mutation = {
  __typename?: 'Mutation';
  createAnnouncement: Announcement;
  deleteAnnouncement: Scalars['Boolean'];
};


export type MutationCreateAnnouncementArgs = {
  url: Scalars['String'];
};


export type MutationDeleteAnnouncementArgs = {
  id: Scalars['Float'];
};

export type CreateAnnouncementMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateAnnouncementMutation = (
  { __typename?: 'Mutation' }
  & { createAnnouncement: (
    { __typename?: 'Announcement' }
    & Pick<Announcement, 'id'>
  ) }
);


export const CreateAnnouncementDocument = gql`
    mutation createAnnouncement($url: String!) {
  createAnnouncement(url: $url) {
    id
  }
}
    `;

export function useCreateAnnouncementMutation() {
  return Urql.useMutation<CreateAnnouncementMutation, CreateAnnouncementMutationVariables>(CreateAnnouncementDocument);
};