import { ChefHat, SignalHigh, Timer } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export interface CardProps {
  image: string;
  title: string;
  type: string;
  duration: string;
  difficulty: string;
  recipe_id: number;
}

export const Card: FC<CardProps> = ({
  image,
  title,
  type,
  duration,
  difficulty,
  recipe_id,
}) => {
  const navigate = useNavigate();

  const redirectToRecept = () => {
    navigate(`/recepten/${recipe_id}`);
  };
  return (
    <div
      className="flex flex-row lg:flex-row lg:w-80 h-full max-h-fit mx-4 rounded-2xl overflow-hidden object-cover shadow-xl transition duration-300 hover:shadow-2xl hover:translate-y-2 hover:scale-105 cursor-pointer select-none"
      onClick={redirectToRecept}
    >
      <div className="flex flex-row lg:flex-col gap-4 p-2 md:p-4">
        <img
          src={image}
          alt="img"
          className=" max-w-32  lg:max-w-72 overflow-hidden object-cover rounded-lg shadow-lg aspect-square"
        ></img>
        <div className="flex flex-col justify-between lg:h-2/5">
          <div className=" text-md md:text-xl font-light font-centerBold my-2 line-clamp-3 h-max">
            {title}
          </div>
          <div className="flex flex-col gap-2 text-sm md:text-base ">
            <div className="flex">
              <ChefHat size={24} className="mr-2" />
              <p>{type}</p>
            </div>
            <div className="flex">
              <Timer size={24} className="mr-2" />
              <p>{duration} min</p>
            </div>
            <div className="flex">
              <SignalHigh size={24} className="mr-2" />
              <p>{difficulty}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
