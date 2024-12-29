import { Stack } from 'expo-router';
import { HomeScreen } from 'expo-dev-launcher/bundle/screens/HomeScreen';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'gameScreen'} />
      <Stack.Screen name={'index'} />
    </Stack>
  );
}
