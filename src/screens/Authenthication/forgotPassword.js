import React, { useRef, useEffect, useState, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Alert
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomInput from "../../components/CustomInput";
import getForgotPasswordStyle from "../../styles/authenthication/forgoteStyle"; // Import Style Function
import { ThemeContext } from "../../components/ThemeContext"; // Import Context
import { useDispatch, useSelector } from "react-redux";
import { ForgoteApi } from "../../Redux/Api/ForgoteApi";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ForgotPasswordScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getForgotPasswordStyle(colors), [colors]);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const [snack, setSnack] = useState({
    visible: false,
    message: "",
  });

  const showSnack = (message) => {
    setSnack({
      visible: true,
      message,
    })
  };

  const { forgoteLoading, isError, message } = useSelector((state) => state.Forgote)

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slide, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSend = async () => {
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } 

    setEmailError("");

    const result = await dispatch(
      ForgoteApi({
        email: email.trim(),
      })
    );

    if(ForgoteApi.rejected.match(result)){
      // Alert.alert("Error", 
      //   "Something went wrong. Please try again.",
      // );
      showSnack("Something went wrong. Please try again.");
      return;
    };

    const response = result.payload;

    if(!response?.success === false){
      setEmailError("Please enter the correct register email ID");
      return;
    }

    showSnack(response.message || "Reset password email sent successfully");

    setTimeout(() => {
      setSnack({ visible: false, message: "" });
      navigation.navigate("signIn");
    }, 2000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        // keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={28} color={colors.text} />
        </TouchableOpacity>

        <Animated.View 
          style={[
            styles.content, 
            { opacity: fade, transform: [{ translateY: slide }] }
          ]}
        >
          {/* {!isSubmitted ? ( */}
            {/* <> */}
              <View style={styles.iconContainer}>
                <View style={styles.iconGlow} />
                <Icon name="lock-reset" size={64} color={colors.theme} />
              </View>

              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                {/* Enter the email associated with your account and we’ll send you an email with instructions to reset your password. */}
                Please enter the email address linked to your account. A secure password will be sent to your email to help you regain access.
              </Text>

              <View style={styles.form}>
                <CustomInput
                  label="Email Address"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    // if (emailError) setEmailError("");
                    setEmailError("");
                  }}
                  // leftIcon="email-outline"
                  keyboardType="email-address"
                  error={emailError}
                />

                <TouchableOpacity 
                  style={styles.primaryBtn} 
                  onPress={handleSend}
                  disabled={forgoteLoading}
                  // activeOpacity={0.8}
                >
                  <Text style={styles.primaryBtnText}>
                    {/* Send Instructions */}
                    {forgoteLoading ? "Sending..." : "Send Password"}
                  </Text>
                </TouchableOpacity>
              </View>
        </Animated.View>
      </ScrollView>

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({visible: false, message: ""})}
        duration={2000}
        style={{
          backgroundColor:colors.card,
          marginBottom: insets?.bottom ? insets.bottom + 80 : 80,
        }}
        theme={{colors: { inversePrimary: colors.theme} }}
        action={{
          label: "Ok",
          textColor: colors.theme,
          onPress: () => setSnack({
            visible:false,
            message: ""
          }),
        }}
      >
        <Text style={{ color: colors.text}}>{snack.message}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;