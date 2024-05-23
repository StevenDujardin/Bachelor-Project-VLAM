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

