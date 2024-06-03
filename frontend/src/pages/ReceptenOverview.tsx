  import { Search } from "lucide-react";
  import { FC, useEffect, useState, FormEvent } from "react";
  import { Card } from "../components/Card";
  import axios from "axios";
  import { ReceptProps } from "./Recept";

  export const ReceptenOverview: FC = () => {
    const [recipes, setRecipes] = useState<ReceptProps[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [, setFilters] = useState<
      Record<string, string | number | (string | number)[]>
    >({});

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
      fetchRecipes(searchTerm, newFilters);
    };

    useEffect(() => {
      fetchRecipes();
    }, []);

    const fetchRecipes = async (
      search = "",
      filters: Record<string, string | number | (string | number)[]> = {}
    ) => {
      try {
        const queryParams = new URLSearchParams();
        if (search) queryParams.append("search", search);
        Object.keys(filters).forEach((key) => {
          const value = filters[key];
          if (Array.isArray(value)) {
            queryParams.append(key, value.join(","));
          } else {
            queryParams.append(key, value.toString());
          }
        });

        const response = await axios.get(
          `http://localhost:3000/recipes?${queryParams.toString()}`,
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        console.log(response.data);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const searchRecipes = async (search: string) => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/search/${search}`,
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
      if (!event.target.value.trim()) {
        fetchRecipes();
      }
    };

    const handleSearchSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!searchTerm.trim()) {
        fetchRecipes();
      } else {
        searchRecipes(searchTerm);
      }
    };

    return (
      <>
        <div className="flex flex-col justify-end w-full h-80 object-cover bg-mantis-50">
          <div className="flex justify-center md:px-24">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full max-w-5xl pl-6 m-4 mb-8 bg-white shadow-md rounded-xl"
            >
              <input
                className=" py-6 w-full outline-none"
                placeholder="Naar welk recept je be op zoek?"
                value={searchTerm}
                onChange={handleSearchChange}
              ></input>
              <button type="submit" aria-label="Zoeken">
                <Search size={32} className="m-6" />
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center h-max pt-20">
          <form onSubmit={handleFilterSubmit} className="md:w-80 pb-8">
            <div className=" font-centerBold text-xl">Filters</div>
            <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
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
                      ></input>
                      <label htmlFor={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
              <div className="text-md font-centerBold">Tijdsduur:</div>
              <div className="flex flex-col p-2 gap-2 divide-y">
                {["15", "30", "45", "60", "120"].map((duration) => (
                  <div className="flex gap-2 pt-2" key={duration}>
                    <input
                      title={`${duration} minuten`}
                      type="radio"
                      className="hover:accent-mantis-600 accent-mantis-500"
                      name="duration"
                      value={duration}
                      id={duration}
                    ></input>
                    <label htmlFor={duration}> &lt;= {duration} minuten</label>
                  </div>
                ))}
              </div>
            </div>
            <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
              <div className="text-md font-centerBold">Moeilijkheidsgraad:</div>
              <div className="flex flex-col p-2 gap-2 divide-y">
                {["gemakkelijk", "gemiddeld", "moeilijk"].map((difficulty) => (
                  <div className="flex gap-2 pt-2" key={difficulty}>
                    <input
                      title={difficulty}
                      type="checkbox"
                      className="hover:accent-mantis-600 accent-mantis-500"
                      name="difficulty[]"
                      value={difficulty}
                      id={difficulty}
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
              className=" flex justify-self-center mx-2 py-2 px-4 bg-mantis-500 text-white rounded-md hover:bg-mantis-600 transition duration-200"
            >
              Filters toepassen
            </button>
          </form>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8 animate-fadeIn">
            {recipes.map((recipe) => (
              <Card
                key={recipe.recipe_id}
                recipe_id={recipe.recipe_id}
                image={
                  "https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
                }
                title={recipe.title}
                type={recipe.type}
                duration={recipe.duration}
                difficulty={recipe.difficulty}
              />
            ))}
          </div>
        </div>
      </>
    );
  };
