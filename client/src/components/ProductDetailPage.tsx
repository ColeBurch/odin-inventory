import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type ProductDetailType = {
  _id?: string;
  name?: string;
  price?: number;
  category?: string;
  summary?: string;
  __v?: number;
};

type ProductInstanceType = {
  __v?: number;
  _id?: string;
  color?: string;
  product?: string;
  quantity?: number;
  size?: string;
}[];

const ProductDetailPage = () => {
  const { id } = useParams();

  const [productDetails, setProductDetails] = React.useState<ProductDetailType>(
    {}
  );

  const [productInstances, setProductInstances] =
    React.useState<ProductInstanceType>([]);

  React.useEffect(() => {
    const getProductDetails = () => {
      axios
        .get("http://localhost:3000/api/products/" + id)
        .then((res) => {
          if (res.data) {
            setProductDetails(res.data);
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const getProductInstances = () => {
      axios
        .get("http://localhost:3000/api/productinstances/" + id)
        .then((res) => {
          if (res.data) {
            setProductInstances(res.data);
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProductDetails();
    getProductInstances();
  }, [id]);

  return (
    <div>
      <div>{productDetails.name}</div>
      <div>
        {productInstances.map((productInstance) => (
          <div key={productInstance._id} className="flex gap-1">
            <div>{productInstance.color}</div>
            <div>{productInstance.size}</div>
            <div>{productInstance.quantity}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetailPage;
