import React from "react";
import { useParams } from "react-router-dom";

function UserPage() {
  const { username } = useParams();
  return <div>User Page for: {username}</div>;
}

export default UserPage;
