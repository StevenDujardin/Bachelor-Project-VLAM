import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ChefHat, SignalHigh, Timer } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";

export interface ReceptProps {
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

export const ReceptEdit: FC = () => {
  const [persons, setPersons] = useState(4);
  const [recipe, setRecipe] = useState<ReceptProps | null>(null);
  const navigate = useNavigate();

  const { recipe_id } = useParams();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/recipes/${recipe_id}`,
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (recipe_id) {
      fetchRecipe();
    }
  }, [recipe_id]);

  const adjustPersons = (delta: number) => {
    setPersons((prev) => Math.min(8, Math.max(1, prev + delta)));
  };

  const adjustIngredientQuantity = (ingredient: string, factor: number) => {
    const match = ingredient.match(/^(\d+)\s?(.*)$/);
    if (!match) return ingredient;

    const [, quantity, unit] = match;
    const newQuantity = parseFloat(quantity) * factor;

    return `${newQuantity} ${unit}`;
  };

  if (!recipe) {
    return <Loading />;
  }

  const factor = persons / 4;
  const adjustedIngredients = recipe.ingredients.map((ingredient) =>
    adjustIngredientQuantity(ingredient, factor)
  );

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: keyof ReceptProps
  ) => {
    if (recipe) {
      setRecipe({
        ...recipe,
        [key]: event.target.value,
      });
    }
  };

  const handleArrayChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    key: keyof Omit<
      ReceptProps,
      | "image"
      | "title"
      | "type"
      | "duration"
      | "difficulty"
      | "recipe_id"
      | "description"
    >
  ) => {
    if (recipe) {
      const updatedArray = [...recipe[key]];
      updatedArray[index] = event.target.value;
      setRecipe({
        ...recipe,
        [key]: updatedArray,
      });
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3000/recipes/edit/${recipe_id}`,
        recipe,
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Recipe updated successfully:", response.data);
    } catch (error) {
      console.log(recipe.toString())
      console.error("Error updating recipe:", error);
    }
  };

   const goBack = () => {
    navigate(-1)
  }

  return (
    <>
      <div className="flex flex-col justify-end w-full h-52 object-cover bg-mantis-50 font-poppins">
      <div className="flex self-center gap-2 justify-start w-screen max-w-7xl px-4">
            <button onClick={goBack} className="bg-LVBO font-centerBold border border-mantis-700 rounded-md px-4 py-2 my-2 text-xl text-white select-none">
              back
            </button>
            
          </div>
      </div>
      <form
        onSubmit={handleSave}
        className="max-w-7xl w-screen self-center"
      >
        <div className="flex flex-col md:flex-row w-screen max-w-7xl  py-8">
          <div className="flex flex-row lg:flex-row lg:w-screen mx-4 rounded-2xl overflow-hidden bg-mantis-100  border border-mantis-200 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-10 p-6">
              <img
                src={recipe?.image || ReceptExample.image}
                alt="img"
                className=" lg:w-3/5 object-cover rounded-lg shadow-lg"
              ></img>
              <div className="flex flex-col justify-between lg:w-2/5">
                <div className="flex flex-col">
                  <textarea
                    value={recipe.title}
                    onChange={(e) => handleChange(e, "title")}
                    className="text-5xl font-light font-centerBold py-2 mb-2 w-full p-2.5 whitespace-normal rounded-lg"
                    title="Recipe Title"
                  />
                  <textarea
                    value={recipe.description}
                    onChange={(e) => handleChange(e, "description")}
                    className="text-xl font-light py-2 w-full min-h-44 p-2.5 rounded-lg"
                    title="Recipe Description"
                  />
                </div>
                <div className="flex flex-col sm:flex-row md:px-10 lg:px-0 lg:flex-col lg:max-w-fit xl:max-w-full  xl:flex-row justify-between m-4 lg:m-0 whitespace-nowrap">
                  <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                    <ChefHat size={24} className="mr-2" />
                    <input
                      type="text"
                      value={recipe.type}
                      onChange={(e) => handleChange(e, "type")}
                      className="bg-LVBO text-white w-full"
                      title="Recipe Type"
                    />
                  </div>
                  <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                    <Timer size={24} className="mr-2" />
                    <input
                      type="text"
                      value={recipe.duration}
                      onChange={(e) => handleChange(e, "duration")}
                      className="bg-LVBO text-white w-full"
                      title="Recipe Duration"
                    />
                  </div>
                  <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                    <SignalHigh size={24} className="mr-2" />
                    <input
                      type="text"
                      value={recipe.difficulty}
                      onChange={(e) => handleChange(e, "difficulty")}
                      className="bg-LVBO text-white w-full"
                      title="Recipe Difficulty"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col  md:flex-row w-screen max-w-7xl self-center pb-8">
          <div className="flex flex-row md:w-1/3 min-w-80 mx-4 mb-4 md:mb-0 rounded-2xl bg-mantis-100  border border-mantis-200 shadow-lg">
            <div className="flex flex-col w-full gap-4 p-6">
              <div className="text-2xl font-light font-centerBold py-2">
                Ingredients
              </div>
              
              <div className="flex flex-col gap-2 divide-y divide-LVBO font-poppins">
                {adjustedIngredients.map((ingredient, index) => (
                  <input
                    key={index}
                    type="text"
                    value={ingredient}
                    onChange={(e) => handleArrayChange(e, index, "ingredients")}
                    className="bg-white rounded-lg p-2"
                    title="Recipe Ingredients"
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-row lg:flex-row md:w-2/3 mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100 border border-mantis-200 shadow-lg">
            <div className="flex flex-col gap-4 p-6 w-full">
              <div className="text-2xl font-light font-centerBold py-2">
                Steps
              </div>
              <ol className="flex flex-col w-full list-decimal pl-4 space-y-4 divide-y divide-LVBO font-poppins">
                {recipe.steps.map((step, index) => (
                  <textarea
                    key={index}
                    value={step}
                    onChange={(e) => handleArrayChange(e, index, "steps")}
                    className="bg-white rounded-lg p-2 w-full h-42"
                    title="Recipe Steps"
                  />
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="flex justify-center mb-8">
          <button
            type="submit"
            className="bg-mantis-500 text-white py-2 px-4 rounded-full transition duration-200 hover:bg-mantis-600"
          >
            Save
          </button>
        </div>
      </form>
    </>
  );
};

export default ReceptEdit;
