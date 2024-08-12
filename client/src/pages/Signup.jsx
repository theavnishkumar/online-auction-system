import { Button, Card, Checkbox, Form, Input } from "antd";
import { FiHome } from "react-icons/fi";
import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../store/auth/authSlice";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, errorData } = useSelector((state) => state.auth);
  const [error, setError] = useState(errorData);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === ""
    ) {
      return setError("All fields are required");
    }
    try {
      const resultAction = await dispatch(signup(formData));
      if (signup.fulfilled.match(resultAction)) {
        navigate("/auction");
      } else {
        if (resultAction.payload) {
          setError(resultAction.payload);
        } else {
          setError("Signup failed. Please try again.");
        }
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/auction");
    }
  }, [user, navigate]);

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
