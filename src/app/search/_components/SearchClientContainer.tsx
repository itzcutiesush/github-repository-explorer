"use client";

import { useEffect, useState } from "react";
import { apiGithubService } from "@/lib/api-github.service";
import { ApiGithubErrorService } from "@/lib/api-github-error.service";
import { GitHubUser } from "@/lib/types";
import { SearchBar } from "./searchBar/SearchBar";
import styles from "./SearchClientContainer.module.scss";

type SearchClientProps = {
  initialQuery?: string;
};

export const SearchClientContainer = ({ initialQuery }: SearchClientProps) => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserData = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setError("Please enter a username");
      return;
    }

    if (searchTerm.trim().length <= 3) {
      setUsers([]);
      setError("Please enter a username with 4 character or more");
      return;
    }

    setLoading(true);
    setError("");
    setUsers([]);

    try {
      const results = await apiGithubService.searchUsers({
        q: searchTerm.trim(),
        per_page: 5,
        sort: "repositories",
      });

      if (results.items.length === 0) {
        setError("No users found");
      } else {
        setUsers(results.items);
      }
    } catch (err) {
      if (err instanceof ApiGithubErrorService) {
        setError(err.message);
      } else {
        setError("Failed to search users. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      getUserData(initialQuery);
    }
  }, [initialQuery]);

  const onUserNameSearch = (userName: string) => {
    getUserData(userName);
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <SearchBar
            initialSearchTerm={initialQuery || ""}
            placeholderText="Enter a username to search"
            loading={loading}
            onChangeHandler={onUserNameSearch}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {users.map((user) => (
          <div key={user.id}>{user.login}</div>
        ))}
      </div>
    </div>
  );
};
