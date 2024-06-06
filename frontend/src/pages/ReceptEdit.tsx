import { FC, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ChefHat, SignalHigh, Timer, PlusCircle, XCircle } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Loading } from "./Loading";
import { ReceptProps } from "./Recept";

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
    "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons. Druppel er de dressing over en serveer.",
  ],
};

export const ReceptEdit: FC = () => {
  const [recipe, setRecipe] = useState<ReceptProps>();
  const [newStep, setNewStep] = useState(""); // State for the new step's text
  const [addStepIndex, setAddStepIndex] = useState<number | null>(null); // State to hold index at which to add the new step
  const [newIngredient, setNewIngredient] = useState(""); // State for the new ingredient's text
  const [imageFile, setImageFile] = useState<File | null>(null); // State for the new image file
  const [imagePreview, setImagePreview] = useState<string>(""); // State for the new image preview URL

  const navigate = useNavigate();
  const { recipe_id } = useParams();
  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/recipes/${recipe_id}`,
          {
            headers: {
              Accept: "*/*",
            },
          }
        );
        setRecipe(response.data);
        setImagePreview(response.data.image); // Set initial image preview
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    if (recipe_id) {
      fetchRecipe();
    }
  }, [recipe_id]);

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
      | "title"
      | "type"
      | "duration"
      | "difficulty"
      | "recipe_id"
      | "description"
      | "image"
    >
  ) => {
    if (recipe) {
      const updatedArray = [...(recipe[key] as string[])];
      updatedArray[index] = event.target.value;
      setRecipe({
        ...recipe,
        [key]: updatedArray,
      });
    }
  };

  const handleAddStep = (index: number | null) => {
    if (recipe && index !== null && newStep.trim()) {
      const updatedSteps = [...recipe.steps];
      updatedSteps.splice(index + 1, 0, newStep.trim());
      setRecipe({
        ...recipe,
        steps: updatedSteps,
      });
      setNewStep("");
      setAddStepIndex(null);
    }
  };

  const handleDeleteStep = (index: number) => {
    if (recipe) {
      const updatedSteps = recipe.steps.filter((_, i) => i !== index);
      setRecipe({
        ...recipe,
        steps: updatedSteps,
      });
    }
  };

  const handleAddIngredient = () => {
    if (recipe && newIngredient.trim()) {
      const updatedIngredients = [...recipe.ingredients, newIngredient.trim()];
      setRecipe({
        ...recipe,
        ingredients: updatedIngredients,
      });
      setNewIngredient("");
    }
  };

  const handleDeleteIngredient = (index: number) => {
    if (recipe) {
      const updatedIngredients = recipe.ingredients.filter(
        (_, i) => i !== index
      );
      setRecipe({
        ...recipe,
        ingredients: updatedIngredients,
      });
    }
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);

      // Create a preview URL for the selected image
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (recipe) {
      try {
        let imagePath = recipe.image;

        // Only upload if imageFile state is not null (meaning a new image was selected)
        if (imageFile) {
          const formData = new FormData();
          formData.append("file", imageFile);

          const uploadResponse = await axios.post(
            `${apiUrl}/recipes/image/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          imagePath = uploadResponse.data.path;
        }

        // Update the local recipe state with the new image path
        const updatedRecipe = {
          ...recipe,
          image: imagePath,
        };

        // Update the state and wait for it to complete before proceeding
        await new Promise((resolve) => {
          setRecipe(updatedRecipe);
          resolve(true);
        });

       
        // Now that the state has been updated, proceed to make the PUT request
        const response = await axios.put(
          `${apiUrl}/recipes/edit/${recipe_id}`,
          updatedRecipe, // Make sure you're sending the updatedRecipe with the new image path
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Recipe updated successfully:", response.data);
        navigate(`/recepten/${recipe_id}`);
      } catch (error) {
        console.error("Error updating recipe:", error);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!recipe) {
    return <Loading />;
  }

  return (
    <>
      <div className="flex flex-col justify-end w-full h-52 object-cover bg-mantis-100 font-poppins">
        <div className="flex self-center gap-2 justify-between w-screen max-w-7xl px-4">
          <button
            onClick={goBack}
            className="bg-LVBO font-centerBold border border-mantis-700 rounded-md px-4 py-2 my-2 text-xl text-white select-none"
          >
            Terug
          </button>
          <button
            type="submit"
            form="edit-form"
            className="bg-LVBO font-centerBold border border-mantis-700 rounded-md px-4 py-2 my-2 text-xl text-white select-none"
          >
            Opslaan
          </button>
        </div>
      </div>
      <form
        onSubmit={handleSave}
        id="edit-form"
        className="max-w-7xl w-screen self-center font-poppins"
      >
        <div className="flex flex-col md:flex-row w-screen max-w-7xl  py-8">
          <div className="flex flex-row lg:flex-row lg:w-screen mx-4 rounded-2xl overflow-hidden bg-mantis-100  border border-mantis-200 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-10 p-6">
              <div className="flex flex-col lg:w-3/5">
                <img
                  src={imagePreview || ReceptExample.image} // Use imagePreview for the src
                  alt="img"
                  className="object-hidden rounded-lg shadow-lg"
                ></img>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="p-2 "
                  title="Recipe Image"
                />
              </div>

              <div className="flex flex-col justify-between lg:w-2/5">
                <div className="flex flex-col">
                  <textarea
                    value={recipe.title}
                    onChange={(e) => handleChange(e, "title")}
                    className="text-5xl font-light font-centerBold py-2 mb-2 w-full p-2.5 whitespace-normal rounded-lg"
                    title="Recipe Title"
                    required
                  />
                  <textarea
                    value={recipe.description}
                    onChange={(e) => handleChange(e, "description")}
                    className="text-xl font-light py-2 w-full min-h-44 p-2.5 rounded-lg"
                    title="Recipe Description"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1 sm:flex-row md:px-10 lg:px-0 lg:flex-col lg:max-w-fit xl:max-w-full xl:flex-row justify-between m-4 lg:m-0 whitespace-nowrap">
                  <div className="flex bg-LVBO p-4 my-2 rounded-full text-white">
                    <ChefHat size={24} className="mr-2" />
                    <input
                      type="text"
                      value={recipe.type}
                      onChange={(e) => handleChange(e, "type")}
                      className="bg-LVBO text-white w-full"
                      title="Recipe Type"
                      required
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
                      required
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
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center pb-8">
          <div className="flex flex-row md:w-1/3 min-w-80 mx-4 mb-4 md:mb-0 rounded-2xl bg-mantis-100  border border-mantis-200 shadow-lg">
            <div className="flex flex-col w-full gap-4 p-6">
              <div className="text-2xl font-light font-centerBold py-2">
                Ingrediënten
              </div>
              <div className="flex flex-col gap-2  font-poppins">
                {recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center">
                    <textarea
                      value={ingredient}
                      onChange={(e) =>
                        handleArrayChange(e, index, "ingredients")
                      }
                      className="bg-white rounded-lg p-2 w-full resize-none overflow-hidden"
                      title="Recipe Ingredients"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteIngredient(index)}
                      className="ml-2 text-red-500"
                      title="Delete Ingredient"
                    >
                      <XCircle size={24} />
                    </button>
                  </div>
                ))}
                <div className="flex flex-col gap-2 items-center">
                  <textarea
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    className="bg-white rounded-lg p-2 w-full resize-none overflow-hidden"
                    placeholder="Typ hier een nieuw ingrediënt..."
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="ml-2 bg-mantis-600 text-white py-2 px-4 rounded-full transition duration-200 hover:bg-mantis-700"
                  >
                    Voeg ingrediënt toe
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row lg:flex-row md:w-2/3 mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100 border border-mantis-200 shadow-lg">
            <div className="flex flex-col gap-4 p-6 w-full">
              <div className="text-2xl font-light font-centerBold py-2">
                Stappen
              </div>
              <ol className="flex flex-col w-full list-decimal pl-4 space-y-4 font-poppins">
                {recipe.steps.map((step, index) => (
                  <div key={index}>
                    <ol>
                      <li className="flex items-center">
                        <textarea
                          value={step}
                          onChange={(e) => handleArrayChange(e, index, "steps")}
                          className="bg-white rounded-lg p-2 w-full resize-none overflow-hidden"
                          title="Recipe Steps"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteStep(index)}
                          className="ml-2 text-red-500"
                          title="Delete Step"
                        >
                          <XCircle size={24} />
                        </button>
                      </li>
                    </ol>
                    {addStepIndex === index && (
                      <div className="flex flex-col gap-2 items-start mt-2">
                        <textarea
                          value={newStep}
                          onChange={(e) => setNewStep(e.target.value)}
                          className="bg-white rounded-lg p-2 w-full resize-none overflow-hidden"
                          placeholder="Typ hier een nieuwe stap..."
                        />
                        <button
                          type="button"
                          onClick={() => handleAddStep(index)}
                          className="ml-2 bg-mantis-600 text-white py-2 px-4 rounded-full transition duration-200 hover:bg-mantis-700"
                        >
                          Voeg stap toe
                        </button>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setAddStepIndex(index)}
                      className="flex self-start mt-2 bg-LVBO text-white py-1 pl-1 pr-2 rounded-full transition duration-200 hover:bg-mantis-600"
                    >
                      <PlusCircle size={24} className="mr-2" />
                      stap invoegen
                    </button>
                  </div>
                ))}
                {addStepIndex === recipe.steps.length && (
                  <div className="flex flex-col items-center mt-2">
                    <textarea
                      value={newStep}
                      onChange={(e) => setNewStep(e.target.value)}
                      className="bg-white rounded-lg p-2 w-full resize-none overflow-hidden"
                      placeholder="Typ hier een nieuwe stap..."
                    />
                    <button
                      type="button"
                      onClick={() => handleAddStep(recipe.steps.length)}
                      className="ml-2 bg-mantis-700 text-white py-2 px-4 rounded-full transition duration-200 hover:bg-mantis-800"
                    >
                      Voeg stap toe
                    </button>
                  </div>
                )}
              </ol>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default ReceptEdit;
