import { createContext, useContext, useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const VITE_CHARACTERS_VERSION = import.meta.env.VITE_CHARACTERS_VERSION;
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
    const emojiTries = JSON.parse(localStorage.getItem("emojiTries") || "[]");
    const emojiFire = JSON.parse(localStorage.getItem("emojiFire") || "[]");
    const lsAllCharacters = localStorage.getItem("allCharacters");

    // classic
    if (dailyFire.length > 0) {
      const result = dailyFire.filter((d: { magic: string }) =>
        checkIfIsValid(d)
      );

      localStorage.setItem("dailyFire", JSON.stringify(result));
    }
    if (dailyTries.length > 0 && typeof dailyTries[0].magic === "string") {
      const t = new Date();
      t.setHours(t.getHours() - 2);
      const today = t.toISOString().split("T")[0];

      const decryptedMagic = decryptData(dailyTries[0].magic);
      if (decryptedMagic !== today || checkIfIsValid(decryptedMagic))
        localStorage.removeItem("dailyTries");
    }

    // infinite
    if (infiniteFire.length > 0) {
      const result = infiniteFire.filter((d: { magic: string }) =>
        checkIfIsValid(d)
      );
      localStorage.setItem("infiniteFire", JSON.stringify(result));
    }

    // emoji
    if (emojiFire.length > 0) {
      const result = emojiFire.filter((d: { magic: string }) =>
        checkIfIsValid(d)
      );
      localStorage.setItem("emojiFire", JSON.stringify(result));
    }
    if (emojiTries.length > 0 && typeof emojiTries[0].magic === "string") {
      const t = new Date();
      t.setHours(t.getHours() - 2);
      const today = t.toISOString().split("T")[0];

      const decryptedMagic = decryptData(emojiTries[0].magic);
      if (decryptedMagic !== today || checkIfIsValid(decryptedMagic))
        localStorage.removeItem("emojiTries");
    }

    const parsedAllCharacters = JSON.parse(lsAllCharacters || "[]");

    console.log("allcharacter",parsedAllCharacters);
    console.log("characters version",VITE_CHARACTERS_VERSION);

    if (parsedAllCharacters?.version === VITE_CHARACTERS_VERSION) {
      console.log("Using cached characters");

      setAllCharacters(parsedAllCharacters.characters);
      setLoading(false);
    } else getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    console.log("Fetching characters");

    try {
      const response = await fetch(`${API_URL}api/characters`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: { characters: Character[]; version: string } =
        await response.json();

      localStorage.setItem("allCharacters", JSON.stringify(data));
      setAllCharacters(data.characters);
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
