import { ModuleMenu } from '../components/ModuleMenu';
import type { ModuleMenuItem } from '../components/ModuleMenu';

const MENU_ITEMS: readonly ModuleMenuItem[] = [
  {
    id: 1,
    label: 'Granulometría',
    route: '/CalculosLaboratorio/Granulometrias',
    image: require('../assets/images/LogoGranulometrias.jpeg'),
  },
  {
    id: 2,
    label: 'Lavados',
    route: '/CalculosLaboratorio/Lavados',
    image: require('../assets/images/LogoLavados.jpg'),
  },
  {
    id: 3,
    label: 'Porter',
    route: '/CalculosLaboratorio/Porter',
    image: require('../assets/images/LogoPorter.jpg'),
  },
  {
    id: 4,
    label: 'Proctor',
    route: '/CalculosLaboratorio/Proctor',
    image: require('../assets/images/LogoProctor.jpg'),
  },
  {
    id: 5,
    label: 'Resistencia A Compresión (Cilindros)',
    route: '/CalculosLaboratorio/Cilindros',
    image: require('../assets/images/LogoCilindros.jpeg'),
  },
  {
    id: 6,
    label: 'Resistencia A Flexión (Vigas)',
    route: '/CalculosLaboratorio/Vigas',
    image: require('../assets/images/LogoVigas.jpeg'),
  },
  {
    id: 7,
    label: 'Resistencia A Compresión (Morteros)',
    route: '/CalculosLaboratorio/Morteros',
    image: require('../assets/images/LogoMorteros.jpeg'),
  },
  {
    id: 8,
    label: 'Resistencia A Compresión (Pastillas)',
    route: '/CalculosLaboratorio/Pastillas',
    image: require('../assets/images/LogoPastillas.jpeg'),
  },
];

export default function LaboratorioScreen() {
  return <ModuleMenu title="Módulo De Laboratorio" items={MENU_ITEMS} />;
}
