import { Text, TextInput, View } from 'react-native';
import type {
  StyleProp,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';

type CalculatorFieldStyles = {
  inputGroup: StyleProp<ViewStyle>;
  inputLabel: StyleProp<TextStyle>;
  input: StyleProp<TextStyle>;
};

type CalculatorResultStyles = {
  resultRow: StyleProp<ViewStyle>;
  resultLabel: StyleProp<TextStyle>;
  resultValue: StyleProp<TextStyle>;
};

type CalculatorInputProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  sanitizeInput?: (value: string) => string;
  styles: CalculatorFieldStyles;
} & Pick<TextInputProps, 'inputMode' | 'keyboardType' | 'placeholder'>;

type CalculatorResultRowProps = {
  label: string;
  value: number | string | null;
  units?: string;
  decimalPlaces?: number;
  styles: CalculatorResultStyles;
};

export function CalculatorInput({
  label,
  value,
  onChangeText,
  sanitizeInput,
  styles,
  inputMode,
  keyboardType = 'numeric',
  placeholder = 'Ingrese el valor',
}: CalculatorInputProps) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={text => onChangeText(sanitizeInput ? sanitizeInput(text) : text)}
        keyboardType={keyboardType}
        inputMode={inputMode}
        placeholder={placeholder}
        placeholderTextColor="#999"
        returnKeyType="done"
      />
    </View>
  );
}

export function CalculatorResultRow({
  label,
  value,
  units = '',
  decimalPlaces = 2,
  styles,
}: CalculatorResultRowProps) {
  if (value === null) {
    return null;
  }

  const formattedValue = typeof value === 'number' ? value.toFixed(decimalPlaces) : value;

  return (
    <View style={styles.resultRow}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>
        {formattedValue} {units}
      </Text>
    </View>
  );
}
