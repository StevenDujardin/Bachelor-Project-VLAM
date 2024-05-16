import { Search } from "lucide-react";
import { FC } from "react";
import { Card } from "../components/Card";

export const ReceptenOveview: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end  w-full h-80  -z-10 object-cover bg-mantis-50">
        <div className="flex justify-center px-24 ">
          <div className="flex w-full pl-6 m-4 mb-8 bg-white shadow-md rounded-xl">
            <input
              className=" py-6 w-full outline-none"
              placeholder="Naar welk recept je be op zoek?"
            ></input>
            <Search size={32} className="m-6" />
          </div>
        </div>
      </div>
      <div className="h-screen">
        <div>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
          ></Card>
        </div>
      </div>
    </>
  );
};
