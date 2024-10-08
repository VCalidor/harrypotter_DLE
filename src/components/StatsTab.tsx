import { Box, HStack, Icon, Text, Tooltip } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiFillFire } from "react-icons/ai";
import { BsFillBarChartFill } from "react-icons/bs";
import { decryptData } from "../utils";
import CustomTooltip from "./CustomTooltip";
import HowToPlayTooltip from "./HowToPlayTooltip";
import { flaming } from "../animations";

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
    today.setHours(today.getHours() - 2);

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    today.setHours(yesterday.getHours() - 2);

    let latestDay: string;

    const result = fi.filter((f: any, index: number) => {
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
    <HStack
      gap={"1rem"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      backdropFilter="blur(2px)"
      padding={".5rem"}
      paddingX={"1rem"}
      paddingBottom={0}
      rounded={6}
    >
      <Tooltip label={"Estatísticas"} hasArrow zIndex="tooltip">
        <Box
          color={"gray"}
          transition="0.2s"
          fontSize={32}
          _hover={{
            color: "#2C3DAA",
            cursor: "pointer",
            transform: "scale(1.2)",
          }}
        >
          <Icon as={BsFillBarChartFill} />
        </Box>
      </Tooltip>
      <Box
        color={fire.length > 0 ? "#2C3DAA" : "gray"}
        position={"relative"}
        transition="0.2s"
        fontWeight="bolder"
        animation={
          fire.length > 0 ? `${flaming} 1.5s ease-in-out infinite` : ""
        }
      >
        <Icon as={AiFillFire} boxSize={"2.2rem"} />
        <Text
          position={"absolute"}
          fontSize={".9rem"}
          top={".8rem"}
          right={".83rem"}
          color={"#D9CEC5"}
        >
          {fire.length}
        </Text>
      </Box>
      <CustomTooltip title="Como Jogar">
        <HowToPlayTooltip />
      </CustomTooltip>
    </HStack>
  );
};

export default StatsTab;
