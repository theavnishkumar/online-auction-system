import { Outlet } from "react-router";
import {Navbar} from "../components/Navbar"
import {Footer} from "../components/Footer"


export const AdminLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer/>
    </>
  );
};