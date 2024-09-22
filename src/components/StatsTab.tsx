import { Box, HStack, Icon, keyframes, Text, Tooltip } from "@chakra-ui/react";
import { useEffect } from "react";
import { AiFillFire } from "react-icons/ai";
import { BsFillBarChartFill, BsInfoCircle } from "react-icons/bs";

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

const StatsTab = ({ isDaily, hit }: { isDaily: boolean; hit: boolean }) => {
  let fire = JSON.parse(
    localStorage.getItem(isDaily ? "dailyFire" : "infiniteFire") || "[]"
  );

  useEffect(() => {
    fire = JSON.parse(
      localStorage.getItem(isDaily ? "dailyFire" : "infiniteFire") || "[]"
    );
  }, [hit]);

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
