// Tipos para os subníveis e suas capacidades máximas de elétrons
export type Sublevel = "s" | "p" | "d" | "f";
export type ElectronConfig = string;

export interface SublevelConfig {
  level: number;
  sublevel: Sublevel;
  electrons: number;
};

// Máximo de elétrons por subnível
export const MAX_ELECTRONS: Record<Sublevel, number> = {
  s: 2,
  p: 6,
  d: 10,
  f: 14
};
