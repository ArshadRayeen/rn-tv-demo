import {Platform, PixelRatio, StyleSheet} from 'react-native';

// Get pixel ratio
let pixelRatio = PixelRatio.get();
if (Platform.OS === 'web') {
  pixelRatio = 1;
}

// Screen height
let height = 1080;

const Style = {
  backgroundColor: '#282c34',
  modalBackgroundColor: '#444c58',
  buttonUnfocusedColor: '#fff',
  buttonFocusedColor: '#61dafb',
  buttonPressedColor: '#ccc',
  px: (size) => {
    return Math.round((size * (height / 1080)) / pixelRatio);
  },
};

Style.styles = StyleSheet.create({
  right: {
    backgroundColor: Style.backgroundColor,
    flex: 1,
  },
  content: {
    width:'100%',
    height: '100%',
  },
});

export default Style;
