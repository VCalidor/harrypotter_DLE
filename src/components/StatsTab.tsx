import { Box, HStack, Icon, keyframes, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { BsFillBarChartFill, BsInfoCircle } from "react-icons/bs";
import { decryptData } from "../utils";

const flaming = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  20% {
    transform: scale(1.3);
    opacity: 0.8;
  }
  40% {
    transform: scale(0.9);
    opacity: 0.6;
  }
  60% {
    transform: scale(1.2);
    opacity: 0.9;
  }
  80% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }`;

interface FireData {
  character: {
    name: string;
    alternate_names: string[];
    image: string;
  };
  magic: string;
}

const StatsTab = ({ isDaily, hit }: { isDaily: boolean; hit: boolean }) => {
  const [fire, setFire] = useState<FireData[]>([]);

  useEffect(() => {
    const fi = JSON.parse(
      localStorage.getItem(isDaily ? "dailyFire" : "infiniteFire") || "[]"
    );

    if (isDaily) getDailyFire(fi);
    else setFire(fi);
  }, []);

  useEffect(() => {
    const fi = JSON.parse(
      localStorage.getItem(isDaily ? "dailyFire" : "infiniteFire") || "[]"
    );

    if (isDaily) getDailyFire(fi);
    else setFire(fi);
  }, [hit]);

  const getDailyFire = (fi: FireData[]) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let latestDay: string;

    const result = fi
      .slice()
      .reverse()
      .filter((f: any, index: number) => {
        if (!f.magic) return false;

        const decryptedMagic = decryptData(f.magic);

        if (index === 0) {
          if (decryptedMagic === today.toISOString().split("T")[0])
            latestDay = today.toISOString().split("T")[0];
          else if (decryptedMagic === yesterday.toISOString().split("T")[0])
            latestDay = yesterday.toISOString().split("T")[0];
          else return false;

          return true;
        }

        if (latestDay === null) return false;

        let decryptedMagicDate = new Date(decryptedMagic);
        decryptedMagicDate.setDate(decryptedMagicDate.getDate() + 1);

        if (decryptedMagicDate.toISOString().split("T")[0] === latestDay) {
          latestDay = decryptedMagic;
          return true;
        }
        false;
      });

    setFire(result);
  };

  return (
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
          fontSize={32}
          _hover={{
            color: "white",
            cursor: "pointer",
            transform: "scale(1.2)",
          }}
        >
          <Icon as={BsFillBarChartFill} />
        </Box>
      </Tooltip>
      <Box
        fontSize={36}
        color={fire.length > 0 ? "red" : "grey"}
        position={"relative"}
        transition="0.2s"
        animation={
          fire.length > 0 ? `${flaming} 1.5s ease-in-out infinite` : ""
        }
      >
        <Icon as={AiFillFire} />
        <Text
          position={"absolute"}
          color={"white"}
          fontSize={14}
          top={0}
          right={0}
          left={0}
        >
          {fire.length}
        </Text>
      </Box>
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
          fontSize={32}
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
  );
};

export default StatsTab;
