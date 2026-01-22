import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/MainScreen/MainScreen";
import notificationScreen from "../screens/MainScreen/notificationScreen";
import themeSwithcheScreen from "../components/themeSwithcheScreen";
import CalculatorScreen from "../screens/MainScreen/CalculatorScreen";
import groupSettle from "../screens/MainScreen/groupSettle";
import resourceScreen from "../screens/MainScreen/resourceScreen";
import ProfileScreen from "../screens/MainScreen/ProfileScreen";
import LedgerTab from "../screens/MainScreen/tabs/LedgerTab";
import WishlistTab from "../screens/MainScreen/tabs/Wishlisttab";
import ComparisonTab from "../screens/MainScreen/tabs/Comparisontab";
import groupDetails from "../screens/MainScreen/groupDetails";
import VideosScreen from "../screens/MainScreen/learnTabs/Videos";
import founderScreen from "../screens/MainScreen/learnTabs/founders";
import ArticleScreen from "../screens/MainScreen/learnTabs/Articles";
import TermsAndPolicies from "../screens/MainScreen/TermsAndPolicies";
import HelpSupport from "../screens/MainScreen/HelpSupport";
import PersonalInfoScreen from "../screens/MainScreen/PersonalInfoScreen";
import VideoPlayerScreen from "../components/VideoPlayer";
import ModalVideoPlayer from "../Modals/ModalVideoPlayer";
import PDFViewer from "../components/PDFViewer";
import GroupExpense from "../screens/MainScreen/GroupExpense";
import WeeklyAvg from "../screens/MainScreen/WeeklyAvg";
import DailyAvg from "../screens/MainScreen/DailyAvg";
import TabNavigator from "../navigation/tabNavigator"; // Assuming TabNavigator is in the same directory
import ChangePassword from "../screens/MainScreen/ChangePassword";

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MainScreen" component={MainScreen} />
            <Stack.Screen name="notificationScreen" component={notificationScreen} />
            <Stack.Screen name="themeSwithcheScreen" component={themeSwithcheScreen} />
            <Stack.Screen name="CalculatorScreen" component={CalculatorScreen} />
            <Stack.Screen name="groupSettle" component={groupSettle} />
            <Stack.Screen name="GroupExpense" component={GroupExpense} />
            <Stack.Screen name="groupScreen" component={resourceScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            <Stack.Screen name="LedgerTab" component={LedgerTab} />
            <Stack.Screen name="WishlistTab" component={WishlistTab} />
            <Stack.Screen name="ComparisonTab" component={ComparisonTab} />
            <Stack.Screen name="groupDetails" component={groupDetails} />
            <Stack.Screen name="VideosScreen" component={VideosScreen} />
            <Stack.Screen name="founderScreen" component={founderScreen} />
            <Stack.Screen name="ArticleScreen" component={ArticleScreen} />
            <Stack.Screen name="TermsPolicies" component={TermsAndPolicies} />
            <Stack.Screen name="HelpSupport" component={HelpSupport} />
            <Stack.Screen name="PersonalInfoScreen" component={PersonalInfoScreen} />
            <Stack.Screen name="VideoPlayerScreen" component={VideoPlayerScreen} />
            <Stack.Screen name="ModalVideoPlayer" component={ModalVideoPlayer} />
            <Stack.Screen name="PDFViewer" component={PDFViewer} options={{ title: "Document Viewer" }} />
            <Stack.Screen name="weeklyAvg" component={WeeklyAvg} />
            <Stack.Screen name="DailyAvg" component={DailyAvg} />
             <Stack.Screen name="changePassword" component={ChangePassword} />

        </Stack.Navigator>
    );
};

export default AppNavigator;