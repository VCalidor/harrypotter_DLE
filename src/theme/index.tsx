import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "'Harry P', sans-serif",
    body: "'Merriweather', sans-serif",
  },
  styles: {
    global: {
      "html, body": {
        fontFamily: "'Merriweather', sans-serif",
        scrollbarWidth: "thin",
        scrollbarColor: "#888 transparent", // Para Firefox
      },
      "::-webkit-scrollbar": {
        width: "10px", // Largura da barra de rolagem
        height: "10px", // Para barras de rolagem horizontais, se necessário
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#888", // Cor da barra de rolagem
        borderRadius: "10px",
        transition: "background-color 0.2s ease", // Adiciona uma transição suave
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555", // Cor ao passar o mouse
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "transparent", // Remove o fundo da trilha
      },
    },
    
    
  },
  components: {
    Button: {
      variants: {
        buttonVariant: {
          border: "solid 4px white",
          borderBottom: "solid 4px gray",
          borderRight: "solid 4px gray",
          borderRadius: 4,
          paddingY: "2.4rem",
          w: "40%",
          minWidth: "8rem",
          color: "black",
          background: "rgba(230, 230, 230)",
          cursor: "pointer",
          _hover: { transform: "scale(1.1)" },
          transition: "0.2s",
        },
      },
    },
  },
});

export default theme;
