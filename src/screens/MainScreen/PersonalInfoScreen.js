import React, { useState, useContext, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  StyleSheet,
  PermissionsAndroid,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useSelector, useDispatch } from 'react-redux';
import { Snackbar } from 'react-native-paper';

// Components
import AppHeader from '../../components/Header';
import CustomInput from '../../components/CustomInput';
import DashedLoader from '../../components/DashedLoader';
import MultiSelectionModal from '../../Modals/MultiSelectionModal';
import ImagePickerModal from '../../components/ImagePickerModal';
import { ThemeContext } from '../../components/ThemeContext';

// API & Config
import { EditProfileApi } from '../../Redux/Api/EditProfileApi';
import { GetInterestApi } from '../../Redux/Api/GetInterestApi';
import { GetUserDetailsApi } from '../../Redux/Api/GetUserDetailsApi';
import { Img_url } from '../../Redux/NWConfig';
import getPersonalInfoStyle from '../../styles/MainScreen/PersonalInfoStyle';
import {requestCamera, requestGallery } from '../../services/Permission';

const PersonalInfoScreen = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const styles = useMemo(() => getPersonalInfoStyle(colors), [colors]);

  // Redux State
  const { GetUserDetailsData, GetUserDetailsLoading } = useSelector(
    state => state.GetUserDetails,
  );
  const { LoginData } = useSelector(state => state.Login);
  const { EditProfileLoading } = useSelector(state => state.EditProfile);
  const { GetInterestData } = useSelector(state => state.GetInterest);

  // Local State
  const [profileImage, setProfileImage] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [snack, setSnack] = useState({ visible: false, message: '' });

  // Form & Error State
  const [form, setForm] = useState({
    fullname: '',
    email: '',
    mobile: '',
    location: '',
    bio: '',
    interest: [],
  });

  // 1. New Error State
  const [errors, setErrors] = useState({});

  // Modal States
  const [isInterestModalVisible, setInterestModalVisible] = useState(false);
  const [isImagePickerVisible, setImagePickerVisible] = useState(false);
  const [clickedInterest, setClickedInterest] = useState(false);

  // Prepare Interest List
  const interestsList =
    GetInterestData?.interests?.map(item => item.interest_name) || [];

  const showSnack = message => setSnack({ visible: true, message });

  const fetchInitialData = () => {
    if (LoginData?.token && LoginData?.user?.id) {
      dispatch(GetUserDetailsApi(LoginData.token));
    }
  };

  // Populate Data
  useEffect(() => {
    if (GetUserDetailsData?.user_details?.length > 0) {
      const user = GetUserDetailsData.user_details[0];
      let parsedInterests = [];

      try {
        if (user.interest) {
          let interestValue = user.interest;
          if (typeof interestValue === 'string') {
            interestValue = JSON.parse(interestValue);
          }
          if (typeof interestValue === 'string') {
            interestValue = JSON.parse(interestValue);
          }
          if (Array.isArray(interestValue)) {
            parsedInterests = interestValue.flatMap(item =>
              typeof item === 'string' && item.includes(',')
                ? item.split(',').map(i => i.trim())
                : item,
            );
          }
        }
      } catch (err) {
        // console.log('Error parsing interests:', err);
      }

      setForm({
        fullname: user.fullname || '',
        email: user.email || '',
        mobile: user.mobile || '',
        location: user.location || '',
        bio: user.bio || '',
        interest: parsedInterests,
      });

      if (user.profile_photo) {
        setProfileImage(user.profile_photo);
      }
    }
  }, [GetUserDetailsData]);

  useEffect(() => {
    if (clickedInterest && GetInterestData?.interests?.length > 0) {
      setInterestModalVisible(true);
    }
  }, [GetInterestData, clickedInterest]);

  // --- Image Handling ---
  const handleImageResponse = response => {
    if (response.didCancel || response.errorMessage) return;
    const asset = response?.assets[0];
    setProfileImage(asset.uri);
    setPhotoFile({
      uri: asset.uri,
      type: asset.type,
      name: asset.fileName || `profile_${Date.now()}.jpg`,
    });
  };

  const openCamera = async () => {
    const cameraGranted = await requestCamera();
    if (!cameraGranted) return;
    launchCamera(
      { mediaType: 'photo', saveToPhotos: true, quality: 0.8 },
      handleImageResponse,
    );
  };

  const openGallery = async () => {
    const galleryGranted = await requestGallery();
    if (!galleryGranted) return;
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.8 },
      handleImageResponse,
    );
  };

  // --- Input Change Handler (Clears errors on type) ---
  const handleInputChange = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    // Clear error for this field when user types
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleRemoveInterest = interestToRemove => {
    const updatedInterests = form.interest.filter(
      item => item !== interestToRemove,
    );
    handleInputChange('interest', updatedInterests);
  };

  // --- 2. Validation Function ---
  const validateForm = () => {
    let isValid = true;
    let tempErrors = {};

    // Fullname Validation
    if (!form.fullname.trim()) {
      tempErrors.fullname = 'Full Name is required';
      isValid = false;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(form.email)) {
      tempErrors.email = 'Please enter a valid email';
      isValid = false;
    }

    // Mobile Validation
    const mobileRegex = /^[0-9]{10}$/;
    if (!form.mobile) {
      tempErrors.mobile = 'Phone number is required';
      isValid = false;
    } else if (!mobileRegex.test(form.mobile)) {
      tempErrors.mobile = 'Enter a valid 10-digit number';
      isValid = false;
    }

    // Location Validation
    if (!form.location.trim()) {
      tempErrors.location = 'Location is required';
      isValid = false;
    }

    // Interest Validation
    if (form.interest.length === 0) {
      tempErrors.interest = 'Please select at least one interest';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // --- Save Handler ---
  const handleSave = async () => {
    // Run Validation
    if (!validateForm()) {
      showSnack('Please fix the errors before saving.');
      return;
    }

    const token = LoginData?.token;
    const userId = LoginData?.user?.id;
    const formData = new FormData();
    formData.append('id', userId);
    formData.append('fullname', form.fullname);
    formData.append('email', form.email);
    formData.append('mobile', form.mobile);
    formData.append('location', form.location);
    formData.append('bio', form.bio);
    formData.append('interest', JSON.stringify(form.interest));

    if (photoFile) {
      formData.append('image', {
        uri:
          Platform.OS === 'android'
            ? photoFile.uri
            : photoFile.uri.replace('file://', ''),
        type: photoFile.type,
        name: photoFile.name,
      });
    }

    try {
      const result = await dispatch(
        EditProfileApi({ formData, token }),
      ).unwrap();
      if (result?.status === true) {
        showSnack(result?.message);
        dispatch(GetUserDetailsApi(LoginData.token));
        setTimeout(() => navigation.goBack(), 500);
      } else {
        showSnack(result?.message);
        dispatch(GetUserDetailsApi(LoginData.token));
      }
    } catch (error) {
      showSnack('Something went wrong. Please try again.');
      dispatch(GetUserDetailsApi(LoginData.token));
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={themeType === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      <AppHeader
        showThemeToggle={true}
        navigation={navigation}
        showBackButton={true}
        title="Personal Info"
        onBackPress={() => navigation.goBack()}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Profile Image Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatarPlaceholder}>
                {profileImage ? (
                  <Image
                    source={{
                      uri: photoFile ? profileImage : Img_url + profileImage,
                    }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarInitials}>
                    {form.fullname
                      ?.split(' ')
                      .map(n => n[0])
                      .join('')}
                  </Text>
                )}
              </View>
              <TouchableOpacity
                style={styles.editBadge}
                activeOpacity={0.8}
                onPress={() => setImagePickerVisible(true)}
              >
                <MaterialCommunityIcons name="camera" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Section */}
          <View style={styles.formSection}>
            <CustomInput
              label="Full Name"
              value={form.fullname}
              onChangeText={text => handleInputChange('fullname', text)}
              leftIcon="account-outline"
              error={errors.fullname} // Pass error prop
            />

            <CustomInput
              label="Email Address"
              value={form.email}
              onChangeText={text => handleInputChange('email', text)}
              leftIcon="email-outline"
              keyboardType="email-address"
              error={errors.email} // Pass error prop
            />

            <CustomInput
              label="Phone Number"
              value={form.mobile}
              onChangeText={text => handleInputChange('mobile', text)}
              leftIcon="phone-outline"
              keyboardType="phone-pad"
              error={errors.mobile} // Pass error prop
            />

            <CustomInput
              label="Location"
              value={form.location}
              onChangeText={text => handleInputChange('location', text)}
              leftIcon="map-marker-outline"
              error={errors.location} // Pass error prop
            />

            {/* Interest Dropdown */}
            <View style={styles.dropdownWrapper}>
              <TouchableOpacity
                style={[
                  styles.dropdownTrigger,
                  errors.interest ? { borderColor: colors.error } : null, // Highlight border on error
                ]}
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
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <MaterialCommunityIcons
                    name="heart-outline"
                    size={22}
                    color={errors.interest ? colors.error : colors.theme}
                    style={{ marginRight: 10 }}
                  />
                  <Text
                    style={[
                      styles.dropdownText,
                      { color: colors.textDisabled },
                    ]}
                    numberOfLines={1}
                  >
                    Select Interests
                  </Text>
                </View>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={22}
                  color={errors.interest ? colors.error : colors.theme}
                />
              </TouchableOpacity>

              {/* Manual Error Text for Interest (matching CustomInput style) */}
              {errors.interest && (
                <Text style={styles.errorText}>{errors.interest}</Text>
              )}

              {/* Chips Container */}
              {form.interest.length > 0 && (
                <View style={styles.chipsContainer}>
                  {form.interest.map((item, index) => (
                    <View key={index} style={styles.chip}>
                      <Text style={styles.chipText}>{item}</Text>
                      <TouchableOpacity
                        onPress={() => handleRemoveInterest(item)}
                      >
                        <MaterialCommunityIcons
                          name="close-circle"
                          size={18}
                          color={colors.theme}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>

            <CustomInput
              label="Bio"
              value={form.bio}
              onChangeText={text => handleInputChange('bio', text)}
              leftIcon="text-short"
              multiline={true}
              numberOfLines={3}
            />
          </View>

          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.8}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* ... Modals and Loaders ... */}
      <MultiSelectionModal
        key={interestsList.length}
        visible={isInterestModalVisible}
        title="Choose Interests"
        data={interestsList}
        selectedItems={form.interest}
        onClose={() => setInterestModalVisible(false)}
        onSelect={items => handleInputChange('interest', items)}
      />

      <ImagePickerModal
        visible={isImagePickerVisible}
        onClose={() => setImagePickerVisible(false)}
        onCameraPress={openCamera}
        onGalleryPress={openGallery}
      />

      <Snackbar
        visible={snack.visible}
        onDismiss={() => setSnack({ visible: false, message: '' })}
        duration={2000}
        style={{
          backgroundColor: colors.card,
          marginBottom: insets.bottom + 80,
        }}
        theme={{ colors: { inversePrimary: colors.theme } }}
        action={{
          label: 'OK',
          textColor: colors.theme,
          onPress: () => setSnack({ visible: false, message: '' }),
        }}
      >
        <Text style={{ color: colors.text }}>{snack.message}</Text>
      </Snackbar>

      {(GetUserDetailsLoading || EditProfileLoading) && (
        <DashedLoader color={colors.primary} size={100} />
      )}
    </View>
  );
};

export default PersonalInfoScreen;
