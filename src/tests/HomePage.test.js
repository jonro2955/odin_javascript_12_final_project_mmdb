import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import HomePage from "../files/pages/HomePage";

describe("renders all headings", () => {
  test("renders most popular heading", () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/most popular/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders most popular heading", () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/coming soon/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders most popular heading", () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/now playing/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders most popular heading", () => {
    render(<HomePage />);
    const linkElement = screen.getByText(/top rated/i);
    expect(linkElement).toBeInTheDocument();
  });
});

