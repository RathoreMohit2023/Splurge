import React, { useRef, useEffect, useState, useContext, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { appleLogo, darkLogo, googleLogo, MainLogo } from "../../Assets/Images";
import CustomInput from "../../components/CustomInput"; 
import getLoginStyle from "../../styles/authenthication/LoginStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { GoogleLoginApi, LoginApi } from "../../Redux/Api/LoginApi";
import ToastMessage from '../../components/ToastMessage';
import DashedLoader from "../../components/DashedLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CheckBox from "@react-native-community/checkbox";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import appleAuth from '@invertase/react-native-apple-authentication';

// // IMPORTS: Add Vector Icons
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SignInScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getLoginStyle(colors), [colors]);
  const dispatch = useDispatch();
  const { LoginLoading } = useSelector(state => state.Login);
  const fade = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [toastMsg, setToastMsg] = useState('');
  const [showToast, setShowToast] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,   
      duration: 900,
      useNativeDriver: true,
    }).start();
  }, [fade]);

  const validateInputs = () => {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    return isValid;
  };

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
  
        if (savedEmail) {
          setEmail(savedEmail);
          setRememberMe(true);
        }
  
        if (savedPassword) {
          setPassword(savedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        // console.log("Error loading saved credentials", error);
      }
    };
    loadSavedCredentials();
  }, []);  

  const handleSignIn = async () => {
     setEmailError('');
     setPasswordError('');
 
     if (!validateInputs()) return;
 
     const formData = new FormData();
     formData.append('email', email.trim());
     formData.append('password', password);
     
     try {
       const result = await dispatch(LoginApi(formData));
       const response = result?.payload;
 
       if (
         response?.token ||
         response?.status === 200 ||
         response?.message?.toLowerCase().includes('success')
       ) {
         setToastMsg(response?.message || 'Login Successful');
         setShowToast(true);
 
         if (rememberMe) {
           await AsyncStorage.setItem("savedEmail", email);
           await AsyncStorage.setItem("savedPassword", password);
         } else {
           await AsyncStorage.removeItem("savedEmail");
           await AsyncStorage.removeItem("savedPassword");
         }
         
         setTimeout(() => {
           navigation.replace('MainScreen');
         }, 500);
       } else {
         setToastMsg(response?.message || 'Invalid credentials');
         setShowToast(true);
       }
     } catch (error) {
       setToastMsg('Something went wrong. Please try again.');
       setShowToast(true);
     } 
  };
  
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      GoogleSignin.signOut();
      const userInfo = await GoogleSignin.signIn();
      const user = userInfo?.data?.user;

      const formData = new FormData();
      formData.append('email', user?.email);
      formData.append('fullname', user?.givenName + ' ' + user?.familyName);

      
      try {
        const result = await dispatch(GoogleLoginApi(formData));
        const response = result?.payload;
  
        if (
          response?.token ||
          response?.status === 200 ||
          response?.message?.toLowerCase().includes('success')
        ) {
          setToastMsg(response?.message || 'Login Successful');
          setShowToast(true); 
  
          if (rememberMe) {  
            await AsyncStorage.setItem("savedEmail", email);
            await AsyncStorage.setItem("savedPassword", password);
          } else {
            await AsyncStorage.removeItem("savedEmail");
            await AsyncStorage.removeItem("savedPassword");
          }
          
          setTimeout(() => {
            navigation.replace('MainScreen');
          }, 1500);
        } else {
          setToastMsg(response?.message || 'Invalid credentials');
          setShowToast(true);
        }
      } catch (error) {
        setToastMsg('Something went wrong. Please try again.');
        setShowToast(true);
      } 
      
    } catch (error) {
     setToastMsg('Something went wrong. Please try again.');
      setShowToast(true);
    }
  };

  const handleAppleSignUIn = async() => {
    try{
      const appleAuthResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [
          appleAuth.Scope.EMAIL,
          appleAuth.Scope.FULL_NAME,
        ],
      });

      const { identifyToken, fullName, email, user} = appleAuthResponse;

      if(!identifyToken){
        setToastMsg("Apple Sign In failed");
        setShowToast(true)
        return;
      }

      const formData = new FormData();
      formData.append('apple_id', user);
      formData.append('email', email || '');
      formData.append(
        'fullname',
        `${fullName?.givenName || ''} ${fullName?.familyName || ''}`
      );
      formData.append('token', identifyToken);

      const result = await dispatch(GoogleLoginApi(formData));

      const  respond = result?.payload;

      if(
        respond?.token || 
        respond?.status === 200 ||
        respond?.message?.toLowerCase().includes('Success')
      ){
        setToastMsg(respond?.message || 'Login Successful');
        setShowToast(true);

        setTimeout(() => {
          navigation.replace('MainScreen');
        }, 1000);
      } else {
        setToastMsg(respond?.message || 'Apple login failed');
        setShowToast(true)
      }
    }
    catch(error){
      setToastMsg("Apple login error")
      setShowToast(true)
    }
  }  

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View
              style={{ width: '100%', opacity: fade, alignItems: 'center' }}
            >
              <Image source={appLogo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.tagline}>Spend smarter. Live better.</Text>

              <View style={styles.formContainer}>
                <CustomInput
                  label="Email"
                  value={email}
                  onChangeText={text => {
                    setEmail(text);
                    setEmailError('');
                  }}
                  autoCapitalize="none"

                  leftIcon="email-outline"
                  keyboardType="email-address"
                  error={emailError}
                />

                <CustomInput
                  label="Password"
                  value={password}
                  onChangeText={text => {
                    setPassword(text);
                    setPasswordError('');
                  }}
                  leftIcon="lock-outline"
                  password={true}
                  error={passwordError}
                />

                <View style={styles.rowBetween}>
                  <View style={styles.row}>
                    <CheckBox
                      value={rememberMe}
                      onValueChange={(val) => setRememberMe(val)}
                      tintColors={{ true: colors.theme, false: colors.text }}
                    />
                    <Text style={styles.rememberText}>Remember Me</Text>
                  </View>

                  <TouchableOpacity onPress={() => navigation.navigate("forgotePassword")}>
                    <Text style={styles.forgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.primaryBtn} onPress={handleSignIn}>
                  <Text style={styles.primaryBtnText}>
                    {LoginLoading ? 'Please wait...' : 'Sign In'}
                  </Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>OR</Text>
                  <View style={styles.dividerLine} />
                </View>

                <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleBtn} activeOpacity={0.8}>
                  <View style={styles.googleIconWrapper}>
                    <Image source={googleLogo} style={styles.googleIcon} />
                    <Text style={styles.googleBtnText}>Continue with Google</Text>
                  </View>
                </TouchableOpacity>

                {/* <TouchableOpacity
                    style={styles.appleBtn}
                    onPress={handleAppleSignUIn}
                    activeOpacity={0.8}
                  >
                    <View style={styles.appleIconWrapper}>
                      <Image 
                        source={appleLogo}
                        style={styles.appleIcon}
                      />
                      <Text style={styles.appleBtnText}>
                        Continue with Apple
                      </Text>
                    </View>
                  </TouchableOpacity> */}

                {Platform.OS === 'iOS' && (
                  <TouchableOpacity
                    style={styles.appleBtn}
                    onPress={handleAppleSignUIn}
                    activeOpacity={0.8}
                  >
                    <View style={styles.appleIconWrapper}>
                      <Image 
                        source={appleLogo}
                        style={styles.appleIcon}
                      />
                      <Text style={styles.appleBtnText}>
                        Continue with Apple
                      </Text>   
                    </View>
                  </TouchableOpacity>
                )}

                <View style={styles.footerContainer}>
                  <Text style={styles.footerText}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('signUp')}>
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>

      {LoginLoading && <DashedLoader color={colors.primary} size={100} />}
      
      <ToastMessage
        visible={showToast}
        message={toastMsg}
        onHide={() => setShowToast(false)}
      />
    </View>
  );
};

export default SignInScreen;