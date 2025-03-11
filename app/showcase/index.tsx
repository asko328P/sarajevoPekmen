import { Button, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function Page() {
  const router = useRouter();
  const navigateToSquishButton = () => {
    router.push('/showcase/squishButtonScreen');
  };
  const navigateSkiaScrollPicker = () => {
    router.push('/showcase/skiaScrollPicker');
  };
  return (
    <ScrollView>
      <Button title={'Squish Button'} onPress={navigateToSquishButton} />
      <Button title={'Skia scroll picker'} onPress={navigateSkiaScrollPicker} />
    </ScrollView>
  );
}
