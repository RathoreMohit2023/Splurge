import React, { useEffect, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppHeader from '../../components/Header';
import getHelpSupportStyle from "../../styles/MainScreen/HelpSupportStyle"; 
import { ThemeContext } from "../../components/ThemeContext"; 
import { HelpAndSupportApi } from '../../Redux/Api/HelpAndSupportApi';
import { useDispatch, useSelector } from 'react-redux';
import DashedLoader from '../../components/DashedLoader';
import { darkLogo, MainLogo } from "../../Assets/Images";

const HelpSupport = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getHelpSupportStyle(colors), [colors]);
  const insets = useSafeAreaInsets();

  const { LoginData } = useSelector(state => state.Login);
  const { HelpAndSupportLoading, HelpAndSupportData } = useSelector(
    state => state.HelpAndSupport
  );     
  
  const dispatch = useDispatch();
  const appLogo = themeType === "dark" ? darkLogo : MainLogo;

  useEffect(() => {
    dispatch(HelpAndSupportApi(LoginData?.token));
  }, []);

  const support = HelpAndSupportData?.support?.[0] || {};

  const normalizeArray = value => {
    if (!value) return [];
  
    // If already array
    if (Array.isArray(value)) return value;
  
    // If stringified array -> parse it
    if (typeof value === 'string') {
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : [value];
      } catch (e) {
        return [value];
      }
    }
  
    return [value];
  };
  
  const contactDetails = [
    ...normalizeArray(support.email).map((email, index) => ({
      id: `email-${index}`,
      icon: 'email-outline',
      label: index === 0 ? 'Email Support' : 'Alternate Email',
      value: email,
      action: () => Linking.openURL(`mailto:${email}`),
    })),

    ...normalizeArray(support.contact).map((phone, index) => ({
      id: `phone-${index}`,
      icon: 'phone-outline',
      label: index === 0 ? 'Customer Care' : 'Alternate Number',
      value: phone,
      action: () => Linking.openURL(`tel:${phone}`),
    })),

    ...(support.website
      ? [{
          id: 'website',
          icon: 'web',
          label: 'Website',
          value: support.website,
          action: () =>
            Linking.openURL(
              support.website.startsWith('http')
                ? support.website
                : `https://${support.website}`
            ),
        }]
      : []),

    ...(support.location
      ? [{
          id: 'address',
          icon: 'map-marker-outline',
          label: 'Headquarters',
          value: support.location,
          action: () =>
            Linking.openURL(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                support.location
              )}`
            ),
        }]
      : []),
  ];

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
        title="Help & Support"
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 40 }
        ]}
      >
        {/* Branding */}
        <View style={styles.brandSection}>
          {/* <View style={styles.logoContainer}>
            <MaterialCommunityIcons
              name="wallet-giftcard"
              size={40}
              color={colors.theme}
            />
          </View> */}
          <Image source={appLogo} style={styles.logo} resizeMode="contain" />
          {/* <Text style={styles.appName}>Splurge</Text> */}
          <Text style={styles.aboutText}>
            Empowering you to track expenses, save money, and spend wisely.
            We are dedicated to providing the best financial tools for your lifestyle.
          </Text>
        </View>

        {/* Contact Card */}
        <View style={styles.card}>
          <Text style={styles.sectionHeader}>Contact Us</Text>

          {contactDetails.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.row,
                index !== contactDetails.length - 1 && styles.separator
              ]}
              onPress={item.action}
              activeOpacity={0.7}
            >
              <View style={styles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={22}
                  color={colors.theme}
                />
              </View>

              <View style={styles.rowText}>
                <Text style={styles.label}>{item.label}</Text>
                <Text style={styles.value}>{item.value}</Text>
              </View>

              {item.id !== 'address' && (
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={20}
                  color={colors.textDisabled}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          {/* <Text style={styles.footerText}>Follow us on social media</Text>
          <View style={styles.socialRow}>
            {['twitter', 'facebook', 'instagram', 'linkedin'].map(icon => (
              <TouchableOpacity key={icon} style={styles.socialIcon}>
                <MaterialCommunityIcons
                  name={icon}
                  size={24}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            ))}
          </View> */}
          <Text style={styles.copyright}>
            © 2025 Splurge Inc. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {HelpAndSupportLoading && (
        <DashedLoader color={colors.primary} size={100} />
      )}
    </View>
  );
};

export default HelpSupport;
