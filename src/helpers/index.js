
import AsyncStorage from "@react-native-async-storage/async-storage"
import {useEffect, useState} from "react"
import Animated from"react-native-reanimated"

// Helper function to convert ArrayBuffer to base64
const arrayBufferToBase64 = (buffer) => {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

export const CachedImage = (props) => {
  const [cachedSource, setCachedSource] = useState(null);
  const { uri } = props;

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);

        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const arrayBuffer = await response.arrayBuffer();
          
          // Convert ArrayBuffer to base64
          const base64Data = arrayBufferToBase64(arrayBuffer);
          const imageUri = `data:image/jpeg;base64,${base64Data}`;

          await AsyncStorage.setItem(uri, imageUri);
          setCachedSource({ uri: imageUri });
        }
      } catch (error) {
        console.error('Error caching image:', error);
        // Fallback to direct URI if caching fails
        setCachedSource({ uri });
      }
    };

    getCachedImage();
  }, [uri]);

  return <Animated.Image source={cachedSource || { uri }} {...props} />;
};

export default CachedImage
