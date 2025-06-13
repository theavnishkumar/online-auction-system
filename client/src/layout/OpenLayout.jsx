import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import ScrollToTop from "../utils/ScrollToTop";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "../components/LoadingScreen";
import { checkAuth } from "../store/auth/authSlice";

export const OpenLayout = () => {
  const dispatch = useDispatch();
  const { loading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user && loading) {
      dispatch(checkAuth());
    }
  }, [dispatch, user, loading]);

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
