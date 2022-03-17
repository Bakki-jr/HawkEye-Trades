import React from "react";
import { render, screen } from "@testing-library/react";
import PageNotFound from "../page-not-found.component";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);
let store = mockStore({
  user: { uid: "1234" },
});
const history = createMemoryHistory();
const component = (
  <Provider store={store}>
    <Router history={history}>
      <PageNotFound />
    </Router>
  </Provider>
);

describe("404 - Page Not Found", () => {
  test("check error code", () => {
    const { getByTestId } = render(component);
    expect(getByTestId("error-code").textContent).toBe("404");
  });

  test("is image Exists", () => {
    const { getByTestId } = render(component);
    console.log(getByTestId("error-image"));
  });
});
