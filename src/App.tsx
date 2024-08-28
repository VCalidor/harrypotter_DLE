import {
  Box,
  HStack,
  Icon,
  Image,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { BsInfoCircle, BsFillBarChartFill } from "react-icons/bs";
import { useState } from "react";

import CharacterInput from "./components/CharacterInput";
import SelectedCharactersList from "./components/SelectedCharactersList";
import backgroundImage from "./assets/background.jpg";
import HitCharacter from "./components/HitCharacter";
import Tips from "./components/Tips";
import { Character } from "./interfaces";

const chosenCharacter = {
  name: "Nagini",
  gender: ["Mulher"],
  species: ["Humano", "Cobra"],
  birth_year: [1927],
  house: ["Não tem"],
  first_appearance: ["O Cálice de Fogo"],
  atributes: ["Maledictus"],
  filiations: ["Comensais da Morte", "Horcrux"],
  img: "https://kanto.legiaodosherois.com.br/w760-h398-cfill/wp-content/uploads/2018/10/legiao_bpS3qJBPVRzyYHLQdhK_fr8ZseX910AG6WTxkMiCnU.jpg.webp",
  alive: false,
  wand: ["Não Tem"],
};

function App() {
  const [input, setInput] = useState("");
  const [selectedCharacters, setSelectedCharacters] = useState<Character[]>([]);
  const [lastAddedCharacter, setLastAddedCharacter] =
    useState<Character | null>(null);
  const [animate, setAnimate] = useState(false);
  const [hit, setHit] = useState(false);

  return (
    <>
      <Image
        src={backgroundImage}
        position={"fixed"}
        margin={0}
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex={-1}
      />
      <VStack
        w={"100%"}
        paddingTop={50}
        color={"white"}
        textAlign={"center"}
        gap={24}
        marginBottom={120}
      >
        <Text as="h1" margin={0}>
          Mundo Bruxo
        </Text>
        <HStack gap={16}>
          <Tooltip
            label={
              <Box bg={"red"} padding={8} borderRadius={4} color={"white"}>
                <Text margin={6}>Estatísticas</Text>
              </Box>
            }
            hasArrow
            zIndex="tooltip"
          >
            <Box
              color={"grey"}
              transition="0.2s"
              fontSize={24}
              _hover={{
                color: "white",
                cursor: "pointer",
                transform: "scale(1.2)",
              }}
            >
              <Icon as={BsFillBarChartFill} />
            </Box>
          </Tooltip>
          <Tooltip
            label={
              <Box bg={"red"} padding={8} borderRadius={4} color={"white"}>
                <Text margin={6}>Como Jogar</Text>
              </Box>
            }
            hasArrow
            zIndex="tooltip"
          >
            <Box
              transition="0.2s"
              color={"grey"}
              fontSize={24}
              _hover={{
                color: "white",
                cursor: "pointer",
                transform: "scale(1.2)",
              }}
            >
              <Icon as={BsInfoCircle} />
            </Box>
          </Tooltip>
        </HStack>
        <Tips
          selectedCharacters={selectedCharacters}
          hit={hit}
          chosenCharacter={chosenCharacter}
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
            />
          </VStack>
        )}
        <Text margin={0}>6800 pessoas ja descobriram!</Text>
        <SelectedCharactersList
          chosenCharacter={chosenCharacter}
          lastAddedCharacter={lastAddedCharacter}
          selectedCharacters={selectedCharacters}
          animate={animate}
        />
        {hit && (
          <HitCharacter
            chosenCharacter={chosenCharacter}
            hits={6001}
            tries={selectedCharacters.length + 1}
          />
        )}
      </VStack>
    </>
  );
}

export default App;
