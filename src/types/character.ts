export type AbilityKey = 'STR' | 'DEX' | 'CON' | 'INT' | 'WIS' | 'CHA';

export type AbilityScores = Record<AbilityKey, number>;

export interface CardStats {
  health: number;
  mana: number;
  strength: number;
}

export interface CharacterClassDef {
  name: string;
  hitDie: number;
  primaryAbility: AbilityKey;
  secondaryAbility: AbilityKey;
  baseArmor: number;
  archetype: string;
  weapons: string[];
  curios: string[];
  features: string[];
  visualPrompt: string;
}

export interface CharacterAncestryDef {
  name: string;
  speed: number;
  bonusAbility: AbilityKey;
  traits: string[];
  visualPrompt: string;
  firstNames: string[];
  surnames: string[];
}

export interface FantasyCharacter {
  id: string;
  name: string;
  title: string;
  ancestry: string;
  characterClass: string;
  level: number;
  alignment: string;
  cardStats: CardStats;
  scores: AbilityScores;
  maxHp: number;
  armorClass: number;
  speed: number;
  weapon: string;
  curio: string;
  appearance: string;
  personalityTrait: string;
  backstory: string;
  features: string[];
}

export interface PortraitRecord {
  imageUrl: string;
  variation: number;
  characterSignature: string;
}

export interface BackstoryRecord {
  text: string;
  templateIndex: number;
  characterSignature: string;
}

export interface SavedDeckCharacter {
  id: string;
  signature: string;
  name: string;
  title: string;
  ancestry: string;
  characterClass: string;
  level: number;
  alignment: string;
  cardStats: CardStats;
  scores: AbilityScores;
  armorClass: number;
  speed: number;
  weapon: string;
  curio: string;
  appearance: string;
  features: string[];
  portraitUrl: string | null;
  portraitVariation: number;
  backstory: string;
  savedAt: string;
}
