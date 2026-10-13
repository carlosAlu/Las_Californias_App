import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

/**
 * Componente raíz que renderiza el stack de navegación de Expo Router.
 */
export default function Index() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: '',
        headerStyle: styles.header,
        headerShadowVisible: false,
        headerTintColor: '#FFD700',
        headerLeft: () => (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel="Volver a la página anterior"
            onPress={() => {
              if (router.canGoBack()) {
                router.back();
              } else {
                router.replace('/MenuPrincipal');
              }
            }}
            style={styles.backButton}
            activeOpacity={0.75}
          >
            <Ionicons name="arrow-back" size={24} color="#FFD700" />
            <Text style={styles.backButtonLabel}>Volver</Text>
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="MenuPrincipal" options={{ headerShown: false }} />
    </Stack>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#003366',
  },
  backButton: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backButtonLabel: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
});
