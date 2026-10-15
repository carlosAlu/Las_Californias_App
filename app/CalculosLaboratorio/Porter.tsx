import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CalculatorInput } from '../../components/CalculatorFields';

// *** CONSTANTES DE MARCA ***
const COLOR_PRIMARY = '#24584D';
const COLOR_ACCENT = '#D98555';
const COLOR_BACKGROUND = '#F4F2EC';
const COLOR_ERROR = '#B84A42';

export default function Porter() {
  const [error, setError] = useState('');
  const [inputResetKey, setInputResetKey] = useState(0);
  const [pesohumedo, setPesoHumedo] = useState<number | null>(null);
  const [pmolde, setPMolde] = useState<number | null>(null);
  const [Altura1, setAltura1] = useState<number | null>(null);
  const [Altura2, setAltura2] = useState<number | null>(null);
  const [Altura3, setAltura3] = useState<number | null>(null);
  const [Altura4, setAltura4] = useState<number | null>(null);
  const [areaMolde, setAMolde] = useState<number | null>(null);
  const [humedad, setHumedadOptima] = useState<number | null>(null);
  const [sumaAlturas, setSumaAlturas] = useState<number | null>(null);
  const [promedioAlturas, setPromedioAlturas] = useState<number | null>(null);
  const [alturaMaterial, setAlturaMaterial] = useState<number | null>(null);
  const [alturaMaterialVM, setAlturaMaterialVM] = useState<number | null>(null);
  const [pemh, setPemh] = useState<number | null>(null);
  const [pesm, setPesm] = useState<number | null>(null);

  const scrollRef = useRef<ScrollView>(null);

  const handleLimpiar = () => {
    setInputResetKey(key => key + 1);
    setPesoHumedo(null);
    setPMolde(null);
    setAltura1(null);
    setAltura2(null);
    setAltura3(null);
    setAltura4(null);
    setAMolde(null);
    setHumedadOptima(null);
    setSumaAlturas(null);
    setPromedioAlturas(null);
    setAlturaMaterial(null);
    setAlturaMaterialVM(null);
    setPemh(null);
    setPesm(null);
    setError('');
  };

  const handleCalcular = () => {
    setError('');
    setSumaAlturas(null);
    setPromedioAlturas(null);
    setAlturaMaterial(null);
    setAlturaMaterialVM(null);
    setPemh(null);
    setPesm(null);

    const valores = [
      pesohumedo,
      pmolde,
      Altura1,
      Altura2,
      Altura3,
      Altura4,
      areaMolde,
      humedad,
    ];
    if (
      valores.some(valor => valor === null || !Number.isFinite(valor)) ||
      pesohumedo === null ||
      pmolde === null ||
      Altura1 === null ||
      Altura2 === null ||
      Altura3 === null ||
      Altura4 === null ||
      areaMolde === null ||
      humedad === null ||
      pesohumedo <= 0 ||
      pmolde <= 0 ||
      Altura1 < 0 ||
      Altura2 < 0 ||
      Altura3 < 0 ||
      Altura4 < 0 ||
      areaMolde <= 0 ||
      humedad < 0
    ) {
      setError('Ingresa valores numéricos válidos. Los pesos, la altura del molde y el área deben ser mayores a cero; las alturas faltantes y la humedad no pueden ser negativas.');
      return;
    }

    // Calcular suma y promedio de las alturas faltantes
    const sumaAlturas = Altura1 + Altura2 + Altura3 + Altura4;
    const promedioAlturas = sumaAlturas / 4;

    const alturaMaterial = pmolde - promedioAlturas;
    if (alturaMaterial <= 0) {
      setError('El promedio de las alturas faltantes debe ser menor que la altura del molde.');
      return;
    }

    const alturaMaterialVM = alturaMaterial * areaMolde;
    const pemh = (pesohumedo / alturaMaterialVM) * 1000;
    const pesm = pemh / (1 + humedad / 100);

    setSumaAlturas(sumaAlturas);
    setPromedioAlturas(promedioAlturas);
    setAlturaMaterial(alturaMaterial);
    setAlturaMaterialVM(alturaMaterialVM);
    setPemh(pemh);
    setPesm(pesm);

    // Desplazar scroll hacia abajo para mostrar resultados
    setTimeout(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  return (
    // Se envolvió en SafeAreaView para la apariencia
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
          {/* Título principal con estilo de marca */}
          <Text style={styles.title}>Cálculo de Porter</Text>

          {/* Sección para ingresar datos (Tarjeta de Entradas) */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Datos de Entrada</Text>
            {/* Campos de entrada personalizados */}

            <CustomInput
              key={`peso-humedo-${inputResetKey}`}
              label="Peso Humedo"
              value={pesohumedo}
              setValue={setPesoHumedo}
              placeholder="Ej. 4000"
            />
            <CustomInput
              key={`altura-molde-${inputResetKey}`}
              label="Altura Del Molde"
              value={pmolde}
              setValue={setPMolde}
              placeholder="Ej. 12.60"
            />
            <CustomInput
              key={`altura-1-${inputResetKey}`}
              label="Altura Faltante 1"
              value={Altura1}
              setValue={setAltura1}
              placeholder="Ej. 3.07"
            />
            <CustomInput
              key={`altura-2-${inputResetKey}`}
              label="Altura Faltante 2"
              value={Altura2}
              setValue={setAltura2}
              placeholder="Ej. 3.03"
            />
            <CustomInput
              key={`altura-3-${inputResetKey}`}
              label="Altura Faltante 3"
              value={Altura3}
              setValue={setAltura3}
              placeholder="Ej. 3.04"
            />
            <CustomInput
              key={`altura-4-${inputResetKey}`}
              label="Altura Faltante 4"
              value={Altura4}
              setValue={setAltura4}
              placeholder="Ej. 3.02"
            />
            <CustomInput
              key={`area-molde-${inputResetKey}`}
              label="Area Del Molde"
              value={areaMolde}
              setValue={setAMolde}
              placeholder="Ej. 194"
            />
            <CustomInput
              key={`humedad-optima-${inputResetKey}`}
              label="Humedad Optima"
              value={humedad}
              setValue={setHumedadOptima}
              placeholder="Ej. 6.2"
            />

            {/* Botón para iniciar cálculo */}
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={[styles.button, { flex: 1, backgroundColor: COLOR_PRIMARY }]}
                onPress={handleLimpiar}
              >
                <Text style={[styles.buttonText, { color: '#FFFFFF', fontSize: 14 }]} numberOfLines={2} adjustsFontSizeToFit>
                  LIMPIAR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { flex: 1, backgroundColor: COLOR_ACCENT }]}
                onPress={handleCalcular}
              >
                <Text style={[styles.buttonText, { color: COLOR_PRIMARY, fontSize: 14 }]} numberOfLines={2} adjustsFontSizeToFit>
                  CALCULAR PORTER
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sección de resultados (Tarjeta de Salida) */}
          <View style={styles.cardResult}>
            <Text style={styles.sectionTitle}>2. Resultados</Text>
            {/* Mostrar error si existe */}
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (

              <>
                {/* Mostrar suma de altura faltante */}
                {sumaAlturas !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Suma De Altura Faltante:</Text>
                    <Text style={styles.resultValue}>{sumaAlturas.toFixed(2)}</Text>
                  </View>
                )}
                {/* Mostrar promedio de altura faltante */}
                {promedioAlturas !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Promedio De Altura Faltante:</Text>
                    <Text style={styles.resultValue}>{promedioAlturas.toFixed(2)}</Text>
                  </View>
                )}
                {/* Mostrar altura del material */}
                {alturaMaterial !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Altura Del Material:</Text>
                    <Text style={styles.resultValue}>{alturaMaterial.toFixed(2)}</Text>
                  </View>
                )}
                {/* Mostrar altura del material VM */}
                {alturaMaterialVM !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Altura Del Material VM:</Text>
                    <Text style={styles.resultValue}>{alturaMaterialVM.toFixed(2)}</Text>
                  </View>
                )}
                {pemh !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>PEMH:</Text>
                    <Text style={styles.resultValue}>{pemh.toFixed(2)}</Text>
                  </View>
                )}
                {/* Mostrar PESM */}
                {pesm !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>PESM:</Text>
                    <Text style={styles.resultValue}>{pesm.toFixed(2)}</Text>
                  </View>
                )}
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/**
 * Componente reutilizable para campo de texto con etiqueta
 */
function CustomInput({
  label,
  value,
  setValue,
  placeholder,
}: {
  label: string;
  value: number | null;
  setValue: (v: number | null) => void;
  placeholder: string;
}) {
  const [inputText, setInputText] = useState(value?.toString() ?? '');

  return (
    <CalculatorInput
      label={label}
      value={inputText}
      onChangeText={text => {
        setInputText(text);
        setValue(text === '' ? null : Number(text));
      }}
      placeholder={placeholder}
      keyboardType="numeric"
      styles={styles}
    />
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
    borderColor: '#DDDCD3',
    fontWeight: '500',
  },
  // Modificado: El botón usa el color dorado (COLOR_ACCENT) y texto azul (COLOR_PRIMARY)
  button: {
    // backgroundColor: COLOR_PRIMARY, // Esto se sobrescribe inline para usar COLOR_ACCENT
    paddingVertical: 14,
    borderRadius: 16,
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
    textAlign: 'center',
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
    color: '#26332F',
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