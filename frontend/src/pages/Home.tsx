import axios, { AxiosError } from "axios";
import { Sparkles } from "lucide-react";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrollingBanner } from "../components/ScrollingBanner";

interface ErrorResponse {
  status: string;
  // add any other expected properties here
}

export const Home: FC = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ErrorResponse>();
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  // Function to handle textarea change
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(event.target.value);
    setError(undefined);
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent) => {
    setError(undefined);
    event.preventDefault();
    // Check if the message is empty
    if (!message.trim()) {
      setError({ status: "De berichtinhoud mag niet leeg zijn." });
      return; // Prevent the form submission
    }
    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/generate`, {
        message: message,
        type: type,
        duration: duration,
        difficulty: difficulty,
      });

      setIsLoading(false);
      console.log(response.data);
      navigate(`/recepten/${response.data.recipe_id}`);
    } catch (error: unknown) {
      if (error instanceof Error && "response" in error) {
        const axiosError = error as AxiosError;

        if (axiosError.response) {
          setError(axiosError.response.data as ErrorResponse);
        }
      }
      setIsLoading(false);
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
          <div className="flex flex-col justify-center items-center text-center">
            <p className="font-poppins text-lg font-light px-6 md:w-1/2">
              Ontdek unieke recepten gegenereerd door onze geavanceerde AI. Geef
              je voorkeuren aan en geniet van op maat gemaakte culinaire
              mogelijkheden.
            </p>
            <br />
            <p className="font-poppins text-lg font-light px-6 md:w-1/2">
              Koken is nog nooit zo eenvoudig en leuk geweest!
            </p>
          </div>
        </div>
        <div className="relative overflow-hidden max-w-full my-4">
          <ScrollingBanner />
        </div>

        <div className=" m-4 md:m-10 p-4 md:p-10 bg-mantis-50 border border-mantis-200 rounded-2xl shadow-xl">
          <label
            htmlFor="recipeRequest"
            className="text-2xl flex gap-1 items-center  font-light font-centerBold"
          >
            Kook AI{" "}
            <Sparkles
              size={18}
              fill="green"
              className="text-green-700"
            ></Sparkles>
          </label>
          <form
            onSubmit={handleSubmit}
            className="flex  flex-col md:flex-row md:gap-8"
          >
            <div className=" flex flex-col gap-4 md:w-2/3  lg:w-2/3 ">
              <textarea
                id="recipeRequest"
                name="recipeRequest"
                className={`block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border ${error ? "border-red-500 focus:outline-none focus:ring-red-500 focus:border-red-500" : "border-mantis-200 focus:outline-none focus:ring-mantis-500 focus:border-mantis-500"}`}
                cols={30}
                rows={7}
                placeholder="Geef mij een recept voor een aardbeientaart"
                value={message}
                onChange={handleChange}
              ></textarea>
              {error && (
                <p className="text-center font-semibold text-red-500">
                  {error.status}
                </p>
              )}

              <button
                type="submit"
                className="bg-lvboSpectrum-500 hover:bg-lvboSpectrum-600 transition duration-200 active:bg-lvboSpectrum-700 text-white font-centerBold text-lg rounded-lg p-2"
                {...(isLoading && { disabled: true })}
              >
                {isLoading ? "Laden..." : "Genereer Recept"}
              </button>
              {isLoading && (
                <div className="flex justify-center items-center">
                  <div className="spinner"></div>
                  <svg
                    aria-hidden="true"
                    className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-300 fill-LVBO"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841O9186C95.2932 28.8229C95.2932 24.3692C93.9676 39.0409ZM9.08144 9.08144 50.5908.59082ZM0.590SM9.08144 27.9726 20.348"></path>
                  </svg>
                </div>
              )}
            </div>
            <div className="flex flex-col mt-2 md:mt-0 gap-4 md:w-1/2 text-md font-medium">
              <div className="flex md:flex-col lg:flex-row gap-2">
                <select
                  title="Type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-mantis-200 focus:outline-none focus:ring-mantis-500 focus:border-mantis-500"
                >
                  <option value="">Type</option>
                  <option value="dranken">Dranken</option>
                  <option value="voorgerecht">Voorgerecht</option>
                  <option value="hoofdgerecht">Hoofdgerecht</option>
                  <option value="dessert">Dessert</option>
                </select>

                <select
                  title="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-mantis-200 focus:outline-none focus:ring-mantis-500 focus:border-mantis-500"
                >
                  <option value="">Tijdsduur</option>
                  <option value="15">&lt;= 15 minuten</option>
                  <option value="30">&lt;= 30 minuten</option>
                  <option value="45">&lt;= 45 minuten</option>
                  <option value="60">&lt;= 60 minuten</option>
                  <option value="120">&lt;= 120 minuten</option>
                </select>

                <select
                  title="moeilijkheid"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-mantis-200 focus:outline-none focus:ring-mantis-500 focus:border-mantis-500"
                >
                  <option value="">Moeilijkheid</option>
                  <option value="makkelijk">Gemakkelijk</option>
                  <option value="gemiddeld">Gemiddeld</option>
                  <option value="moeilijk">Moeilijk</option>
                </select>
              </div>
              <div>
                Raadpleeg onze{" "}
                <a
                  href="/best-practices"
                  className="text-mantis-600 border-mantis-300 border-b-2 hover:text-mantis-900"
                >
                  best practices
                </a>{" "}
                voor een goede prompt.
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
