import { gql } from "@apollo/client";

export const USER_ADDED_SUBSCRIPTION = gql`
  subscription {
    userAdded {
      id
      name
      email
    }
  }
`;

export const USER_UPDATED_SUBSCRIPTION = gql`
  subscription{
    userUpdated {
      id
      name
      email
    }
  }
`;