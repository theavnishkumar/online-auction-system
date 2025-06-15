import { useDispatch, useSelector } from "react-redux";
import { CTA } from "../components/Landing/CTA";
import { Features } from "../components/Landing/Features";
import { Hero } from "../components/Landing/Hero";
import Dashboard from "./Dashboard";
import LoadingScreen from "../components/LoadingScreen";

export const Landing = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if(loading) return <LoadingScreen/>
  
  return (
    <div className="min-h-screen bg-white">
      {!user && (
        <>
          <Hero />
          <Features />
          <CTA />
        </>
      )}
      {user && <Dashboard />}
    </div>
  );
};
