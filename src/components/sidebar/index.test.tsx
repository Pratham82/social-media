import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "redux/store";
import Sidebar from ".";

beforeEach(() => {
  render(
    <Provider store={store}>
      <Sidebar />
    </Provider>,
  );
});

describe("Sidebar tests", () => {
  it("Sidebar items present in the sidebar", () => {
    screen.getByTitle(/Home/);
    screen.getByTitle(/Explore/);
    screen.getByTitle(/Bookmarks/);
    screen.getByTitle(/Notifications/);
    screen.getByTitle(/Profile/);
  });
});
