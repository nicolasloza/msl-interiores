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

const CLD = (id: string) => `https://res.cloudinary.com/dkjmjmqvo/image/upload/f_auto,q_auto/${id}`;

export const PROJECTS: Project[] = [
  {
    id: 1,
    slug: 'pelliza',
    name: 'Pelliza',
    category: 'Residencial',
    location: 'CABA',
    year: 2024,
    img: CLD('IMG_4643_ceooym'),
    gallery: [
      CLD('IMG_4643_ceooym'),
      CLD('IMG_2697_lxn6gk'),
      CLD('IMG_2689_l5eh6f'),
      CLD('6d5f5853-90b9-4557-943a-d3eb469713b0_imkwr6'),
      CLD('IMG_4645_ayrnc5'),
      CLD('IMG_2687_yddv5k'),
      CLD('IMG-20240106-WA0032_Original_pbhfiq'),
      CLD('IMG_4649_bisndp'),
      CLD('IMG_4653_wczzw1'),
      CLD('d22dddb2-1181-4f91-b25b-3ea91e272f26_vesl3r'),
      CLD('77474437-92ac-417e-96fa-b6bdf8f3d314_sxsr9y'),
      CLD('6d0950b2-a542-4710-bb93-009b1c97d20e_b5wfkj'),
    ],
    superficie: 0,
    tipo: 'Proyecto integral',
    duracion: '',
    materiales: {
      piso: '',
      revestimiento: '',
      paleta: '',
    },
    desafio: '',
    propuesta: '',
    resultado: '',
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
