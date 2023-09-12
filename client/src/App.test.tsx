import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Simple React Typescript Tailwind Sample", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Simple React Typescript Tailwind Sample/i
  );
  expect(linkElement).toBeInTheDocument();
});
