import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const VITE_API = import.meta.env.VITE_API;

const Product = () => {
  const [data, setData] = useState({});
  const { productId } = useParams();
  useEffect(() => {
    axios
      .get(`${VITE_API}/api/auction/${productId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [productId]);
  console.log(data);

  return <div>data</div>;
};

export default Product;
