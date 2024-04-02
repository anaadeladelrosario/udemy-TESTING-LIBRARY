import "@testing-library/jest-dom";

import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./mocks/server";

//Establishing API mocking before all tests runs
beforeAll(() => {
  server.listen();
});

//Reset any request handlers that we may add during the tests
afterEach(() => {
  server.resetHandlers();
});

//Clean up after all tests are finished
afterAll(() => {
  server.close();
});
