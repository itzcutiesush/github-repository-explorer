import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SearchBar } from "./SearchBar";

// Mock Next.js router hooks
const mockPush = vi.fn();
const mockSearchParams = new URLSearchParams();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => mockSearchParams,
}));

const PLACEHOLDER_TEXT = "Enter a username to search";

describe("SearchBar", () => {
  const defaultProps = {
    initialSearchTerm: "",
    placeholderText: PLACEHOLDER_TEXT,
    onChangeHandler: vi.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render input and button", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    const button = screen.getByRole("button", { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("should update input value on change", () => {
    render(<SearchBar {...defaultProps} />);

    const input = screen.getByPlaceholderText(
      PLACEHOLDER_TEXT
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test" } });

    expect(input.value).toBe("test");
  });

  it("should trigger search when input has more than 1 character", async () => {
    const onChangeHandler = vi.fn();
    render(<SearchBar {...defaultProps} onChangeHandler={onChangeHandler} />);

    const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "john" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(onChangeHandler).toHaveBeenCalledWith("john");
      expect(mockPush).toHaveBeenCalledWith("/search?q=john");
    });
  });

  it("should show loading state", () => {
    render(<SearchBar {...defaultProps} isLoading={true} />);

    const button = screen.getByRole("button", { name: /searching/i });
    const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
  });

  it("should trigger search on Enter key press", async () => {
    const onChangeHandler = vi.fn();
    render(<SearchBar {...defaultProps} onChangeHandler={onChangeHandler} />);

    const input = screen.getByPlaceholderText("Enter a username to search");

    fireEvent.change(input, { target: { value: "john" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    await waitFor(() => {
      expect(onChangeHandler).toHaveBeenCalledWith("john");
      expect(mockPush).toHaveBeenCalledWith("/search?q=john");
    });
  });
});
