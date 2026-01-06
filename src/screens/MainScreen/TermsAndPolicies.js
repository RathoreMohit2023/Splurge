import React, { useEffect, useContext, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AppHeader from '../../components/Header';
import getTermsAndPoliciesStyle from "../../styles/MainScreen/TermsAndPoliciesStyle";
import { ThemeContext } from "../../components/ThemeContext";
import { PrivacyPolicyApi } from '../../Redux/Api/PrivacyPolicyApi';
import { useDispatch, useSelector } from 'react-redux';
import RenderHTML from 'react-native-render-html';
import DashedLoader from '../../components/DashedLoader';
import { HelpAndSupportApi } from '../../Redux/Api/HelpAndSupportApi';

const TermsAndPolicies = ({ navigation }) => {
  const { colors, themeType } = useContext(ThemeContext);
  const styles = useMemo(() => getTermsAndPoliciesStyle(colors), [colors]);
  const insets = useSafeAreaInsets();
  const { LoginData } = useSelector(state => state.Login);
  const { PrivacyPolicyLoading, PrivacyPolicyData } = useSelector(
    state => state.PrivacyPolicy
  );      
  const { HelpAndSupportLoading, HelpAndSupportData } = useSelector(state => state.HelpAndSupport);

  const isLoading = PrivacyPolicyLoading || HelpAndSupportLoading;

  const textColor = colors.text;   
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();

  useEffect(() => {
    dispatch(PrivacyPolicyApi(LoginData.token))
  }, []);

  useEffect(() => {
    dispatch(HelpAndSupportApi(LoginData.token))
  }, []);

  const htmlContent = PrivacyPolicyData?.content?.[0]?.content || "";

  const htmlStyles = {
    body: { color: textColor },
    h2: { fontSize: 22, fontWeight: 'bold', marginTop: 12, color: textColor },
    h3: { fontSize: 18, fontWeight: '600', marginTop: 10, color: textColor },
    p:  { fontSize: 15, lineHeight: 24, color: textColor },
    li: { color: textColor },
  };

  const support = HelpAndSupportData?.support?.[0] || {};
  
  // Ensure we have an array of emails, even if the API sends a string or is empty
  const emailList = useMemo(() => {
    if (Array.isArray(support.email)) {
      return support.email;
    } else if (typeof support.email === 'string') {
      return [support.email];
    }
    return [];
  }, [support.email]);

  const handleEmailSupport = (emailAddress) => {
    if (emailAddress) {
      Linking.openURL(`mailto:${emailAddress}`);
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
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
          <RenderHTML
            contentWidth={width}      
            source={{ html: htmlContent }}
            tagsStyles={htmlStyles}
          />
        </View>

        <View style={styles.contactSection}>
          <Text style={styles.contactHeader}>Have Questions?</Text>
          
          {emailList?.length > 0 ? (
            emailList?.map((email, index) => (
              <TouchableOpacity 
                key={index}
                style={[styles.contactCard, { marginBottom: 12 }]} 
                onPress={() => handleEmailSupport(email)}
                activeOpacity={0.8}
              >
                <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'transparent' }]}>
                  <MaterialCommunityIcons name="email-outline" size={24} color="#FFF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactTitle}>Contact Support</Text>
                  <Text style={styles.contactSubtitle}>{email}</Text> 
                </View>
                <MaterialCommunityIcons name="chevron-right" size={24} color="rgba(255,255,255,0.7)" />
              </TouchableOpacity>
            ))
          ) : (
             <View style={styles.contactCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactSubtitle}>No support email available</Text> 
                </View>
             </View>
          )}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
      {isLoading && <DashedLoader color={colors.primary} size={100} />}
    </View>
  );
};

export default TermsAndPolicies;