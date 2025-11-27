"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/ui/button/Button";
import styles from "./SearchBar.module.scss";

type SearchBarProps = {
  initialSearchTerm: string;
  placeholderText: string;
  onChangeHandler: (searchTerm: string) => void;
  loading: boolean;
};

export const SearchBar = ({
  initialSearchTerm,
  placeholderText,
  onChangeHandler,
  loading,
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
    triggerSearch();
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleOnChange}
        placeholder={placeholderText}
        className={styles.input}
        disabled={loading}
      />
      <Button onClick={searchButtonHandler} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </Button>
    </>
  );
};
