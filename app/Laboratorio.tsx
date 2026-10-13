import { useNavigation, useRouter } from 'expo-router';
import React, { useLayoutEffect } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BUTTONS = [
  {
    id: 1,
    label: 'Granulometría',
    route: '/CalculosLaboratorio/Granulometrias',
    image: require('../assets/images/LogoGranulometrias.jpeg'),
  },
  {
    id: 2,
    label: 'Lavados',
    route: '/CalculosLaboratorio/Lavados',
    image: require('../assets/images/LogoLavados.jpg'),
  },
  {
    id: 3,
    label: 'Porter',
    route: '/CalculosLaboratorio/Porter',
    image: require('../assets/images/LogoPorter.jpg'),
  },
  {
    id: 4,
    label: 'Proctor',
    route: '/CalculosLaboratorio/Proctor',
    image: require('../assets/images/LogoProctor.jpg'),
  },
  {
    id: 5,
    label: 'Resistencia A Compresión (Cilindros)',
    route: '/CalculosLaboratorio/Cilindros',
    image: require('../assets/images/LogoCilindros.jpeg'),
  },
  {
    id: 6,
    label: 'Resistencia A Flexión (Vigas)',
    route: '/CalculosLaboratorio/Vigas',
    image: require('../assets/images/LogoVigas.jpeg'),
  },
  {
    id: 7,
    label: 'Resistencia A Compresión (Morteros)',
    route: '/CalculosLaboratorio/Morteros',
    image: require('../assets/images/LogoMorteros.jpeg'),
  },
  {
    id: 8,
    label: 'Resistencia A Compresión (Pastillas)',
    route: '/CalculosLaboratorio/Pastillas',
    image: require('../assets/images/LogoPastillas.jpeg'),
  },
] as const;

export default function LaboratorioScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handlePress = (route: (typeof BUTTONS)[number]['route']) => {
    router.push(route);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/LogoLasCaliforniasApp.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Módulo De Laboratorio</Text>
        <Text style={styles.subtitle}>Selecciona La Prueba A Realizar</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {BUTTONS.map((btn) => (
            <View key={btn.id} style={styles.item}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(btn.route)}
                activeOpacity={0.7}
              >
                <Image source={btn.image} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.label}>{btn.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#003366',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    paddingTop: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
    elevation: 5,
  },
  logo: {
    width: 300,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    color: '#FFD700',
    fontWeight: '900',
    letterSpacing: 1,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#B0C4DE',
    fontWeight: '500',
    marginBottom: 5,
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '47%',
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#003366',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 0,
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
    borderRadius: 15,
  },
  label: {
    marginTop: 8,
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    fontWeight: '700',
    paddingHorizontal: 5,
  },
});