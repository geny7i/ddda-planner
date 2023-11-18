export enum VocationId {
  fighter = 'fighter',
  strider = 'strider',
  mage = 'mage',
  warrior = 'warrior',
  ranger = 'ranger',
  sorcerer = 'sorcerer',
  assassin = 'assassin',
  magick_archer = 'magick_archer',
  mystic_knight = 'mystic_knight',
}

export type Vocation = { id: VocationId };

export const Vocations: readonly Vocation[] = [
  { id: VocationId.fighter },
  { id: VocationId.strider },
  { id: VocationId.mage },
  { id: VocationId.warrior },
  { id: VocationId.ranger },
  { id: VocationId.sorcerer },
  { id: VocationId.assassin },
  { id: VocationId.magick_archer },
  { id: VocationId.mystic_knight },
] as const;
