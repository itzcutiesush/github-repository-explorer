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
    loading: false,
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

  it("should trigger search when input has more than 3 characters", async () => {
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

  it("should not trigger search when input has 3 or fewer characters", () => {
    const onChangeHandler = vi.fn();
    render(<SearchBar {...defaultProps} onChangeHandler={onChangeHandler} />);

    const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "jo" } });
    fireEvent.click(button);

    expect(onChangeHandler).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it("should show loading state", () => {
    render(<SearchBar {...defaultProps} loading={true} />);

    const button = screen.getByRole("button", { name: /searching/i });
    const input = screen.getByPlaceholderText(PLACEHOLDER_TEXT);

    expect(button).toBeDisabled();
    expect(input).toBeDisabled();
  });
});
