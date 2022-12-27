import { MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  fontFamily: 'Comfortaa',
  headings: {
    fontFamily: 'Comfortaa',
  },
  components: {
    Button: {
      styles: {
        root: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '4px 4px black',
        }
      }
    },
    Badge: {
      styles: {
        root: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '2px 2px black',
        }
      }
    },
    Burger: {
      styles: {
        root: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '2px 2px black',
          padding: '0px 3px',
        }
      }
    },
    Card: {
      styles: {
        root: {
          borderWidth: '4px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '4px 4px black',
        }
      }
    },
    TextInput: {
      styles: {
        input: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '4px 4px black',
        }
      }
    },
    ThemeIcon: {
      styles: {
        root: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '2px 2px black',
        }
      }
    },
    ActionIcon: {
      styles: {
        root: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '2px 2px black',
        }
      }
    },
    PasswordInput: {
      styles: {
        input: {
          borderWidth: '2px',
          borderColor: 'black',
          borderStyle: 'solid',
          boxShadow: '4px 4px black',
        }
      }
    },
  }
}
