import { useSelector } from "react-redux";
import Card from "../components/Card";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="min-h-[calc(100svh-9rem)] md:px-16 px-6 md:py-8 py-4 w-full">
      Hi, {user.name}
      <br />
      your email is : {user.email}
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Dashboard;
