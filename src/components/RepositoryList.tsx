import { useState, useEffect } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type RepoInfo = {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  topics: string[];
  stargazers_count: number;
  updated_at: string;
};

type RepositoryResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: RepoInfo[];
};

export default function RepositoryList({
  query,
  sort,
  order,
  items_per_page,
}: {
  query: string;
  sort: string;
  order: string;
  items_per_page: number;
}) {
  const [repositories, setRepositories] = useState<
    RepositoryResponse | undefined
  >();
  const [data, setData] = useState<RepoInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getData<T>(url: string): Promise<T | undefined> {
      let response: Response;
      try {
        response = await fetch(url, {
          headers: {
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
          },
        });
        if (response.status !== 200) {
          throw new Error(`Error: ${response.status}`);
        }
        const data: T = await response.json();
        return data;
      } catch (err) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
      }
    }

    const results = getData<RepositoryResponse | undefined>(
      `https://api.github.com/search/repositories?${new URLSearchParams({
        q: `${query}`,
        sort: `${sort}`,
        order: `${order}`,
      })}`
    );
    results.then((response) => setRepositories(response));
  }, [query, sort, order]);

  useEffect(() => {
    if (repositories && repositories.items.length > 0) {
      setTotalPages(Math.ceil(repositories.items.length / items_per_page));
      setData(
        repositories.items.slice(
          (currentPage - 1) * items_per_page,
          currentPage * items_per_page
        )
      );
    }
    if (repositories?.total_count === 0) {
      setData([]);
    }
  }, [currentPage, repositories, items_per_page]);

  return (
    <>
      {data.map((repo) => (
        <div key={repo.id} className="border border-gray-300 p-4 my-3 rounded">
          <a
            href={repo.html_url}
            className="text-blue-600 hover:underline text-lg mb-3"
          >
            {repo.full_name}
          </a>
          <p>{repo.description}</p>
          <div className="mt-2">
            {repo.topics.map((topic: string) => (
              <span className="bg-blue-100 mr-1 rounded text-blue-700 p-1 text-xs leading-7">
                {topic}
              </span>
            ))}
          </div>
          <div className="text-gray-500 text-xs flex gap-2 mt-2">
            <span>{repo.stargazers_count} stars</span>
            <span>·</span>
            <span>
              Updated on{" "}
              {new Intl.DateTimeFormat("en-US").format(
                new Date(repo.updated_at)
              )}
            </span>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem
              className={currentPage === 1 ? "pointer-events-none" : ""}
            >
              <PaginationPrevious
                onClick={() => setCurrentPage(currentPage - 1)}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={`page-${index}`}>
                <PaginationLink
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem
              className={
                currentPage === totalPages ? "pointer-events-none" : ""
              }
            >
              <PaginationNext onClick={() => setCurrentPage(currentPage + 1)} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
      {!!query && data.length === 0 && <p>No results</p>}
    </>
  );
}
