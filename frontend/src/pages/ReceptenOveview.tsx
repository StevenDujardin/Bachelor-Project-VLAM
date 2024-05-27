import { Search } from "lucide-react";
import { FC, useEffect, useState, FormEvent } from "react";
import { Card } from "../components/Card";
import axios from "axios";
import { ReceptProps } from "./Recept";
export const ReceptenOveview: FC = () => {
  // State to store the recipes
  const [recipes, setRecipes] = useState<ReceptProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<
    Record<string, string | number | (string | number)[]>
  >({});

  const handleFilterSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevents the default form submit action

    const newFilters: Record<string, string | number | (string | number)[]> =
      {};

    // Use the FormData API to get all values from the form
    const formData = new FormData(event.target as HTMLFormElement);

    // Iterate over each entry in the FormData
    for (const [key, value] of formData.entries()) {
      if (key === "duration") {
        // For the duration, we only want a single value, not an array
        newFilters[key] = value;
      } else if (key.endsWith("[]")) {
        // Remove the '[]' from the key name
        const cleanKey = key.slice(0, -2);
        // Initialize the array if it doesn't exist
        if (!newFilters[cleanKey]) {
          newFilters[cleanKey] = [];
        }
        // Push the value into the array
        (newFilters[cleanKey] as Array<string | number>).push(value);
      } else {
        // For other inputs, just store the value directly
        newFilters[key] = value;
      }
    }

    setFilters(newFilters); // Update the filters state
    fetchRecipes(searchTerm, newFilters); // Fetch recipes with filters
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async (
    search = "",
    filters: Record<string, string | number> = {},
  ) => {
    try {
      // Constructing query parameters from filters object
      const queryParams = new URLSearchParams();
      if (search) queryParams.append("search", search);
      Object.keys(filters).forEach((key) => {
        const value = filters[key];
        if (Array.isArray(value)) {
          // If it's an array, join the values with commas
          queryParams.append(key, value.join(","));
        } else {
          queryParams.append(key, value.toString());
        }
      });

      const response = await axios.get(
        `http://localhost:3000/recipe-api/recipes?${queryParams.toString()}`,
        {
          headers: {
            Accept: "*/*",
          },
        },
      );
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault(); // Prevents the default form submit action
    fetchRecipes(searchTerm);
  };

  return (
    <>
      <div className="flex flex-col justify-end w-full h-80 object-cover bg-mantis-50">
        <div className="flex justify-center md:px-24 ">
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
            <div className="flex flex-col p-4 gap-2 divide-y ">
              <div className="flex gap-2">
                <input
                  title="dranken"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="type[]"
                  value="dranken"
                  id="dranken"
                ></input>
                <label htmlFor="dranken">Dranken</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="voorgerecht"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="type[]"
                  value="voorgerecht"
                  id="voorgerecht"
                ></input>
                <label htmlFor="voorgerecht">Voorgerecht</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="hoofdgerecht"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="type[]"
                  value="hoofdgerecht"
                  id="hoofdgerecht"
                ></input>
                <label htmlFor="hoofdgerecht">Hoofdgerecht</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="dessert"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="type[]"
                  value="dessert"
                  id="dessert"
                ></input>
                <label htmlFor="dessert">Dessert</label>
              </div>
            </div>
          </div>
          <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
            <div className="text-md font-centerBold">Tijdsduur:</div>
            <div className="flex flex-col p-2 gap-2 divide-y">
              <div className="flex gap-2">
                <input
                  title="15 minuten"
                  type="radio"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="15"
                  id="15"
                ></input>
                <label htmlFor="15">&lt;= 15 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="30 minuten"
                  type="radio"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="30"
                  id="30"
                ></input>
                <label htmlFor="30">&lt;= 30 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="45 minuten"
                  type="radio"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="45"
                  id="45"
                ></input>
                <label htmlFor="45">&lt;= 45 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="60 minuten"
                  type="radio"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="60"
                  id="60"
                ></input>
                <label htmlFor="60">&lt;= 60 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="90 minuten"
                  type="radio"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="120"
                  id="120"
                ></input>
                <label htmlFor="120">&lt;= 120 minuten</label>
              </div>
            </div>
          </div>
          <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
            <div className="text-md font-centerBold">Moeilijkheidsgraad:</div>
            <div className="flex flex-col p-2  gap-2 divide-y">
              <div className="flex gap-2">
                <input
                  title="gemakkelijk"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty[]"
                  value="gemakkelijk"
                  id="gemakkelijk"
                ></input>
                <label htmlFor="gemakkelijk">Gemakelijk</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="gemiddeld"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty[]"
                  value="gemiddeld"
                  id="gemiddeld"
                ></input>
                <label htmlFor="gemiddeld">Gemiddeld</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="moeilijk"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty[]"
                  value="moelijk"
                  id="moeilijk"
                ></input>
                <label htmlFor="moeilijk">Moeilijk</label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" flex justify-self-center mx-2 py-2 px-4 bg-mantis-500 text-white rounded-md hover:bg-mantis-600 transition duration-200"
          >
            Filters toepassen
          </button>
        </form>
        <div>
          <div></div>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8">
          {recipes.map((recipe) => (
            <Card
              recipe_id={recipe.recipe_id}
              // Assuming each recipe has a unique 'id'
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
