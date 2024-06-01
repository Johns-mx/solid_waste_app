import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import { useTheme } from '../../hooks/ThemeContext';
import MapView from 'react-native-maps';
import { FAB, Portal, PaperProvider } from 'react-native-paper';

const MapScreen = () => {
  const { colorsTheme, isDarkMode } = useTheme();

  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: { open: boolean }) => setState({ open });
  const { open } = state;

  return (
    <PaperProvider>
      <SafeAreaView style={styles.safeAreaView}>
        <Portal>
          <FAB.Group
            open={open}
            visible
            style={{ bottom: 80 }}
            icon={open ? 'calendar-today' : 'plus'}
            actions={[
              { icon: 'plus', onPress: () => console.log('Pressed add') },
              {
                icon: 'star',
                label: 'Star',
                onPress: () => console.log('Pressed star'),
              },
              {
                icon: 'email',
                label: 'Email',
                onPress: () => console.log('Pressed email'),
              },
              {
                icon: 'bell',
                label: 'Remind',
                onPress: () => console.log('Pressed notifications'),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
          />
        </Portal>
        <Text
          style={{
            color: colorsTheme.text,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Routes Map
        </Text>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  screen: {
    //position: 'absolute',
    //top: 10,
    //left: 10,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
