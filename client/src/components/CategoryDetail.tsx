import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

type InventoryType = {
  _id: string;
  name: string;
  price: number;
  category: string;
  summary: string;
  __v: number;
}[];

type CategoryType = {
  _id: string;
  name: string;
  description: string;
  __v: number;
}[];

const CategoryDetail = () => {
  const [inventory, setInventory] = React.useState<InventoryType>([]);
  const [categories, setCategories] = React.useState<CategoryType>([]);
  const { id } = useParams();
  //edit cateogry form states
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [editCategoryForm, setEditCategoryForm] =
    React.useState<boolean>(false);
  const [editCategoryRequestStatusBox, setEditCategoryRequestStatusBox] =
    React.useState<boolean>(false);
  const [editCategoryRequestCode, setEditCategoryRequestCode] =
    React.useState<boolean>(false);
  const [editCategoryRequestMessage, setEditCategoryRequestMessage] =
    React.useState<string>("");
  //add product form states
  const [productName, setProductName] = React.useState<string>("");
  const [productPrice, setProductPrice] = React.useState<number>(0);
  const [productSummary, setProductSummary] = React.useState<string>("");
  const [addProductForm, setAddProductForm] = React.useState<boolean>(false);
  const [addProductRequestStatusBox, setAddProductRequestStatusBox] =
    React.useState<boolean>(false);
  const [addProductRequestCode, setAddProductRequestCode] =
    React.useState<boolean>(false);
  const [addProductRequestMessage, setAddProductRequestMessage] =
    React.useState<string>("");

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

    const getCategories = () => {
      axios
        .get("http://localhost:3000/api/categories")
        .then((res) => {
          if (res.data) {
            setCategories(res.data);
            setName(
              res.data.filter((category: any) => category._id === id)[0]?.name
            );
            setDescription(
              res.data.filter((category: any) => category._id === id)[0]
                ?.description
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getInventory();
    getCategories();
  }, [id]);

  const editCategoryRequestStatusBoxOnClosePageReload = () => {
    setEditCategoryRequestStatusBox(false);
    window.location.reload();
  };

  const addProductRequestStatusBoxOnClosePageReload = () => {
    setAddProductRequestStatusBox(false);
    window.location.reload();
  };

  const handleCategoryEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { name, description, id };
    axios
      .post("http://localhost:3000/api/categories/update", data)
      .then((res) => {
        setEditCategoryRequestCode(true);
        setEditCategoryRequestMessage(res.data.name + " edited successfully!");
        setEditCategoryRequestStatusBox(true);
      })
      .catch((err) => {
        setEditCategoryRequestCode(false);
        setEditCategoryRequestMessage(err.response.data.errors[0].msg);
        setEditCategoryRequestStatusBox(true);
      });
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const addProductFormData = {
      name: productName,
      price: productPrice,
      category: id,
      summary: productSummary,
    };
    axios
      .post("http://localhost:3000/api/products", addProductFormData)
      .then((res) => {
        setAddProductRequestCode(true);
        setAddProductRequestMessage(res.data.name + " added successfully!");
        setAddProductRequestStatusBox(true);
      })
      .catch((err) => {
        setAddProductRequestCode(false);
        setAddProductRequestMessage(err.response.data.errors[0].msg);
        setAddProductRequestStatusBox(true);
      });
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6">
          <button
            onClick={() => setEditCategoryForm(true)}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-l hover:bg-gray-50"
          >
            <PencilSquareIcon className="h-6 w-auto" />
          </button>
          <div className="flex-auto">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {categories.filter((category) => category._id === id)[0]?.name}
            </h2>
            <h3 className="text-l tracking-tight text-gray-700">
              {
                categories.filter((category) => category._id === id)[0]
                  ?.description
              }
            </h3>
          </div>
        </div>

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
          <div className="relative">
            <button
              onClick={() => setAddProductForm(true)}
              className="flex relative items-center justify-center aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-transparent outline-l outline-gray-500 outline z-10 lg:aspect-none lg:h-80"
            >
              <PlusCircleIcon className="h-1/3 w-1/3 object-cover object-center lg:h-1/2 lg:w-1/2" />
            </button>
            <div className="mt-4 flex justify-center">
              <h3 className="text-l text-gray-700">Add a new product</h3>
            </div>
          </div>
        </div>
      </div>
      {/*Edit category form*/}
      <Transition.Root show={editCategoryForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setEditCategoryForm}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form
                    onSubmit={handleCategoryEdit}
                    className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mx-auto w-full h-full"
                  >
                    <h1 className="text-3xl font-bold mb-4">Edit Category</h1>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Category Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <label
                      htmlFor="description"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Description:
                    </label>
                    <input
                      type="text"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <button
                      type={"submit"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*Edit category request status box*/}
      <Transition.Root show={editCategoryRequestStatusBox} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={editCategoryRequestStatusBoxOnClosePageReload}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {editCategoryRequestCode ? (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckCircleIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {editCategoryRequestCode ? "Success!" : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {editCategoryRequestMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() =>
                        editCategoryRequestStatusBoxOnClosePageReload()
                      }
                    >
                      {editCategoryRequestCode ? "Close" : "Try Again"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*Add product form*/}
      <Transition.Root show={addProductForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setAddProductForm}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form
                    onSubmit={handleAddProduct}
                    className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mx-auto w-full h-full"
                  >
                    <h1 className="text-3xl font-bold mb-4">Add Product</h1>
                    <label
                      htmlFor="productName"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Product Name:
                    </label>
                    <input
                      type="text"
                      name="productName"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <label
                      htmlFor="productPrice"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Price:
                    </label>
                    <input
                      type="number"
                      name="productPrice"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.valueAsNumber)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <label
                      htmlFor="Summary"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Summary:
                    </label>
                    <input
                      type="text"
                      name="Summary"
                      value={productSummary}
                      onChange={(e) => setProductSummary(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <button
                      type={"submit"}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                      Submit
                    </button>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*Add product request status box*/}
      <Transition.Root show={addProductRequestStatusBox} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={addProductRequestStatusBoxOnClosePageReload}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      {addProductRequestCode ? (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <CheckCircleIcon
                            className="h-6 w-6 text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                          <ExclamationTriangleIcon
                            className="h-6 w-6 text-red-600"
                            aria-hidden="true"
                          />
                        </div>
                      )}

                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          {addProductRequestCode ? "Success!" : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {addProductRequestMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() =>
                        addProductRequestStatusBoxOnClosePageReload()
                      }
                    >
                      {addProductRequestCode ? "Close" : "Try Again"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default CategoryDetail;
