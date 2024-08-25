import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

function categories({ categories, handleChangeCategory }) {
  const navigation = useNavigation();

  return (
    <Animated.View
      entering={FadeInDown.duration(500).springify()}
      className="bg-amber-500"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        {categories.map((props, index) => {
          console.log(props.strCategory, "strCategory geldi");
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleChangeCategory(props.strCategory);
              }}
            >
              <View className="flex-row justify-start  bg-slate-200 rounded-l-full mr-2 ml-2 mt-3 mb-2">
                <Image
                  style={{
                    width: hp(7.5),
                    height: hp(7.5),
                    margin: 5,
                    marginLeft: 12,
                  }}
                  source={{ uri: props.strCategoryThumb }}
                />
                <Text style={{ fontSize: hp(2.75) }} className="mt-6 ml-3 ">
                  {props.strCategory}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
}
export default categories;
