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
            const sortedInstances = res.data.sort((a: any, b: any) => {
              return (
                a.color.localeCompare(b.color) || a.size.localeCompare(b.size)
              );
            });
            setProductInstances(sortedInstances);
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
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Color
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Size
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Quantity
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {productInstances.map((productInstance) => (
              <tr className="hover:bg-gray-50">
                <th className="px-6 py-4 font-normal text-gray-900">
                  {productInstance.color}
                </th>
                <td className="px-6 py-4">{productInstance.size}</td>
                <td className="px-6 py-4">{productInstance.quantity}</td>
                <td className="px-6 py-4">
                  <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200">
                    Edit
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetailPage;
