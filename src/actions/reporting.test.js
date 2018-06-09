import { notifyReporter } from "./reporting";

describe("notifyReporter", () => {
  it("passes error to error reporter", () => {
    const mockReporter = { notify: jest.fn() };
    const error = Error("something went wrong");

    notifyReporter(error)(() => {}, () => {}, mockReporter);

    expect(mockReporter.notify).toHaveBeenCalledWith(error);
  });
});
