import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../files/pages/HomePage";

test("renders most popular heading", () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/most popular/i);
  expect(linkElement).toBeInTheDocument();
});
