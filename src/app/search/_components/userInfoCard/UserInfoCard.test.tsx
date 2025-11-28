import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserInfoCard } from "./UserInfoCard";
import { GitHubUser } from "@/lib/services/types";

const mockUser: GitHubUser = {
  id: 1,
  login: "testuser",
  name: "Test User",
  avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
  html_url: "https://github.com/testuser",
  node_id: "MDQ6VXNlcjE=",
  url: "https://api.github.com/users/testuser",
  type: "User",
};

describe("UserInfo", () => {
  it("should render user information", () => {
    const onClick = vi.fn();
    render(
      <UserInfoCard user={mockUser} isExpanded={false} onClick={onClick} />
    );

    expect(screen.getByText("Test User")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "testuser" })).toBeInTheDocument();
  });

  it("should call onClick when user card is clicked", () => {
    const onClick = vi.fn();
    render(
      <UserInfoCard user={mockUser} isExpanded={false} onClick={onClick} />
    );

    const card = screen.getByText("Test User").closest("div");
    fireEvent.click(card!);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should display login when name is not available", () => {
    const userWithoutName = { ...mockUser, name: undefined };
    const onClick = vi.fn();
    render(
      <UserInfoCard
        user={userWithoutName}
        isExpanded={false}
        onClick={onClick}
      />
    );

    expect(screen.getByText("testuser")).toBeInTheDocument();
  });
});
