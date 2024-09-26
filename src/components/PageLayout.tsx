import { Button, Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { GiReturnArrow } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const PageLayout = ({
  children,
  isHome = false,
}: {
  children: React.ReactNode;
  isHome?: boolean;
}) => {
  const navigate = useNavigate();

  return (
    <VStack
      w={"100%"}
      paddingTop={50}
      textAlign={"center"}
      gap={6}
    >
      <HStack
        w={"80%"}
        justifyContent={"center"}
        alignItems={"center"}
        position="relative"
      >
        <Heading
          as="h1"
          fontSize={"xxx-large"}
          letterSpacing=".03em"
          textShadow="4px 4px 2px rgba(0, 0, 0, 1)"
          textAlign="center"
          flexGrow={1}
        >
          Mundo Bruxo
        </Heading>
        {isHome && (
          <Button
            padding={".2rem"}
            position={"absolute"}
            right={0}
            onClick={() => navigate("/")}
            fontSize={26}
            color={"black"}
            border={"solid 4px white"}
            background={"rgba(230, 230, 230)"}
            w={"fit-content"}
            h={"fit-content"}
            borderRadius={"100%"}
            cursor={"pointer"}
            transition={"0.2s"}
            _hover={{
              transform: "scale(1.4) rotate(360deg)",
              boxShadow: "0 0 5px rgba(0, 0, 0, 1)",
            }}
          >
            <Icon as={GiReturnArrow} color={"#0B090D"} />
            <Icon
              as={GiReturnArrow}
              position={"absolute"}
              opacity={0.7}
              filter="blur(2px)"
              color={"#0B090D"}
            />
          </Button>
        )}
      </HStack>
      {children}
    </VStack>
  );
};

export default PageLayout;
