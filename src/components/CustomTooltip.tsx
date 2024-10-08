import {
  Box,
  Heading,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

const CustomTooltip = ({
  children,
  title,
}: {
  children: any;
  title: string;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Tooltip closeOnClick={false} label={title} hasArrow zIndex="tooltip">
        <Box
          onClick={onOpen}
          transition="0.2s"
          color={"gray"}
          fontSize={32}
          _hover={{
            color: "#2C3DAA",
            cursor: "pointer",
            transform: "scale(1.2)",
          }}
        >
          <Icon as={BsInfoCircle} />
        </Box>
      </Tooltip>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="6%"
          backdropBlur="2px"
        />
        <ModalContent
          maxW="50rem"
          margin="auto"
          marginY="5vh"
          borderRadius={8}
          maxH="90vh"
          overflowY="auto"
          bg="none"
        >
          <ModalBody padding={0} w={"100%"}>
            <VStack
              backgroundColor="rgb(11, 9, 13, .7)"
              border={"1px solid rgb(51, 47, 64, .7)"}
              borderRadius={6}
              padding={"2rem"}
              gap={4}
              textAlign={"center"}
              position={"relative"}
              w={"100%"}
            >
              <IconButton
                position={"absolute"}
                fontSize={24}
                right={"2rem"}
                top={"2rem"}
                background={"none"}
                border={"none"}
                color={"#A69EB8"}
                aria-label="close"
                icon={<IoMdClose />}
                onClick={onClose}
                transition={".2s"}
                _active={{}}
                _hover={{
                  transform: "scale(1.2) rotate(90deg)",
                  color: "white",
                  cursor: "pointer",
                }}
              />
              <Heading
                fontSize={"xxx-large"}
                letterSpacing=".03em"
                textShadow="4px 4px 2px rgba(0, 0, 0, 1)"
                textAlign="center"
              >
                {title}
              </Heading>
              {children}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomTooltip;
