import { FC } from "react";

export const OverOns: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end  w-full h-80  -z-10 object-cover bg-[#6cc24a]">
        <div className="flex justify-center px-24 w-1/2 ">
          <h1 className="font-centerBold text-white text-4xl pb-16">
            Wie zijn we
          </h1>
        </div>
      </div>
      <div className=" w-screen h-16 bg-[#f3faf0]"></div>
      <div className="px-24">
        <div className="flex justify-center font-poppins">
          <p className=" text-lg w-md">
            VLAM, het Vlaams Centrum voor Agro- en Visserijmarketing, voert
            promotie voor de Vlaamse landbouw- en visserijsector. VLAM werkt in
            opdracht van het bedrijfsleven en de Vlaamse overheid. Via de
            recepten op deze website wil VLAM consumenten aanmoedigen om te
            kiezen voor groenten, fruit, aardappelen, vlees, eieren, zuivel, vis
            en bier van bij ons.
          </p>
        </div>
      </div>
    </>
  );
};
