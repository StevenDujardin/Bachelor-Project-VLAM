import { Search } from "lucide-react";
import { FC } from "react";
import { Card, CardProps } from "../components/Card";
export const ReceptenOveview: FC = () => {
  return (
    <>
      <div className="flex flex-col justify-end w-full h-80 object-cover bg-mantis-50">
        <div className="flex justify-center px-24 ">
          <div className="flex w-full max-w-5xl pl-6 m-4 mb-8 bg-white shadow-md rounded-xl">
            <input
              className=" py-6 w-full outline-none"
              placeholder="Naar welk recept je be op zoek?"
            ></input>
            <Search size={32} className="m-6" />
          </div>
        </div>
      </div>
      <div className="flex  flex-col md:flex-row w-screen max-w-7xl self-center h-max pt-20">
        <form className=" w-80">
          <div className=" font-centerBold text-xl">Filters</div>
          <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
            <div className="text-md font-centerBold">Type gerecht:</div>
            <div className="flex flex-col p-4 gap-2 divide-y ">
              <div className="flex gap-2">
                <input
                  title="dranken"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="typeDish"
                  value="dranken"
                ></input>
                <label>Dranken</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="voorgerecht"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="typeDish"
                  value="voorgerecht"
                  id="voorgerecht"
                ></input>
                <label htmlFor="voorgerecht">Voorgerecht</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="hoofdgerecht"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="typeDish"
                  value="hoofdgerecht"
                ></input>
                <label>Hoofdgerecht</label>
              </div>
              <div className="flex gap-2 pt-2">
                <input
                  title="dessert"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="typeDish"
                  value="dessert"
                ></input>
                <label>Dessert</label>
              </div>
            </div>
          </div>
          <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
            <div className="text-md font-centerBold">Tijdsduur:</div>
            <div className="flex flex-col p-2 gap-2 divide-y">
              <div className="flex gap-2">
                <input
                  title="15 minuten"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="15"
                ></input>
                <label>&lt;= 15 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="30 minuten"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="30"
                ></input>
                <label>&lt;= 30 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="45 minuten"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="45"
                ></input>
                <label>&lt;= 45 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="60 minuten"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="60"
                ></input>
                <label>&lt;= 60 minuten</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="90 minuten"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="duration"
                  value="120"
                ></input>
                <label>&lt;= 120 minuten</label>
              </div>
            </div>
          </div>
          <div className=" m-2 p-2 bg-mantis-50 rounded-xl">
            <div className="text-md font-centerBold">Moeilijkheidsgraad:</div>
            <div className="flex flex-col p-2  gap-2 divide-y">
              <div className="flex gap-2">
                <input
                  title="gemakkelijk"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty"
                  value="gemakkelijk"
                ></input>
                <label>Gemakelijk</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="gemiddeld"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty"
                  value="gemiddeld"
                ></input>
                <label>Gemiddeld</label>
              </div>
              <div className="flex gap-2">
                <input
                  title="moeilijk"
                  type="checkbox"
                  className="hover:accent-mantis-600 accent-mantis-500"
                  name="difficulty"
                  value="moelijk"
                ></input>
                <label>Moeilijk</label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className=" flex justify-self-center mx-2 py-2 px-4 bg-mantis-500 text-white rounded-md hover:bg-mantis-600 transition duration-200"
          >
            Filters toepassen
          </button>
        </form>
        <div>
          <div></div>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 grid-cols-1 gap-8">
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="gemiddeld"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="gemiddeld"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
            id={6}
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
            id={5}
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="gemiddeld"
            id={4}
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
            id={3}
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
            id={2}
          ></Card>
          <Card
            image="https://www.lekkervanbijons.be/sites/default/files/styles/default_thumb_cropped/public/images/Maaltijdsalade%20met%20fruit%2C%20Flandrien%20kaas%20en%20karnemelkdressing%20%2002.jpg?itok=IsrdEPoA"
            title="Maaltijdsalade met fruit, Flandrien kaas en karnemelkdressing"
            type="Hoofdgerecht"
            duration="30min"
            difficulty="2"
            id={1}
          ></Card>
        </div>
      </div>
    </>
  );
};
