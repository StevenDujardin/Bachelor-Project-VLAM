import axios from "axios";
import { FC, useEffect, useState } from "react";
import { ReceptProps } from "../pages/Recept";

export const ScrollingBanner: FC = () => {
  const [images, setImages] = useState<Array<string>>([]);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;

      const response = await axios.get(
        `${apiUrl}/recipes?page=1&pageSize=16`,
        {
          headers: {
            Accept: "*/*",
          },
        }
      );
      const { data } = response.data;
      // store every image in an array
      const images = data.map((recipe: ReceptProps) => recipe.image);
      setImages(images);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="relative w-screen flex space-x-4  md:space-x-16 overflow-hidden max-w-full group">
        {/* Gradient overlays for fading effect */}
      <div className="absolute top-0 bottom-0 left-0 z-20 w-16 bg-gradient-to-r from-white to-transparent"></div>
      <div className="absolute top-0 bottom-0 right-0 z-20 w-16 bg-gradient-to-l from-white to-transparent"></div>

      <div className="flex space-x-4 md:space-x-16 animate-loop-scroll group-hover:paused">
        {images.map((image, index) => (
          <img
            className="w-20 h-20 md:w-36 md:h-36 max-w-none object-cover rounded-lg md:rounded-xl"
            key={index}
            src={image}
            alt={`Recept ${index + 1}`}
          />
        ))}
      </div>
      <div className="flex space-x-4 md:space-x-16 animate-loop-scroll group-hover:paused" aria-hidden="true">
        {images.map((image, index) => (
          <img
            className="w-20 h-20 md:w-36 md:h-36 max-w-none object-cover rounded-lg md:rounded-xl"
            key={index}
            src={image}
            alt={`Recept ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
