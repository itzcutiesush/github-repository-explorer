export class ApiGithubErrorService extends Error {
  status?: number;
  documentation_url?: string;

  constructor(message: string, status?: number, documentation_url?: string) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
    this.documentation_url = documentation_url;
  }
}
