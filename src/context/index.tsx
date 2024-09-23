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
    const dailyTries = JSON.parse(localStorage.getItem("dailyTries") || "[]");
    const lsAllCharacters = localStorage.getItem("allCharacters");

    if (dailyFire.length > 0)
      !checkIfIsValid(dailyFire) && localStorage.removeItem("dailyFire");
    if (infiniteFire.length > 0)
      !checkIfIsValid(infiniteFire) && localStorage.removeItem("infiniteFire");
    if (dailyTries.length > 0 && typeof dailyTries[0].magic === "string") {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      const today = new Date().toISOString().split("T")[0];
      const decryptedMagic = decryptData(dailyTries[0].magic);

      regex.test(decryptedMagic) ||
        (decryptedMagic !== today && localStorage.removeItem("dailyTries"));
    }

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

  const checkIfIsValid = (data: []) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    return data.every((d: any) => {
      if (!d.magic) return false;

      const decryptedMagic = decryptData(d.magic);

      if (typeof decryptedMagic !== "string") return false;

      return regex.test(decryptedMagic);
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
