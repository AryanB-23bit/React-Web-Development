import React from "react";

const Header = () => {
  return (
    <header className="appHeader">
      <div className="container">
        <nav className="appNav">
          <div className="logo">
            <i className="fas fa-book-open fa-3x"/>
            <h1>read.a.licious</h1>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
