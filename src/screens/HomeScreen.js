import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, ScrollView, TextInput } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "../components/categories";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
      }
    } catch (err) {
      console.log("error:" + err.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );

      if (response && response.data) {
        setMeals(response.data.meals);
        goRecipesScreen({ meals: response.data.meals });
      }
    } catch (err) {
      console.log("error:" + err.message);
    }
  };

  const handleChangeCategory = (category) => {
    getRecipes(category);
  };

  const goRecipesScreen = ({ meals }) => {
    if (meals) navigation.navigate("Recipes", { meals });
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex-1 space-y-6 pt-14 "
      >
        <View className="flex-1 mx-4  flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Tarif Arayın..."
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className=" bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color="gray" />
          </View>
        </View>
        <View>
          <Text className="text-center text-amber-500 text-2xl font-bold mb-1">
            Categories
          </Text>
          <Categories
            categories={categories}
            handleChangeCategory={handleChangeCategory}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default HomeScreen;
