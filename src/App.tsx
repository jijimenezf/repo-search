import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./App.css";

import CustomSelector from "@/components/CustomSelector";
import RepositoryList from "@/components/RepositoryList";

function App() {
  const [perPage, setPerPage] = useState(10);
  const [sortCriteria, setSortCriteria] = useState("stars");
  const [orderCriteria, setOrderCriteria] = useState("desc");

  const [currentQuery, setCurrentQuery] = useState("");

  /*const debounceFunc = (func: (value: string) => void, delay: number) => {
    let timer: NodeJS.Timeout;
     return function(...args: []) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(context, args);
        }, delay);
      }
 }*/

  /*async function handleSearch() {
    console.log('Searching for:', currentQuery);
    const results = await getData<RepositoryResponse[] | undefined>(`https://api.github.com/search/repositories?${new URLSearchParams({
      q: `${currentQuery}`,
      sort: 'stars',
      order: 'desc',
      //limit: `${LIMIT}`,
      //offset: `${offset}`,
    })}`, {
      'Accept': 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    });
    setRepositories(results);
  }*/

  // every 3 seconds
  //const debouncedSearchData = debounceFunc(setCurrentQuery, 3000);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formValues = new FormData(e.currentTarget);
    setCurrentQuery(formValues.get("searchQuery") as string);
  };

  return (
    <div>
      <h2>GitHub search repositories</h2>
      <div>
        <form
          className="flex w-full max-w-sm items-center space-x-2 py-4"
          onSubmit={handleSubmit}
        >
          <Input
            name="searchQuery"
            type="text"
            placeholder="Search repositories..."
            className="w-full p-2 border border-gray-300 rounded mb-3 bg-gray-100"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>

      <div className="flex w-full max-w-sm items-center space-x-2">
        <CustomSelector
          label={`Items per page -`}
          options={[
            { value: "5", label: "5" },
            { value: "10", label: "10" },
            { value: "15", label: "15" },
            { value: "20", label: "20" },
          ]}
          onUpdate={(value) => setPerPage(parseInt(value, 10))}
          byDefault={perPage.toString()}
        />
        <CustomSelector
          label={`Sort By -`}
          options={[
            { value: "stars", label: "Stars" },
            { value: "forks", label: "Forks" },
            { value: "help-wanted-issues", label: "Help Wanted" },
            { value: "updated", label: "Updated" },
          ]}
          onUpdate={(value) => setSortCriteria(value)}
          byDefault={sortCriteria}
        />
        <CustomSelector
          label={`Order -`}
          options={[
            { value: "asc", label: "Ascending" },
            { value: "desc", label: "Descending" },
          ]}
          onUpdate={(value) => setOrderCriteria(value)}
          byDefault={orderCriteria}
        />
      </div>
      <div>
        {!!currentQuery && (
          <RepositoryList
            query={currentQuery}
            sort={sortCriteria}
            order={orderCriteria}
            items_per_page={perPage}
          />
        )}
      </div>
    </div>
  );
}

export default App;
