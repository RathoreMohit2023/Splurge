import React, { useContext } from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Home, Calculator, Users, BookOpen, User } from "lucide-react-native";
import DashBoardScreen from "../screens/MainScreen/DashBoardScreen";
import CalculatorScreen from "../screens/MainScreen/CalculatorScreen";
import groupSettle from "../screens/MainScreen/groupSettle";
import resourceScreen from "../screens/MainScreen/resourceScreen";
import ProfileScreen from "../screens/MainScreen/ProfileScreen";
import { ThemeContext } from "../components/ThemeContext"; 

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const insets = useSafeAreaInsets();
  
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.theme,      
        tabBarInactiveTintColor: colors.textSecondary, 

        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,

          height: insets.bottom > 0 ? 50 + insets.bottom : 60,
        
          paddingBottom: insets.bottom > 0 ? insets.bottom - 4 : 6,
          // paddingTop: 8,
          backgroundColor: colors.surface,
          borderTopColor: colors.border, 
          borderTopWidth: 1,
          
          elevation: 5,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "700",
          paddingBottom: 4,
          fontFamily: 'serif',
        },
      }}
    >
      <Tab.Screen
        name="DashBoard"
        component={DashBoardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Calculator"
        component={CalculatorScreen}
        options={{
          tabBarLabel: "Calc",
          tabBarIcon: ({ color, size }) => <Calculator color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Settle"
        component={groupSettle}
        options={{
          tabBarLabel: "Settle",
          tabBarIcon: ({ color, size }) => <Users color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Resources"
        component={resourceScreen}
        options={{
          tabBarLabel: "Resources",
          tabBarIcon: ({ color, size }) => <BookOpen color={color} size={size} />,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;