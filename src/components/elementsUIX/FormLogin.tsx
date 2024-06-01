import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { HelperText, TextInput } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../assets/colors/colors';

const FormLogin = () => {
  const [password, setPassword] = React.useState<string>('');
  const [username, setUsername] = React.useState<string>('');

  const hasPasswordErrors = () => {
    return password.length <= 8;
  };

  return (
    <View style={styles.safeAreaView}>
      <TextInput
        label="Username or email"
        value={username}
        mode="outlined"
        // left={<MaterialCommunityIcons name="account" />}
        onChangeText={text => setUsername(text)}
        style={styles.textInputOut}
      />

      <TextInput
        label="Password"
        value={password}
        mode="outlined"
        secureTextEntry={true}
        // left={<MaterialCommunityIcons name="lock" size={20} />}
        // right={<MaterialCommunityIcons name="eye" size={20} />}
        onChangeText={text => setPassword(text)}
        style={styles.textInputOut}
      />

      <HelperText type="error" visible={hasPasswordErrors()}>
        La contraseña debe tener 8 o mas caracteres.
      </HelperText>

      <TouchableOpacity
        style={{ marginTop: 20 }}
        onPress={() => Linking.openURL('https://google.com')}>
        <Text>Olvidaste la contraseña?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: colors.white,
  },
  textInputOut: {
    fontSize: 14,
    marginTop: 10,
    backgroundColor: colors.login_input,
  },
  textInputFlat: {
    height: 55,
    width: '100%',
    marginBottom: 10,
    backgroundColor: colors.white,
  },
});

export default FormLogin;
