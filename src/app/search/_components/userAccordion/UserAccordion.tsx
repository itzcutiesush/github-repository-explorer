"use client";

import { useState } from "react";
import { GitHubRepository, GitHubUser } from "@/lib/services/types";
import { apiGithubService } from "@/lib/services/api-github.service";
import { UserInfoCard } from "../userInfoCard/UserInfoCard";
import { UserRepositories } from "../userRepositories/UserRepositories";
import styles from "./UserAccordion.module.scss";

type UserAccordionProps = {
  user: GitHubUser;
};

export const UserAccordion = ({ user }: UserAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMoreResults, setLoadMoreResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getRepos = async (
    pageNo: number,
    append: boolean = false
  ): Promise<void> => {
    const setLoadingState = append ? setLoadMoreResults : setIsLoading;
    setLoadingState(true);

    try {
      const repos = await apiGithubService.getRepositoriesForUser(
        user.login,
        pageNo
      );
      setRepositories((prev) => (append ? [...prev, ...repos] : repos));
      setCurrentPage(pageNo);
      setHasMore(repos.length === 10);
    } catch (error) {
      console.error("Failed to fetch repositories:", error);
      if (!append) setRepositories([]);
      setHasMore(false);
    } finally {
      setLoadingState(false);
    }
  };

  const toggleAccordion = async () => {
    if (isExpanded) {
      setIsExpanded(false);
      setRepositories([]);
      setCurrentPage(1);
      setHasMore(true);
      return;
    }

    setIsExpanded(true);
    await getRepos(1);
  };

  const loadMoreRepositories = async () => {
    if (isLoadingMoreResults) return;
    await getRepos(currentPage + 1, true);
  };

  return (
    <div className={styles.accordion}>
      <UserInfoCard
        user={user}
        isExpanded={isExpanded}
        onClick={toggleAccordion}
      />
      {isExpanded && (
        <UserRepositories
          repositories={repositories}
          isInitialLoading={isLoading}
          isLoadingMore={isLoadingMoreResults}
          hasMore={hasMore}
          onLoadMore={loadMoreRepositories}
        />
      )}
    </div>
  );
};
