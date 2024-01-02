import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import storage from "../firebase.js";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

type InventoryType = {
  _id: string;
  name: string;
  price: number;
  category: string;
  summary: string;
  image: string;
  imageRef: string;
  __v: number;
}[];

type CategoryType = {
  _id: string;
  name: string;
  description: string;
  image: string;
  imageRef: string;
  __v: number;
}[];

const CategoryDetail = () => {
  const [inventory, setInventory] = React.useState<InventoryType>([]);
  const [categories, setCategories] = React.useState<CategoryType>([]);
  const { id } = useParams();
  //edit cateogry form states
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [imageRef, setImageRef] = React.useState<string>("");
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
  //delete product form states
  const [deleteProductForm, setDeleteProductForm] =
    React.useState<boolean>(false);
  const [deleteProductSelected, setDeleteProductSelected] =
    React.useState<any>("");
  const [deleteProductRequestStatusBox, setDeleteProductRequestStatusBox] =
    React.useState<boolean>(false);
  const [deleteProductRequestCode, setDeleteProductRequestCode] =
    React.useState<boolean>(false);
  const [deleteProductRequestMessage, setDeleteProductRequestMessage] =
    React.useState<string>("");

  React.useEffect(() => {
    const getInventory = () => {
      axios
        .get("http://localhost:3000/api/categories/" + id, {
          headers: { Authorization: localStorage.getItem("token") },
        })
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
        .get("http://localhost:3000/api/categories", {
          headers: { Authorization: localStorage.getItem("token") },
        })
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
            setImage(
              res.data.filter((category: any) => category._id === id)[0]?.image
            );
            setImageRef(
              res.data.filter((category: any) => category._id === id)[0]
                ?.imageRef
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

  const deleteProductRequestStatusBoxOnClosePageReload = () => {
    setDeleteProductRequestStatusBox(false);
    window.location.reload();
  };

  const handleCategoryEdit = (event: any) => {
    event.preventDefault();
    const categoryImageEdit = event.target.categoryImage.files[0];
    if (!categoryImageEdit) {
      const data = { name, description, image, imageRef, id };
      axios
        .post("http://localhost:3000/api/categories/update", data, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          setEditCategoryRequestCode(true);
          setEditCategoryRequestMessage(
            res.data.name + " edited successfully!"
          );
          setEditCategoryRequestStatusBox(true);
        })
        .catch((err) => {
          setEditCategoryRequestCode(false);
          setEditCategoryRequestMessage(err.response.data.errors[0].msg);
          setEditCategoryRequestStatusBox(true);
        });
    } else {
      const categoryImageOriginal = ref(storage, imageRef);
      deleteObject(categoryImageOriginal)
        .then(() => {
          const storageRef = ref(storage, categoryImageEdit.name);

          const uploadTask = uploadBytesResumable(
            storageRef,
            categoryImageEdit
          );

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log("Upload is " + progress + "% done");
            },
            (error) => {
              console.log(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                const data = {
                  name,
                  description,
                  image: downloadURL,
                  imageRef: uploadTask.snapshot.ref.fullPath,
                  id: id,
                };
                axios
                  .post("http://localhost:3000/api/categories/update", data, {
                    headers: { Authorization: localStorage.getItem("token") },
                  })
                  .then((res) => {
                    setEditCategoryRequestCode(true);
                    setEditCategoryRequestMessage(
                      res.data.name + " added successfully!"
                    );
                    setEditCategoryRequestStatusBox(true);
                  })
                  .catch((err) => {
                    setEditCategoryRequestCode(false);
                    setEditCategoryRequestMessage(
                      err.response.data.errors[0].msg
                    );
                    setEditCategoryRequestStatusBox(true);
                  });
              });
            }
          );
        })
        .catch((error) => {
          setEditCategoryRequestCode(false);
          setEditCategoryRequestMessage(
            "An Error Occurred While Deleting the Image"
          );
          setEditCategoryRequestStatusBox(true);
        });
    }
  };

  const handleAddProduct = (event: any) => {
    event.preventDefault();

    const productImageFile = event.target.productImage.files[0];

    if (!productImageFile) {
      const addProductFormData = {
        name: productName,
        price: productPrice,
        category: id,
        summary: productSummary,
        image: "",
        imageRef: "",
      };
      axios
        .post("http://localhost:3000/api/products", addProductFormData, {
          headers: { Authorization: localStorage.getItem("token") },
        })
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
    } else {
      const storageRef = ref(storage, productImageFile.name);
      const uploadTask = uploadBytesResumable(storageRef, productImageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const addProductFormData = {
              name: productName,
              price: productPrice,
              category: id,
              summary: productSummary,
              image: downloadURL,
              imageRef: uploadTask.snapshot.ref.fullPath,
            };
            axios
              .post("http://localhost:3000/api/products", addProductFormData, {
                headers: { Authorization: localStorage.getItem("token") },
              })
              .then((res) => {
                setAddProductRequestCode(true);
                setAddProductRequestMessage(
                  res.data.name + " added successfully!"
                );
                setAddProductRequestStatusBox(true);
              })
              .catch((err) => {
                setAddProductRequestCode(false);
                setAddProductRequestMessage(err.response.data.errors[0].msg);
                setAddProductRequestStatusBox(true);
              });
          });
        }
      );
    }
  };

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  const handleDeleteProduct = (event: any) => {
    event.preventDefault();
    const product = deleteProductSelected;
    const data = { _id: product?._id, imageRef: product?.imageRef };
    if (data.imageRef !== "") {
      const productImageRef = ref(storage, product?.imageRef);
      deleteObject(productImageRef)
        .then(() => {})
        .catch((error) => {
          setDeleteProductRequestCode(false);
          setDeleteProductRequestMessage(
            "An Error Occurred While Deleting the Image"
          );
          setDeleteProductRequestStatusBox(true);
        });
      axios
        .post("http://localhost:3000/api/products/delete", data, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          setDeleteProductRequestCode(true);
          setDeleteProductRequestMessage(res.data.message);
          setDeleteProductRequestStatusBox(true);
        })
        .catch((err) => {
          setDeleteProductRequestCode(false);
          setDeleteProductRequestMessage(err.response.data.errors[0].msg);
          setDeleteProductRequestStatusBox(true);
        });
    } else {
      axios
        .post("http://localhost:3000/api/products/delete", data, {
          headers: { Authorization: localStorage.getItem("token") },
        })
        .then((res) => {
          setDeleteProductRequestCode(true);
          setDeleteProductRequestMessage(res.data.message);
          setDeleteProductRequestStatusBox(true);
        })
        .catch((err) => {
          setDeleteProductRequestCode(false);
          setDeleteProductRequestMessage(err.response.data.errors[0].msg);
          setDeleteProductRequestStatusBox(true);
        });
    }
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 justify-between">
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
          <button
            onClick={() => setDeleteProductForm(true)}
            className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md hover:bg-gray-200"
          >
            Remove Product
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {inventory.map((product) => (
            <div key={product._id} className="relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
                <img
                  src={product.image}
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
                    <label
                      htmlFor="categoryImage"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Image:{" "}
                    </label>
                    <input
                      type="file"
                      name="categoryImage"
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
                    <label
                      htmlFor="productImage"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Image:
                    </label>
                    <input
                      type="file"
                      name="productImage"
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
      {/*Delete product form*/}
      <Transition.Root show={deleteProductForm} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={setDeleteProductForm}
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
                    onSubmit={handleDeleteProduct}
                    className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mx-auto w-full h-full"
                  >
                    <h1 className="text-3xl font-bold mb-4">Remove Product</h1>
                    <label
                      htmlFor="name"
                      className="block text-gray-700 text-xl font-bold mb-2"
                    >
                      Product Name:
                    </label>
                    <Listbox
                      value={deleteProductSelected}
                      onChange={setDeleteProductSelected}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative mt-2">
                            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-20 pr-20 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                              <span className="flex items-center">
                                <span className="ml-3 block truncate">
                                  {deleteProductSelected.name}
                                </span>
                              </span>
                              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <ChevronUpDownIcon
                                  className="h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </span>
                            </Listbox.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <Listbox.Options className="relative z-20 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {inventory.map((product) => (
                                  <Listbox.Option
                                    key={product._id}
                                    className={({ active }) =>
                                      classNames(
                                        active
                                          ? "bg-indigo-600 text-white"
                                          : "text-gray-900",
                                        "relative cursor-default select-none py-2 pl-3 pr-9"
                                      )
                                    }
                                    value={product}
                                  >
                                    {({ selected, active }) => (
                                      <>
                                        <div className="flex items-center">
                                          <span
                                            className={classNames(
                                              selected
                                                ? "font-semibold"
                                                : "font-normal",
                                              "ml-3 block truncate"
                                            )}
                                          >
                                            {product.name}
                                          </span>
                                        </div>

                                        {selected ? (
                                          <span
                                            className={classNames(
                                              active
                                                ? "text-white"
                                                : "text-indigo-600",
                                              "absolute inset-y-0 right-0 flex items-center pr-4"
                                            )}
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </>
                                    )}
                                  </Listbox.Option>
                                ))}
                              </Listbox.Options>
                            </Transition>
                          </div>
                        </>
                      )}
                    </Listbox>

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
      {/*Delete product request status box*/}
      <Transition.Root show={deleteProductRequestStatusBox} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={deleteProductRequestStatusBoxOnClosePageReload}
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
                      {deleteProductRequestCode ? (
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
                          {deleteProductRequestCode ? "Success!" : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {deleteProductRequestMessage}
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
                        deleteProductRequestStatusBoxOnClosePageReload()
                      }
                    >
                      {deleteProductRequestCode ? "Close" : "Try Again"}
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
