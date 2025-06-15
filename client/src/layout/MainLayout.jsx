import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router";
import ScrollToTop from "../utils/ScrollToTop";
import { useSelector } from "react-redux";

export const MainLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  if (!loading && !user) {
    navigate("/login");
    return null;
  }

  return loading ? (
    <LoadingScreen />
  ) : (
    <>
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
