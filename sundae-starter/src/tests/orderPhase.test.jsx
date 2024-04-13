import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";

test("Order phases for paths", async () => {
  const user = userEvent.setup();
  //render app
  //Dont need to wrap in provider; already wrapped!

  //destructure "unmount" from return value to use at the end of the test
  const { unmount } = render(<App />);

  //add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckBox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
});
