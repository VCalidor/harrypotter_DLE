import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MyProvider, useMyContext } from "./context/index.tsx";
import { ChakraProvider } from "@chakra-ui/react";
import "./assets/fonts.css";
import theme from "./theme";
import backgroundPattern from "./assets/backgroundPattern.png";

document.body.style.backgroundImage = `url(${backgroundPattern})`;

const Loading = () => <div>Carregando...</div>;

const Root = () => {
  const { loading } = useMyContext();

  const handleMouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    const xPos = (clientX / window.innerWidth) * 2;
    const yPos = (clientY / window.innerHeight) * 2;

    document.body.style.transition = "background-position 0.6s ease";
    document.body.style.backgroundPosition = `${xPos}% ${yPos}%`;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return loading ? <Loading /> : <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <MyProvider>
        <Root />
      </MyProvider>
    </ChakraProvider>
  </React.StrictMode>
);
