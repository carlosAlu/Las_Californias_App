import { useNavigation } from 'expo-router';
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// *** CONSTANTES DE MARCA ***
const COLOR_PRIMARY = '#003366'; // Azul Oscuro de Marca
const COLOR_ACCENT = '#FFD700'; // Dorado/Amarillo de Contraste
const COLOR_BACKGROUND = '#F5F5F5'; // Fondo Suave
const COLOR_ERROR = '#D32F2F'; // Rojo de Error
const LITERS_PER_GALLON = 3.78541;

export default function RiegoLiga() {
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [galonesAntes, setGalonesAntes] = useState('');
  const [galonesDespues, setGalonesDespues] = useState('');
  const [resultado, setResultado] = useState<{
    largo: number;
    ancho: number;
    area: number;
    galonesConsumidos: number;
    litrosConsumidos: number;
    tasaAplicada: number;
  } | null>(null);
  const [error, setError] = useState('');

  const scrollRef = useRef<ScrollView>(null);

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleCalcular = () => {
    setError('');
    setResultado(null);

    const largoValue = Number(largo);
    const anchoValue = Number(ancho);
    const antesValue = Number(galonesAntes);
    const despuesValue = Number(galonesDespues);

    if (
      ![largoValue, anchoValue, antesValue, despuesValue].every(Number.isFinite) ||
      largoValue <= 0 ||
      anchoValue <= 0 ||
      antesValue <= 0 ||
      despuesValue < 0
    ) {
      setError('Ingresa valores numéricos válidos. Las dimensiones y los galones antes del riego deben ser mayores a cero; los galones después no pueden ser negativos.');
      return;
    }

    if (despuesValue > antesValue) {
      setError('Los galones después del riego no pueden ser mayores que los galones antes del riego.');
      return;
    }

    const area = largoValue * anchoValue;
    const galonesConsumidos = antesValue - despuesValue;
    const litrosConsumidos = galonesConsumidos * LITERS_PER_GALLON;
    const tasaAplicada = litrosConsumidos / area;

    setResultado({
      largo: largoValue,
      ancho: anchoValue,
      area,
      galonesConsumidos,
      litrosConsumidos,
      tasaAplicada,
    });

    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOR_PRIMARY }}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Cálculo Riego De Liga</Text>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Datos De Entrada</Text>
            <CustomInput label="Largo De La Superficie (m)" value={largo} setValue={setLargo} placeholder="Ej: 100" />
            <CustomInput label="Ancho De La Superficie (m)" value={ancho} setValue={setAncho} placeholder="Ej: 7.2" />
            <CustomInput
              label="Galones Antes Del Riego"
              value={galonesAntes}
              setValue={setGalonesAntes}
              placeholder="Ej: 100"
            />
            <CustomInput
              label="Galones Después Del Riego"
              value={galonesDespues}
              setValue={setGalonesDespues}
              placeholder="Ej: 90"
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLOR_ACCENT }]}
              onPress={handleCalcular}
            >
                <Text style={[styles.buttonText, { color: COLOR_PRIMARY }]}>CALCULAR DOSIFICACIÓN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.cardResult}>
            <Text style={styles.sectionTitle}>2. Resultados</Text>
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : resultado ? (
              <>
                <ResultRow label="Longitud Recorrida:" value={`${resultado.largo.toFixed(2)} m`} />
                <ResultRow label="Ancho Del Tramo:" value={`${resultado.ancho.toFixed(2)} m`} />
                <ResultRow label="Área Del Tramo:" value={`${resultado.area.toFixed(2)} m²`} />
                <ResultRow label="Galones Regados:" value={`${resultado.galonesConsumidos.toFixed(2)} gal`} />
                <ResultRow label="Litros Regados:" value={`${resultado.litrosConsumidos.toFixed(2)} L`} />
                <View style={[styles.resultRow, styles.finalResultRow]}>
                  <View>
                    <Text style={styles.resultLabelFinal}>Dosificación Real:</Text>
                    <Text style={styles.resultValueFinal}>
                      {resultado.tasaAplicada.toFixed(3)} L/m²
                    </Text>
                    <Text style={styles.resultValueFinal}>
                      {(resultado.galonesConsumidos / resultado.area).toFixed(3)} gal/m²
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <Text style={styles.resultLabel}>
                Ingresa la longitud, el ancho y las lecturas del tanque para calcular la dosificación aplicada.
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function CustomInput({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        keyboardType="numeric"
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="done"
      />
    </View>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

// =========================================================================
// CAMBIOS DE ESTILO (LÍNEA POR LÍNEA)
// =========================================================================
const styles = StyleSheet.create({
  // Modificado: Usar el fondo muy claro para el ScrollView, y el azul oscuro en el SafeAreaView para la barra de estado
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: COLOR_BACKGROUND, // Fondo suave
  },
  container: {
    flexGrow: 1,
    backgroundColor: COLOR_BACKGROUND, // Fondo suave
    alignItems: 'center',
    padding: 20, // Padding ligeramente menor
    paddingBottom: 40,
  },
  // Mejorado: Título más grande, con color de marca y más impacto
  title: {
    fontSize: 24, // Tamaño ajustado para ser elegante
    color: COLOR_PRIMARY, // Color Azul de Marca
    fontWeight: '900', // Extra bold
    marginBottom: 20,
    textAlign: 'center',
    letterSpacing: 1.5,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  // Mejorado: Card más prominente, color blanco puro
  card: {
    backgroundColor: '#FFFFFF', 
    borderRadius: 12, // Radio un poco más suave
    padding: 20,
    width: '100%',
    maxWidth: 400, // Max width ajustado
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 }, // Sombra más profunda
    shadowRadius: 10,
    elevation: 8,
  },
  // Mejorado: Card de resultado separada de la de entrada
  cardResult: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    maxWidth: 400,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
    alignItems: 'stretch', // Alineación cambiada para resultados
  },
  // Mejorado: Título de sección más claro con línea separadora
  sectionTitle: {
    fontSize: 18,
    color: COLOR_PRIMARY,
    fontWeight: '700',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 2, // Línea separadora
    borderBottomColor: COLOR_ACCENT, // Color dorado en la línea
    textAlign: 'left', // Alineado a la izquierda para un look más formal
  },
  // Pequeño ajuste de margen
  inputGroup: {
    marginBottom: 18,
  },
  // Mejorado: Etiqueta con fuente más oscura
  inputLabel: {
    color: COLOR_PRIMARY,
    fontSize: 15,
    marginBottom: 6,
    fontWeight: '500', // Menos negrita que el título, más legible
  },
  // Mejorado: Input con fondo blanco y borde más sutil
  input: {
    width: '100%',
    backgroundColor: '#FFFFFF', // Fondo blanco, el contraste lo da el padding
    borderRadius: 10,
    padding: 14,
    fontSize: 17,
    textAlign: 'left', // Alineación a la izquierda para facilidad de ingreso
    borderWidth: 2,
    borderColor: '#E0E0E0', // Borde gris claro sutil
    fontWeight: '500',
  },
  // Modificado: El botón usa el color dorado (COLOR_ACCENT) y texto azul (COLOR_PRIMARY)
  button: {
    // backgroundColor: COLOR_PRIMARY, // Esto se sobrescribe inline para usar COLOR_ACCENT
    paddingVertical: 14,
    borderRadius: 30, // Más redondeado (pastilla)
    marginTop: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 }, // Sombra más notoria para el botón
    shadowRadius: 6,
    elevation: 6,
  },
  // Modificado: El texto del botón usa el color azul (COLOR_PRIMARY)
  buttonText: {
    // color: '#fff', // Esto se sobrescribe inline para usar COLOR_PRIMARY
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  // Nuevo: Estilo para la fila de resultado (etiqueta y valor)
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0', // Separador sutil
    flexWrap: 'wrap',
  },
  finalResultRow: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: COLOR_ACCENT, // Separador final dorado
    borderBottomWidth: 0,
    flexWrap: 'wrap',
  },
  // Nuevo: Etiqueta de resultado (texto normal)
  resultLabel: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  // Nuevo: Etiqueta de resultado final
  resultLabelFinal: {
    color: COLOR_PRIMARY,
    fontSize: 18,
    fontWeight: '700',
  },
  // Modificado: Valor de resultado (la cifra)
  resultValue: {
    color: COLOR_PRIMARY, // Azul oscuro
    fontWeight: '600',
    fontSize: 17,
  },
  // Nuevo: Valor de resistencia simple
  resultValueMajor: {
    color: COLOR_PRIMARY, // Azul Oscuro
    fontWeight: '700',
    fontSize: 18,
  },
  // Nuevo: Valor de resultado final (el porcentaje)
  resultValueFinal: {
    color: COLOR_ERROR, // Rojo fuerte para el valor importante
    fontWeight: '900', // Muy negrita
    fontSize: 24, // ¡Destacado!
  },
  // Mejorado: Error en color de marca
  errorText: {
    color: COLOR_ERROR,
    fontWeight: '700',
    fontSize: 16,
    marginTop: 5,
    padding: 10,
    backgroundColor: '#FFEBEE', // Fondo rojo claro para el error
    borderRadius: 8,
    textAlign: 'center',
  },
});