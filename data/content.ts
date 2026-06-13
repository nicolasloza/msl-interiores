export type NavLink = string;

export type Materiales = {
  piso: string;
  revestimiento: string;
  paleta: string;
};

export type Project = {
  id: number;
  slug: string;
  name: string;
  category: string;
  location: string;
  year: number;
  img: string;
  gallery: string[];
  superficie: number;
  tipo: 'Proyecto integral' | 'Dirección de obra' | 'Proyecto integral + Dirección de obra';
  duracion: string;
  materiales: Materiales;
  desafio: string;
  propuesta: string;
  resultado: string;
};

export type ServiceIconId = 'proyecto-integral' | 'direccion-obra';

export type Service = {
  iconId: ServiceIconId;
  title: string;
  desc: string;
};

export type Step = {
  num: string;
  title: string;
  desc: string;
};

export const NAV_LINKS: NavLink[] = [
  'Nosotros',
  'Servicios',
  'Proyectos',
  'Proceso',
  'Contacto',
];

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'casa-palermo',
    name: 'Casa Palermo',
    category: 'Residencial',
    location: 'CABA',
    year: 2024,
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
      'https://images.unsplash.com/photo-1583845112203-29329902332e?w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
    ],
    superficie: 180,
    tipo: 'Proyecto integral + Dirección de obra',
    duracion: '8 meses',
    materiales: {
      piso: 'Porcelanato rectificado gris perla',
      revestimiento: 'Microcemento en baños y cocina',
      paleta: 'Beige, blanco roto y verde salvia',
    },
    desafio:
      'La familia necesitaba transformar una casa de dos plantas construida en los años 90 en un hogar contemporáneo. El espacio tenía una distribución fragmentada que impedía la conexión entre los ambientes y carecía de luz natural en la planta baja.',
    propuesta:
      'Propusimos demoler los muros divisorios entre el living, el comedor y la cocina para generar un espacio social integrado y luminoso. La paleta de beige y blanco roto amplifica la luz natural, mientras que las plantas y el verde salvia introducen vida y textura sin romper la calma del conjunto.',
    resultado:
      'El resultado es una casa que respira. Los 180 m² se sienten amplios y fluidos, con una identidad cálida y contemporánea que refleja fielmente el estilo de vida de la familia. Cada detalle, desde los tiradores hasta las luminarias, fue seleccionado con criterio y coherencia.',
  },
  {
    id: 2,
    slug: 'departamento-nunez',
    name: 'Departamento Núñez',
    category: 'Residencial',
    location: 'CABA',
    year: 2024,
    img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85',
      'https://images.unsplash.com/photo-1583845112203-29329902332e?w=1200&q=85',
    ],
    superficie: 95,
    tipo: 'Proyecto integral',
    duracion: '5 meses',
    materiales: {
      piso: 'Madera de roble natural',
      revestimiento: 'Ladrillo visto en living',
      paleta: 'Arena, terracota y negro mate',
    },
    desafio:
      'Un departamento de 95 m² para una pareja joven que trabaja desde casa. El principal desafío fue crear zonas claramente diferenciadas —trabajo, descanso y vida social— dentro de un espacio compacto, sin que ninguna invadiera a la otra.',
    propuesta:
      'Diseñamos el espacio en capas: el living con ladrillo visto y tonos tierra funciona como ancla visual y social. El sector de trabajo se definió con una biblioteca a medida que actúa como separador sin bloquear la luz. Los dormitorios se reservaron como refugios íntimos con materiales suaves y paleta neutra.',
    resultado:
      'El departamento logra sentirse generoso a pesar de su escala. La madera de roble en el piso unifica los ambientes y genera calidez, mientras que el contraste del ladrillo con el negro mate le da carácter y personalidad propia.',
  },
  {
    id: 3,
    slug: 'casa-tigre',
    name: 'Casa Tigre',
    category: 'Residencial',
    location: 'GBA',
    year: 2023,
    img: 'https://images.unsplash.com/photo-1583845112203-29329902332e?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1583845112203-29329902332e?w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
    ],
    superficie: 320,
    tipo: 'Proyecto integral + Dirección de obra',
    duracion: '14 meses',
    materiales: {
      piso: 'Travertino en áreas comunes',
      revestimiento: 'Piedra natural en muro principal',
      paleta: 'Blanco, madera oscura y verde botella',
    },
    desafio:
      'Una casa familiar de 320 m² en el Delta con vistas al río. El cliente quería una arquitectura de interiores que dialogara con el entorno natural sin caer en lo rústico. El desafío fue encontrar ese equilibrio entre lo sofisticado y lo orgánico.',
    propuesta:
      'Materiales naturales en su estado más refinado: travertino en pisos, piedra sin pulir en el muro principal del living y madera oscura en carpinterías y muebles a medida. La paleta verde botella aparece en detalles —herrajes, textiles, plantas— para conectar visualmente con el exterior.',
    resultado:
      'La casa conversa con el paisaje sin imitarlo. El resultado es un hogar de gran escala que se siente íntimo y arraigado, con una materialidad que va envejeciendo bien y que ganará carácter con el tiempo.',
  },
  {
    id: 4,
    slug: 'loft-san-telmo',
    name: 'Loft San Telmo',
    category: 'Residencial',
    location: 'CABA',
    year: 2023,
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=85',
      'https://images.unsplash.com/photo-1583845112203-29329902332e?w=1200&q=85',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=85',
      'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85',
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85',
    ],
    superficie: 75,
    tipo: 'Proyecto integral',
    duracion: '4 meses',
    materiales: {
      piso: 'Cemento alisado gris medio',
      revestimiento: 'Azulejo de cemento artesanal',
      paleta: 'Carbón, mostaza y cobre',
    },
    desafio:
      'Un loft en planta baja en San Telmo con techos de 3,80 m y una sola ventana de gran tamaño. El propietario —artista plástico— necesitaba un espacio que funcionara a la vez como vivienda y como estudio de trabajo, con una estética que reflejara su sensibilidad.',
    propuesta:
      'Aprovechamos la altura con una estructura metálica para crear un entrepiso dormitorio liviano y aéreo, que libera toda la planta baja para el estudio y el living. El cemento alisado y el metal negro generan el fondo neutro que el cliente necesitaba para su obra. Los acentos en mostaza y cobre aportan calidez sin distraer.',
    resultado:
      'En 75 m² conviven perfectamente el espacio de creación y el de vida cotidiana. El loft tiene una identidad visual muy marcada que acompaña la personalidad del cliente y que se percibe honesta y construida con coherencia.',
  },
];

export const SERVICES: Service[] = [
  {
    iconId: 'proyecto-integral',
    title: 'Proyecto Integral',
    desc: 'Diseñamos cada espacio desde cero: distribución, materialidad, mobiliario y paleta. Un proceso completo que convierte tu visión en un hogar coherente y único.',
  },
  {
    iconId: 'direccion-obra',
    title: 'Dirección de Obra',
    desc: 'Coordinamos y supervisamos cada etapa de la ejecución. Nos aseguramos de que lo diseñado se construya tal como fue concebido, cuidando tiempos y detalles.',
  },
];

export const STEPS: Step[] = [
  {
    num: '01',
    title: 'Consulta inicial',
    desc: 'Nos reunimos para entender tu proyecto, necesidades y estilo de vida.',
  },
  {
    num: '02',
    title: 'Propuesta de diseño',
    desc: 'Desarrollamos una propuesta visual con planos, renders y selección de materiales.',
  },
  {
    num: '03',
    title: 'Desarrollo',
    desc: 'Ajustamos cada detalle hasta lograr un diseño que te represente completamente.',
  },
  {
    num: '04',
    title: 'Dirección de obra',
    desc: 'Acompañamos la ejecución para garantizar que el resultado final sea fiel al diseño.',
  },
];
