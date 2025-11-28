import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { UserRepositories } from "./UserRepositories";
import { GitHubRepository } from "@/lib/services/types";

const mockRepositories: GitHubRepository[] = [
  {
    id: 1,
    name: "test-repo",
    html_url: "https://github.com/user/test-repo",
    description: "A test repository",
    stargazers_count: 10,
    forks_count: 5,
  } as GitHubRepository,
  {
    id: 2,
    name: "another-repo",
    html_url: "https://github.com/user/another-repo",
    description: null,
    stargazers_count: 20,
    forks_count: 3,
  } as GitHubRepository,
];

describe("UserRepository", () => {
  it("should show loading state", () => {
    render(
      <UserRepositories
        repositories={[]}
        isInitialLoading={true}
        isLoadingMore={false}
        hasMore={false}
        onLoadMore={vi.fn()}
      />
    );

    expect(screen.getByText("Loading repositories...")).toBeInTheDocument();
  });

  it("should show empty state when no repositories", () => {
    render(
      <UserRepositories
        repositories={[]}
        isInitialLoading={false}
        isLoadingMore={false}
        hasMore={false}
        onLoadMore={vi.fn()}
      />
    );

    expect(screen.getByText("No repositories found")).toBeInTheDocument();
  });

  it("should render repositories list", () => {
    render(
      <UserRepositories
        repositories={mockRepositories}
        isInitialLoading={false}
        isLoadingMore={false}
        hasMore={false}
        onLoadMore={vi.fn()}
      />
    );

    expect(screen.getByText("test-repo")).toBeInTheDocument();
    expect(screen.getByText("another-repo")).toBeInTheDocument();
    expect(screen.getByText("A test repository")).toBeInTheDocument();
  });

  it("should show Load More button when hasMore is true", () => {
    render(
      <UserRepositories
        repositories={mockRepositories}
        isInitialLoading={false}
        isLoadingMore={false}
        hasMore={true}
        onLoadMore={vi.fn()}
      />
    );

    expect(
      screen.getByRole("button", { name: /load more/i })
    ).toBeInTheDocument();
  });

  it("should call onLoadMore when Load More button is clicked", () => {
    const onLoadMore = vi.fn();
    render(
      <UserRepositories
        repositories={mockRepositories}
        isInitialLoading={false}
        isLoadingMore={false}
        hasMore={true}
        onLoadMore={onLoadMore}
      />
    );

    const button = screen.getByRole("button", { name: /load more/i });
    fireEvent.click(button);

    expect(onLoadMore).toHaveBeenCalledTimes(1);
  });
});
