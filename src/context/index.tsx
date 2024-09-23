import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
import { Character } from "../interfaces";
import { decryptData } from "../utils";

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
    const infiniteFire = JSON.parse(
      localStorage.getItem("infiniteFire") || "[]"
    );
    const dailyFire = JSON.parse(localStorage.getItem("dailyFire") || "[]");
    const lsAllCharacters = localStorage.getItem("allCharacters");

    if (dailyFire.length > 0)
      !checkIfIsValid(dailyFire) && localStorage.removeItem("dailyFire");
    if (infiniteFire.length > 0)
      !checkIfIsValid(infiniteFire) && localStorage.removeItem("infiniteFire");

    if (lsAllCharacters) {
      setAllCharacters(JSON.parse(lsAllCharacters));
      setLoading(false);
    } else getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const response = await fetch(`${API_URL}api/characters`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Character[] = await response.json();

      localStorage.setItem("allCharacters", JSON.stringify(data));
      setAllCharacters(data);
    } catch (error) {
      console.error("Erro ao buscar os personagens:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkIfIsValid = (fire: []) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    return fire.every((f: any) => {
      if (!f.magic) return false;

      const magic = decryptData(f.magic);

      if (typeof magic !== "string") return false;

      return regex.test(magic);
    });
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
