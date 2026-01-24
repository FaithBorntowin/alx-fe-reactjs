import { useContext } from "react";
import UserContext from "./UserContext";

function UserProfile() {
  const {name,email} = useContext(UserContext);

  return (
    <div>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default UserProfile;
