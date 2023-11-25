export const VOCATION_IDS = {
  fighter: 'fighter',
  strider: 'strider',
  mage: 'mage',
  warrior: 'warrior',
  ranger: 'ranger',
  sorcerer: 'sorcerer',
  assassin: 'assassin',
  magick_archer: 'magick_archer',
  mystic_knight: 'mystic_knight',
} as const;

export type VocationId = (typeof VOCATION_IDS)[keyof typeof VOCATION_IDS];

export type Vocation = { id: VocationId };

export const Vocations: readonly Vocation[] = [
  { id: VOCATION_IDS.fighter },
  { id: VOCATION_IDS.strider },
  { id: VOCATION_IDS.mage },
  { id: VOCATION_IDS.warrior },
  { id: VOCATION_IDS.ranger },
  { id: VOCATION_IDS.sorcerer },
  { id: VOCATION_IDS.assassin },
  { id: VOCATION_IDS.magick_archer },
  { id: VOCATION_IDS.mystic_knight },
] as const;
