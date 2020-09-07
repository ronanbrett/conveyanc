import React from "react";
import UserProfileCard from "./UserProfileCard";

import { action } from "@storybook/addon-actions";
import { useAuth } from "../../core/auth/index";

import { DiProvider, injectable } from "react-magnetic-di";

const authenticated = injectable(useAuth, () => ({
  isAuthenticated: true,
  isLoading: true,
  login: (): any => {},
  register: (): any => {},
  logout: () => {},
  user: {
    username: "Ronan",
  },
}));

export default {
  title: "Components/UserProfileCard",
  decorators: [
    (story) => (
      <DiProvider target={UserProfileCard} use={[authenticated]}>
        {story()}
      </DiProvider>
    ),
  ],
  component: UserProfileCard,
};

export const Default = () => {
  return <UserProfileCard></UserProfileCard>;
};
