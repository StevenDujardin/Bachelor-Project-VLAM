import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { FC, useEffect, useState, FormEvent } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import { ReceptProps } from "./Recept";

export const ReceptenOverview: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [recipes, setRecipes] = useState<ReceptProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [recipesPerPage, setRecipesPerPage] = useState(() => {
    return parseInt(localStorage.getItem("recipesPerPage") || "12", 10);
  });

  const [filters, setFilters] = useState<
    Record<string, string | number | (string | number)[]>
  >({});

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleFilterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newFilters: Record<string, string | number | (string | number)[]> =
      {};
    const formData = new FormData(event.currentTarget);

    formData.forEach((value, key) => {
      if (key === "duration") {
        newFilters[key] = value.toString();
      } else if (key.endsWith("[]")) {
        const cleanKey = key.slice(0, -2);
        if (!newFilters[cleanKey]) {
          newFilters[cleanKey] = [];
        }
        (newFilters[cleanKey] as Array<string | number>).push(value.toString());
      } else {
        newFilters[key] = value.toString();
      }
    });

    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page for new filter
    fetchRecipes(1, newFilters, recipesPerPage); // Pass recipesPerPage
  };

  useEffect(() => {
    fetchRecipes(currentPage, filters, recipesPerPage);
  }, [currentPage, recipesPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchRecipes = async (
    page: number,
    filters: Record<string, string | number | (string | number)[]> = {},
    pageSize: number = 9
  ) => {
    try {
      setIsSearching(false);
      const queryParams = new URLSearchParams();
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (Array.isArray(value)) {
          queryParams.append(key, value.join(","));
        } else {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(
        `${apiUrl}/recipes?page=${page}&pageSize=${pageSize}&${queryParams.toString()}`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      const { data, totalPages } = response.data;

      setRecipes(data);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const searchRecipes = async (search: string) => {
    try {
      const response = await axios.get(`${apiUrl}/recipes/search/${search}`, {
        headers: {
          Accept: "*/*",
        },
      });
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    if (!event.target.value.trim()) {
      fetchRecipes(currentPage, filters, recipesPerPage); // Add the missing arguments
    }
  };

  const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setIsSearching(false);
      fetchRecipes(currentPage, filters, recipesPerPage); // Add the missing arguments
    } else {
      setIsSearching(true);
      searchRecipes(searchTerm);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRecipesPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPerPage = parseInt(event.target.value);
    setRecipesPerPage(newPerPage);
    localStorage.setItem("recipesPerPage", newPerPage.toString());
    setCurrentPage(1); // Reset to first page when changing recipes per page
  };

  return (
    <>
      <div className="flex flex-col justify-end w-full h-72 md:h-80 object-cover bg-mantis-50">
        <div className="flex justify-center md:px-24">
          <form
            onSubmit={handleSearchSubmit}
            className="flex w-full max-w-5xl pl-6 m-4 mb-8 bg-white shadow-md rounded-xl focus:shadow-xl"
          >
            <input
              className="py-6 w-full outline-none"
              placeholder="Naar welk recept ben je op zoek?"
              value={searchTerm}
              onChange={handleSearchChange}
            ></input>
            <button type="submit" aria-label="Zoeken">
              <Search size={32} className="m-6" />
            </button>
          </form>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center h-max py-8 md:py-20">
        <form onSubmit={handleFilterSubmit} className="md:w-80 pb-8">
          <div className="font-centerBold text-xl px-4">Filters</div>
          <div className="mx-4 my-2 p-2 bg-mantis-50 border border-mantis-200 rounded-xl">
            <div className="text-md font-centerBold">Type gerecht:</div>
            <div className="flex flex-col p-4 gap-2 divide-y">
              {["dranken", "voorgerecht", "hoofdgerecht", "dessert"].map(
                (type) => (
                  <div className="flex gap-2 pt-2" key={type}>
                    <input
                      title={type}
                      type="checkbox"
                      className="hover:accent-mantis-600 accent-mantis-500"
                      name="type[]"
                      value={type}
                      id={type}
                      defaultChecked={(filters.type as string[])?.includes(
                        type
                      )}
                    ></input>
                    <label htmlFor={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="mx-4 my-2 p-2 bg-mantis-50 border border-mantis-200 rounded-xl">
            <div className="text-md font-centerBold">Tijdsduur:</div>
            <div className="flex flex-col p-4 gap-2 divide-y">
              {["15", "30", "45", "60", "120"].map((duration) => (
                <div className="flex gap-2 pt-2" key={duration}>
                  <input
                    title={`${duration} minuten`}
                    type="radio"
                    className="hover:accent-mantis-600 accent-mantis-500"
                    name="duration"
                    value={duration}
                    id={duration}
                    defaultChecked={filters.duration === duration}
                  ></input>
                  <label htmlFor={duration}> &lt;= {duration} minuten</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-4 my-2 p-2 bg-mantis-50 border border-mantis-200 rounded-xl">
            <div className="text-md font-centerBold">Moeilijkheidsgraad:</div>
            <div className="flex flex-col p-4 gap-2 divide-y">
              {["gemakkelijk", "gemiddeld", "moeilijk"].map((difficulty) => (
                <div className="flex gap-2 pt-2" key={difficulty}>
                  <input
                    title={difficulty}
                    type="checkbox"
                    className="hover:accent-mantis-600 accent-mantis-500"
                    name="difficulty[]"
                    value={difficulty}
                    id={difficulty}
                    defaultChecked={(filters.difficulty as string[])?.includes(
                      difficulty
                    )}
                  ></input>
                  <label htmlFor={difficulty}>
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <button
            type="submit"
            className="flex justify-self-center mx-4 my-2 py-2 px-4 text-white font-centerBold rounded-md bg-mantis-500 hover:bg-mantis-600 transition duration-200 active:bg-mantis-700"
          >
            Filters toepassen
          </button>
        </form>

        <div className="flex flex-col w-full">
          {!isSearching && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 mt-8 mb-4 ml-8 md:mr-0">
                <div></div>
                <nav aria-label="Page navigation" className="mx-4">
                  <ul className="flex items-center justify-center h-10 text-base">
                    <li>
                      <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span className="sr-only">Previous</span>
                        <ChevronLeft />
                      </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 2 && page <= currentPage + 2)
                      )
                      .map((page, index, arr) => (
                        <li className="flex items-center" key={page}>
                          {index > 0 && arr[index - 1] !== page - 1 && (
                            <span className="px-4 py-2 h-10 border border-x-0 border-gray-300 select-none">
                              ...
                            </span>
                          )}
                          <button
                            onClick={() => setCurrentPage(page)}
                            className={`flex items-center justify-center px-4 h-10 leading-tight ${
                              currentPage === page
                                ? "text-white bg-mantis-600 border border-mantis-600 hover:bg-mantis-700"
                                : "text-gray-500 bg-white border-y border-gray-300 hover:bg-mantis-500 hover:border-mantis-500 hover:text-white"
                            }`}
                          >
                            {page}
                          </button>
                        </li>
                      ))}
                    <li>
                      <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                      >
                        <span className="sr-only">Next</span>
                        <ChevronRight />
                      </button>
                    </li>
                  </ul>
                </nav>
                <div className="place-self-end">
                  <div className="flex flex-row gap-2 justify-end">
                    <label
                      htmlFor="recipesPerPage"
                      className="font-poppins flex flex-col justify-center invisible lg:visible"
                    >
                      recepten per pagina
                    </label>
                    <select
                      id="recipesPerPage"
                      value={recipesPerPage}
                      onChange={handleRecipesPerPageChange}
                      className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none"
                    >
                      {[12, 24, 36].map((value) => (
                        <option key={value} value={value}>
                          {value}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8 animate-fadeIn">
            {recipes.map((recipe) => (
              <Card
                key={recipe.recipe_id}
                recipe_id={recipe.recipe_id}
                image={
                  recipe?.image ||
                  "https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
                }
                title={recipe.title}
                type={recipe.type}
                duration={recipe.duration}
                difficulty={recipe.difficulty}
              />
            ))}
          </div>
          {!isSearching && (
            <div className="grid grid-cols-1 md:grid-cols-3 mt-8 mb-4 ml-8 md:mr-0">
              <div></div>
              <nav aria-label="Page navigation example" className="mx-4">
                <ul className="flex items-center justify-center h-10 text-base">
                  <li>
                    <button
                      onClick={handlePrevPage}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeft />
                    </button>
                  </li>
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(
                      (page) =>
                        page === 1 ||
                        page === totalPages ||
                        (page >= currentPage - 2 && page <= currentPage + 2)
                    )
                    .map((page, index, arr) => (
                      <li className="flex items-center" key={page}>
                        {index > 0 && arr[index - 1] !== page - 1 && (
                          <span className="px-4 py-2 h-10 border border-x-0 border-gray-300 select-none">
                            ...
                          </span>
                        )}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`flex items-center justify-center px-4 h-10 leading-tight ${
                            currentPage === page
                              ? "text-white bg-mantis-600 border border-mantis-600 hover:bg-mantis-700"
                              : "text-gray-500 bg-white border-y border-gray-300 hover:bg-mantis-500 hover:border-mantis-500 hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                  <li>
                    <button
                      onClick={handleNextPage}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRight />
                    </button>
                  </li>
                </ul>
              </nav>
              <div className="place-self-end">
                <div className="flex flex-row gap-2 justify-end">
                  <label
                    htmlFor="recipesPerPage"
                    className="font-poppins flex flex-col justify-center invisible lg:visible"
                  >
                    recepten per pagina
                  </label>
                  <select
                    id="recipesPerPage"
                    value={recipesPerPage}
                    onChange={handleRecipesPerPageChange}
                    className="border border-gray-300 rounded-md p-2 bg-white text-gray-700 focus:outline-none"
                  >
                    {[12, 24, 36].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
