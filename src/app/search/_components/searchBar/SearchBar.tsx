"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/ui/button/Button";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  initialSearchTerm: string;
  placeholderText: string;
  onChangeHandler: (searchTerm: string) => void;
  isLoading: boolean;
};

export const SearchBar = ({
  initialSearchTerm,
  placeholderText,
  onChangeHandler,
  isLoading,
}: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm || "");
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSearchParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.push(`/search?${params.toString()}`);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    //triggerSearch();
  };

  const triggerSearch = () => {
    onChangeHandler(searchTerm);
    updateSearchParams("q", searchTerm);
  };

  const searchButtonHandler = () => {
    if (searchTerm.trim().length > 0) triggerSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleOnChange}
        placeholder={placeholderText}
        onKeyDown={handleKeyDown}
        className={styles.input}
        disabled={isLoading}
      />
      <Button onClick={searchButtonHandler} disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </>
  );
};
