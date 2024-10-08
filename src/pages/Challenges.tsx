import { Button, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

import CharacterInput from "../components/CharacterInput";
import SelectedCharactersList from "../components/SelectedCharactersList";
import StatsTab from "../components/StatsTab";
import Tips from "../components/Tips";
import { Character, YesterdayCharacter } from "../interfaces";
import { useMyContext } from "../context";
import PageLayout from "../components/PageLayout";
import HitCharacterFullComponent from "../components/HitCharacterFullComponent";
import Loading from "../components/Loading";
import { formatDate } from "../utils";
import { GrPowerReset } from "react-icons/gr";
import { appear } from "../animations";

const getRandomCharacter = (characters: Character[]) => {
  return characters[Math.floor(Math.random() * characters.length)];
};

const Challenges = ({ isDaily }: { isDaily: boolean }) => {
  const { allCharacters } = useMyContext();
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [lastAddedCharacter, setLastAddedCharacter] =
    useState<Character | null>(null);
  const [animate, setAnimate] = useState(false);
  const [hit, setHit] = useState(false);
  const [alreadyHit, setAlreadyHit] = useState(false);
  const [chosenCharacter, setChosenCharacter] = useState<
    Character & { date?: string }
  >({
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
    date: "",
  });
  const [yesterdayCharacter, setYesterdayCharacter] =
    useState<YesterdayCharacter>({ name: "", number: 0 });
  const [hits, setHits] = useState(0);
  const [isTodayCharacter, setIsTodayCharacter] = useState<boolean>(false);

  useEffect(() => {
    isDaily
      ? getChosenCharacter()
      : setChosenCharacter(getRandomCharacter(allCharacters));

    getHits();
  }, []);

  const getChosenCharacter = async () => {
    const dailyTries = JSON.parse(localStorage.getItem("dailyTries") || "[]");

    setSelectedCharacters(
      dailyTries
        .filter((_d: any, i: number) => i !== 0)
        .map((d: any) => d.character)
    );
    setLastAddedCharacter(dailyTries[0]?.character);
    try {
      const response = await fetch(`${API_URL}api/characters/daily-character`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: {
        tdCharacter: Character & { date: string };
        ydCharacter: YesterdayCharacter;
      } = await response.json();

      const today = new Date();
      today.setHours(today.getHours() - 2);

      dailyTries[0]?.character.name === data.tdCharacter.name &&
        setAlreadyHit(true);
      setChosenCharacter(data.tdCharacter);
      setYesterdayCharacter(data.ydCharacter);
      setIsTodayCharacter(data.tdCharacter.date === formatDate(today));
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
      return data;
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
    <PageLayout isHome={true}>
      <StatsTab isDaily={isDaily} hit={hit || alreadyHit} />
      {!isDaily || isTodayCharacter ? (
        <>
          <Tips
            selectedCharacters={selectedCharacters}
            hit={hit || alreadyHit}
            chosenCharacter={chosenCharacter}
            isDaily={isDaily}
          />
          {!alreadyHit && !hit && (
            <CharacterInput
              selectedCharacters={selectedCharacters}
              setSelectedCharacters={setSelectedCharacters}
              lastAddedCharacter={lastAddedCharacter}
              setLastAddedCharacter={setLastAddedCharacter}
              setAnimate={setAnimate}
              setHit={setHit}
              chosenCharacter={chosenCharacter}
              isDaily={isDaily}
              postHit={postHit}
            />
          )}
          <Text
            fontSize={".8rem"}
            textShadow=".5px .5px 0 rgba(0, 0, 0, .4)"
            animation={`${appear} .2s ease-in-out`}
          >
            {hits} pessoas já descobriram!
          </Text>
          <SelectedCharactersList
            chosenCharacter={chosenCharacter}
            lastAddedCharacter={lastAddedCharacter}
            selectedCharacters={selectedCharacters}
            animate={animate}
          />
          {isDaily && (
            <HStack
              position={"relative"}
              paddingLeft={"1rem"}
              paddingY={".6rem"}
              paddingRight={"2.1rem"}
              backgroundColor="rgb(11, 9, 13, .7)"
              border={"1px solid rgb(51, 47, 64, .7)"}
              rounded={6}
              animation={`${appear} .2s ease-in-out`}
            >
              <Text fontSize={".9rem"} m={0}>
                Personagem de ontem:
              </Text>
              <Text
                as="span"
                color={"#AF811E"}
                fontWeight={"light"}
                fontSize={"1.8rem"}
                fontFamily={"Harry P"}
                letterSpacing=".03em"
                m={0}
              >
                {yesterdayCharacter.name}
              </Text>
              <Text
                fontSize={".7rem"}
                position={"absolute"}
                right={0}
                bottom={".5rem"}
                color={"#A69EB8"}
                fontWeight={"bold"}
              >
                dia#{yesterdayCharacter.number}
              </Text>
            </HStack>
          )}
          <HitCharacterFullComponent
            hit={hit || alreadyHit}
            alreadyHit={alreadyHit}
            hits={hits}
            isDaily={isDaily}
            restartChallenge={restartChallenge}
            chosenCharacter={chosenCharacter}
            selectedCharacters={selectedCharacters}
          />
        </>
      ) : (
        <Loading
          button={
            <Button variant={"buttonVariant"} minW={"10rem"}>
              <Icon as={GrPowerReset} boxSize={"1.8rem"} color={"#0B090D"} />
              <Icon
                boxSize={"2rem"}
                as={GrPowerReset}
                color={"#0B090D"}
                position={"absolute"}
                opacity={0.5}
                filter="blur(2px)"
                onClick={() => window.location.reload()}
              />
              <Text
                position={"absolute"}
                bottom={".3rem"}
                fontWeight={"bold"}
                color={"#867F83"}
                textShadow="1px 1px 0 #332F40"
                textAlign="center"
                whiteSpace="normal"
                fontSize="clamp(0.6rem, 2.5vw, 0.8rem)"
              >
                Recarregar página
              </Text>
            </Button>
          }
        >
          <VStack
            fontWeight={"light"}
            letterSpacing={".1px"}
            fontFamily={"Harry P"}
            gap={0}
          >
            <Text fontSize={"2rem"}>
              {isTodayCharacter
                ? "Carregando o personagem..."
                : "O personagem será atualizado em breve."}
            </Text>
            <Text fontSize={"1rem"}>
              {isTodayCharacter
                ? "Caso demore muito recarregue a página."
                : "Aguarde um momento e recarregue a página."}
            </Text>
          </VStack>
        </Loading>
      )}
    </PageLayout>
  );
};

export default Challenges;
