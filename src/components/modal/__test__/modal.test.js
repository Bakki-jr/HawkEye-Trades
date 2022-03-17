import React from "react";
import { findByTestId, render, screen, within } from "@testing-library/react";
import Modal from "../modal.component";

const setModalOpen = "";
const modal = (
  <Modal
    setOpenModal={setModalOpen}
    modalProps={{
      modalProps: {
        title: "react",
        info: "ReactJS is an open-source JavaScript library that is used for building user interfaces specifically for single-page applications. It's used for handling the view layer for web and mobile apps. React also allows us to create reusable UI components.",
      },
    }}
  />
);
describe("Modal content check", () => {
  test("check if Modal contains title element", async () => {
    const { getByTestId } = render(modal);
    expect(getByTestId("modal-title")).toBeTruthy();
  });

  test("check if Modal contains Close Button", () => {
    const { getByText } = render(modal);
    expect(getByText("Close")).toBeDefined();
  });
});
