import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Text, View, Image } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
    const firstRingPadding = useSharedValue(0);
    const secondRingPadding = useSharedValue(0);
    const navigation = useNavigation()

    useEffect(() => {
        firstRingPadding.value = 0
        secondRingPadding.value = 0
        setTimeout(() => firstRingPadding.value = withSpring(firstRingPadding.value + hp(5)), 100);
        setTimeout(() => secondRingPadding.value = withSpring(secondRingPadding.value + hp(5.5)), 300);
        setTimeout(() => navigation.navigate('Home'), 2500)
    }, []);

    return (
        <View className="flex-1 justify-center items-center space-y-10 bg-amber-600">
            <StatusBar style="light" />

            <Animated.View
                className="bg-white/20 rounded-full"
                style={{ padding: secondRingPadding }}
            >
                <Animated.View
                    className="bg-white/20 rounded-full"
                    style={{ padding: firstRingPadding }}
                >
                    <Image
                        source={require("../../assets/welcome.png")}
                        style={{ width: hp(20), height: hp(20) }}
                    />
                </Animated.View>
            </Animated.View>

            <View className="flex items-center space-y-2">
                <Text
                    style={{ fontSize: hp(7) }}
                    className="font-bold text-white tracking-widest"
                >
                    Tarifka
                </Text>
                <Text
                    style={{ fontSize: hp(2) }}
                    className="font-medium text-white tracking-widest"
                >
                    En Güzel Tarifler İçin
                </Text>
            </View>
        </View>
    );
}

export default HomeScreen;
