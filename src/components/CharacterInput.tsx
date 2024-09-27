import {
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { useMyContext } from "../context";

import { Character } from "../interfaces";
import { encryptData } from "../utils";

const CharacterInput = ({
  selectedCharacters,
  setSelectedCharacters,
  lastAddedCharacter,
  setLastAddedCharacter,
  setAnimate,
  setHit,
  chosenCharacter,
  isDaily,
  postHit,
}: {
  selectedCharacters: Character[];
  setSelectedCharacters: any;
  lastAddedCharacter: Character | null;
  setLastAddedCharacter?: any;
  setAnimate: any;
  setHit: any;
  chosenCharacter: Character;
  isDaily: boolean;
  postHit: any;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { allCharacters } = useMyContext();
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [remainingCharacters, setRemainingCharacters] = useState<Character[]>(
    []
  );
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    let characters = allCharacters;
    if (isDaily) {
      const dailyTries = JSON.parse(localStorage.getItem("dailyTries") || "[]");

      const dailyTriesNames = new Set(
        dailyTries.map((d: { character: Character }) => d.character.name)
      );

      characters = allCharacters.filter(
        (character) => !dailyTriesNames.has(character.name)
      );
    }
    setRemainingCharacters(characters);
  }, []);

  useEffect(() => {
    if (input.length > 1) {
      setFilteredCharacters(
        remainingCharacters.filter(
          (character) =>
            character.name.toLowerCase().includes(input.toLowerCase()) ||
            character.alternate_names
              .join()
              .toLowerCase()
              .includes(input.toLowerCase())
        )
      );
      onOpen();
    } else {
      setFilteredCharacters([]);
      onClose();
    }
  }, [input]);

  const selectCharacter = (character: Character) => {
    if (!isLoading) {
      setIsLoading(true);
      setRemainingCharacters(
        remainingCharacters.filter((c) => c.name != character.name)
      );
      setAnimate(true);
      setTimeout(() => {
        lastAddedCharacter &&
          setSelectedCharacters([lastAddedCharacter, ...selectedCharacters]);
        setLastAddedCharacter(character);
        setAnimate(false);

        if (isDaily) {
          const dailyTries = JSON.parse(
            localStorage.getItem("dailyTries") || "[]"
          );

          const today = new Date();
          today.setHours(today.getHours() - 5);

          dailyTries.unshift({
            character,
            magic: encryptData(today.toISOString().split("T")[0]),
          });

          localStorage.setItem("dailyTries", JSON.stringify(dailyTries));
        }

        setTimeout(async () => {
          setIsLoading(false);

          if (character.name === chosenCharacter.name) {
            const fire: {
              character: object;
              magic: string;
              position: string;
            }[] = JSON.parse(
              localStorage.getItem(isDaily ? "dailyFire" : "infiniteFire") ||
                "[]"
            );

            const today = new Date();
            today.setHours(today.getHours() - 5);
            const position = await postHit();

            fire.unshift({
              character: {
                name: character.name,
                alternate_names: character.alternate_names,
                image: character.image,
              },
              magic: encryptData(today.toISOString().split("T")[0]),
              position,
            });

            localStorage.setItem(
              isDaily ? "dailyFire" : "infiniteFire",
              JSON.stringify(fire)
            );
            setHit(true);
            setRemainingCharacters(allCharacters);
          }
        }, 4500);
      }, 400);
      setInput("");
      onClose();
    }
  };

  function charactersList() {
    if (filteredCharacters.length > 0) {
      return filteredCharacters.map((character, index) => {
        return (
          <HStack
            key={`characterCard_${index}`}
            gap={".6rem"}
            width={"100%"}
            minHeight={"3.6rem"}
            transition={"0.2s"}
            paddingX={"1rem"}
            backgroundColor={selectedCharacter == index ? "#332F40" : "#D9CEC5"}
            cursor={"pointer"}
            color={selectedCharacter == index ? "#D9CEC5" : "#0B090D"}
            _hover={{ bg: "#9C95B1" }}
            onMouseDown={() => {
              selectCharacter(character);
            }}
          >
            <Image src={character.image} boxSize={"2.6rem"} rounded={"100%"} />
            <Flex flexDirection={"column"} alignItems={"start"}>
              <Text
                fontSize={"1.2rem"}
                fontWeight={"light"}
                letterSpacing={".1px"}
                fontFamily={"Harry P"}
              >
                {character.name}
              </Text>
              {character.alternate_names.length > 0 && (
                <Text fontSize={".6rem"} fontWeight={"bold"}>
                  {character.alternate_names[0]}
                </Text>
              )}
            </Flex>
          </HStack>
        );
      });
    } else
      return (
        <Flex height={"3rem"} backgroundColor={"#D9CEC5"} fontSize={".9rem"}>
          <Text color={"black"} margin={"auto"}>
            Nenhum personagem encontrado.
          </Text>
        </Flex>
      );
  }

  return (
    <VStack
      maxW={400}
      width={"80%"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      paddingX={"1rem"}
      paddingY={".7rem"}
      borderRadius={4}
      transition={".4s"}
    >
      <HStack
        maxW={400}
        width={"100%"}
        justifyContent={"space-between"}
        position={"relative"}
      >
        <Input
          placeholder="Digite o nome do personagem"
          _placeholder={{ color: "#A69EB8", fontSize: ".85rem" }}
          rounded={".3rem"}
          bg={"#332F40"}
          color={"#D9CEC5"}
          height={"3rem"}
          width={"100%"}
          value={input}
          fontSize={"1rem"}
          border={"1px solid #332F40"}
          _hover={{}}
          focusBorderColor={"#332F40"}
          onKeyUp={(e) => {
            if (e.keyCode === 38)
              setSelectedCharacter(
                selectedCharacter == 0 ? 0 : selectedCharacter - 1
              );
            else if (e.keyCode === 40) {
              setSelectedCharacter(
                filteredCharacters.length > selectedCharacter
                  ? selectedCharacter + 1
                  : selectedCharacter
              );
            } else if (
              e.keyCode === 13 &&
              filteredCharacters.length > 0 &&
              selectedCharacter < filteredCharacters.length
            ) {
              selectCharacter(filteredCharacters[selectedCharacter]);
            }
          }}
          onFocus={() => {
            if (input.length > 1) {
              onOpen();
            }
          }}
          onBlur={() => {
            onClose();
          }}
          onChange={({ target }) => {
            setSelectedCharacter(0);
            setInput(target.value);
          }}
        />
        <Icon
          as={BsSend}
          transform={`rotate(45deg) ${
            filteredCharacters.length > 0 ? "" : "scale(0.8)"
          }`}
          fontSize={30}
          transition={".4s"}
          color={filteredCharacters.length > 0 ? "#D9CEC5" : "#A69EB8"}
          cursor={filteredCharacters.length > 0 ? "pointer" : ""}
          _hover={{
            color: filteredCharacters.length > 0 ? "#F7F5F3" : "",
            transform:
              filteredCharacters.length > 0 ? "rotate(45deg) scale(1.2)" : "",
          }}
          onClick={() => {
            if (filteredCharacters.length > 0) {
              selectCharacter(filteredCharacters[selectedCharacter]);
            }
          }}
        />
        <Flex
          position={"absolute"}
          flexDirection={"column"}
          top={"3.7rem"}
          width={"100%"}
          gap={".2rem"}
          maxHeight={200}
          overflowY="auto"
          transition={".4s"}
          padding={".2rem"}
          opacity={isOpen ? 100 : 0}
          backgroundColor="rgb(11, 9, 13, .7)"
          zIndex={99}
        >
          {charactersList()}
        </Flex>
      </HStack>
    </VStack>
  );
};

export default CharacterInput;
