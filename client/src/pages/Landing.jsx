import { Flex, Button, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

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

  useEffect(() => {
    if (user) {
      navigate("/auction");
    }
  }, [user, navigate]);

  return (
    <>
      {/* Navbar section */}
      <nav className="border-b border sticky top-0 bg-white z-50 md:px-10 px-4">
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

          <Flex
            align="center"
            justify="space-between"
            className="hidden md:flex"
          >
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
            <Button onClick={() => navigate("/login")}>Login</Button>
            <Button type="primary" onClick={() => navigate("/signup")}>
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

      {/* Hero Section */}

      <div className="container px-6 py-6 mx-auto lg:px-12 min-h-[calc(100svh-4.1rem)]">
        <div className="items-center lg:flex">
          <div className="w-full lg:w-1/2">
            <div className="lg:max-w-lg">
              <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
                Bid Smart, Win Big: <br />
                Your Gateway to <br />
                <span className="text-blue-500 ">Online Auctions</span>
              </h1>

              <p className="mt-3 text-gray-600 dark:text-gray-400">
                Discover a new era of online auctions with our cutting-edge
                platform designed to bring buyers and sellers together in a
                seamless, secure, and engaging environment. Whether you are
                looking to find great deals or sell unique items, our system
                provides real-time bidding, transparent transactions, and a wide
                array of categories to explore. Join our community today and
                experience the excitement of winning big in the world of online
                auctions!
              </p>

              <button
                className="px-3 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500 mr-4"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
              <Button size="large" onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
            <img
              className="w-full h-full lg:max-w-3xl"
              src="https://merakiui.com/images/components/Catalogue-pana.svg"
              alt="Catalogue"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Landing;
