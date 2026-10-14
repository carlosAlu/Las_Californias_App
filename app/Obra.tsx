import { ModuleMenu } from '../components/ModuleMenu';
import type { ModuleMenuItem } from '../components/ModuleMenu';

const MENU_ITEMS: readonly ModuleMenuItem[] = [
  {
    id: 1,
    label: '% Compactación',
    route: '/CalculosCampo/Compactacion',
    image: require('../assets/images/LogoCalas.jpeg'),
  },
  {
    id: 2,
    label: '% Compactación (Método del Cono)',
    route: '/CalculosCampo/CompactacionCono',
    image: require('../assets/images/LogoCompactacionCono.jpg'),
  },
  {
    id: 3,
    label: 'Contenido De Asfalto',
    route: '/CalculosCampo/ContenidoAsfalto',
    image: require('../assets/images/LogoAsfalto.jpg'),
  },
  {
    id: 4,
    label: 'Dosificación Real De Liga',
    route: '/CalculosCampo/RiegoLiga',
    image: require('../assets/images/LogoRiego.jpeg'),
  },
];

export default function Obra() {
  return <ModuleMenu title="Módulo De Obra" items={MENU_ITEMS} />;
}
