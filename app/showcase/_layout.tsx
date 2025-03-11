import { SafeAreaView } from 'react-native-safe-area-context';
import { Appearance, StyleSheet, View } from 'react-native';
import { Stack } from 'expo-router';
import setColorScheme = Appearance.setColorScheme;

setColorScheme('dark');

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        options={{
          title: 'Showcase',
          // headerTransparent: true,
          // headerBackground: () => <View style={{ backgroundColor: 'red', width: '100%', height: 20 }} />,
        }}
        name={'index'}
      />
      <Stack.Screen
        name={'squishButtonScreen'}
        options={{
          title: 'Squish Button',
          // headerSearchBarOptions: 'focus',
        }}
      />
    </Stack>
  );
  // return (
  //   <SafeAreaView style={styles.safeAreaView}>
  //     <Stack>
  //       <Stack.Screen name={'index'} />
  //       <Stack.Screen name={'squishButtonScreen'} />
  //     </Stack>
  //   </SafeAreaView>
  // );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#000000',
  },
});
