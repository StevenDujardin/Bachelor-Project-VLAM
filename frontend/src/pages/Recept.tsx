import { FC, useEffect, useState } from "react";
import { ChefHat, SignalHigh, Timer } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";

interface ReceptProps {
  image: string;
  title: string;
  type: string;
  duration: string;
  difficulty: string;
  recipe_id: number;
  description: string;
  ingredients: string[];
  steps: string[];
}

const ReceptExample: ReceptProps = {
  image:
    "https://www.lekkervanbijons.be/sites/default/files/styles/960w_ratio_2_1/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=-zeKi844",
  title: "Pasta Carbonara",
  type: "Pasta",
  duration: "30 min",
  difficulty: "Easy",
  recipe_id: 1,
  description:
    "Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!",
  ingredients: ["500g pasta", "4 eggs", "200 g bacon", "150 g cheese", "salt"],
  steps: [
    "Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.",
    "Snijd het brood in blokjes.Pers de look en roerbak 30 seconden in olijfolie. Voeg de broodblokjes en het takje rozemarijn toe en bak het brood goudbruin en knapperig. Kruid met peper en zout.",
    "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons.Druppel er de dressing over en serveer.",
  ],
};

export const Recept: FC = () => {
  const [persons, setPersons] = useState(4);
  const [recipe, setRecipe] = useState<ReceptProps | null>(null); // Initialize recipe state to null

  const { recipe_id } = useParams();
  console.log(recipe_id);
  // Effect hook to fetch recipe on mount
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        console.log(recipe_id);

        const response = await axios.get(
          `http://localhost:3000/recipe-api/recipes/${recipe_id}`,
          {
            headers: {
              Accept: "*/*",
            },
          },
        );
        setRecipe(response.data);
        console.log(response.data); // Assuming the API returns an array of recipes
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (recipe_id) {
      fetchRecipe();
    }
  }, [recipe_id]);

  const adjustPersons = (delta: number) => {
    setPersons((prev) => Math.min(8, Math.max(1, prev + delta))); // Ensure at least 1 person and at most 8
  };

  const adjustIngredientQuantity = (ingredient: string, factor: number) => {
    const match = ingredient.match(/^(\d+)\s?(.*)$/);
    if (!match) return ingredient; // Return the original if no match

    const [, quantity, unit] = match;
    const newQuantity = parseFloat(quantity) * factor;

    return `${newQuantity} ${unit}`;
  };
  if (!recipe) {
    return <Loading />; // Render loading state or similar
  }
  const factor = persons / 4; // 4 is the base number of persons
  const adjustedIngredients = recipe.ingredients.map((ingredient) =>
    adjustIngredientQuantity(ingredient, factor),
  );

  return (
    <>
      <div className="flex flex-col justify-end w-full h-52 object-cover bg-mantis-50 font-poppins"></div>
      <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center py-8">
        <div className="flex flex-row lg:flex-row lg:w-screen mx-4 rounded-2xl overflow-hidden bg-mantis-100">
          <div className="flex flex-col lg:flex-row gap-10 p-6">
            <img
              src={recipe?.image || ReceptExample.image}
              alt="img"
              className=" lg:w-3/5 object-cover rounded-lg shadow-lg"
            ></img>

            <div className="flex flex-col justify-between lg:w-2/5">
              <div>
                <div className=" text-5xl font-light font-centerBold py-2">
                  {recipe.title}
                </div>
                <div className=" text-xl font-light py-2">
                  {recipe.description}
                </div>
              </div>

              <div className="flex flex-row md:px-10 lg:px-0 lg:flex-col lg:max-w-fit xl:max-w-full  xl:flex-row justify-between m-4 lg:m-0">
                <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                  <ChefHat size={24} className="mr-2" />
                  <p>{recipe.type}</p>
                </div>
                <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                  <Timer size={24} className="mr-2" />
                  <p>{recipe.duration}</p>
                </div>
                <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                  <SignalHigh size={24} className="mr-2" />
                  <p>{recipe.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col  md:flex-row w-screen max-w-7xl self-center pb-8">
        <div className="flex flex-row md:w-1/3 min-w-80 mx-4 mb-4 md:mb-0 rounded-2xl bg-mantis-100">
          <div className="flex flex-col w-full gap-4 p-6">
            <div className=" text-2xl font-light font-centerBold py-2">
              Ingredients
            </div>
            <div className="flex justify-between p-2 mx-4 rounded-full bg-white">
              <button
                title="substract person"
                className="bg-LVBO px-3 rounded-full aspect-square w-9 h-9 text-white select-none transition duration-200 active:bg-mantis-500 active:scale-90"
                onClick={() => adjustPersons(-1)}
              >
                -
              </button>
              <div className="flex flex-col justify-center">
                Voor {persons} personen
              </div>
              <button
                title="add person"
                className="bg-LVBO px-3 rounded-full aspect-square w-9 h-9 text-white select-none transition duration-200 active:bg-mantis-500 active:scale-90"
                onClick={() => adjustPersons(1)}
              >
                +
              </button>
            </div>
            <div className="flex flex-col gap-2 divide-y divide-LVBO font-poppins">
              {adjustedIngredients.map((ingredient) => (
                <div className="flex pt-2">
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-row md:w-2/3 mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100">
          <div className="flex flex-col gap-4 p-6">
            <div className="text-2xl font-light font-centerBold py-2">
              Steps
            </div>
            <ol className="list-decimal pl-4 space-y-4 divide-y divide-LVBO font-poppins">
              {recipe.steps.map((step, index) => (
                <li key={index} className="pl-2 pt-4">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};
