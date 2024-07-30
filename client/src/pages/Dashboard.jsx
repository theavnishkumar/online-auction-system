import { useContext } from "react";
import AuthContext from "../context/authContext";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-[calc(100svh-9rem)] md:px-16 px-6 md:py-8 py-4 w-full">
      Home
      <br />
      Hi, {user.name}
      <br />
      your email is : {user.email}
    </div>
  );
};

export default Dashboard;
