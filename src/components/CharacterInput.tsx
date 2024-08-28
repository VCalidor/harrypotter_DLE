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

const characters = [
  {
    name: "Luna Lovegood",
    gender: ["Mulher"],
    species: ["Humano"],
    birth_year: ["1981"],
    house: ["Lufa-Lufa"],
    first_appearance: ["O Enigma do Principe"],
    atributes: ["Bruxo"],
    filiations: ["Hogwarts", "Armada de Dumbledore"],
    img: "https://pm1.aminoapps.com/6537/3f6ab6249cdeee1173fbc07150f16d120055c828_00.jpg",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Harry potter",
    alias: "O menino que sobreviveu",
    gender: ["Homem"],
    species: ["Humano"],
    birth_year: [1980],
    house: ["Grifinória"],
    first_appearance: ["A Pedra Filosofal"],
    atributes: ["Bruxo", "Ofidioglota", "Horcrux"],
    filiations: ["Hogwarts", "Armada de Dumbledore", "Ordem da Fênix"],
    img: "https://qph.cf2.quoracdn.net/main-qimg-79eefb9bb665b1df964ff1f6475b1d7c-pjlq",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Ronald Weasley",
    alias: "Rony",
    gender: ["Homem"],
    species: ["Humano"],
    birth_year: [1980],
    house: ["Grifinória"],
    first_appearance: ["Pedra Filosofal"],
    atributes: ["Bruxo"],
    filiations: ["Ordem da Fênix", "Armada de Dumbledore", "Hogwarts"],
    img: "https://i.pinimg.com/originals/77/19/30/771930f96c2678314a5c6d50c1679a9e.jpg",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Sirius Black",
    gender: ["Homem"],
    species: ["Humano"],
    birth_year: [1958],
    house: ["Grifinória"],
    first_appearance: ["O Prisioneiro de Azkaban"],
    atributes: ["Bruxo", "Animago"],
    filiations: ["Hogwarts", "Ordem da Fênix", "Os Marotos"],
    img: "https://upload.wikimedia.org/wikipedia/en/6/6b/Sirius_Black.jpeg",
    alive: false,
    wand: ["Desconhecido"],
  },
  {
    name: "Rabo Córneo Húngaro",
    gender: ["Homem"],
    species: ["Dragão"],
    birth_year: [1946],
    house: ["Não tem"],
    first_appearance: ["O Cálice de Fogo"],
    atributes: ["Criatura Mágica"],
    filiations: ["Não tem"],
    img: "https://hogwartshabbletneville.weebly.com/uploads/1/2/9/2/12922768/934123404.png",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Tom Riddle",
    alias: "Lord Voldemort",
    gender: ["Homem"],
    species: ["Humano"],
    birth_year: [1953],
    house: ["Sonserina"],
    first_appearance: ["A Câmara Secreta"],
    atributes: ["Bruxo", "Ofidioglota"],
    filiations: ["Comensais da Morte", "Hogwarts"],
    img: "https://i.pinimg.com/736x/ba/88/af/ba88af69441f056d05c1210755d4bae3.jpg",
    alive: false,
    wand: ["Desconhecido"],
  },
  {
    name: "Monstro",
    gender: ["Homem"],
    species: ["Elfo Doméstico"],
    birth_year: [1935],
    house: ["Não tem"],
    first_appearance: ["O Cálice de Fogo"],
    atributes: ["Criatura Mágica"],
    filiations: ["Não tem"],
    img: "https://qph.cf2.quoracdn.net/main-qimg-a677791e4bb4f97d3a82766dd571f4ba-lq",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Hagrid",
    gender: ["Homem"],
    species: ["Meio-Gigante"],
    birth_year: [1958],
    house: ["Grifinória"],
    first_appearance: ["A Pedra Filosofal"],
    atributes: ["Bruxo"],
    filiations: ["Hogwarts", "Ordem da Fênix"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAvh_Tij1ZM3TTffh97LMrRL3Dv-C_m_L_Rw&s",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Gina Weasley",
    gender: ["Mulher"],
    species: ["Humano"],
    birth_year: [1982],
    house: ["Grifinória"],
    first_appearance: ["A Pedra Filosofal"],
    atributes: ["Bruxo"],
    filiations: [
      "Hogwarts",
      "Armada de Dumbledore",
      "Ordem da Fênix",
      "Profeta Diário",
    ],
    img: "https://qph.cf2.quoracdn.net/main-qimg-351b616104e52ffd89e363211a074d47-lq",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Dobby",
    gender: ["Homem"],
    species: ["Elfo Doméstico"],
    birth_year: [1946],
    house: ["Não tem"],
    first_appearance: ["A Câmara Secreta"],
    atributes: ["Criatura Mágica"],
    filiations: ["Hogwarts"],
    img: "https://media.harrypotterfanzone.com/dobby-illustration-jonny-duddle.jpg",
    alive: false,
    wand: ["Desconhecido"],
  },
  {
    name: "Canino",
    gender: ["Homem"],
    species: ["Cão"],
    birth_year: ["Desconhecido"],
    house: ["Não tem"],
    first_appearance: ["A Pedra Filosofal"],
    atributes: ["Não tem"],
    filiations: ["Não tem"],
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrc-O6Paf0AedFNjw2IZ3acnqtw5bvrx89OQ&s",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Aragogue",
    gender: ["Mulher"],
    species: ["Acromântula"],
    birth_year: [1952],
    house: ["Não tem"],
    first_appearance: ["A Câmara Secreta"],
    atributes: ["Criatura Mágica"],
    filiations: ["Não tem"],
    img: "https://monsterlegacy.net/wp-content/uploads/2017/02/aragogbeauty.jpg",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
    name: "Duda Dursley",
    alias: "Dudinha",
    gender: ["Homem"],
    species: ["Humano"],
    birth_year: [1980],
    house: ["Não tem"],
    first_appearance: ["A Pedra Filosofal"],
    atributes: ["Trouxa"],
    filiations: ["Não tem"],
    img: "https://1abe7d7da8.cbaul-cdnwnd.com/8ef44cbb3ee66edc71f1fa0d141ce1b4/system_preview_detail_200000486-d9c7edabd6/1-%20Dudley.jpg",
    alive: true,
    wand: ["Desconhecido"],
  },
  {
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
  },
  {
    name: "Chapéu Seletor",
    gender: ["Não tem"],
    species: ["Não tem"],
    birth_year: ["Desconhecido"],
    house: ["Não tem"],
    first_appearance: ["O Cálice de Fogo"],
    atributes: ["Objeto Mágico"],
    filiations: ["Hogwarts"],
    img: "https://pm1.aminoapps.com/6304/c5beb000f11bc8302570a036b185bf547f5a2604_00.jpg",
    alive: true,
    wand: ["Desconhecido"],
  },
];

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
  const [remainingCharacters, setRemainingCharacters] =
    useState<Character[]>(characters);
  const [filteredCharacters, setFilteredCharacters] =
    useState<Character[]>(characters);

  useEffect(() => {
    if (input.length > 1) {
      setFilteredCharacters(
        remainingCharacters.filter(
          (character) =>
            character.name.toLowerCase().includes(input.toLowerCase()) ||
            character.alias?.toLowerCase().includes(input.toLowerCase())
        )
      );
      onOpen();
    } else {
      setFilteredCharacters([]);
      onClose();
    }
  }, [input]);

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
            <Image src={character.img} marginLeft={12} boxSize={32} />
            <Flex color={"black"} flexDirection={"column"} alignItems={"start"}>
              <Text margin={0}>{character.name}</Text>
              <Text margin={0} color={"black"} fontSize={12}>
                {character.alias}
              </Text>
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
