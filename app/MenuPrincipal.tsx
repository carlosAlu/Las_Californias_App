import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { BackHandler, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ModuleMenu } from '../components/ModuleMenu';
import type { ModuleMenuItem } from '../components/ModuleMenu';

const MENU_ITEMS: readonly ModuleMenuItem[] = [
  {
    id: 1,
    label: 'Módulo De Laboratorio',
    route: '/Laboratorio',
    image: require('../assets/images/LogoLaboratorio.jpg'),
  },
  {
    id: 2,
    label: 'Módulo De Obra',
    route: '/Obra',
    image: require('../assets/images/LogoObra.jpg'),
  },
];

export default function MenuPrincipalScreen() {
  const [backModalVisible, setBackModalVisible] = useState(false);

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
    <ModuleMenu
      title="Menú Principal"
      subtitle="Selecciona Un Modulo"
      items={MENU_ITEMS}
      footer={
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
      }
    />
  );
}

const styles = StyleSheet.create({
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
