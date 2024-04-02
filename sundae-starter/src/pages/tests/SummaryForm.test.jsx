import { render, screen } from "@testing-library/react";
import SummaryForm from "../summary/SummaryForm.jsx";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(confirmButton).toBeDisabled();
});

test("Checkbox disables button on first click and enables on second click", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  //fireEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  //fireEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
});

test("popover responds to hover", async () => {
  const user = userEvent.setup();

  render(<SummaryForm />);
  //popover starts out hidden
  const nullPopOver = screen.queryByText(
    /no icecream will actually be delivered/i
  );
  expect(nullPopOver).not.toBeInTheDocument();

  //popover appears on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i);
  await user.hover(termsAndConditions);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  //popover dissapears when we mouse out
  await user.unhover(termsAndConditions);
  expect(popover).not.toBeInTheDocument();
});
