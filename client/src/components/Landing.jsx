import { Flex, Button, Drawer, Typography } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  const navMenu = [
    {
      title: "Home",
      url: "#",
    },
    {
      title: "Features",
      url: "#",
    },
    {
      title: "Auction",
      url: "#",
    },
    {
      title: "Contact",
      url: "#",
    },
  ];

  return (
    // Navbar section
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
              {menu.title}
            </Button>
          ))}
        </Flex>
        <Flex
          align="center"
          justify="space-between"
          className="hidden md:flex gap-4"
        >
          <Button size="large" onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </Button>
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
            <Button onClick={showDrawer} type="primary">
              Close
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
              {menu.title}
            </Button>
          ))}
        </Drawer>
      </Flex>
    </nav>
  );
};

export default Landing;
