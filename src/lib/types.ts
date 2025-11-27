export type GitHubApiError = {
  message: string;
  documentation_url?: string;
  status?: number;
};

export type GitHubUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  url: string;
  html_url: string;
  type: string;
  name?: string;
};

export type UserSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
};

export type UserSearchParams = {
  q: string;
  sort?: "followers" | "repositories" | "joined";
  order?: "asc" | "desc";
  per_page?: number;
  page?: number;
};

export type GitHubRepository = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  owner: GitHubUser;
  html_url: string;
  description: string | null;
  url: string;
  stargazers_count: number;
  forks_count: number;
};
