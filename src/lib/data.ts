export type PricingTier = 'menudeo' | 'medio_mayoreo' | 'mayoreo';

export interface Product {
  id: string;
  name: string;
  category: 'Res' | 'Cerdo' | 'Pollo' | 'Especiales';
  description: string;
  prices: {
    menudeo: number;
    medio_mayoreo: number;
    mayoreo: number;
  };
  unit: 'KG' | 'LBS' | 'PZA';
  imageUrl: string;
  isPopular?: boolean;
}

export const mockProducts: Product[] = [
  {
    id: 'top-sirloin',
    name: 'Top Sirloin',
    category: 'Res',
    description: 'Corte magro y jugoso, excelente para asar o a la plancha.',
    prices: {
      menudeo: 209.90,
      medio_mayoreo: 195.00,
      mayoreo: 185.00
    },
    unit: 'KG',
    imageUrl: '/images/top_sirloin.jpg',
    isPopular: true
  },
  {
    id: 'diezmillo',
    name: 'Diezmillo',
    category: 'Res',
    description: 'Corte con buen marmoleo, ideal para asados familiares y tacos.',
    prices: {
      menudeo: 189.90,
      medio_mayoreo: 179.90,
      mayoreo: 169.90
    },
    unit: 'KG',
    imageUrl: '/images/diezmillo.jpg',
    isPopular: true
  },
  {
    id: 'chuleton',
    name: 'Chuletón',
    category: 'Res',
    description: 'Corte grueso con hueso, que aporta un sabor inigualable al asador.',
    prices: {
      menudeo: 178.90,
      medio_mayoreo: 165.00,
      mayoreo: 155.00
    },
    unit: 'KG',
    imageUrl: '/images/chuleton.jpg'
  },
  {
    id: 'costilla-simple',
    name: 'Costilla Simple',
    category: 'Cerdo',
    description: 'Costilla con excelente carne, perfecta para preparaciones BBQ o al horno.',
    prices: {
      menudeo: 119.90,
      medio_mayoreo: 110.00,
      mayoreo: 99.90
    },
    unit: 'KG',
    imageUrl: '/images/costilla_simple.jpg'
  },
  {
    id: 'alitas-pollo',
    name: 'Alitas de Pollo',
    category: 'Pollo',
    description: 'Perfectas para botanas y grandes eventos.',
    prices: {
      menudeo: 89.90,
      medio_mayoreo: 85.00,
      mayoreo: 79.90
    },
    unit: 'KG',
    imageUrl: '/images/alitas_pollo.jpg'
  },
  {
    id: 't-bone',
    name: 'T-Bone',
    category: 'Res',
    description: 'Excelente balance entre filete y lomo, ideal para la parrilla.',
    prices: {
      menudeo: 179.50,
      medio_mayoreo: 169.50,
      mayoreo: 159.50
    },
    unit: 'KG',
    imageUrl: '/images/t_bone.jpg'
  },
  {
    id: 'costilla-cargada',
    name: 'Costilla Cargada',
    category: 'Res',
    description: 'Costilla con abundante carne, excelente sabor y marmoleo.',
    prices: {
      menudeo: 209.50,
      medio_mayoreo: 195.00,
      mayoreo: 185.00
    },
    unit: 'KG',
    imageUrl: '/images/costilla_cargada.jpg'
  },
  {
    id: 'paleta',
    name: 'Paleta',
    category: 'Cerdo',
    description: 'Ideal para deshebrar, carnitas o guisos lentos.',
    prices: {
      menudeo: 149.90,
      medio_mayoreo: 139.90,
      mayoreo: 129.90
    },
    unit: 'KG',
    imageUrl: '/images/paleta.jpg'
  }
];

