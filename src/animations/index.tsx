import { keyframes } from "@emotion/react";

export const glow = keyframes`
  0% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 0, 255, 0.3), 0 0 30px rgba(0, 0, 255, 0.4);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 30px rgba(0, 0, 255, 0.5), 0 0 40px rgba(0, 0, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(0, 0, 255, 0.3), 0 0 30px rgba(0, 0, 255, 0.4);
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const float = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
`;

export const fadeInAndScale = keyframes`
  0% {
    transform: scale(0) rotate(0deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(380deg);
    opacity: 0.5;
  }
  100% {
    transform: scale(1) rotate(360deg);
    opacity: 1;
  }
`;

export const goDown = keyframes`
  0% {
    transform: translateY(0px);
  }
  100% {
    transform: translateY(98px);
  }`;

export const scaleHeight = (height: number) => keyframes`
  0% {
    height: ${height}px;
  }
  100% {
    height: ${height + 98}px;
  }`;

export const flaming = keyframes`
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

export const newTip = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }`;

export const flipPart1 = keyframes`
  0% {
    transform: rotateY(0deg) scale(1);
  }
  100% {
    transform: rotateY(-90deg) scale(1.2);
  }`;

export const flipPart2 = keyframes`
  0% {
    transform: rotateY(-90deg) scale(1.2);
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }`;

export const appear = keyframes`
0% {
  opacity: 0;
  transform: translateY(-10px);
  scale: .9;
}
100% {
  opacity: 1;
  transform: translateY(0);
  scale: 1;
}`;
