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
  isDaily,
  chosenCharacter,
  selectedCharacters,
  restartChallenge,
}: {
  hit: boolean;
  alreadyHit: boolean;
  hits: number;
  isDaily: boolean;
  chosenCharacter: Character;
  selectedCharacters: Character[];
  restartChallenge: any;
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
              padding={4}
              maxH="90vh"
              overflowY="auto"
            >
              <ModalBody padding={0}>
                <HitCharacter
                  onOpen={onOpen}
                  onClose={onClose}
                  isModal={true}
                  chosenCharacter={chosenCharacter}
                  hits={
                    isDaily
                      ? JSON.parse(
                          localStorage.getItem("dailyFire") || "[{}]"
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
                  ? JSON.parse(localStorage.getItem("dailyFire") || "{}")[0]
                      .position
                  : hits
              }
              tries={selectedCharacters.length + 1}
              isDaily={isDaily}
              restartChallenge={restartChallenge}
            />
          )}
        </>
      )}
    </>
  );
};

export default HitCharacterFullComponent;
