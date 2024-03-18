import { 
  createUnifiedTheme, 
  palettes, 
  createBaseThemeOptions, 
  genPageTheme, 
  shapes 
} from "@backstage/theme";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const cncfPalette: PaletteOptions = {
  ...palettes.light,
  primary: {
    main: "#d62293",
  },
  secondary: {
    main: "#4d6a85",
  },
  background: {
    default: "#fff",
  },
  navigation: {
    ...palettes.light.navigation,
    background: "#fff",
    color: "#196bcc",
    indicator: "#4d6a85",
    selectedColor: "#4d6a85",
    navItem: {
      hoverBackground: "#000",
    }
  }
};

const cncfTheme = createUnifiedTheme({
  ...createBaseThemeOptions({
    palette: cncfPalette,
  }),
  defaultPageTheme: "home",
  pageTheme: {
    home: genPageTheme({
      colors: ["#196bcc"], 
      shape: shapes.round,
    })
  },
});

export default cncfTheme;
