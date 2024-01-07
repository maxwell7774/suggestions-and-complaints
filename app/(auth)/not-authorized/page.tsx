import React from "react";

//Page that displays when a user tries to access a page they are not authorized to.
const NotAuthorizedPage = () => {
  return (
    <div className="flex justify-center w-full h-full">
      <div className="w-full max-w-screen-xl flex justify-center items-center h-5/6">
        You are not authorized to view this page.
      </div>
    </div>
  );
};

export default NotAuthorizedPage;
