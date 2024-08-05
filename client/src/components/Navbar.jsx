import { Flex, Button, Drawer, Typography } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, deleteAccount } from "../store/auth/authSlice";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };
  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await dispatch(deleteAccount(user.email)).unwrap();
        navigate("/");
      } catch (error) {
        console.error("Failed to delete account:", error);
      }
    }
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  const navMenu = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Create Auction",
      url: "/create-auction",
    },
    {
      title: "My Auction",
      url: "#",
    },
    {
      title: "Blog",
      url: "#",
    },
  ];

  return (
    <nav className="border-b border">
      <Flex
        align="center"
        justify="space-between"
        style={{ padding: "0.6rem 0.5rem" }}
      >
        <Typography.Title
          level={3}
          style={{
            color: "#4B4453",
          }}
        >
          Kipa Auction
        </Typography.Title>

        <Flex align="center" justify="space-between" className="hidden md:flex">
          {navMenu.map((menu, index) => (
            <Button key={index} type="text" size="large">
              <Link to={menu.url}>{menu.title}</Link>
            </Button>
          ))}
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          className="hidden md:flex gap-4"
        >
          {/* <Button size="large">Login</Button>
          <Button type="primary" size="large">
            Sign up
          </Button> */}
          <Typography>
            Hi, <b>{user.name}</b>
          </Typography>
        </Flex>
        <Typography.Text className="text-gray-900 md:hidden">
          <Button type="default" onClick={showDrawer}>
            <MenuOutlined />
          </Button>
        </Typography.Text>
        <Drawer
          title="Kipa Auction"
          placement="right"
          closable={false}
          onClose={showDrawer}
          open={visible}
          footer={
            <Button onClick={handleLogout} type="primary" danger>
              Logout
            </Button>
          }
        >
          {navMenu.map((menu, index) => (
            <Button
              key={index}
              type="text"
              size="large"
              block
              onClick={() => setVisible(false)}
            >
              <Link to={menu.url}>{menu.title}</Link>
            </Button>
          ))}
          <Button onClick={handleDeleteAccount} danger block>
            Delete my account
          </Button>
        </Drawer>
      </Flex>
    </nav>
  );
};

export default Navbar;
