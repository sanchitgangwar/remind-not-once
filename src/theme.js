import {
    createMuiTheme,
    createTypography
} from 'material-ui/styles';

const theme = createMuiTheme();
const typography = createTypography(theme.palette, {
    fontFamily: '"Source Sans Pro", "Roboto", sans-serif'
});

export default {
    ...theme,
    typography: {
        ...typography
    }
};
