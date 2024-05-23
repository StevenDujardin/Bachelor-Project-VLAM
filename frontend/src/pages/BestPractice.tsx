import { FC } from "react";

export const BestPractice: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end w-full h-80 object-cover bg-[#6cc24a]">
        <div className="flex self-center mx-24 w-screen max-w-7xl">
          <h1 className="font-centerBold text-white text-4xl pb-16 px-8 md:px-0">
            Best Practices voor AI-Gegenereerde Recepten
          </h1>
        </div>
      </div>
      <div className="w-screen md:h-16 bg-mantis-50"></div>
      <div className="flex flex-col max-w-7xl self-center gap-10 font-poppins text-md font-light p-8">
        <div className="text-xl font-light font-centerBold mt-4">
          Wat doet het?
        </div>
        <p>
          Dankzij AI kunnen recepten op maat gegenereerd worden die aansluiten bij jouw specifieke wensen en voorkeuren. AI kan recepten samenstellen op basis van de ingrediënten die je in huis hebt, bepaalde dieetwensen zoals glutenvrij of veganistisch, en zelfs je voorkeur voor bepaalde keukens of kooktechnieken. Dit maakt het koken niet alleen eenvoudiger, maar ook leuker en meer gepersonaliseerd.
        </p>
        <div className="text-xl font-light font-centerBold mt-4">
          Wat is een prompt?
        </div>
        <p>
          Een prompt is een instructie of vraag die je aan de AI geeft om een recept te genereren. Zorg ervoor dat je prompt in het Nederlands is voor de beste resultaten, zodat de AI jouw voorkeuren en behoeften optimaal kan begrijpen en verwerken.
        </p>
        {[
          {
            title: "Gebruik Lokaal Geproduceerde Ingrediënten",
            description:
              "Wanneer je AI gebruikt om recepten te genereren, zorg ervoor dat je instructies geeft om lokale ingrediënten te gebruiken. Dit verbetert niet alleen de smaak en kwaliteit van je gerechten, maar ondersteunt ook de lokale economie en vermindert de ecologische voetafdruk. Lokale producten zijn vaak verser en bevatten meer voedingsstoffen, wat bijdraagt aan een gezondere maaltijd. Bovendien zal de AI een foutmelding geven als een product niet lokaal is, zodat je altijd verzekerd bent van de beste ingrediënten.",
            image:
              "https://www.techopedia.com/wp-content/uploads/2023/09/How-to-Write-AI-Prompts-1.png",
          },
        ].map((practice, index) => (
          <div className="flex flex-col md:flex-row gap-8" key={index}>
            <img
              src={practice.image}
              alt="img"
              className="h-64 rounded-2xl object-cover"
            />
            <div className="flex flex-col gap-4">
              <div className="text-2xl font-light font-centerBold">
                {practice.title}
              </div>
              <p>{practice.description}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-col gap-4">
          <div className="text-4xl font-light font-centerBold">
            Voorbeeld van een Prompt
          </div>
          <div className="flex flex-col gap-4">
            <div className="text-xl font-light font-centerBold mt-4">
              Goede Voorbeelden:
            </div>
            <div className="p-4 border-l-4 border-green-500 bg-green-50 rounded-md">
              <p className="italic">
                "Geef een recept voor aardbeientaart."
              </p>
              <p className="italic">
                "Geef mij een recept met pasta dat lactosevrij is."
              </p>
              <p className="italic">
                "Geef mij een gezond recept voor het middagmaal met salade."
              </p>
            </div>
            <p className="mt-4">
              Hou je prompt kort en krachtig en gebruik de filters om je vraag te specificeren. Een duidelijke en gedetailleerde prompt helpt de AI om recepten te genereren die nauw aansluiten bij jouw wensen en behoeften.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
