import { ApiGithubErrorService } from "./api-github-error.service";
import { API_URL, GITHUB_API_BASE_URL } from "./api.constants";
import {
  GitHubApiError,
  GitHubRepository,
  UserSearchParams,
  UserSearchResponse,
} from "./types";

class ApiGithubService {
  async fetchGitHub<T>(url: string): Promise<T> {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      const errorData: GitHubApiError = await response
        .json()
        .catch(() => ({ message: "An unknown error occurred" }));

      throw new ApiGithubErrorService(
        errorData.message ||
          `GitHub API request failed with status ${response.status}`,
        response.status,
        errorData.documentation_url
      );
    }

    return response.json();
  }

  public async searchUsers(
    params: UserSearchParams
  ): Promise<UserSearchResponse> {
    if (!params.q?.trim()) {
      throw new ApiGithubErrorService("Search query (q) is required");
    }

    // To get all users containing the search query in the username (or login), add +in:login
    const searchQuery = `${encodeURIComponent(params.q.trim())}+in:login`;

    // To get user matching exactly the search query in the username (or login), add user: prefix
    // const searchQuery = `user:${encodeURIComponent(params.q.trim())}`;

    const queryParams = new URLSearchParams();
    if (params.sort) queryParams.append("sort", params.sort);
    if (params.order) queryParams.append("order", params.order);
    if (params.per_page) {
      queryParams.append("per_page", Math.min(params.per_page, 100).toString());
    }
    if (params.page) queryParams.append("page", params.page.toString());

    const baseUrl = `${GITHUB_API_BASE_URL}${API_URL.user}?q=${searchQuery}`;
    const additionalParams = queryParams.toString();
    const url = additionalParams ? `${baseUrl}&${additionalParams}` : baseUrl;

    return this.fetchGitHub<UserSearchResponse>(url);
  }

  public async getRepositoriesForUser(
    userName: string,
    page: number = 1
  ): Promise<GitHubRepository[]> {
    if (!userName?.trim()) {
      throw new ApiGithubErrorService("Username is required");
    }

    const url = `${GITHUB_API_BASE_URL}${API_URL.reposForUser(
      userName.trim(),
      page.toString()
    )}`;
    return this.fetchGitHub<GitHubRepository[]>(url);
  }
}

export const apiGithubService = new ApiGithubService();
