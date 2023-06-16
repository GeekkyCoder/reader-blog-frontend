import { Signup } from "./SignupPage";
import { LoginPage } from "./LoginPage";


import { AuthContainer, DialogContainer } from "./AuthStyles";
import { useState } from "react";

 const Auth = () => {
  const [showAuth,setShowAuth]  = useState(false)
 
  const handleShowAuth = () => {
    setShowAuth(prevAuthShow => !prevAuthShow)
  }

  return (
    <AuthContainer>
      <DialogContainer open={true} >
       {!showAuth &&  <Signup  handleShowAuth={handleShowAuth}/>}
        {showAuth && <LoginPage handleShowAuth={handleShowAuth}/>}
      </DialogContainer>
    </AuthContainer>
  );
};

export default Auth