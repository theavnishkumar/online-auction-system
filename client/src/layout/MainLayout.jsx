import { Outlet, useNavigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import ScrollToTop from "../utils/ScrollToTop";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const MainLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <LoadingScreen />;

  if (!user) return null; // Prevents flashing protected content before redirect

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
