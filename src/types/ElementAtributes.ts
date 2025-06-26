// Padronização dos Elementos
export type ElementType = {
  name: ValueWithLink<string>; // Nome
  symbol: ValueWithLink<string>; // Simbolo
  atomicNumber: ValueWithLink<number>; // Número Atômico
  atomicWeight: ValueWithLink<number>; // Peso Atômico
  category: ValueWithLink<ElementCategory>; // Categoria
  stateAtRoomTemp: ValueWithLink<ElementState>; // Estado do elemento na temperatura ambiente
  meltingPoint?: ValueWithLink<number>; // Ponto de fusão do elemento
  boilingPoint?: ValueWithLink<number>; // Ponto de ebulição do elemento
  density?: ValueWithLink<number>; // Densidade do átomo
  electronConfiguration?: ValueWithLink<string>; // Configuração Eletrônica do elemento
  electronegativity?: ValueWithLink<number>; // Eletronegatividade do elemento
  atomicRadius?: ValueWithLink<number>; // Raio Atômico do elemento
  ionizationEnergy?: ValueWithLink<number>; // Energia de Ionização do elemento
  electronAffinity?: ValueWithLink<number>; // Afinidade Eletrônica do elemento
  oxidationStates?: ValueWithLink<OxidationStatesType>; // Estados de oxidação
  description?: ValueWithLink<string>; // Descrição
  uses?: ValueWithLink<string>; // Usos do elemento
  history?: ValueWithLink<string>; // História
  interestingFacts?: ValueWithLink<string>; // Fatos interessantes sobre o elemento
  moreInfoLink?: string; // Página de mais informações sobre o elemento
  position: {
    group: number; // Grupo (colunas)
    period: number; // Período (linhas)
  };
};

export type OxidationStatesType = Array<number>;

export type ReducedElementType = Pick<ElementType,
  "atomicNumber" |
  "atomicWeight" |
  "electronConfiguration" |
  "category" |
  "name" |
  "symbol"
>;

export interface MapedElementType {
  name: string;
  symbol: string;
  atomicNumber: number;
  atomicWeight: number;
  category: ElementCategory;
  stateAtRoomTemp: ElementState;
  meltingPoint?: number | null | undefined;
  boilingPoint?: number | null | undefined;
  electronConfiguration: string;
  description?: string | null | undefined;
  uses?: string | null | undefined;
  history?: string | null | undefined;
  interestingFacts?: string | null | undefined;
  moreInfoLink?: string | null | undefined;
  position: { group: number; period: number; };
  block: 's' | 'p' | 'd' | 'f';
}

export type Position = { group: number, period: number; };

export type ValueWithLink<T> = { value: T, link: string; };

export enum ElementCategory {
  NONMETALS = "nonmetals",
  METALS = "metals",
  NOBLE_GASES = "noble_gases",
  ALKALI_METALS = "alkali_metals",
  ALKALINE_EARTH_METALS = "alkaline_earth_metals",
  TRANSITION_METALS = "transition_metals",
  POST_TRANSITION_METALS = "post_transition_metals",
  METALLOIDS = "metalloids",
  HALOGENS = "halogens",
  LANTHANIDES = "lanthanides",
  ACTINIDES = "actinides",
};

export enum ElementState {
  SOLID = "solid",
  LIQUID = "liquid",
  GAS = "gas",
  UNKNOWN = "unknown",
};

export const ElementCategoryInfo: Record<ElementCategory, {
  label: string;
  color: string;
  infoLink: string;
}> = {
  [ElementCategory.NONMETALS]: {
    label: "Nonmetals",
    color: "#8FC96E",
    infoLink: "https://en.wikipedia.org/wiki/Nonmetal",
  },
  [ElementCategory.NOBLE_GASES]: {
    label: "Noble Gases",
    color: "#77AADD",
    infoLink: "https://en.wikipedia.org/wiki/Noble_gas",
  },
  [ElementCategory.ALKALI_METALS]: {
    label: "Alkali Metals",
    color: "#E5B76E",
    infoLink: "https://en.wikipedia.org/wiki/Alkali_metal",
  },
  [ElementCategory.ALKALINE_EARTH_METALS]: {
    label: "Alkaline Earth Metals",
    color: "#F4DA70",
    infoLink: "https://en.wikipedia.org/wiki/Alkaline_earth_metal",
  },
  [ElementCategory.METALLOIDS]: {
    label: "Metalloids",
    color: "#73C6A5",
    infoLink: "https://en.wikipedia.org/wiki/Metalloid",
  },
  [ElementCategory.HALOGENS]: {
    label: "Halogens",
    color: "#A1D6E5",
    infoLink: "https://en.wikipedia.org/wiki/Halogen",
  },
  [ElementCategory.POST_TRANSITION_METALS]: {
    label: "Post Transition_Metals",
    color: "#A9C7D6",
    infoLink: "https://en.wikipedia.org/wiki/Post-transition_metal",
  },
  [ElementCategory.TRANSITION_METALS]: {
    label: "Transition Metals",
    color: "#EBA5AD",
    infoLink: "https://en.wikipedia.org/wiki/Transition_metal",
  },
  [ElementCategory.LANTHANIDES]: {
    label: "Lanthanides",
    color: "#8CC6CC",
    infoLink: "https://en.wikipedia.org/wiki/Lanthanide",
  },
  [ElementCategory.ACTINIDES]: {
    label: "Actinides",
    color: "#C8A3D6",
    infoLink: "https://en.wikipedia.org/wiki/Actinide",
  },
  [ElementCategory.METALS]: {
    label: "Metals",
    color: "#C8A3D1",
    infoLink: "https://en.wikipedia.org/wiki/Metals",
  },
};

export const ElementStateInfo: Record<ElementState, {
  label: string;
  color: string;
  infoLink: string;
}> = {
  [ElementState.SOLID]: {
    label: "Solid",
    color: "#A52A2A", // Marrom
    infoLink: "https://en.wikipedia.org/wiki/Solid",
  },
  [ElementState.LIQUID]: {
    label: "Liquid",
    color: "#1E90FF", // Azul vibrante
    infoLink: "https://en.wikipedia.org/wiki/Liquid",
  },
  [ElementState.GAS]: {
    label: "Gas",
    color: "#FFD700", // Dourado
    infoLink: "https://en.wikipedia.org/wiki/Gas",
  },
  [ElementState.UNKNOWN]: {
    label: "Unknown",
    color: "#808080", // Cinza
    infoLink: "https://en.wikipedia.org/wiki/State_of_matter",
  },
};
