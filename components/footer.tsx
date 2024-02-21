import React from "react";

const Footer = () => {
  return (
    <footer className="py-3 px-2 flex items-center justify-center border-t">
      Cove Bank of Utah {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
