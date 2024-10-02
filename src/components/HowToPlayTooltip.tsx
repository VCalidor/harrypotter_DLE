import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import CharacterImageCard from "./CharacterImageCard";
import AtributeCard from "./AtributeCard";

const getCharacter = () => {
  const allCharacters = JSON.parse(
    localStorage.getItem("allCharacters") || "[]"
  );
  return allCharacters.length > 0 ? allCharacters[0] : null;
};

const atributesFunc = (atribute: {
  atribute: string;
  description: string;
  example: string;
  exampleCard: React.ReactNode;
}) => {
  return (
    <Stack w={"100%"}>
      <Text as={"h4"} fontSize={18} w={"100%"}>
        {atribute.atribute}
      </Text>
      <Text as={"span"} fontSize={14} marginLeft={8}>
        {atribute.description}
      </Text>
      <Text as={"span"} fontSize={14} color={"#A69EB8"} marginLeft={12}>
        {atribute.example}
      </Text>
      {atribute.exampleCard}
    </Stack>
  );
};

const HowToPlayTooltip = () => {
  const character = getCharacter();

  if (!character) {
    return (
      <Stack w={"100%"} textAlign={"left"}>
        <Text as={"h3"} fontSize={26} w={"100%"}>
          Carregando...
        </Text>
      </Stack>
    );
  }

  const atributes = [
    {
      atribute: "Personagem",
      description: "Nome e imagem do personagem.",
      example: "Por exemplo: Harry Potter, Sirius Black, Hermione Granger...",
      exampleCard: (
        <Stack gap={0} marginLeft={12} textAlign={"center"}>
          <CharacterImageCard imgSrc={character.image} name={character.name} />
          <Text fontSize={12} color={"#A69EB8"}>
            Passe o mouse sobre a imagem para ver mais detalhes*
          </Text>
        </Stack>
      ),
    },
    {
      atribute: "Espécie",
      description: "Classificação da espécie a qual o personagem pertence.",
      example: "Por exemplo: Humano, Gigante, Elfo Doméstico, Dragão...",
      exampleCard: (
        <Box marginLeft={12}>
          <AtributeCard
            atributes={character.species}
            character={character}
            time={0}
            chosenCharacterAtribute={character.species}
          />
        </Box>
      ),
    },
    {
      atribute: "Gênero",
      description: "Gênero do personagem, se disponível.",
      example: "Por exemplo: Masculino, Feminino, Não Tem, Desconhecido...",
      exampleCard: (
        <Box marginLeft={12}>
          <AtributeCard
            atributes={character.gender}
            character={character}
            time={0}
            chosenCharacterAtribute={character.gender}
          />
        </Box>
      ),
    },
    {
      atribute: "Casa",
      description: "Casa de Hogwarts à qual o personagem pertence.",
      example: "Por exemplo: Grifinória, Sonserina, Corvinal, Lufa-Lufa...",
      exampleCard: (
        <Box marginLeft={12}>
          <AtributeCard
            atributes={character.house}
            character={character}
            time={0}
            chosenCharacterAtribute={character.house}
          />
        </Box>
      ),
    },
    {
      atribute: "Ano de Nascimento",
      description: "O ano de nascimento do personagem, se disponível.",
      example:
        "Por exemplo: 1980 para Harry Potter, 1926 para Newt Scamander...",
      exampleCard: (
        <Box marginLeft={12}>
          <AtributeCard
            atributes={character.birth_year}
            character={character}
            time={0}
            chosenCharacterAtribute={character.birth_year}
          />
        </Box>
      ),
    },
    {
      atribute: "Afiliações",
      description:
        "Grupos ou organizações com os quais o personagem está associado.",
      example:
        "Por exemplo: Ordem da Fênix, Comensais da Morte, Ministério da Magia...",
      exampleCard: (
        <Box marginLeft={12} textAlign={"center"}>
          <AtributeCard
            atributes={character.affiliations}
            character={character}
            time={0}
            chosenCharacterAtribute={character.affiliations}
          />
        </Box>
      ),
    },
    {
      atribute: "Primeira Aparição",
      description:
        "O livro ou filme onde o personagem fez sua primeira aparição.",
      example:
        "Por exemplo: Harry Potter e a Pedra Filosofal, Harry Potter e a Câmara Secreta...",
      exampleCard: (
        <Box marginLeft={12} textAlign={"center"}>
          <AtributeCard
            atributes={[character.first_appearance[0]]}
            chosenCharacterAtribute={[character.first_appearance[0]]}
            character={character}
            time={0}
          />
        </Box>
      ),
    },
  ];

  return (
    <Stack w={"100%"} textAlign={"left"}>
      <Heading
        as={"h3"}
        w={"100%"}
        borderBottom={"solid 1px white"}
        fontSize={"xx-large"}
        letterSpacing=".06em"
        textShadow="4px 4px 2px rgba(0, 0, 0, 1)"
      >
        Atributos
      </Heading>
      <Stack paddingLeft={12} paddingTop={12}>
        {atributes.map((atribute) => atributesFunc(atribute))}
      </Stack>
    </Stack>
  );
};

export default HowToPlayTooltip;
