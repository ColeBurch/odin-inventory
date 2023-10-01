import React from "react";
import { Form, Field } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";

const CategoryAddForm = () => {
  const handleSubmit = (data: any, event: any) => {
    console.log(data);
    event.preventDefault();
  };

  return (
    <div className="h-screen bg-white mt-16">
      <Form
        onSubmit={handleSubmit}
        initialValues={{}}
        render={(formRenderProps) => (
          <form
            onSubmit={formRenderProps.onSubmit}
            className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3 mx-auto"
          >
            <h1 className="text-3xl font-bold mb-4">Add Category</h1>
            <h2 className="text-xl font-bold">Category Name:</h2>
            <Field
              name="name"
              component={Input}
              className="mt-4 mb-4 text-center"
            />
            <h2 className="text-xl font-bold">Description:</h2>
            <Field
              name="description"
              component={Input}
              className="mt-4 mb-4 text-center"
            />
            <button
              type={"submit"}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Submit
            </button>
          </form>
        )}
      ></Form>
    </div>
  );
};

export default CategoryAddForm;
