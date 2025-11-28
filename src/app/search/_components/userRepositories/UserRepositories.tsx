import { GitHubRepository } from "@/lib/services/types";
import Link from "next/link";
import { Button } from "@/ui/button/Button";
import styles from "./UserRepositories.module.scss";

type UserRepositoriesProps = {
  repositories: GitHubRepository[];
  isInitialLoading: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
};

export const UserRepositories = ({
  repositories,
  isInitialLoading,
  isLoadingMore,
  hasMore,
  onLoadMore,
}: UserRepositoriesProps) => {
  const loadingText = isInitialLoading
    ? "Loading repositories..."
    : "No repositories found";

  if (isInitialLoading || repositories.length === 0) {
    return (
      <div className={styles.panel}>
        <p className={styles.loadingText}>{loadingText}</p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <div className={styles.list}>
        {repositories.map((repo) => (
          <div key={repo.id} className={styles.item}>
            <Link href={repo.html_url} target="_blank">
              <strong>{repo.name}</strong>
            </Link>
            {repo.description && <p>{repo.description}</p>}
            <div className={styles.stats}>
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
            </div>
          </div>
        ))}
        {hasMore && (
          <Button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            variant="secondary"
            fullWidth
          >
            {isLoadingMore ? "Loading..." : "Load More"}
          </Button>
        )}
      </div>
    </div>
  );
};
