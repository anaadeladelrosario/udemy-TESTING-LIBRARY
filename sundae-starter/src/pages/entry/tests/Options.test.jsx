// import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  //find images for scoops
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  //confirm alt text of images
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("Displays image for each topping option from server", async () => {
  //Mock Service Worker will return three toppings from server
  render(<Options optionType="toppings" />);

  //find images, expect 3 based on what msw returns
  const images = await screen.findAllByRole("img", { name: /topping$/i });
  expect(images).toHaveLength(3);

  //check the actual alt text for the images
  //@ts-ignore
  const imageTitles = images.map((img) => img.alt);
  expect(imageTitles).toEqual([
    "Cherries topping",
    "M&Ms topping",
    "Hot fudge topping",
  ]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // wait for the vanillaInput to appear after the server call
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // find the scoops subtotal, which starts out at 0
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");

  // clear the input
  await user.clear(vanillaInput);

  // .type() will type one character at a time
  await user.type(vanillaInput, "2.5");

  // make sure scoops subtotal hasn't updated
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // do the same test for "100"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // do the same test for "-1"
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
