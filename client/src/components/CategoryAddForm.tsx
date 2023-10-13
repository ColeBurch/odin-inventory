import React from "react";
import axios from "axios";

const CategoryAddForm = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleSubmit = (event: any) => {
    const data = { name, description };
    axios
      .post("http://localhost:3000/api/categories", data)
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    event.preventDefault();
  };

  return (
    <div className="w-full bg-white mt-16 min-h-full">
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
    </div>
  );
};

export default CategoryAddForm;
