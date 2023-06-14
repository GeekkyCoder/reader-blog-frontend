import { Signup } from "./SignupPage";
import { Login } from "./LoginPage";


import { AuthContainer, DialogContainer } from "./AuthStyles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userSelectorReducer } from "../../store/user/userSelector";

export const Auth = () => {
  const [isDialogeOpen, setIsDialogOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState("");

  const user = useSelector(userSelectorReducer)

  const handleClose = (value) => {
    setIsDialogOpen(false);
    setSelectedValue(value);
  };

  console.log(user)

  return (
    <AuthContainer>
      <DialogContainer open={isDialogeOpen} onClose={handleClose}>
        {!user.currentUser && <Signup handleClose={handleClose} />}
        {user.currentUser && <Login handleClose={handleClose} />}
      </DialogContainer>
    </AuthContainer>
  );
};
