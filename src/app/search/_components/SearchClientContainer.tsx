"use client";

import { useEffect, useState } from "react";
import { apiGithubService } from "@/lib/services/api-github.service";
import { ApiGithubErrorService } from "@/lib/services/api-github-error.service";
import { GitHubUser } from "@/lib/services/types";
import { SearchBar } from "./searchBar/SearchBar";
import { ListView } from "./listView/ListView";
import styles from "./SearchClientContainer.module.scss";
import { Button } from "@/ui/button/Button";

type SearchClientProps = {
  initialQuery?: string;
};

export const SearchClientContainer = ({ initialQuery }: SearchClientProps) => {
  const [users, setUsers] = useState<GitHubUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
            isLoading={loading}
            onChangeHandler={onUserNameSearch}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        {users.length > 0 && (
          <div className={styles.listContainer}>
            <ListView users={users} />
          </div>
        )}
      </div>

      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className={styles.scrollToTop}
          aria-label="Scroll to top"
        >
          ↑
        </Button>
      )}
    </div>
  );
};
