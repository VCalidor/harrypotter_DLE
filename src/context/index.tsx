import { createContext, useContext, useEffect, useState } from "react";
import { Character } from "../interfaces";

interface MyContextType {
  allCharacters: Character[];
  loading: boolean;
}

const MyContext = createContext<MyContextType>({
  allCharacters: [],
  loading: true,
});

export const MyProvider = ({ children }: { children: React.ReactNode }) => {
  const [allCharacters, setAllCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lsAllCharacters = localStorage.getItem("allCharacters");

    if (lsAllCharacters) {
      setAllCharacters(JSON.parse(lsAllCharacters));
      setLoading(false);
    } else getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const response = await fetch(
        // "http://localhost:3000/api/characters",
        "https://harrypotterdle-api.onrender.com/api/characters",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("kalalala");
      
      const data: Character[] = await response.json();

      localStorage.setItem("allCharacters", JSON.stringify(data));
      setAllCharacters(data);
    } catch (error) {
      console.error("Erro ao buscar os personagens:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MyContext.Provider value={{ allCharacters, loading }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
