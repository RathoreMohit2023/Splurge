import React, { useState, useEffect, useRef, useContext, useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";

import CustomInput from "../../components/CustomInput";
import MultiSelectionModal from "../../Modals/MultiSelectionModal";
import DashedLoader from "../../components/DashedLoader";
import CustomAlert from "../../components/CustomAlert";

import { ThemeContext } from "../../components/ThemeContext";
import getSignUpStyle from "../../styles/authenthication/signUpStyle";
import { GetInterestApi } from "../../Redux/Api/GetInterestApi";
import { SignUpApi } from "../../Redux/Api/SignUpApi";

const SignUp = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getSignUpStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  
  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(50)).current;

  const dispatch = useDispatch();
  const { GetInterestData } = useSelector(state => state.GetInterest);
  const { SignUploading } = useSelector(state => state.SignUp);

  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [clickedInterest, setClickedInterest] = useState(false);
  const interestsList = GetInterestData?.interests?.map(item => item.interest_name) || [];

  const [userData, setUserData] = useState({
    fullname: "",
    mobile: "",
    email: "",
    interest: [],
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: "",
    message: "",
    isSuccess: false,
  });

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  useEffect(() => {
    if (clickedInterest && GetInterestData?.interests?.length > 0) {
      setInterestModalVisible(true);
    }
  }, [GetInterestData]);

  const handleOnChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleAlertConfirm = () => {
    setAlertConfig((prev) => ({ ...prev, visible: false }));
    if (alertConfig.isSuccess) {
      navigation.replace("signIn");
    }
  };

  const handleInputChange = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }));
    // Clear error for this field when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  }

  const handleRemoveInterest = (interestToRemove) => {
    const updatedInterests = userData.interest.filter(item => item !== interestToRemove);
    handleInputChange('interest', updatedInterests);
  }

  const registerUser = async () => {
    let valid = true;
    let tempErrors = {};

    if (!userData.fullname) { 
      tempErrors.fullname = "Fullname is required"; 
      valid = false; 
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!userData.mobile) {
      tempErrors.mobile = "Mobile number is required";
      valid = false;
    } else if (!mobileRegex.test(userData.mobile)) {
      tempErrors.mobile = "Please enter a valid 10-digit mobile number";
      valid = false;
    }

    if (!userData.email || !userData.email.includes("@")) { 
      tempErrors.email = "Valid email is required"; 
      valid = false; 
    }
    
    if (!userData.interest || userData.interest.length === 0) {
      tempErrors.interest = "Select at least 1 interest";
      valid = false;
    }
    
    if (!userData.password || userData.password.length < 6) { 
      tempErrors.password = "Password min 6 chars"; 
      valid = false; 
    }
    
    if (userData.password !== userData.confirmPassword) { 
      tempErrors.confirmPassword = "Passwords do not match"; 
      valid = false; 
    }

    setErrors(tempErrors);

    if (!valid) return;

    const postData = {
      fullname: userData.fullname,
      mobile: userData.mobile,
      email: userData.email,
      interest: userData.interest,
      password: userData.password,
      confirmPassword: userData.confirmPassword,
    };

    try {
      const result = await dispatch(SignUpApi(postData)).unwrap();
      
      if (result?.status === true) {
        setAlertConfig({
          visible: true,
          title: "Success",
          message: result?.message || "Account created successfully!",
          isSuccess: true
        });
      } else {
        setAlertConfig({
          visible: true,
          title: "Failed",
          message: result?.message || "SignUp failed. Please try again.",
          isSuccess: false
        });
      }
    } catch (error) {
      setAlertConfig({
        visible: true,
        title: "Error",
        message: "Something went wrong. Please check your connection.",
        isSuccess: false
      });
    }
  };

  return (
    <KeyboardAvoidingView
            style={{ flex: 1, paddingHorizontal: 15, backgroundColor: colors.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
      <StatusBar 
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={colors.background} 
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={28} color={colors.theme} />
          </TouchableOpacity>
          <Animated.View style={{ opacity: fade, transform: [{ translateY: slide }] }}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started!</Text>
          </Animated.View>
        </View>

        <Animated.View style={[styles.formContainer, { opacity: fade, transform: [{ translateY: slide }] }]}>
          <CustomInput
            label="Fullname"
            leftIcon="account-outline"
            value={userData.fullname}
            onChangeText={(val) => handleOnChange("fullname", val)}
            error={errors.fullname}
          />
          <CustomInput
            label="Mobile Number"
            leftIcon="phone-outline"
            keyboardType="phone-pad"
            maxLength={10}
            value={userData.mobile}
            onChangeText={(val) => handleOnChange("mobile", val)}
            error={errors.mobile}
          />
          <CustomInput
            label="Email"
            leftIcon="email-outline"
            keyboardType="email-address"
            value={userData.email}
            onChangeText={(val) => handleOnChange("email", val)}
            error={errors.email}
          />

          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[
                styles.dropdownTrigger,
                { borderColor: errors.interest ? colors.error : colors.border }
              ]}
              // onPress={() => {
              //   setClickedInterest(true);
              //   dispatch(GetInterestApi());
              //   setInterestModalVisible(true);
              // }}    
              onPress={() => {
                setClickedInterest(true);
                if (interestsList.length === 0) {
                  dispatch(GetInterestApi());
                } else {
                  setInterestModalVisible(true);
                }
              }}                        
              activeOpacity={0.8}
            >
              <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
                <Icon 
                  name="heart-outline" 
                  size={24} 
                  color={errors.interest ? colors.error : colors.theme} 
                  style={{ marginRight: 12 }}
                />
                <Text
                  style={[
                  styles.dropdownText,
                  {
                    color: userData.interest.length
                    ? colors.text
                    : colors.textDisabled,
                  },
                ]}
                numberOfLines={1}
                >
                  {userData.interest.length > 0
                    ? userData.interest.join(", ")
                    : "Select Interests"
                  }  
                </Text>
              </View>
              <Icon name="chevron-down" size={24} color={colors.textDisabled} />
            </TouchableOpacity>
            {errors.interest && <Text style={styles.errorText}>{errors.interest}</Text>}


            {/* Chips Container */}

            {userData.interest.length > 0 && (
              <View style={styles.chipsContainer}>
                {userData.interest.map((item, index) => {
                  return(
                    <View key={index} style={styles.chip}>
                      <Text style={styles.chipText}>{item}</Text>
                      <TouchableOpacity
                        onPress={() =>  handleRemoveInterest(item)}>
                        <Icon 
                          name="close-circle" 
                          size={18} 
                          color={colors.theme}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                })}
              </View>
            )}
          </View>

          <CustomInput
            label="Password"
            leftIcon="lock-outline"
            password
            value={userData.password}
            onChangeText={(val) => handleOnChange("password", val)}
            error={errors.password}
          />
          <CustomInput
            label="Confirm Password"
            leftIcon="lock-check-outline"
            password
            value={userData.confirmPassword}
            onChangeText={(val) => handleOnChange("confirmPassword", val)}
            error={errors.confirmPassword}
          />

          <TouchableOpacity
            style={[styles.primaryBtn, { marginBottom: insets.bottom }]}
            onPress={registerUser}
          >
            <Text style={styles.primaryBtnText}>
             Sign Up
            </Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("signIn")}>
              <Text style={styles.linkText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>

      <MultiSelectionModal
        key={interestsList.length} 
        visible={isInterestModalVisible}
        title="Choose Interests"
        data={interestsList}
        selectedItems={userData.interest}
        onClose={() => setInterestModalVisible(false)}
        onSelect={(items) => handleOnChange("interest", items)}
      />

      {SignUploading && (
        <DashedLoader 
          size={100} 
          color={colors.primary} 
        />
      )}

      <CustomAlert 
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        confirmText="OK"
        onConfirm={handleAlertConfirm}
        showCancel={false}
      />

    </KeyboardAvoidingView>
  );
};

export default SignUp;