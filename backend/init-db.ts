// Execute: npx ts-node init-db.ts

import { PrismaClient } from '@prisma/client';
export * from '.prisma/client';

const prisma = new PrismaClient();

const main = async () => {

    //Create some recipes
    const aardbeienTaart = await prisma.recipe.create({
      data: {
          title: "AardbeienTaart",
          description: "Gooi aardbeien op een taart",
          duration: "2 min",
          steps: ["Neem taart", "Gooi er aardbeien op"],
          difficulty: "makkelijk",
          type: "dessert",
          ingredients: ["Aardbeien", "Taart"]   

      }
  });

  const CaesarsaladeKip = await prisma.recipe.create({
    data: {
        title: "CaesarsaladeKip",
        description: "Slaatje met Kip",
        duration: "5 min",
        steps: ["Neem taart", "Gooi er aardbeien op"],
        difficulty: "makkelijk",
        type: "dessert",
        ingredients: ["4 kippenbillen", "2 eierdooiers","2 teentjes look","½ limoen of citroen",
        "1 eetlepel mosterd","15 cl arachideolie","1 dl natuuryoghurt","cayennepeper",
        "Engelse saus (Worchestershiresaus)","3 zoute ansjovisfilets","1 krop Romeinse sla","1 ongesneden toastbrood"
      ,"klontjes boter","olijfolie","100 g Parmezaanse kaas in blok"]

    }
});
  const PastaCarbonara = await prisma.recipe.create({
    data: {
        title: "Pasta Carbonara",
        type: "Pasta",
        duration: "30 min",
        difficulty: "Easy",
        description: "Een heerlijke salade met kazen van bij ons? Dat kan! Probeer deze heerlijke maaltijdsalade met Flandrien kaas die de show steelt. Gecombineerd met het fruit en de karnemelkdressing krijg je een frisse toets bij het gerecht. Puur genieten!",
        ingredients: ["500g pasta", "4 eggs", "200 g bacon", "150 g cheese", "salt"],
        steps: [
          "Doe alle ingrediënten voor de dressing in een afsluitbaar potje of bokaal, kruid met peper en zout en schud tot een romige dressing. Zet koel weg.",
          "Snijd het brood in blokjes.Pers de look en roerbak 30 seconden in olijfolie. Voeg de broodblokjes en het takje rozemarijn toe en bak het brood goudbruin en knapperig. Kruid met peper en zout.",
          "Hussel de rucola onder de groene sla en schik op een mooie schaal. Verdeel er de bramen en de in plakjes gesneden rode bietjes over. Verbrokkel er de kaas over en bestrooi met de croutons.Druppel er de dressing over en serveer.",
        ],
    }
  });
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


export default prisma;

