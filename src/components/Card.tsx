import { ChefHat, SignalHigh, Timer } from "lucide-react";
import { FC } from "react";

interface CardProps {
  image: string;
  title: string;
  type: string;
  duration: string;
  difficulty: string;
}

export const Card: FC<CardProps> = ({
  image,
  title,
  type,
  duration,
  difficulty,
}) => {
  return (
    <div className="flex flex-col w-80 m-2 rounded-2xl object-cover shadow-xl transition-shadow duration-300 hover:shadow-2xl">
      <img
        src={image}
        alt="img"
        className=" rounded-t-2xl object-cover over"
      ></img>
      <div className="flex flex-col gap-4 p-8">
        <div className=" text-2xl font-light font-centerBold">{title}</div>
        <div className="flex">
          <ChefHat size={24} className="mr-2" />
          <p>{type}</p>
        </div>
        <div className="flex">
          <Timer size={24} className="mr-2" />
          <p>{duration}</p>
        </div>
        <div className="flex">
          <SignalHigh size={24} className="mr-2" />
          <p>{difficulty}</p>
        </div>
      </div>
    </div>
  );
};
