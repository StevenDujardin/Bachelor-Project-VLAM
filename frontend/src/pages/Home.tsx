import axios from "axios";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home: FC = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle textarea change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/generate", {
        message: message,
      });
      console.log(response.data);
      navigate(`/recepten/${response.data.recipe_id}`);

      // Add logic for what to do with the response here
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <img
        src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/Groep_Zomergroenten.jpg?h=3bdddb62&itok=jbb1-v-R"
        alt="groenten"
        className="w-full h-96 overflow-hidden object-cover brightness-90"
      ></img>

      <div className="bg-white max-w-7xl items-center justify-center self-center place-content-center ">
        <div>
          <div className="flex flex-row justify-center">
            <h1 className="font-centerBold text-4xl pt-10 pb-10">
              Welkom bij Kook AI
            </h1>
          </div>
          <div className="flex flex-row justify-center">
            <p className="font-poppins text-lg font-light px-6 md:w-1/2">
              Kook AI is een website waar je recepten kan vinden voor elke dag
              met lekkers uit eigen land. Heb je vragen over een recept, laat
              het ons weten via
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex  flex-col md:flex-row md:gap-8 m-4 md:m-10 p-4 md:p-20 bg-[#f3faf0] rounded-2xl shadow-xl"
        >
          <div className=" flex flex-col gap-4 md:w-2/3  lg:w-2/3 ">
            <label
              htmlFor="recipeRequest"
              className="text-2xl font-light font-centerBold"
            >
              Kook AI
            </label>

            <textarea
              id="recipeRequest"
              name="recipeRequest"
              className="w-full"
              cols={30}
              rows={7}
              placeholder="Geef mij een recept voor een aardbeientaart"
              value={message} // Use the state to control the input
              onChange={handleChange} // Update the state on input change
            ></textarea>

            <button
              type="submit"
              className="bg-[#046a38] text-white rounded-lg p-2"
            >
              Genereer Recept
            </button>
          </div>
          <div className="pt-10 flex flex-col gap-4 md:w-1/2 text-md font-medium">
            <p>
              Vraag aan de kook AI om een recept te genereren met jouw favoriete
              ingrediënten van bij ons
            </p>
            <p>
              Bijvoorbeeld --&gt; Geef mij een recept voor een aardbeientaart
            </p>
          </div>
        </form>
      </div>
    </>
  );
};
