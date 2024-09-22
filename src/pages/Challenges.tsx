import { HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    useState<Character | null>(null);
  const [animate, setAnimate] = useState(false);
  const [hit, setHit] = useState(false);
  const [chosenCharacter, setChosenCharacter] = useState<Character>({
    id: 99999,
    name: "",
    alternate_names: [],
    species: [],
    gender: [],
    house: [],
    birth_year: [],
    estimate: false,
    ancestry: [],
    magical_attributes: [],
    eye_colour: [],
    hair_colour: [],
    wand: [],
    affiliations: [],
    patronus: [],
    alive: false,
    first_appearance: ["", 0],
    image: "",
  });
  const [hits, setHits] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    isDaily
      ? getChosenCharacter()
      : setChosenCharacter(getRandomCharacter(allCharacters));

    getHits();
  }, []);

  useEffect(() => {
    hit && postHit();
  }, [hit]);

  const getChosenCharacter = async () => {
    try {
      const response = await fetch(
        // "http://localhost:3000/api/characters/daily-character",
        "https://harrypotterdle-api.onrender.com/api/characters/daily-character",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Character = await response.json();

      setChosenCharacter(data);
    } catch (error) {
      console.error("Erro ao buscar os personagens:", error);
    }
  };

  const getHits = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3000/api/characters/hits?type=${
        `https://harrypotterdle-api.onrender.com/api/characters/hits?type=${
          isDaily ? "daily" : "infinite"
        }`,
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
      console.error("Erro ao buscar os personagens:", error);
    }
  };

  const postHit = async () => {
    try {
      const response = await fetch(
        // `http://localhost:3000/api/characters/hits?type=${
        `https://harrypotterdle-api.onrender.com/api/characters/hits?type=${
          isDaily ? "daily" : "infinite"
        }`,
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
        <IconButton
          position={"absolute"}
          right={0}
          aria-label="return"
          onClick={() => navigate("/")}
          icon={<GiReturnArrow />}
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
        />
      </HStack>
      <StatsTab isDaily={isDaily} hit={hit} />
      <Tips
        selectedCharacters={selectedCharacters}
        hit={hit}
        chosenCharacter={chosenCharacter}
        isDaily={isDaily}
      />
      {!hit && (
        <VStack
          maxW={400}
          width={"80%"}
          backgroundColor="rgba(0, 0, 0, 0.6)"
          paddingX={12}
          paddingY={12}
          borderRadius={4}
          transition={".4s"}
          transform={`scale(${hit ? 0.8 : 1})`}
          opacity={hit ? 0 : 1}
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
      {hit && (
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
