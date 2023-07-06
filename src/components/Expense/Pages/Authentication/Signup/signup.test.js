import { render, fireEvent, waitFor, screen } from "@testing-library/react";

describe("SignUp component", () => {
  test("renders sign up form correctly", () => {
    render(<SignUp />);

    expect(screen.getByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByText("Sign Up")).toBeInTheDocument();
  });

  test("shows error message for incorrect password", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password2" },
    });
    fireEvent.click(screen.getByText("Sign Up"));

    await waitFor(() =>
      expect(screen.getByText("Incorrect Password")).toBeInTheDocument()
    );
  });

  test("shows loading indicator during form submission", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Sign Up"));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("navigates to login page after successful sign up", async () => {
    render(<SignUp />);
    fireEvent.change(screen.getByPlaceholderText("E-mail"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText("Sign Up"));
    await waitFor(() =>
      expect(
        screen.getByText("Already Have an account ? Login")
      ).toBeInTheDocument()
    );
  });
});
