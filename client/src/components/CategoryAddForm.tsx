import React from "react";
import axios from "axios";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const CategoryAddForm = () => {
  const [name, setName] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [requestStatusBox, setRequestStatusBox] =
    React.useState<boolean>(false);
  const [requestCode, setRequestCode] = React.useState<boolean>(false);
  const [requestMessage, setRequestMessage] = React.useState<string>("");

  const handleSubmit = (event: any) => {
    const data = { name, description };
    axios
      .post("http://localhost:3000/api/categories", data, {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        setRequestCode(true);
        setRequestMessage(res.data.name + " added successfully!");
        setRequestStatusBox(true);
      })
      .catch((err) => {
        setRequestCode(false);
        setRequestMessage(err.response.data.errors[0].msg);
        setRequestStatusBox(true);
      });
    event.preventDefault();
  };

  const onClosePageReload = () => {
    setRequestStatusBox(false);
    window.location.reload();
  };

  return (
    <div className="w-full bg-white mt-16 min-h-full h-screen">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto w-72 lg:w-1/3"
      >
        <h1 className="text-3xl font-bold mb-4">Add Category</h1>
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
      <Transition.Root show={requestStatusBox} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onClosePageReload}>
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
                      {requestCode ? (
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
                          {requestCode ? "Success!" : "Error!"}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            {requestMessage}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                      onClick={() => onClosePageReload()}
                    >
                      {requestCode ? "Close" : "Try Again"}
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

export default CategoryAddForm;
