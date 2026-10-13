import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const buttons = [
  { id: 1, label: 'Módulo De Laboratorio', route: '/Laboratorio', image: require('../assets/images/LogoLaboratorio.jpg'), },
  { id: 2, label: 'Módulo De Obra', route: '/Obra', image: require('../assets/images/LogoObra.jpg'), },
] as const;

export default function MenuPrincipalScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const [backModalVisible, setBackModalVisible] = useState(false);

  const handlePress = (route: (typeof buttons)[number]['route']) => {
    router.push(route);
  };

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        setBackModalVisible(true);
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/LogoLasCaliforniasApp.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Menú Principal</Text>
        <Text style={styles.subtitle}>Selecciona Un Modulo</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {buttons.map((button) => (
            <View key={button.id} style={styles.item}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => handlePress(button.route)}
                activeOpacity={0.7}
              >
                <Image source={button.image} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.label}>{button.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Modal
        visible={backModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setBackModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿Salir de la aplicación?</Text>
            <View style={styles.modalRow}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setBackModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>CANCELAR</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.exitButton]}
                onPress={() => BackHandler.exitApp()}
              >
                <Text style={styles.modalButtonText}>SALIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFF',
    width: '80%',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#003366',
  },
  modalRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#003366',
  },
  exitButton: {
    backgroundColor: '#D32F2F',
  },
  modalButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
