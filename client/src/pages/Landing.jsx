import { useSelector } from "react-redux";
import { CTA } from "../components/Landing/CTA";
import { Features } from "../components/Landing/Features";
import { Hero } from "../components/Landing/Hero";
import Dashboard from "./Dashboard";
import LoadingScreen from "../components/LoadingScreen";
import { Auction } from "../components/Landing/Auction";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export const Landing = () => {
  const { user, loading } = useSelector((state) => state.auth);
  useDocumentTitle(user ? "Dashboard" : "Home");

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen">
      {!user && (
        <>
          <Hero />
          <Auction />
          <Features />
          <CTA />
        </>
      )}
      {user && <Dashboard />}
    </div>
  );
};
