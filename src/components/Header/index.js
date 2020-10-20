import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { BackIconBtn, HeaderContainer } from './styledComponents';
import BackIcon from '../../Assets/backIcon.png';

const Header = ({ visible }) => {
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect path="/" />;

  return (
    <HeaderContainer>
      <BackIconBtn
        visible={visible}
        src={BackIcon}
        alt="back button"
        onClick={() => setRedirect(true)}
      />
      <h2>Crypto Watcher</h2>
    </HeaderContainer>
  );
};

export default Header;
