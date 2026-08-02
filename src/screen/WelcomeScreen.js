import {  Image, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring, } from 'react-native-reanimated';
import { useNavigation } from "@react-navigation/native";
const WelcomeScreen = () => {

  const ring1padding = useSharedValue(0)
  const ring2padding = useSharedValue(0)


  const navigation = useNavigation()

  useEffect(() => {
    ring1padding.value=0
    ring2padding.value=0
    setTimeout(() => ring1padding.value = withSpring(ring1padding.value + hp(5)),100)
     setTimeout(() => ring2padding.value = withSpring(ring2padding.value + hp(5)),100)

     setTimeout(() => navigation.navigate("Home"),2500)
  },[])

  return (
    <View className="flex-1 items-center justify-center space-y-10 bg-amber-500">
      <StatusBar style='light' />

      {/* logo */}
      <Animated.View className="bg-white/20 rounded-full" style={{padding:ring1padding}}>
        <Animated.View className="bg-white/20 rounded-full" style={{padding:ring2padding}}>
          <Image source={require("../../assets/images/welcome.webp")}
          style={{width:hp(20), height:hp(20)}}/>
        </Animated.View>
      </Animated.View>

      {/* baslik */}
      <View className="flex items-center sapce-y-2">
        <Text className="font-bold text-white tracking-widest" style={{fontSize: hp(7)}}>
          Udemig
        </Text>
         <Text className="font-medium text-white tracking-widest" style={{fontSize: hp(2)}}>
          Yemegin Dogru Adresi
        </Text>
      </View>
    </View>
  )
}

export default WelcomeScreen

