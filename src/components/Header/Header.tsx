import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        <img src={`./images/Qantas-Logo.png`} width="50" height="50" className="d-inline-block align-top" alt="" />
        QANTAS HOTELS
      </a>
    </nav>
  );
};

export default Header;
