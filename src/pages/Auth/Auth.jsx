import { Signup } from "./SignupPage";
import { LoginPage } from "./LoginPage";


import { AuthContainer, DialogContainer } from "./AuthStyles";
import { useState } from "react";
import { useSelector } from "react-redux";
import { currentUserSelector } from "../../store/user/userSelector";

export const Auth = () => {
  const [isDialogeOpen, setIsDialogOpen] = useState(true);


  const currentUser = useSelector(currentUserSelector)

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <AuthContainer>
      <DialogContainer open={isDialogeOpen}>
        {!currentUser && <Signup handleClose={handleClose} />}
        {currentUser && <LoginPage handleClose={handleClose} />}
      </DialogContainer>
    </AuthContainer>
  );
};
