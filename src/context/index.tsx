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

    if (dailyFire.length > 0) {
      const result = dailyFire.filter((d: { magic: string }) =>
        checkIfIsValid(d)
      );
      localStorage.setItem("dailyFire", JSON.stringify(result));
    }
    if (infiniteFire.length > 0) {
      const result = infiniteFire.filter((d: { magic: string }) =>
        checkIfIsValid(d)
      );
      localStorage.setItem("infiniteFire", JSON.stringify(result));
    }
    if (dailyTries.length > 0 && typeof dailyTries[0].magic === "string") {
      const t = new Date();
      t.setHours(t.getHours() - 2);
      const today = t.toISOString().split("T")[0];

      const decryptedMagic = decryptData(dailyTries[0].magic);
      if (decryptedMagic !== today || checkIfIsValid(decryptedMagic))
        localStorage.removeItem("dailyTries");
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

  const checkIfIsValid = (data: { magic: string }) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    if (!data.magic) return false;

    const decryptedMagic = decryptData(data.magic);

    if (typeof decryptedMagic !== "string") return false;

    return regex.test(decryptedMagic);
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
