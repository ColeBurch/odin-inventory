import React from "react";
import { Form, Field } from "@progress/kendo-react-form";

const textBoxAppearance: string =
  "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 mb-4 text-center";

const CategoryAddForm = () => {
  const handleSubmit = (data: any, event: any) => {
    console.log(data);
    event.preventDefault();
  };

  const Input = (fieldProps: any) => {
    const {
      fieldType,
      label,
      value,
      visited,
      valid,
      onChange,
      onBlur,
      onFocus,
      validationMessage,
    } = fieldProps;
    const invalid = !valid && visited;
    return (
      <div
        onBlur={onBlur}
        onFocus={onFocus}
        className="flex flex-col items-center justify-center mb-2 mx-auto w-full text-red-600"
      >
        <label className="text-center block text-gray-700 text-xl font-bold mb-2">
          {label}
          <input
            type={fieldType}
            className={
              invalid
                ? "invalid border-red-600 border" + textBoxAppearance
                : "" + textBoxAppearance
            }
            value={value}
            onChange={onChange}
          />
        </label>
        {invalid && <div className="required">{validationMessage}</div>}
      </div>
    );
  };

  const requiredValidator = (value: any) => {
    return value ? "" : "This field is required";
  };

  return (
    <div className="w-full bg-white mt-16 min-h-full">
      <Form
        onSubmit={handleSubmit}
        initialValues={{}}
        render={(formRenderProps) => (
          <form
            onSubmit={formRenderProps.onSubmit}
            className="flex flex-col items-center justify-center bg-gray-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-auto w-72 lg:w-1/3"
          >
            <h1 className="text-3xl font-bold mb-4">Add Category</h1>
            <Field
              name="name"
              component={Input}
              label="Category Name:"
              validator={[requiredValidator]}
            />
            <Field
              name="description"
              component={Input}
              label="Description:"
              validator={[requiredValidator]}
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
