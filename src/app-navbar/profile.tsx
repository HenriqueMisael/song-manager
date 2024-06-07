import { useSelector } from "react-redux";

import { sessionSelectors } from "../store/session";

import { Login } from "./login.tsx";
import { UserProfile } from "./userProfile.tsx";

export const Profile = () => {
  const isLogged = useSelector(sessionSelectors.isLogged);

  return isLogged ? <UserProfile /> : <Login />;
};