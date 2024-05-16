import { FC } from "react";

export const Home: FC = () => {
  // Function to handle form submission
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Add logic for what happens when the form is submitted
    console.log("Form submitted!");
  };
  return (
    <>
      <img
        src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/Groep_Zomergroenten.jpg?h=3bdddb62&itok=jbb1-v-R"
        alt="groenten"
        className="w-full h-96 overflow-hidden -z-10 object-cover brightness-90"
      ></img>

      <div className="bg-white">
        <div>
          <div className="flex flex-row justify-center">
            <h1 className="font-centerBold text-4xl pt-10 pb-10">
              Welkom bij Kook AI
            </h1>
          </div>
          <div className="flex flex-row justify-center">
            <p className="font-poppins text-lg font-light w-1/2">
              Kook AI is een website waar je recepten kan vinden voor elke dag
              met lekkers uit eigen land. Heb je vragen over een recept, laat
              het ons weten via
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-row gap-8 m-10 p-20 bg-[#f3faf0] rounded-2xl shadow-xl"
        >
          <div className=" flex flex-col gap-4 w-1/2">
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
            ></textarea>

            <button
              type="submit"
              className="bg-[#046a38] text-white rounded-lg p-2"
            >
              Genereer Recept
            </button>
          </div>
          <div className="pt-10 flex flex-col gap-4 text-md font-medium">
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
