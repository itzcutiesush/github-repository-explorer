export const GITHUB_API_BASE_URL = "https://api.github.com";

export const API_URL = {
  user: "/search/users",
  reposForUser: (userName: string, page: string) =>
    `/users/${userName}/repos?sort=updated&per_page=10&page=${page}`,
};
