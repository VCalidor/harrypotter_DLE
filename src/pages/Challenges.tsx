import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

import CharacterInput from "../components/CharacterInput";
import SelectedCharactersList from "../components/SelectedCharactersList";
import HitCharacter from "../components/HitCharacter";
import StatsTab from "../components/StatsTab";
import Tips from "../components/Tips";
import { Character } from "../interfaces";
import { useMyContext } from "../context";

const getRandomCharacter = (characters: Character[]) => {
  return characters[Math.floor(Math.random() * characters.length)];
};

const Challenges = ({ isDaily }: { isDaily: boolean }) => {
  const { allCharacters } = useMyContext();
  const [input, setInput] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [lastAddedCharacter, setLastAddedCharacter] =
    useState<Character | null>(
      JSON.parse(localStorage.getItem("dailyTries") || "[]")[0]
    );
  const [animate, setAnimate] = useState(false);
  const [hit, setHit] = useState(false);
  const [alreadyHit, setAlreadyHit] = useState(false);
  const [chosenCharacter, setChosenCharacter] = useState<Character>({
    name: "",
    alternate_names: [],
    species: [],
    gender: [],
    house: [],
    birth_year: [],
    estimate: false,
    ancestry: [],
    magical_attributes: [],
    wand: [],
    affiliations: [],
    alive: false,
    first_appearance: ["", 0],
    image: "",
  });
  const [hits, setHits] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (isDaily) {
      getChosenCharacter();
    } else setChosenCharacter(getRandomCharacter(allCharacters));

    getHits();
  }, []);

  useEffect(() => {
    hit && postHit();
  }, [hit]);

  const getChosenCharacter = async () => {
    const dailyTries = JSON.parse(localStorage.getItem("dailyTries") || "[]");

    setSelectedCharacters(dailyTries.filter((_d: any, i: number) => i !== 0));
    setLastAddedCharacter(dailyTries[0]);
    try {
      const response = await fetch(`${API_URL}api/characters/daily-character`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Character = await response.json();

      dailyTries[0]?.name === data.name && setAlreadyHit(true);
      setChosenCharacter(data);
    } catch (error) {
      console.error("Erro ao buscar o personagem:", error);
    }
  };

  const getHits = async () => {
    try {
      const response = await fetch(
        `${API_URL}api/characters/hits?type=${isDaily ? "daily" : "infinite"}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: number = await response.json();

      setHits(data);
    } catch (error) {
      console.error("Erro ao buscar os acertos:", error);
    }
  };

  const postHit = async () => {
    try {
      const response = await fetch(
        `${API_URL}api/characters/hits?type=${isDaily ? "daily" : "infinite"}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: number = await response.json();

      setHits(data);
    } catch (error) {
      console.error("Erro ao buscar os personagens:", error);
    }
  };

  const restartChallenge = () => {
    setHit(false);
    setSelectedCharacters([]);
    setLastAddedCharacter(null);
    setAnimate(false);
    setChosenCharacter(getRandomCharacter(allCharacters));
  };

  console.log(!hit || !alreadyHit);

  return (
    <VStack
      w={"100%"}
      paddingTop={50}
      color={"white"}
      textAlign={"center"}
      gap={24}
      marginBottom={120}
    >
      <HStack
        w={"80%"}
        justifyContent={"center"}
        alignItems={"center"}
        position="relative"
      >
        <Text as="h1" margin={0} textAlign="center" flexGrow={1}>
          Mundo Bruxo
        </Text>
        <Button
          position={"absolute"}
          right={0}
          onClick={() => navigate("/")}
          fontSize={26}
          color={"black"}
          border={"none"}
          bg={"white"}
          borderRadius={"100%"}
          padding={4}
          cursor={"pointer"}
          transition={"0.2s"}
          _hover={{
            transform: "scale(1.4) rotate(360deg)",
            boxShadow: "0 0 5px rgba(0, 0, 0, 1)",
          }}
        >
          <Icon as={GiReturnArrow} />
          <Icon
            as={GiReturnArrow}
            position={"absolute"}
            top={6}
            left={2}
            opacity={0.7}
            filter="blur(2px)"
          />
        </Button>
      </HStack>
      <StatsTab isDaily={isDaily} hit={hit || alreadyHit} />
      <Tips
        selectedCharacters={selectedCharacters}
        hit={hit || alreadyHit}
        chosenCharacter={chosenCharacter}
        isDaily={isDaily}
      />
      {!alreadyHit && !hit && (
        <VStack
          maxW={400}
          width={"80%"}
          backgroundColor="rgba(0, 0, 0, 0.6)"
          paddingX={12}
          paddingY={12}
          borderRadius={4}
          transition={".4s"}
        >
          <CharacterInput
            input={input}
            setInput={setInput}
            selectedCharacters={selectedCharacters}
            setSelectedCharacters={setSelectedCharacters}
            lastAddedCharacter={lastAddedCharacter}
            setLastAddedCharacter={setLastAddedCharacter}
            setAnimate={setAnimate}
            setHit={setHit}
            chosenCharacter={chosenCharacter}
            isDaily={isDaily}
          />
        </VStack>
      )}
      <Text margin={0}>{hits} pessoas ja descobriram!</Text>
      <SelectedCharactersList
        chosenCharacter={chosenCharacter}
        lastAddedCharacter={lastAddedCharacter}
        selectedCharacters={selectedCharacters}
        animate={animate}
      />
      {(hit || alreadyHit) && (
        <HitCharacter
          chosenCharacter={chosenCharacter}
          hits={hits}
          tries={selectedCharacters.length + 1}
          isDaily={isDaily}
          restartChallenge={restartChallenge}
        />
      )}
    </VStack>
  );
};

export default Challenges;
