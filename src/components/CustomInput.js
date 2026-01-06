import React, { useState, useContext, useMemo } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ThemeContext } from "../components/ThemeContext";

const CustomInput = ({
  label,
  value,
  onChangeText,
  password = false,
  leftIcon,
  rightIcon,
  error = "",
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  style, 
}) => {
  const { colors } = useContext(ThemeContext);
  const styles = useMemo(() => getStyles(colors), [colors]);
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.theme
    : colors.border;

  const iconColor = isFocused ? colors.theme : colors.theme;

  return (
    <View style={{ marginBottom: 10 }}>
      <View style={[styles.inputContainer, { borderColor }, style]}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={22}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor={colors.textDisabled || colors.textSecondary}
          placeholder={label}
          secureTextEntry={password && !showPassword}
          style={[
            styles.input, 
            password ? { paddingRight: 40 } : null,
            multiline ? { textAlignVertical: 'top', height: 'auto', minHeight: 50 } : null
          ]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />

        {password ? (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.rightIconArea}
          >
            <Icon
              name={showPassword ? "eye-off" : "eye"}
              size={22}
              color={iconColor}
            />
          </TouchableOpacity>
        ) : rightIcon ? (
          <Icon
            name={rightIcon}
            size={22}
            color={iconColor}
            style={styles.rightIcon}
          />
        ) : null}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const getStyles = (colors) => StyleSheet.create({
  inputContainer: {
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 12, 
    paddingHorizontal: 12,
    backgroundColor: colors.background, 
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'serif',
    color: colors.text, 
    padding: 0,
  },
  leftIcon: {
    marginRight: 10,
  },
  rightIconArea: {
    position: "absolute",
    right: 12,
  },
  rightIcon: {
    marginLeft: 10,
  },
  error: {
    color: colors.error,
    marginTop: 4,
    fontSize: 12,
    fontFamily: 'serif',
    marginLeft: 4,
  },
});

export default CustomInput;