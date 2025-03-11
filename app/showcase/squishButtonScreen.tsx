import { View } from 'react-native';
import SquishButton from '~/components/SquishButton/SquishButton';

export default function SquishButtonScreen() {
  return (
    <View>
      <SquishButton height={100} width={400} title={'Squish me!'} />
    </View>
  );
}
