import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { MyProvider, useMyContext } from "./context/index.tsx";
import { ChakraProvider, Image } from "@chakra-ui/react";
import backgroundImage from "./assets/background.jpg";
import "./assets/fonts.css";
import theme from "./theme";

const Loading = () => <div>Carregando...</div>;

const Root = () => {
  const { loading } = useMyContext();

  return loading ? <Loading /> : <App />;
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Image
        src={backgroundImage}
        position={"fixed"}
        margin={0}
        width="100%"
        height="100%"
        objectFit="cover"
        zIndex={-1}
      />
      <MyProvider>
        <Root />
      </MyProvider>
    </ChakraProvider>
  </React.StrictMode>
);
