import { SearchClientContainer } from "./_components/SearchClientContainer";

type SearchPageProps = {
  searchParams: { q?: string };
};
export default async function SearchPage({ searchParams }: SearchPageProps) {
  const queryParams = await searchParams;

  return <SearchClientContainer initialQuery={queryParams.q} />;
}
