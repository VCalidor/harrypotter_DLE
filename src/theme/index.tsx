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
        scrollbarColor: "#888 transparent",
        color: "#F7F5F3",
        height: "100%",
        margin: 0,
        padding: 0,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        backgroundPosition: "top left",
      },
      "::-webkit-scrollbar": {
        width: "10px",
        height: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "#888",
        borderRadius: "10px",
        transition: "background-color 0.2s ease",
      },
      "::-webkit-scrollbar-thumb:hover": {
        backgroundColor: "#555",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "transparent",
      },
    },
  },
  components: {
    Button: {
      variants: {
        buttonVariant: {
          border: "solid 4px #F7F5F3",
          borderBottom: "solid 4px #332F40",
          borderRight: "solid 4px #332F40",
          borderRadius: 4,
          paddingY: "2.4rem",
          w: "40%",
          minWidth: "8rem",
          color: "black",
          background: "#D9CEC5",
          cursor: "pointer",
          _hover: { transform: "scale(1.1)" },
          transition: "0.2s",
        },
      },
    },
  },
});

export default theme;
