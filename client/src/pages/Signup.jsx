import { Button, Card, Checkbox, Form, Input } from "antd";
import { FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const VITE_API = `${import.meta.env.VITE_API}`;

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return alert("All fields are required");
    }
    try {
      await axios.post(`${VITE_API}/api/signup`, formData);
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data.error);
      } else {
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-svh min-w-full flex flex-col items-center justify-center">
      <Card
        bordered={true}
        style={{
          width: 350,
        }}
      >
        <div className="flex justify-between px-4 pb-4">
          <IoArrowBackSharp
            size={28}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(-1)}
          />
          <FiHome
            size={26}
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        {error && (
          <span className="block px-3 pb-2 text-red-600 font-semibold">
            {error}
          </span>
        )}
        <Form
          name="layout"
          style={{
            width: "100%",
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          layout="vertical"
          onSubmitCapture={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setformData({ ...formData, name: e.target.value })
              }
              value={formData.name}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input
              onChange={(e) =>
                setformData({ ...formData, email: e.target.value })
              }
              value={formData.email}
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              onChange={(e) =>
                setformData({ ...formData, password: e.target.value })
              }
              value={formData.password}
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Signup
            </Button>
          </Form.Item>
        </Form>
        <span className="text-center block">
          Already have account?{" "}
          <b
            className="cursor-pointer text-blue-600"
            onClick={() => navigate("/login")}
          >
            login here
          </b>
        </span>
      </Card>
    </div>
  );
};

export default Signup;
