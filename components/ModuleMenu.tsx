import { Ionicons } from '@expo/vector-icons';
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
import { colors } from '../theme/colors';

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
        <Text style={styles.eyebrow}>LAS CALIFORNIAS · HERRAMIENTAS TÉCNICAS</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle ?? 'Control y calidad para cada proyecto'}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.grid}>
          {items.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.item}
              onPress={() => router.push(item.route)}
              activeOpacity={0.82}
              accessibilityRole="button"
              accessibilityLabel={item.label}
            >
              <View style={styles.imageFrame}>
                <Image source={item.image} style={styles.image} />
              </View>
              <View style={styles.itemFooter}>
                <Text style={styles.label}>{item.label}</Text>
                <View style={styles.arrow}>
                  <Ionicons name="arrow-forward" size={17} color={colors.primary} />
                </View>
              </View>
            </TouchableOpacity>
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
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 18,
    paddingBottom: 28,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  logo: {
    width: 190,
    height: 62,
    resizeMode: 'contain',
    marginBottom: 12,
  },
  eyebrow: {
    color: '#C6D8D0',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.7,
    marginBottom: 8,
  },
  title: {
    fontSize: 27,
    color: colors.white,
    fontWeight: '800',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#D6E1DB',
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 14,
  },
  item: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#EAE7DE',
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 12,
    elevation: 3,
  },
  imageFrame: {
    width: '100%',
    aspectRatio: 1.05,
    backgroundColor: '#F4F2EC',
    borderRadius: 14,
    padding: 7,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: 10,
  },
  itemFooter: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 3,
    paddingTop: 8,
  },
  label: {
    flex: 1,
    fontSize: 14,
    lineHeight: 19,
    color: colors.text,
    textAlign: 'left',
    fontWeight: '700',
    paddingRight: 4,
  },
  arrow: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#EAF0EC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
