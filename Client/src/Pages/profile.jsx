import React from "react";

//component imports
import Profilecomponent from "../Components/profile";
import ChatHistory from "../Components/chatHistory";

function Profile() {
  return (
    <div className="d-grid p-3 h-100">
      <div className="row">
        <div className="col-9">
          <div className="h-100 p-2 border">
            <Profilecomponent />
          </div>
        </div>
        <div className="col-sm ">
          <div className="h-100 p-2 border">
            <ChatHistory />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
