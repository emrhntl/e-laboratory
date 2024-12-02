import Props from '@/enums/Props';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function LoginScreen({ navigation }:Props) {


  const goRegister= () => {
    navigation.navigate('Register');
  }
  return (
    <SafeAreaView>
      <Text style={{ fontWeight: 900, color: 'white' }}>Login Page</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});
