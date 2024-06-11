import { FC } from "react";

export const BestPractice: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end w-full  h-60 md:h-80 object-cover bg-[#6cc24a]">
        <div className="flex self-center mx-24 w-screen max-w-7xl">
          <h1 className="font-centerBold text-white text-4xl pb-16 px-8 md:px-0">
            Tips voor AI-Gegenereerde Recepten
          </h1>
        </div>
      </div>
      <div className="w-screen md:h-16 bg-mantis-50"></div>
      <div className="flex flex-col max-w-7xl self-center gap-10 font-poppins text-md font-light p-8">
        <div className="text-2xl font-light font-centerBold mt-4">
          Wat is het?
        </div>
        <p className="leading-relaxed text-gray-700">
          Dankzij AI kunnen recepten op maat gegenereerd worden die aansluiten
          bij jouw specifieke wensen en voorkeuren. AI kan recepten samenstellen
          op basis van de ingrediënten die je in huis hebt, bepaalde dieetwensen
          zoals glutenvrij of veganistisch, en zelfs je voorkeur voor bepaalde
          keukens of kooktechnieken. Dit maakt het koken niet alleen
          eenvoudiger, maar ook leuker en meer gepersonaliseerd. Stel je voor
          dat je nooit meer hoeft te zoeken naar het perfecte recept – de AI
          doet het voor je!
        </p>
        <div className="text-2xl font-light font-centerBold mt-4">
          Wat is een prompt?
        </div>
        <p className="leading-relaxed text-gray-700">
          Een prompt is een instructie of vraag die je aan de AI geeft om een
          recept te genereren. Zorg ervoor dat je prompt in het Nederlands is
          voor de beste resultaten, zodat de AI jouw voorkeuren en behoeften
          optimaal kan begrijpen en verwerken. Denk aan een prompt als een korte
          omschrijving van wat je zoekt.
        </p>

        <div className="flex flex-col gap-8">
          <div className="text-2xl font-light font-centerBold text-gray-800 mt-8">
            Gebruik Lokaal Geproduceerde Ingrediënten
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <img
              src="images/How-to-Write-AI-Prompts.png"
              alt="Gebruik Lokaal Geproduceerde Ingrediënten"
              className="h-64 rounded-2xl object-cover shadow-lg"
            />
            <p className="leading-relaxed text-gray-700">
              Wanneer je AI gebruikt om recepten te genereren, zorg ervoor dat
              je instructies geeft om lokale ingrediënten te gebruiken. Dit
              verbetert niet alleen de smaak en kwaliteit van je gerechten, maar
              ondersteunt ook de lokale economie en vermindert de ecologische
              voetafdruk. Lokale producten zijn vaak verser en bevatten meer
              voedingsstoffen, wat bijdraagt aan een gezondere maaltijd.
              Bovendien zal de AI een foutmelding geven als een product niet
              lokaal is, zodat je altijd verzekerd bent van de beste
              ingrediënten.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <div className="text-3xl font-light font-centerBold mt-8">
            Voorbeelden van Goede Prompts
          </div>
          <div className="p-4 border-l-4 border-[#6cc24a] bg-[#f3faf0] rounded-md shadow-md">
            <p className="italic text-gray-700">
              "Geef een recept voor aardbeientaart."
            </p>
            <p className="italic text-gray-700">
              "Geef mij een recept met pasta dat lactosevrij is."
            </p>
            <p className="italic text-gray-700">
              "Geef mij een gezond recept voor het middagmaal met salade."
            </p>
          </div>
          <p className="mt-4 leading-relaxed text-gray-700">
            Hou je prompt kort en krachtig en gebruik de filters om je vraag te
            specificeren. Een duidelijke en gedetailleerde prompt helpt de AI om
            recepten te genereren die nauw aansluiten bij jouw wensen en
            behoeften. Voeg eventueel extra informatie toe zoals kooktijd of
            moeilijkheidsniveau.
          </p>
        </div>

        <div className="flex flex-col gap-8">
          <div className="text-2xl font-light font-centerBold text-gray-800 mt-8">
            Experimenteer en Leer
          </div>
          <p className="leading-relaxed text-gray-700">
            Het mooie aan AI-gegenereerde recepten is dat je kunt experimenteren
            zonder veel risico. Probeer verschillende prompts en ontdek nieuwe
            gerechten die je misschien nooit eerder had overwogen. Gebruik deze
            kans om je kookkunsten te verbeteren en je smaakpalet uit te
            breiden.
          </p>
        </div>
      </div>
    </>
  );
};
