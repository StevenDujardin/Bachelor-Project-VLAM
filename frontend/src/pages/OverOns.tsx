import { FC } from "react";

export const OverOns: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end  w-full h-60 md:h-80 -z-10 object-cover bg-[#6cc24a]">
        <div className="flex self-center mx-24 w-screen max-w-7xl ">
          <h1 className="font-centerBold text-white text-4xl pb-8 md:pb-16 px-8 xl:px-0">
            Wie zijn we?
          </h1>
        </div>
      </div>
      <div className="w-screen md:h-16 bg-[#f3faf0]"></div>
      <div className="flex flex-col md:max-w-7xl px-10  self-center gap-10 font-poppins text-md font-light ">
        <p className="pt-11">
          VLAM, het Vlaams Centrum voor Agro- en Visserijmarketing, voert
          promotie voor de Vlaamse landbouw- en visserijsector. VLAM werkt in
          opdracht van het bedrijfsleven en de Vlaamse overheid. Via de recepten
          op deze website wil VLAM consumenten aanmoedigen om te kiezen voor
          groenten, fruit, aardappelen, vlees, eieren, zuivel, vis en bier van
          bij ons.
        </p>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/Balletjes%20van%20champignons%20en%20bonen%20met%20mosterdsaus_%283%29_.jpg?itok=zNDydGb-"
            alt="img"
            className=" h-64 object-cover  rounded-2xl md:rounded-none md:rounded-l-2xl"
          ></img>
          <div className="flex flex-col gap-4">
            <div className=" text-2xl font-light font-centerBold">
              Koken met het beste van hier
            </div>
            <p>
              Een recept voor stoofvlees met frieten nodig? No problemo! Liever
              een hapje voor bij het aperitief? Hopla, gevonden. Een recept voor
              pannenkoeken? Dik in orde. Of een zomerse salade? Check! Onze
              nieuwste receptenfolders kan je bestellen of downloaden via onze
              webwinkel.
            </p>
            <p>
              We hebben recepten voor elke dag met lekkers uit eigen land. Heb
              je vragen over een recept, laat het ons weten via
              info@lekkervanbijons.be.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-8">
          <img
            src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/Groep_Zomergroenten.jpg?h=3bdddb62&itok=jbb1-v-R"
            alt="img"
            className=" h-64 object-cover rounded-2xl md:rounded-none md:rounded-r-2xl"
          ></img>
          <div className="flex flex-col gap-4">
            <div className=" text-2xl font-light font-centerBold">
              Smullen van elk seizoen
            </div>
            <p>
              Vlees, vis, groenten of fruit, met onze themarecepten tover je in
              de keuken met de rijkdom van elk seizoen.
            </p>
            <p>
              Winter, zomer, lente of herfst, ga aan de slag met ingrediënten
              die net van het veld komen of producten die nu op hun best zijn.
            </p>
            <p>Koop slim met volgende tips</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/Slagerij%20VVIB%201.jpg?itok=gdiByPma"
            alt="img"
            className=" h-64 object-cover rounded-2xl md:rounded-none md:rounded-l-2xl"
          ></img>
          <div className="flex flex-col gap-4">
            <div className=" text-2xl font-light font-centerBold">
              Onberispelijke kwaliteit
            </div>
            <p>
              In Vlaanderen gelden uiterst strenge normen voor
              voedselveiligheid. Kook je met producten van bij ons dan ben je
              zeker van een onberispelijke kwaliteit. In de winkel zijn het
              Europese bio-label en het label Meesterlyck een extra hulp bij een
              bewuste keuze.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row-reverse gap-8">
          <img
            src="https://www.lekkervanbijons.be/sites/default/files/styles/1200w/public/images/vissersboot_met_vissers.jpg?itok=RTY343kN"
            alt="img"
            className=" h-64object-cover rounded-2xl md:rounded-none md:rounded-r-2xl"
          ></img>
          <div className="flex flex-col gap-4">
            <div className=" text-2xl font-light font-centerBold">
              Proeven van vakmanschap
            </div>
            <p>
              Het onmiskenbare oog voor detail en de fierheid van de maker, dat
              proef je. De passie van de bakker, de traditie van het slagersvak,
              de trots van de visser en de technische kennis van de teler. In de
              ingrediënten van elk recept schuilt onversneden vakmanschap van
              bij ons.
            </p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};
