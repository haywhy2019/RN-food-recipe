import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  FlatList,
} from "react-native";

import {
  FONTS,
  COLOURS,
  SIZES,
  icons,
  images,
  dummyData,
  COLORS,
} from "../constants";
import { CategoryCard, TrendyCard } from "../components";

const Home = ({ navigation }) => {
  const renderCard = ({ item }) => {
    return (
      <CategoryCard
        categoryItem={item}
        containerStyles={{
          marginHorizontal: SIZES.padding,
        }}
        onPress={() => navigation.navigate("Recipe", { recipe: item })}
      />
    );
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          marginHorizontal: SIZES.padding,
          alignItems: "center",
          height: 80,
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
            Hello ByProgrammers,
          </Text>
          <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.body3 }}>
            What you want to cook today ?
          </Text>
        </View>
        <TouchableOpacity onPress={() => console.log("Profile")}>
          <Image
            source={images.profile}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderSearchBar = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 50,
          alignItems: "center",
          marginHorizontal: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: 10,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image
          source={icons.search}
          style={{ width: 20, height: 20, tintColor: COLORS.gray }}
        />
        <TextInput
          style={{
            marginLeft: SIZES.radius,
            ...FONTS.body3,
          }}
          placeholderTextColor={COLORS.gray}
          placeholder="Search Recipes"
        />
      </View>
    );
  };

  const renderSeeRecipeCard = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          backgroundColor: COLORS.lightGreen,
          marginHorizontal: SIZES.padding,
          marginVertical: SIZES.padding,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{ width: 100, alignItem: "center", justifyContent: "center" }}
        >
          <Image
            source={images.recipe}
            resizeMode="cover"
            style={{ height: 80, width: 80 }}
          />
        </View>

        <View style={{ width: "70%", ...FONTS.body4 }}>
          <Text style={{ fontWeight: "bold" }}>
            You have 12 recipes that you havent tried yet
          </Text>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.darkGreen,
                textDecorationLine: "underline",
                ...FONTS.h4,
              }}
            >
              See Recipes
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderTrendySection = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ marginHorizontal: SIZES.padding, ...FONTS.h2 }}>
          Trending Recipe
        </Text>
        <FlatList
          data={dummyData.trendingRecipes}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => {
            return (
              <TrendyCard
                recipeItem={item}
                containerStyle={{
                  marginHorizontal: index == 0 ? SIZES.padding : 0,
                }}
                onPress={() => navigation.navigate("Recipe", { recipe: item })}
              />
            );
          }}
        />
      </View>
    );
  };

  const renderCategoryHeader = () => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 20,
          marginHorizontal: SIZES.padding,
        }}
      >

          <Text style={{flex: 1,...FONTS.h2}}>Categories</Text>
          <TouchableOpacity>
              <Text style={{color: COLORS.gray, ...FONTS.body4}}> View All</Text>
          </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <FlatList
        data={dummyData.categories}
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {renderHeader()}
            {renderSearchBar()}
            {renderSeeRecipeCard()}
            {renderTrendySection()}
            {renderCategoryHeader()}
          </View>
        }
        renderItem={renderCard}
        ListFooterComponent={
          <View
            style={{
              marginBottom: 100,
            }}
          ></View>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
