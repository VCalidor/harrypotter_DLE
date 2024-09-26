import {
  Box,
  Icon,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
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
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay
          backdropFilter="auto"
          backdropInvert="6%"
          backdropBlur="2px"
        />
        <ModalContent
          maxW="600px"
          w="90%"
          margin="auto"
          marginY="5vh"
          borderRadius={8}
          padding={4}
          maxH="90vh"
          overflowY="auto"
        >
          <ModalBody padding={0}>
            <VStack
              backgroundColor="rgba(0, 0, 0, .6)"
              borderRadius={6}
              padding={8}
              gap={4}
              color={"white"}
              textAlign={"center"}
              position={"relative"}
            >
              <IconButton
                position={"absolute"}
                fontSize={24}
                right={4}
                top={4}
                background={"none"}
                border={"none"}
                color={"gray"}
                aria-label="close"
                icon={<IoMdClose />}
                onClick={onClose}
                transition={".2s"}
                _hover={{
                  transform: "scale(1.2) rotate(90deg)",
                  color: "white",
                  cursor: "pointer",
                }}
              />
              <Text as={"h2"} margin={0} fontSize={32}>
                {title}
              </Text>
              {children}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomTooltip;
