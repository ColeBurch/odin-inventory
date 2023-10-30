import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

type InventoryType = {
  _id: string;
  name: string;
  price: number;
  category: string;
  summary: string;
  __v: number;
}[];

const CategoryDetail = () => {
  const [inventory, setInventory] = React.useState<InventoryType>([]);
  const { id } = useParams();

  React.useEffect(() => {
    const getInventory = () => {
      axios
        .get("http://localhost:3000/api/categories/" + id)
        .then((res) => {
          if (res.data) {
            setInventory(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getInventory();
  }, [id]);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Welcome to your inventory!
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {inventory.map((product) => (
            <div key={product._id} className="relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <img
                  alt={"Placeholder"}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={"/products/" + product._id}>
                      <span aria-hidden="true" className="absolute inset-10" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.summary}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
