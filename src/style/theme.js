const fontConfig = {
  Montserrat: {
    100: {
      normal: 'Montserrat-Light',
    },
    200: {
      normal: "Montserrat-Medium",
    },
    300: {
      normal: "Montserrat-SemiBold",
    },
    400: {
      normal: 'Montserrat-Regular',
    },
    500: {
      normal: "Montserrat-Bold",
    },
    600: {
      normal: "Montserrat-Bold",
    },
  }
}

const fonts = {
  heading: "Montserrat",
  body: "Montserrat",
  mono: "Montserrat",
}

const config = {
  useSystemColorMode: false,
  initialColorMode: "light",
};

export const customTheme = {
  config,
  fonts,
  fontConfig
}
