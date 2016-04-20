import { spacing, colors } from 'material-ui/styles';
import * as ColorManipulator from 'material-ui/utils/colorManipulator';

module.exports = {
  spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: colors.cyan500,
    primary2Color: colors.cyan700,
    primary3Color: colors.lightBlack,
    accent1Color: colors.pinkA200,
    accent2Color: colors.grey100,
    accent3Color: colors.grey500,
    textColor: colors.darkBlack,
    alternateTextColor: colors.white,
    canvasColor: colors.white,
    borderColor: colors.grey300,
    disabledColor: ColorManipulator.fade(colors.darkBlack, 0.3),
  },
};
