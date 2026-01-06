import React, { useContext, useMemo } from "react";
import { View, Text, StatusBar } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import VideoScreen from "../../screens/MainScreen/learnTabs/Videos";
import FounderScreen from "../../screens/MainScreen/learnTabs/founders";
import ArticleScreen from "./learnTabs/Articles";
import { ThemeContext } from "../../components/ThemeContext"; 
import getResourceStyles from "../../styles/MainScreen/resourceStyle";
import DashedLoader from "../../components/DashedLoader";
import { useSelector } from "react-redux";

const Tab = createMaterialTopTabNavigator();

const ResourceScreen = () => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getResourceStyles(colors), [colors]);
  const insets = useSafeAreaInsets();
    const {GetVideoLoading } = useSelector(state => state.GetVideo);
    const { GetFounderloading } = useSelector(state => state.GetFounder);
    const {GetArticleloading } = useSelector(state => state.GetArticle);
  const isLoading = GetVideoLoading || GetFounderloading || GetArticleloading;

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />
      
      <View style={styles.headerContainer}>
        <Text style={styles.heading}>Resources</Text>
        <Text style={styles.subHeading}>Curated content to help you grow.</Text>
      </View>

      <View style={{ flex: 1 }}> 
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.theme,
            tabBarInactiveTintColor: colors.textSecondary,
            
            tabBarStyle: { 
                backgroundColor: colors.tintedThemeColor,
                marginHorizontal: 16,
                borderRadius: 16,
                elevation: 0, 
                shadowOpacity: 0, 
                borderWidth: 1,
                borderColor: colors.border,
                height: 50,
                justifyContent: 'center'
            },
            tabBarIndicatorStyle: { 
                backgroundColor: colors.theme, 
                height: '80%',
                width: 4, 
                borderRadius: 2,
                marginBottom: 5, 
                display: 'none' 
            },
            tabBarItemStyle: {
                paddingVertical: 0,
            },
            tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: '700',
                textTransform: 'capitalize',
                fontFamily: 'serif',
            },
            tabBarPressColor: "transparent",
          }}
          sceneContainerStyle={{ backgroundColor: colors.background }}
        >
          <Tab.Screen name="Videos" component={VideoScreen} />
          <Tab.Screen name="Founders" component={FounderScreen} />
          <Tab.Screen name="Articles" component={ArticleScreen} />
        </Tab.Navigator>
      </View>
      {isLoading && <DashedLoader color={colors.primary} size={100} />}
    </View>
  );
};

export default ResourceScreen;