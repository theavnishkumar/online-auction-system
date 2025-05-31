import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/auth/authSlice";
import { Footer } from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { useNavigate } from "react-router";
import ScrollToTop from "../utils/ScrollToTop";

export const MainLayout = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [loading, user, navigate]);

  if (loading) return <LoadingScreen />;

  return (
    <>
    <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
