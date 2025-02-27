import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";

import { Character } from "../interfaces";
import HitCharacter from "./HitCharacter";
import { useEffect } from "react";

const HitCharacterFullComponent = ({
  hit,
  alreadyHit,
  hits,
  mode,
  isDaily,
  chosenCharacter,
  selectedCharacters,
  restartChallenge,
}: {
  hit: boolean;
  alreadyHit: boolean;
  hits: number;
  mode: "daily" | "infinite" | "emoji";
  isDaily: boolean;
  chosenCharacter: Character;
  selectedCharacters: Character[];
  restartChallenge?: () => void;
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    setTimeout(() => {
      onOpen();
    }, 1000);
  }, [hit || alreadyHit]);

  return (
    <>
      {(hit || alreadyHit) && (
        <>
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
              maxH="90vh"
              overflowY="auto"
              bg="none"
            >
              <ModalBody padding={0}>
                <HitCharacter
                  onOpen={onOpen}
                  onClose={onClose}
                  isModal={true}
                  chosenCharacter={chosenCharacter}
                  hits={
                    mode === "daily" || mode === "emoji"
                      ? JSON.parse(
                          localStorage.getItem(mode + "Fire") || "[{}]"
                        )[0]?.position || 0
                      : hits
                  }
                  tries={selectedCharacters.length + 1}
                  isDaily={isDaily}
                  restartChallenge={restartChallenge}
                />
              </ModalBody>
            </ModalContent>
          </Modal>
          {!isOpen && (
            <HitCharacter
              onOpen={onOpen}
              onClose={onClose}
              isModal={false}
              chosenCharacter={chosenCharacter}
              hits={
                isDaily
                  ? JSON.parse(localStorage.getItem(mode + "Fire") || "{}")[0]
                      .position
                  : hits
              }
              tries={selectedCharacters.length + 1}
              isDaily={isDaily}
              width="40rem"
              restartChallenge={restartChallenge}
            />
          )}
        </>
      )}
    </>
  );
};

export default HitCharacterFullComponent;
