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
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import CustomInput from "../../components/CustomInput";
import getForgotPasswordStyle from "../../styles/authenthication/forgoteStyle"; 
import { ThemeContext } from "../../components/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { Snackbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ChangePasswordApi } from "../../Redux/Api/ChangePasswordApi";

const ChangePassword = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getForgotPasswordStyle(colors), [colors]);
  const { LoginData } = useSelector(state => state.Login);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(30)).current;

  // States (Aapki keys ke naam se match karne ke liye)
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNew_password] = useState("");
  const [confirm_password, setConfirm_password] = useState("");
  
  const [errors, setErrors] = useState({});
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  
  const [snack, setSnack] = useState({ visible: false, message: "" });

  // Redux state se loading nikaalein (Check karein aapka slice name kya hai)
  const { changePasswordLoading } = useSelector((state) => state.Forgote); 

  const showSnack = (message) => {
    setSnack({ visible: true, message });
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  const validate = () => {
    let tempErrors = {};
    if (!old_password) tempErrors.old_password = "Old password is required";
    if (new_password.length < 6) tempErrors.new_password = "New password must be at least 6 characters";
    if (new_password !== confirm_password) tempErrors.confirm_password = "Passwords do not match";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validate()) return;
     const token = LoginData.token;
     const postData = {
 old_password,
        new_password,
        confirm_password,
     }

    // API Call with exact keys
    const result = await dispatch(
      ChangePasswordApi({postData, token })
    );

    // Error handling
    if (ChangePasswordApi.rejected.match(result)) {
      showSnack(result.payload?.message || "Something went wrong");
      return;
    }

    const response = result.payload;

    if (response?.success === false) {
      showSnack(response.message || "Failed to change password");
      return;
    }

    // Success logic
    showSnack(response.message || "Password updated successfully!");

    setTimeout(() => {
      setSnack({ visible: false, message: "" });
      navigation.goBack(); // Ya login par bhej sakte hain
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

      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <View style={styles.iconContainer}>
            <View style={styles.iconGlow} />
            <Icon name="shield-lock-outline" size={64} color={colors.theme} />
          </View>

          <Text style={styles.title}>Change Password</Text>
          <Text style={styles.subtitle}>
            Please enter your current password and choose a new secure one.
          </Text>

          <View style={styles.form}>
            <CustomInput
              label="Old Password"
              value={old_password}
              onChangeText={(text) => {
                setOldPassword(text);
                setErrors({ ...errors, old_password: "" });
              }}
              secureTextEntry={true}
              error={errors.old_password}
            />

            <CustomInput
              label="New Password"
              value={new_password}
              onChangeText={(text) => {
                setNew_password(text);
                setErrors({ ...errors, new_password: "" });
              }}
              secureTextEntry={true}
              error={errors.new_password}
            />

            <CustomInput
              label="Confirm New Password"
              value={confirm_password}
              onChangeText={(text) => {
                setConfirm_password(text);
                setErrors({ ...errors, confirm_password: "" });
              }}
              secureTextEntry={true}
              error={errors.confirm_password}
            />

            <TouchableOpacity 
              style={styles.primaryBtn} 
              onPress={handleChangePassword}
              disabled={changePasswordLoading}
            >
              <Text style={styles.primaryBtnText}>
                {changePasswordLoading ? "Updating..." : "Update Password"}
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
          backgroundColor: colors.card,
          marginBottom: insets?.bottom ? insets.bottom + 20 : 20,
        }}
        action={{
          label: "Ok",
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: "" }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;