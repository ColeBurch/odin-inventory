import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  PencilSquareIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

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

  // Edit Product form states
  const [productName, setProductName] = React.useState<string>("");
  const [productPrice, setProductPrice] = React.useState<number>(0);
  const [productSummary, setProductSummary] = React.useState<string>("");
  const [editProductForm, setEditProductForm] = React.useState<boolean>(false);
  const [editProductRequestStatusBox, setEditProductRequestStatusBox] =
    React.useState<boolean>(false);
  const [editProductRequestCode, setEditProductRequestCode] =
    React.useState<boolean>(false);
  const [editProductRequestMessage, setEditProductRequestMessage] =
    React.useState<string>("");

  // delete product instance states
  const [deleteProductInstanceModal, setDeleteProductInstanceModal] =
    React.useState(false);
  const [deleteProductInstanceID, setDeleteProductInstanceID] =
    React.useState("");
  const [
    deleteProductInstanceRequestStatusBox,
    setDeleteProductInstanceRequestStatusBox,
  ] = React.useState<boolean>(false);
  const [
    deleteProductInstanceRequestCode,
    setDeleteProductInstanceRequestCode,
  ] = React.useState<boolean>(false);
  const [
    deleteProductInstanceRequestMessage,
    setDeleteProductInstanceRequestMessage,
  ] = React.useState<string>("");

  React.useEffect(() => {
    const getProductDetails = () => {
      axios
        .get("http://localhost:3000/api/products/" + id)
        .then((res) => {
          if (res.data) {
            setProductDetails(res.data);
            setProductName(res.data.name);
            setProductPrice(res.data.price);
            setProductSummary(res.data.summary);
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

  const deleteProductInstanceFormSet = (id: any) => () => {
    setDeleteProductInstanceID(id);
    setDeleteProductInstanceModal(true);
  };

  const deleteProductInstance = () => {
    console.log(deleteProductInstanceID);
    const data = { _id: deleteProductInstanceID };
    axios
      .post("http://localhost:3000/api/productinstances/delete", data)
      .then((res) => {
        if (res.data) {
          setDeleteProductInstanceRequestCode(true);
          setDeleteProductInstanceRequestMessage(res.data.message);
          setDeleteProductInstanceRequestStatusBox(true);
        }
      })
      .catch((err) => {
        setDeleteProductInstanceRequestCode(false);
        setDeleteProductInstanceRequestMessage(err.response.data.errors[0].msg);
        setDeleteProductInstanceRequestStatusBox(true);
      });
  };

  const deleteProductInstanceRequestStatusBoxOnClosePageReload = () => {
    setDeleteProductInstanceRequestStatusBox(false);
    window.location.reload();
  };

  const handleProductEdit = (e: any) => {
    e.preventDefault();
    const data = {
      id: id,
      name: productName,
      price: productPrice,
      category: productDetails.category,
      summary: productSummary,
    };
    axios
      .post("http://localhost:3000/api/products/update", data)
      .then((res) => {
        if (res.data) {
          setEditProductRequestCode(true);
          setEditProductRequestMessage(
            res.data.name + " updated successfully!"
          );
          setEditProductRequestStatusBox(true);
        }
      })
      .catch((err) => {
        setEditProductRequestCode(false);
        setEditProductRequestMessage(err.response.data.errors[0].msg);
        setEditProductRequestStatusBox(true);
      });
  };

  const editProductRequestStatusBoxOnClosePageReload = () => {
    setEditProductRequestStatusBox(false);
    window.location.reload();
  };

  return (
    <div className="bg-white">
      <div className="mx-auto px-2 pt-8 sm:pt-16">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6">
          <button
            onClick={() => setEditProductForm(true)}
            className="flex h-9 w-9 flex-none items-center justify-center rounded-l hover:bg-gray-50"
          >
            <PencilSquareIcon className="h-6 w-auto" />
          </button>
          <div className="flex-auto">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {productDetails.name}
            </h2>
            <h3 className="text-l tracking-tight text-gray-700">
              {productDetails.summary}
            </h3>
          </div>
        </div>
      </div>
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
                <td className="px-6 py-4 flex gap-1 flex-wrap">
                  <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200">
                    Edit
                  </button>
                  <button
                    onClick={deleteProductInstanceFormSet(productInstance._id)}
                    className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200"
                  >
                    Delete
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200">
                    Add
                  </button>
                  <button className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200">
                    Subtract
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/*delete product instance modal*/}
      <Transition.Root show={deleteProductInstanceModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setDeleteProductInstanceModal}
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
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Remove Product Instance
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this product
                            instance?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => deleteProductInstance()}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setDeleteProductInstanceModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*delete product instance request box*/}
      <Transition.Root
        show={deleteProductInstanceRequestStatusBox}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-10"
          onClose={deleteProductInstanceRequestStatusBoxOnClosePageReload}
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
                      {deleteProductInstanceRequestCode ? (
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
                          {deleteProductInstanceRequestCode
                            ? "Success!"
                            : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {deleteProductInstanceRequestMessage}
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
                        deleteProductInstanceRequestStatusBoxOnClosePageReload()
                      }
                    >
                      {deleteProductInstanceRequestCode ? "Close" : "Try Again"}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
      {/*edit product form*/}
      <Transition.Root show={editProductForm} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setEditProductForm}>
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
                    onSubmit={handleProductEdit}
                    className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mx-auto w-full h-full"
                  >
                    <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Product Name:
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      required
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center"
                    />
                    <label
                      htmlFor="Price"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Product Price:
                    </label>
                    <input
                      type="number"
                      name="Price"
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
                      name="description"
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
      {/*edit product request box*/}
      <Transition.Root show={editProductRequestStatusBox} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={editProductRequestStatusBoxOnClosePageReload}
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
                      {editProductRequestCode ? (
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
                          {editProductRequestCode ? "Success!" : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {editProductRequestMessage}
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
                        editProductRequestStatusBoxOnClosePageReload()
                      }
                    >
                      {editProductRequestCode ? "Close" : "Try Again"}
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

export default ProductDetailPage;
