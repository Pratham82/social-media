import { render, screen } from "@testing-library/react";
import Sidebar from ".";

beforeEach(() => {
  render(<Sidebar />);
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
