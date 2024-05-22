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

