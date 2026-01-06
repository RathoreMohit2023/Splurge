import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/Authenthication/Login";
import SignUp from "../screens/Authenthication/SignUp";
import forgotePassword from "../screens/Authenthication/forgotPassword";
import SplashSCreen from "../screens/SplashScreen/SplashScreen";

const Stack = createStackNavigator();

const AuthNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="spalsh" component={SplashSCreen} />
            <Stack.Screen name="signIn" component={SignIn} />
            <Stack.Screen name="signUp" component={SignUp} />
            <Stack.Screen name="forgotePassword" component={forgotePassword} />
        </Stack.Navigator>
    );
};

export default AuthNavigator;