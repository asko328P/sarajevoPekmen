import { View } from 'react-native';
import SquishButton from '~/components/SquishButton/SquishButton';
import { useState } from 'react';
import SkiaScrollPicker from '~/components/SkiaScrollPicker/SkiaScrollPicker';

export default function SquishButtonScreen() {
  const [animatedNumber, setAnimatedNumber] = useState(9996);

  return (
    <View>
      <SkiaScrollPicker numberOfLines={30} lineWidth={2} spacing={10} />
    </View>
  );
}
