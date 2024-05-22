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
              Wat is een prompt?
            </div>
            <p>
              Een prompt is een instructie of vraag die je aan de AI geeft om een recept te genereren. Zorg ervoor dat je prompt in het Nederlands is voor de beste resultaten.
            </p>
        {[
          {
            
            title: "Gebruik Lokaal Geproduceerde Ingrediënten",
            description:
              "Wanneer je AI gebruikt om recepten te genereren, zorg ervoor dat je instructies geeft om lokale ingrediënten te gebruiken. Dit verbetert niet alleen de smaak, maar ondersteunt ook de lokale economie. Er zal een foutmelding worden meegegeven als dit geen lokaal product is!",
            image:
              "https://assets-global.website-files.com/65b77b4c4401f4eb13b755ec/65b77b4c4401f4eb13b75dda_Spagetti.webp",
          },
          {
            title: "Wees Specifiek in je Prompt",
            description:
              "Een goede prompt zorgt voor betere resultaten. Geef specifieke details zoals de gewenste keuken, hoofdingrediënten en eventuele dieetbeperkingen. Schrijf je prompt ook in het Nederlands.",
            image:
              "https://res.cloudinary.com/teepublic/image/private/s--M8luqZWa--/t_Resized%20Artwork/c_fit,g_north_west,h_954,w_954/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_ffffff,e_outline:48/co_ffffff,e_outline:inner_fill:48/co_bbbbbb,e_outline:3:1000/c_mpad,g_center,h_1260,w_1260/b_rgb:eeeeee/c_limit,f_auto,h_630,q_auto:good:420,w_630/v1701727775/production/designs/54109275_0.jpg",
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
              Hou je prompt kort en krachtig en gebruik de filters om je vraag te specificeren.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
