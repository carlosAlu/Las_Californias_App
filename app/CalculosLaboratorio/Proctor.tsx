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

export default function Proctor() {
  const [error, setError] = useState('');

  const [muestraymolde, setMuestraYMolde] = useState<number | null>(null);
  const [pmolde, setPMolde] = useState<number | null>(null);
  const [Capacidad, setCapacidad] = useState<number | null>(null);

  const [pmh, setPesoMuestraHumeda] = useState<number | null>(null);
  const [w, setW] = useState<number | null>(null);
  const [s, setS] = useState<number | null>(null);
  const [HumedadPequena, setHumedadPequena] = useState<number | null>(null);
  const [SecaPequena, setSecaPequena] = useState<number | null>(null);
  const [humedadCalculada, setHumedadCalculada] = useState<number | null>(null);
  const [inputResetKey, setInputResetKey] = useState(0);

  const scrollRef = useRef<ScrollView>(null);

  const handleLimpiar = () => {
    setInputResetKey(key => key + 1);
    setMuestraYMolde(null);
    setPMolde(null);
    setCapacidad(null);
    setHumedadPequena(null);
    setSecaPequena(null);
    setPesoMuestraHumeda(null);
    setW(null);
    setS(null);
    setHumedadCalculada(null);
    setError('');
  };

  const handleCalcular = () => {

    // Limpiar mensajes y resultados previos
    setError('');

    // Validar que los valores sean números y mayores que cero
    if (
      muestraymolde === null ||
      pmolde === null ||
      Capacidad === null ||
      HumedadPequena === null ||
      SecaPequena === null ||
      ![muestraymolde, pmolde, Capacidad, HumedadPequena, SecaPequena].every(Number.isFinite) ||
      muestraymolde <= 0 ||
      pmolde <= 0 ||
      Capacidad <= 0 ||
      HumedadPequena <= 0 ||
      SecaPequena <= 0
    ) {
      setError('Por favor ingresa valores válidos y mayores a cero.');
      return;
    }

    // Calcular el peso de la muestra húmeda restando el peso del molde
    const pmh = muestraymolde - pmolde;
    setPesoMuestraHumeda(pmh);

    //Calcular &W
    const w = pmh / Capacidad;
    setW(w);

    //Calcular humedad
    const humedad = ((HumedadPequena - SecaPequena) / SecaPequena) * 100;
    setHumedadCalculada(humedad);



    //Calcular &s
    const s = (w / (humedad + 100)) * 100;
    setS(s);

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
          <Text style={styles.title}>Cálculo de Proctor</Text>

          {/* Sección para ingresar datos (Tarjeta de Entradas) */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>1. Datos de Entrada</Text>
            {/* Campos de entrada personalizados */}
            <CustomInput
              key={`muestra-${inputResetKey}`}
              label="Peso De La Muestra Con Molde"
              value={muestraymolde}
              setValue={setMuestraYMolde}
              placeholder="Ej. 3900"
            />
            <CustomInput
              key={`molde-${inputResetKey}`}
              label="Peso Del Molde"
              value={pmolde}
              setValue={setPMolde}
              placeholder="Ej. 2060"
            />
            <CustomInput
              key={`capacidad-${inputResetKey}`}
              label="Capacidad Del Molde"
              value={Capacidad}
              setValue={setCapacidad}
              placeholder="Ej. 0.945"
            />
            <CustomInput
              key={`humeda-${inputResetKey}`}
              label="Peso Muestra Humeda Pequeña"
              value={HumedadPequena}
              setValue={setHumedadPequena}
              placeholder="Ej. 100 "
            />
            <CustomInput
              key={`seca-${inputResetKey}`}
              label="Peso Muestra Seca Pequeña"
              value={SecaPequena}
              setValue={setSecaPequena}
              placeholder="Ej. 94.6 "
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
                  CALCULAR PROCTOR
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
                {/* Mostrar el peso de la muestra sin molde */}
                {pmh !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Peso Muestra Humeda:</Text>
                    <Text style={styles.resultValue}>{pmh.toFixed(2)} gr</Text>
                  </View>
                )}
                {/* Mostrar &w */}
                {w !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>&w:</Text>
                    <Text style={styles.resultValue}>{w.toFixed(2)}</Text>
                  </View>
                )}
                {/* Mostrar &s */}
                {s !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>&s:</Text>
                    <Text style={styles.resultValue}>{s.toFixed(2)}</Text>
                  </View>
                )}
                {humedadCalculada !== null && (
                  <View style={styles.resultRow}>
                    <Text style={styles.resultLabel}>Humedad:</Text>
                    <Text style={styles.resultValue}>{humedadCalculada.toFixed(2)}%</Text>
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