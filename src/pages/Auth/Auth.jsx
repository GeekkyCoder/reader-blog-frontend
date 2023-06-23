import { Signup } from "./SignupPage";
import { LoginPage } from "./LoginPage";

import { AuthContainer, DialogContainer } from "./AuthStyles";
import { useState } from "react";

const Auth = ({ showAuthModal, setShowAuthModal }) => {
  const [showAuth, setShowAuth] = useState(false);

  const handleShowAuth = () => {
    setShowAuth((prevAuthShow) => !prevAuthShow);
  };

  return (
    <AuthContainer>
      <DialogContainer fullScreen={{xs:true,sm:false}} open={showAuthModal}>
        {!showAuth && <Signup handleShowAuth={handleShowAuth} />}
        {showAuth && (
          <LoginPage
            handleShowAuth={handleShowAuth}
            setShowAuthModal={setShowAuthModal}
          />
        )}
      </DialogContainer>
    </AuthContainer>
  );
};

export default Auth;
