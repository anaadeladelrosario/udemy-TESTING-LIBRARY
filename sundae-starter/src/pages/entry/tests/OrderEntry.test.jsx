//import { render, screen } from "@testing-library/react";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";
//import { logRoles } from "@testing-library/react";

test("handles for error for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );
  render(<OrderEntry />);

  const alerts = await screen.findAllByText(
    "An unexpected error ocurred. Please try again later."
  );
  //const alerts = await screen.findAllByRole("alert")
  //   const alerts = await screen.findAllByRole("alert", {
  //     name: "An unexpected error ocurred. Please try again later.",  });
  //logRoles(container);

  expect(alerts).toHaveLength(2);
});
