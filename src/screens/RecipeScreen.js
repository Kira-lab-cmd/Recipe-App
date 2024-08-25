import React, { useEffect, useState } from "react";
import { Text, View, Pressable, Image, FlatList } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import RecipeCard from "../components/RecipeCard";
import axios from "axios";

export default function RecipesScreen({ route }) {
  const { meals } = route.params;
  const navigation = useNavigation();

  const [activeMeals, setActiveMeals] = useState([]);
  const getMealData = async (id) => {
    try {
      console.log(id, "bu item get meal data ya aittir");
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );

      if (
        response &&
        response.data &&
        response.data.meals &&
        response.data.meals[0]
      ) {
        setActiveMeals(response.data.meals[0]);
        goRecipeDetail({ data: response.data.meals[0] });
        console.log("got meal data", response.data.meals[0]);
      }
    } catch (err) {
      console.log("error:" + err.message);
    }
  };

  const goRecipeDetail = ({ data }) => {
    if (data) navigation.navigate("RecipeDetail", { data });
  };

  return (
    <View className="mx-4 mt-8 space-y-3 items-center">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600 mt-1"
      >
        Recipes Screen
      </Text>
      <View>
        <FlatList
          data={meals}
          keyExtractor={(item) => item.idMeal}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <RecipeCard
              item={item}
              index={index}
              navigation={navigation}
              getMealData={getMealData}
            />
          )}
          onEndReachedThreshold={0.1}
        />
      </View>
    </View>
  );
}
