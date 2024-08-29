import {
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";

import { Character } from "../interfaces";

const CharacterInput = ({
  input,
  setInput,
  selectedCharacters,
  setSelectedCharacters,
  lastAddedCharacter,
  setLastAddedCharacter,
  setAnimate,
  setHit,
  chosenCharacter,
}: {
  input: string;
  setInput: any;
  selectedCharacters: Character[];
  setSelectedCharacters: any;
  lastAddedCharacter: Character | null;
  setLastAddedCharacter?: any;
  setAnimate: any;
  setHit: any;
  chosenCharacter: Character;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCharacter, setSelectedCharacter] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [remainingCharacters, setRemainingCharacters] = useState<Character[]>(
    []
  );
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);

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

  useEffect(() => {
    getAllCharacters();
  }, []);

  const getAllCharacters = async () => {
    try {
      const response = await fetch(
        "https://harrypotterdleapi-07b4bbf3528e.herokuapp.com/api/characters",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Character[] = await response.json();

      setRemainingCharacters(data);
    } catch (error) {
      console.error("Erro ao buscar o personagem:", error);
    }
  };

  function selectCharacter(character: Character) {
    if (!isLoading) {
      setIsLoading(true);
      setRemainingCharacters(
        remainingCharacters.filter((c) => c.name != character.name)
      );
      setAnimate(true);
      setTimeout(() => {
        lastAddedCharacter &&
          setSelectedCharacters([lastAddedCharacter, ...selectedCharacters]);
        setLastAddedCharacter({});
        setLastAddedCharacter(character);
        setAnimate(false);
        setTimeout(() => {
          setIsLoading(false);
          setHit(character.name === chosenCharacter.name);
        }, 4500);
      }, 400);
      setInput("");
      onClose();
    }
  }

  function charactersList() {
    if (filteredCharacters.length > 0) {
      return filteredCharacters.map((character, index) => {
        return (
          <HStack
            key={`characterCard_${index}`}
            gap={12}
            width={"100%"}
            minHeight={60}
            transition={"0.2s"}
            backgroundColor={
              selectedCharacter == index
                ? "rgba(140, 140, 10, 1)"
                : "rgba(255, 255, 255, 1)"
            }
            cursor={"pointer"}
            _hover={{ bg: "rgba(200, 200, 160, 1)" }}
            onMouseDown={() => {
              selectCharacter(character);
            }}
          >
            <Image src={character.image} marginLeft={12} boxSize={32} />
            <Flex color={"black"} flexDirection={"column"} alignItems={"start"}>
              <Text margin={0}>{character.name}</Text>
              {character.alternate_names.length > 0 && (
                <Text margin={0} color={"black"} fontSize={12}>
                  {character.alternate_names[0]}
                </Text>
              )}
            </Flex>
          </HStack>
        );
      });
    } else
      return (
        <Flex height={40} backgroundColor={"rgba(255, 255, 255, 1)"}>
          <Text color={"black"} margin={"auto"}>
            Nenhum personagem encontrado.
          </Text>
        </Flex>
      );
  }

  return (
    <HStack
      maxW={400}
      width={"100%"}
      justifyContent={"space-between"}
      position={"relative"}
    >
      <Input
        height={40}
        width={"100%"}
        value={input}
        fontSize={20}
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
        marginRight={6}
        transition={".4s"}
        color={filteredCharacters.length > 0 ? "white" : "gray"}
        cursor={filteredCharacters.length > 0 ? "pointer" : ""}
        _hover={{
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
        top={58}
        maxW={356}
        width={"100%"}
        gap={3}
        maxHeight={200}
        overflowY="auto"
        transition={".4s"}
        padding={4}
        paddingBottom={10}
        opacity={isOpen ? 100 : 0}
        backgroundColor={"rgba(0, 0, 0, .6)"}
        zIndex={99}
      >
        {charactersList()}
      </Flex>
    </HStack>
  );
};

export default CharacterInput;
