import { VStack } from "@chakra-ui/react";
import { glow, pulse, float } from "../animations";

const Loading = ({
  children,
  button,
}: {
  children: React.ReactNode | null;
  button: React.ReactNode | null;
}) => {
  return (
    <VStack
      gap={"2rem"}
      backgroundColor="rgb(11, 9, 13, .7)"
      border={"1px solid rgb(51, 47, 64, .7)"}
      rounded={"md"}
      maxW={"90%"}
      padding={"3rem"}
      backdropFilter="blur(2px)"
    >
      {children}
      <VStack
        w={"10vh"}
        h={"10vh"}
        borderRadius={"full"}
        background={`radial-gradient(circle, rgba(0, 0, 255, 0.4), rgba(0, 0, 139, 0.2), transparent)`}
        animation={`${glow} 2s infinite ease-in-out, ${pulse} 1.5s infinite ease-in-out, ${float} 3s infinite ease-in-out`}
      >
        <VStack
          w={"6vh"}
          h={"6vh"}
          margin={"auto"}
          borderRadius={"full"}
          background={`radial-gradient(circle, rgba(255, 255, 255, 0.6), rgba(0, 0, 255, 0.8))`}
          animation={`${pulse} 1.5s infinite ease-in-out`}
        />
      </VStack>
      {button}
    </VStack>
  );
};

export default Loading;
