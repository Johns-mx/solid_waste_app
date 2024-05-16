import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../assets/colors/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type RadioOptions = {
  label: string;
  value: boolean;
};

type RadioProps = {
  options: RadioOptions[];
  checkedValue: boolean;
  onChange: (value: boolean) => void;
  style?: ViewStyle;
  horizontal?: boolean;
};

const Radio = ({
  options,
  checkedValue,
  onChange,
  style,
  horizontal,
}: RadioProps) => {
  return (
    <View
      style={
        horizontal
          ? [styles.containerHorizontal, style]
          : [styles.containerVertical, style]
      }>
      {options.map((option, index) => {
        const active = checkedValue == option.value;
        return (
          <TouchableOpacity
            key={index}
            style={active ? [styles.radio, styles.activeRadio] : styles.radio}
            onPress={() => {
              onChange(option.value);
            }}>
            <MaterialIcons
              name={active ? 'radio-button-checked' : 'radio-button-unchecked'}
              size={24}
              color={active ? colors.secondary_shade : '#64748b'}
            />
            <Text
              style={active ? [styles.text, styles.activeText] : styles.text}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    width: 120,
    height: 'auto',
    flexDirection: 'row',
    gap: 10,
  },
  containerVertical: {
    gap: 10,
    width: 'auto',
  },
  radio: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 15,
    borderRadius: 15,
  },
  activeRadio: {
    backgroundColor: colors.secondary_shade + '11',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 15,
    color: colors.medium,
  },
  activeText: {
    color: colors.tertiary,
  },
});

export default Radio;
