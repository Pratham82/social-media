import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Profile from "./index";

beforeEach(() => {
  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );
});

describe("Home page tests", () => {
  it("Check if title exists", () => {
    screen.getByTitle(/Home/);
  });
});
