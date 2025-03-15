import { Route, Routes } from "react-router-dom";

import UsersView from "./components/users-view";
import UserForm from "./components/user-form";

const User = () => {
  return (
    <Routes>
      <Route path="/" key="usersView" element={<UsersView />} />
      <Route path="/:mode/:userId?" key="userForm" element={<UserForm />} />
    </Routes>
  );
};

export default User;
