import { FC } from "react";
import { ChefHat, SignalHigh, Timer } from "lucide-react";

interface ReceptProps {
  image: string;
  title: string;
  type: string;
  duration: string;
  difficulty: string;
  id: number;
  description: string;
  ingredients: string[];
  steps: string[];
}

const ReceptExample: ReceptProps = {
  image:
    "https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA",
  title: "Pasta Carbonara",
  type: "Pasta",
  duration: "30 min",
  difficulty: "Easy",
  id: 1,
  description:
    "Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!",
  ingredients: ["pasta", "eggs", "bacon", "cheese"],
  steps: [
    "Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.",
    "Snijd het brood in blokjes.Pers de look en roerbak 30 seconden in olijfolie. Voeg de broodblokjes en het takje rozemarijn toe en bak het brood goudbruin en knapperig. Kruid met peper en zout.",
    "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons.Druppel er de dressing over en serveer.",
  ],
};

export const Recept: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end w-full h-52 object-cover bg-mantis-50 font-poppins"></div>
      <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center py-8">
        <div className="flex flex-row lg:flex-row lg:w-screen mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100">
          <div className="flex flex-row lg:flex-row gap-10 p-6">
            <img
              src={ReceptExample.image}
              alt="img"
              className=" w-2/3  rounded-lg shadow-lg"
            ></img>

            <div className="flex flex-col justify-between w-1/3">
              <div>
                <div className=" text-5xl font-light font-centerBold py-2">
                  {ReceptExample.title}
                </div>
                <div className=" text-xl font-light py-2">
                  {ReceptExample.description}
                </div>
              </div>

              <div className="flex flex-row justify-between mx-4">
                <div className="flex bg-LVBO p-4 rounded-full text-white">
                  <ChefHat size={24} className="mr-2" />
                  <p>{ReceptExample.type}</p>
                </div>
                <div className="flex bg-LVBO p-4 rounded-full text-white">
                  <Timer size={24} className="mr-2" />
                  <p>{ReceptExample.duration}</p>
                </div>
                <div className="flex bg-LVBO p-4 rounded-full text-white">
                  <SignalHigh size={24} className="mr-2" />
                  <p>{ReceptExample.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row w-screen max-w-7xl self-center pb-8">
        <div className="flex flex-row lg:flex-row lg:w-1/3 mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100">
          <div className="flex flex-col gap-4 p-6">
            <div className=" text-2xl font-light font-centerBold py-2">
              Ingredients
            </div>
            <div className="flex flex-col gap-2 divide-y divide-LVBO font-poppins w-fit">
              {ReceptExample.ingredients.map((ingredient) => (
                <div className="flex pt-2">
                  <p>{ingredient}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-row lg:flex-row lg:w-2/3 mx-4 rounded-2xl overflow-hidden object-cover bg-mantis-100">
          <div className="flex flex-col gap-4 p-6">
            <div className="text-2xl font-light font-centerBold py-2">
              Steps
            </div>
            <ol className="list-decimal pl-4 space-y-4 divide-y divide-LVBO font-poppins">
              {ReceptExample.steps.map((step, index) => (
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
