import { useRouter } from 'expo-router';
import type { Href } from 'expo-router';
import type { ReactNode } from 'react';
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ModuleMenuItem = {
  id: number;
  label: string;
  route: Href;
  image: ImageSourcePropType;
};

type ModuleMenuProps = {
  title: string;
  items: readonly ModuleMenuItem[];
  subtitle?: string;
  footer?: ReactNode;
};

export function ModuleMenu({ title, items, subtitle, footer }: ModuleMenuProps) {
  const router = useRouter();

  return (
    <SafeAreaView edges={['left', 'right', 'bottom']} style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/LogoLasCaliforniasApp.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {items.map(item => (
            <View key={item.id} style={styles.item}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push(item.route)}
                activeOpacity={0.7}
              >
                <Image source={item.image} style={styles.image} />
              </TouchableOpacity>
              <Text style={styles.label}>{item.label}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {footer}
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
    paddingTop: 15,
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
