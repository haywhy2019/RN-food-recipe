import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  SafeAreaView,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { COLORS, SIZES, FONTS, icons } from "../constants";

const HEADER_HEIGHT = 300;

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);

  const RecipeCreatorCardDetail = ({ selectedRecipe }) => {
    return (
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 40,
            height: 40,
            marginLeft: 20,
          }}
        >
          <Image
            source={selectedRecipe?.author?.profilePic}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
        <View style={{ flex: 1, marginHorizontal: 20 }}>
          <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
            Recipe by:
          </Text>
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
            {selectedRecipe?.author?.name}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.lightGreen1,
          }}
          onPress={console.log("view Profile")}
        >
          <Image
            source={icons.rightArrow}
            style={{ width: 15, height: 15, tintColor: COLORS.lightGreen }}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
    if (Platform.OS == "ios") {
      return (
        <BlurView
          style={{ flex: 1, borderRadius: SIZES.radius }}
          blurType="dark"
        >
          <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
        </BlurView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.transparentBlack9,
          }}
        >
          <RecipeCreatorCardDetail selectedRecipe={selectedRecipe} />
        </View>
      );
    }
  };
  const renderReceiptCardHeader = () => {
    return (
      <View
        style={{
          alignItems: "center",
          overflow: "hidden",
          marginTop: -1000,
          paddingTop: 1000,
        }}
      >
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode={"contain"}
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            position: "absolute",
            bottom: 10,
            left: 30,
            right: 30,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  };
  const listHeader = () => {
    return <View>{renderReceiptCardHeader()}</View>;
  };

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginVertical: 5,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 50,
            width: 50,
            borderRadius: 5,
            backgroundColor: COLORS.lightGray,
          }}
        >
          <Image source={item.icon} style={{ height: 40, width: 40 }} />
        </View>
        <View
          style={{ flex: 1, paddingHorizontal: 20, justifyContent: "center" }}
        >
          <Text style={{ ...FONTS.body3 }}>{item.description}</Text>
        </View>
        <View style={{ alignItems: "flex-end", justifyContent: "center" }}>
          <Text style={{ ...FONTS.body3 }}>{item.quantity}</Text>
        </View>
      </View>
    );
  };
  const renderHeaderBar = () => {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 90,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{ width: 15, height: 15, tintColor: COLORS.lightGray }}
          />
        </TouchableOpacity >
        <TouchableOpacity 
         style={{
          alignItems: "center",
          justifyContent: "center",
          height: 35,
          width: 35,
        }}>
<Image source={selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}   style={{ width: 30, height: 30, tintColor: COLORS.darkGreen }} />
        </TouchableOpacity>
      </View>
    );
  };
  const scrollY = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={listHeader}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={renderItem}
      />
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
