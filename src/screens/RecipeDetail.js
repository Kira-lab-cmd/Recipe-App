import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
} from "react-native-heroicons/outline";
import {
  HeartIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import Animated, { FadeInDown } from "react-native-reanimated";
import YoutubeIframe from "react-native-youtube-iframe";

const RecipeDetail = ({ route }) => {
  const { data } = route.params;
  const navigation = useNavigation();
  const [isFavourite, setIsFavourite] = useState(false);
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(data.idMeal);
  }, []);

  const getMealData = async (id) => {
    try {
      console.log(id, "İD GELDİ ");
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      if (response && response.data) setMeal(response.data.meals[0]);

      setLoading(false);
    } catch (err) {
      console.log("error:", err.message);
    }
  };

  const ingredientsIndexes = (meal) => {
    if (!meal) return [];
    let indexes = [];

    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) indexes.push(i);
    }

    return indexes;
  };

  const getYoutubeVideoId = (url) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }
    return null;
  };

  return (
    <ScrollView
      style={{
        backgroundColor: "white",
      }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={"light"} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Image
          source={{ uri: data.strMealThumb }}
          style={{
            width: hp(46.8),
            height: hp(46.8),
            borderRadius: 53,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 4,
          }}
        />
      </View>
      <View className="w-full absolute flex-row justify-between items-center pt-14">
        <TouchableOpacity
          className="p-2 rounded-full ml-5 bg-white"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbfb24" />
        </TouchableOpacity>
        <TouchableOpacity
          className="p-2 rounded-full mr-5 bg-white"
          onPress={() => setIsFavourite(!isFavourite)}
        >
          <HeartIcon
            size={hp(3.5)}
            strokeWidth={4.5}
            color={isFavourite ? "red" : "gray"}
          />
        </TouchableOpacity>
      </View>
      {loading ? (
        <View className="flex-1 flex justify-center items-center">
          <ActivityIndicator size="large" className="mt-20" />
        </View>
      ) : (
        <View className="px-4 flex justify-between space-y-4 pt-8">
          <View>
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold flex-1 text-neutral-700"
            >
              {meal?.strMeal}
            </Text>
            <Text
              style={{ fontSize: hp(2) }}
              className="font-medium flex-1 text-neutral-500"
            >
              {meal?.strArea}
            </Text>
          </View>
          <Animated.View
            entering={FadeInDown.duration(700).springify().damping(12)}
            className="flex-row justify-around"
          >
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>

              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  35
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Mins
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  03
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Servings
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                >
                  103
                </Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Cal
                </Text>
              </View>
            </View>
            <View className="flex rounded-full bg-amber-300 p-2">
              <View
                style={{ height: hp(6.5), width: hp(6.5) }}
                className="bg-white rounded-full flex items-center justify-center"
              >
                <Square3Stack3DIcon
                  size={hp(4)}
                  strokeWidth={2.5}
                  color="#525252"
                />
              </View>
              <View className="flex items-center py-2 space-y-1">
                <Text
                  style={{ fontSize: hp(2) }}
                  className="font-bold text-neutral-700"
                ></Text>
                <Text
                  style={{ fontSize: hp(1.3) }}
                  className="font-bold text-neutral-700"
                >
                  Easy
                </Text>
              </View>
            </View>
          </Animated.View>
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2.5) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Ingredients
            </Text>
            <View className="space-y-2 ml-3">
              {ingredientsIndexes(meal).map((i) => {
                return (
                  <View key={i} className="flex-row space-x-4">
                    <View
                      style={{
                        height: hp(1.5),
                        width: hp(1.5),
                      }}
                      className="bg-amber-300 rounded-full"
                    />
                    <View className="flex-row space-x-2">
                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-extrabold text-neutral-700"
                      >
                        {meal["strMeasure" + i]}
                      </Text>
                      <Text
                        style={{ fontSize: hp(1.9) }}
                        className="font-medium text-neutral-600"
                      >
                        {meal["strIngredient" + i]}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          <View className="space-y-4">
            <Text
              style={{ fontSize: hp(2) }}
              className="font-bold flex-1 text-neutral-700"
            >
              Instructions
            </Text>
            <Text style={{ fontSize: hp(2) }} className="text-neutral-700">
              {meal?.strInstructions}
            </Text>
          </View>
          {meal.strYoutube && (
            <View className="space-y-4">
              <Text
                style={{ fontSize: hp(2.5) }}
                className="font-bold flex-1 text-neutral-600"
              >
                Recipe Video
              </Text>
              <View>
                <YoutubeIframe
                  videoId={getYoutubeVideoId(meal.strYoutube)}
                  height={hp(30)}
                />
              </View>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default RecipeDetail;
