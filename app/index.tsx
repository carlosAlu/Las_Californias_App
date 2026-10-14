import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme/colors';

const LOGO_IMAGE = require('../assets/images/LogoLasCaliforniasApp.png');

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoCard}>
            <Image source={LOGO_IMAGE} style={styles.logo} />
          </View>
          <Text style={styles.eyebrow}>LAS CALIFORNIAS</Text>
          <Text style={styles.welcomeTitle}>¡Bienvenido!</Text>
          <Text style={styles.description}>
            Herramientas para el control de calidad en obra y laboratorio.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.replace('/MenuPrincipal')}
            activeOpacity={0.82}
            accessibilityRole="button"
          >
            <Text style={styles.buttonText}>Explorar módulos</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.caption}>CONTROL · PRECISIÓN · CONFIANZA</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 28,
    paddingTop: 58,
    paddingBottom: 34,
  },
  header: {
    alignItems: 'center',
    width: '100%',
    marginTop: 18,
  },
  logoCard: {
    width: 250,
    height: 250,
    borderRadius: 38,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 36,
    shadowColor: colors.primary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 12 },
    shadowRadius: 24,
    elevation: 6,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 3,
    marginBottom: 10,
  },
  welcomeTitle: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 10,
    letterSpacing: -0.8,
  },
  description: {
    maxWidth: 300,
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 16,
  },
  button: {
    backgroundColor: colors.primary,
    width: '100%',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonText: {
    fontSize: 17,
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
  caption: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
  },
});