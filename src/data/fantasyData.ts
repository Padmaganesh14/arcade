import type {
  AbilityKey,
  AbilityScores,
  CharacterAncestryDef,
  CharacterClassDef,
  FantasyCharacter,
} from '../types/character';

export const ABILITY_KEYS: AbilityKey[] = ['STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'];

export const ABILITY_LABELS: Record<AbilityKey, string> = {
  STR: 'Strength',
  DEX: 'Dexterity',
  CON: 'Constitution',
  INT: 'Intelligence',
  WIS: 'Wisdom',
  CHA: 'Charisma',
};

export const ALIGNMENTS: string[] = [
  'Lawful Good',
  'Neutral Good',
  'Chaotic Good',
  'Lawful Neutral',
  'True Neutral',
  'Chaotic Neutral',
  'Lawful Evil',
  'Chaotic Evil',
];

export const CHARACTER_CLASSES: CharacterClassDef[] = [
  {
    name: 'Alchemist',
    hitDie: 8,
    primaryAbility: 'INT',
    secondaryAbility: 'DEX',
    baseArmor: 13,
    archetype: 'Transmuter of Volatile Elixirs',
    weapons: [
      'Brass-Barreled Flask Launcher',
      'Etched Silver Alembic Dagger',
      'Phosphor-Tipped Repeating Crossbow',
    ],
    curios: [
      'Aether-distilled Violet Philosopher Vial',
      'Clockwork Astrolabe Satchel',
      'Self-igniting Sunfire Reagent Bandolier',
    ],
    features: ['Volatile Brew', 'Arcane Transmutation', 'Tonic of Iron Flesh'],
    visualPrompt:
      'wearing a weathered leather apothecary coat reinforced with tarnished bronze buckles, bandolier of glowing violet and amber glass vials, brass alchemy goggles pushed up on forehead',
  },
  {
    name: 'Pyromancer Mage',
    hitDie: 6,
    primaryAbility: 'INT',
    secondaryAbility: 'CON',
    baseArmor: 11,
    archetype: 'Keeper of the Ember Grimoire',
    weapons: [
      'Charred Obsidian Flame Staff',
      'Sun-Forged Censer Wand',
      'Runic Phoenix-Glass Scepter',
    ],
    curios: [
      'Ever-burning Brimstone Lantern',
      'Ashen Silk Spellbook',
      'Crystallized Salamander Ember',
    ],
    features: ['Emberlance', 'Searing Sigil', 'Flame-Woven Ward'],
    visualPrompt:
      'clad in deep plum and charcoal mage robes trimmed with antique gold embroidery, glowing arcane fire runes hovering near gloved hands, ornate bronze mantle clasp',
  },
  {
    name: 'Shadowblade Rogue',
    hitDie: 8,
    primaryAbility: 'DEX',
    secondaryAbility: 'CHA',
    baseArmor: 14,
    archetype: 'Phantom of the Midnight Guild',
    weapons: [
      'Twin Moonstone Stilettos',
      'Venom-Grooved Crescent Saber',
      'Whisper-String Hand Crossbow',
    ],
    curios: [
      'Smoke-Glass Illusion Prism',
      'Skeleton Keyring of Seven Vaults',
      'Obsidian Crow-Feather Cloak Pin',
    ],
    features: ['Umbral Ambush', 'Silenced Step', 'Quick-Draw Counter'],
    visualPrompt:
      'wearing dark midnight leather armor with bronze studwork, hooded plum-violet cloak draped across one shoulder, cunning agile stance',
  },
  {
    name: 'Oathbound Paladin',
    hitDie: 10,
    primaryAbility: 'STR',
    secondaryAbility: 'CHA',
    baseArmor: 17,
    archetype: 'Bastion of the Gilded Vow',
    weapons: [
      'Sun-Crested Greatsword',
      'Sanctified War Hammer & Kite Shield',
      'Gilded Halberd of the Dawn Watch',
    ],
    curios: [
      'Reliquary Seal of Eternal Flame',
      'Engraved Oath Scroll in Bronze Case',
      'Vial of Starlight Anointing Oil',
    ],
    features: ['Radiant Smite', 'Aegis of the Crown', 'Unbroken Resolve'],
    visualPrompt:
      'armored in burnished antique bronze and dark steel breastplate etched with gold filigree, deep royal purple surcoat, radiant sacred sigil crest',
  },
  {
    name: 'Wildwood Ranger',
    hitDie: 10,
    primaryAbility: 'DEX',
    secondaryAbility: 'WIS',
    baseArmor: 14,
    archetype: 'Stalker of the Elder Briar',
    weapons: [
      'Carved Yew Recurve Longbow',
      'Twin Ranger Hatchets & Briar Bow',
      'Silverleaf Hunting Spear',
    ],
    curios: [
      'Compass Carved from Petrified Staghorn',
      'Herbarium Pouch of Moon-Moss',
      'Owl-Feather Signal Whistle',
    ],
    features: ['Hunter’s Mark', 'Briar-Step Stride', 'Trueflight Volley'],
    visualPrompt:
      'dressed in layered dark forest leather and bronze-clasped hooded mantle, ornate quiver of fletched arrows across back, weathered traveler gear',
  },
  {
    name: 'Hexblade Warlock',
    hitDie: 8,
    primaryAbility: 'CHA',
    secondaryAbility: 'CON',
    baseArmor: 13,
    archetype: 'Scion of the Astral Pact',
    weapons: [
      'Runed Amethyst Pact Scimitar',
      'Wrought-Iron Eldritch Glaive',
      'Soul-Mirror Rapier',
    ],
    curios: [
      'Floating Brass Pact Astrolabe',
      'Sealed Pact Contract in Violet Wax',
      'Hollow Raven-Skull Talisman',
    ],
    features: ['Eldritch Pact Blade', 'Hex of Unmaking', 'Veil of Twilight'],
    visualPrompt:
      'wearing aristocratic dark obsidian coat with mystical violet arcane trim and bronze chain clasps, faint glowing purple pact sigil floating above palm',
  },
  {
    name: 'Stormcaller Druid',
    hitDie: 8,
    primaryAbility: 'WIS',
    secondaryAbility: 'CON',
    baseArmor: 13,
    archetype: 'Voice of Tempest & Root',
    weapons: [
      'Gnarled Thunder-Oak Quarterstaff',
      'Jade & Bronze Crescent Sickle',
      'Amber-Capped Gale Totem',
    ],
    curios: [
      'Bottled Lightning Cloud Orb',
      'Woven Stag-Antler Circlet',
      'Runestone Weather Dial',
    ],
    features: ['Tempest Surge', 'Wild Shape Aspect', 'Verdant Renewal'],
    visualPrompt:
      'clad in weathered moss-dark hide armor with antique bronze totems, feathers, and crackling violet-blue storm sparks woven through wooden staff',
  },
  {
    name: 'Ironclad Warrior',
    hitDie: 10,
    primaryAbility: 'STR',
    secondaryAbility: 'CON',
    baseArmor: 16,
    archetype: 'Veteran of the Crimson Vanguard',
    weapons: [
      'Notched Dwarven Battleaxe',
      'Fluted Bastard Sword & Buckler',
      'Heavy Chain-Bound War Pick',
    ],
    curios: [
      'Battered Brass Campaign Horn',
      'Whetstone Carved from Meteor Iron',
      'Broken Banner Ribbon of the Third Legion',
    ],
    features: ['Second Wind', 'Shieldbreaker Cleave', 'Battle-Hardened Stance'],
    visualPrompt:
      'wearing battle-scarred heavy bronze and blackened steel pauldrons, thick leather straps, stoic scarred veteran warrior silhouette',
  },
  {
    name: 'Celestial Cleric',
    hitDie: 8,
    primaryAbility: 'WIS',
    secondaryAbility: 'CHA',
    baseArmor: 15,
    archetype: 'Herald of the Astral Choir',
    weapons: [
      'Golden Sunburst Ceremonial Mace',
      'Astral Brass Thurible & Staff',
      'Silvered Starlight Flail',
    ],
    curios: [
      'Engraved Sundial Medallion',
      'Velvet Prayer Codex with Gold Clasps',
      'Luminescent Incense Censer',
    ],
    features: ['Beacon of Grace', 'Turn the Profane', 'Astral Restoration'],
    visualPrompt:
      'dressed in ceremonial midnight-purple and ivory vestments over gilded scale mail, ornate antique gold halo-collar and glowing starlight medallion',
  },
  {
    name: 'Arcane Scholar',
    hitDie: 6,
    primaryAbility: 'INT',
    secondaryAbility: 'WIS',
    baseArmor: 12,
    archetype: 'Archivist of the Sunken Spire',
    weapons: [
      'Silver-Inlaid Chronometer Staff',
      'Levitation Quill & Spell-Rod',
      'Brass-Rimmed Crystal Orb Staff',
    ],
    curios: [
      'Self-Translating Brass Cipher Cube',
      'Monocle of True Sight',
      'Miniature Orrery of Seven Moons',
    ],
    features: ['Arcane Lorekeeper', 'Chrono-Ward', 'Glyph of Binding'],
    visualPrompt:
      'wearing scholarly deep indigo velvet robes with antique gold trim, brass spectacles, carrying an ancient leather-bound tome with purple arcane glow',
  },
];

export const CHARACTER_ANCESTRIES: CharacterAncestryDef[] = [
  {
    name: 'Human',
    speed: 30,
    bonusAbility: 'CHA',
    traits: ['Adaptable Grit', 'Scholarly Versatility'],
    visualPrompt: 'human adventurer with expressive weathered features',
    firstNames: ['Alaric', 'Seraphina', 'Corvus', 'Isolde', 'Gideon', 'Valeria', 'Theron', 'Mirella'],
    surnames: ['Vane', 'Blackwood', 'Ashford', 'Kestrel', 'thorne', 'Holloway', 'Sterling', 'Duskwell'],
  },
  {
    name: 'High Elf',
    speed: 35,
    bonusAbility: 'INT',
    traits: ['Fey Ancestry', 'Astral Keen-Sight'],
    visualPrompt: 'graceful high elf with long pointed ears, sharp noble cheekbones, luminous eyes',
    firstNames: ['Aelar', 'Sylvaria', 'Thalion', 'Lirael', 'Caelum', 'Elowen', 'Vaelis', 'Nymira'],
    surnames: ['Starweaver', 'Mooncrest', 'Gildleaf', 'Dawnspire', 'Silvermist', 'Aetherwind'],
  },
  {
    name: 'Dwarf',
    speed: 25,
    bonusAbility: 'CON',
    traits: ['Stonecunning', 'Forge-Born Resilience'],
    visualPrompt: 'stout broad-shouldered dwarf with intricately braided hair or beard clasped with bronze rings',
    firstNames: ['Thorin', 'Brynja', 'Dain', 'Helga', 'Kragor', 'Runa', 'Bram', 'Astrid'],
    surnames: ['Ironanvil', 'Coppervein', 'Deepdelver', 'Flinthearth', 'Goldhammer', 'Stonehelm'],
  },
  {
    name: 'Tiefling',
    speed: 30,
    bonusAbility: 'CHA',
    traits: ['Infernal Legacy', 'Ember Resistance'],
    visualPrompt: 'tiefling with swept curved horns adorned with gold rings, glowing amber or violet eyes, subtly tinted crimson-plum skin',
    firstNames: ['Mordai', 'Kallista', 'Damakos', 'Orianna', 'Akmenos', 'Vespera', 'Zeth', 'Nemeia'],
    surnames: ['Cinderborne', 'Nightbloom', 'Oathspire', 'Duskwhisper', 'Pyreheart', 'Velvetthorn'],
  },
  {
    name: 'Dragonborn',
    speed: 30,
    bonusAbility: 'STR',
    traits: ['Draconic Breath', 'Scaled Bastion'],
    visualPrompt: 'noble dragonborn warrior with finely detailed bronze and obsidian scales, crested draconic horns, fierce golden eyes',
    firstNames: ['Rhogar', 'Akra', 'Balasar', 'Mishann', 'Torinn', 'Sora', 'Kriv', 'Nala'],
    surnames: ['Flamecrest', 'Verthisathurgiesh', 'Scalewarden', 'Stormclaw', 'Gildfang', 'Ashwing'],
  },
  {
    name: 'Half-Orc',
    speed: 30,
    bonusAbility: 'STR',
    traits: ['Relentless Endurance', 'Savage Momentum'],
    visualPrompt: 'commanding half-orc with prominent tusks, olive-slate skin, scarred brow, braided warrior hair',
    firstNames: ['Grommash', 'Shautha', 'Dench', 'Baggi', 'Kaelok', 'Vola', 'Thokk', 'Yevelda'],
    surnames: ['Ironjaw', 'Cragbreaker', 'Skullcleaver', 'Ashfist', 'Stoneblood', 'Galehide'],
  },
  {
    name: 'Gnome',
    speed: 25,
    bonusAbility: 'INT',
    traits: ['Tinker’s Insight', 'Arcane Cunning'],
    visualPrompt: 'spirited gnome inventor with bright curious eyes, wild expressive hair, brass magnifying monocle',
    firstNames: ['Bimpnottin', 'Zook', 'Nissa', 'Fonkin', 'Ellywick', 'Wrenn', 'Alston', 'Tana'],
    surnames: ['Sparkcog', 'Fizzlewick', 'Beren', 'Scheppen', 'Clockspring', 'Glimmerflask'],
  },
  {
    name: 'Moon Elf',
    speed: 35,
    bonusAbility: 'DEX',
    traits: ['Shadowstep Grace', 'Trance of the Crescent'],
    visualPrompt: 'moon elf with pale silver-violet undertones, pointed ears, silver-white hair, luminescent twilight eyes',
    firstNames: ['Laucian', 'Shava', 'Erevan', 'Keyleth', 'Arannis', 'Ielenia', 'Soveliss', 'Quelenna'],
    surnames: ['Nightbreeze', 'Amastacia', 'Siannodel', 'Moonwhisper', 'Shadowglen', 'Starfall'],
  },
];

const TITLES = [
  'of the Gilded Crucible',
  'the Ember-Bound',
  'Keeper of the Seventh Seal',
  'the Starlight Wanderer',
  'Warden of the Violet Spire',
  'the Iron-Willed',
  'Breaker of Chains',
  'the Midnight Chronicler',
  'Seeker of the Sunken Vault',
  'the Brass-Hearted',
];

const APPEARANCE_DETAILS = [
  'silver-streaked hair, sharp observant eyes, and a faint arcane scar along one cheek',
  'amber eyes that catch candlelight, braided hair threaded with tiny bronze rings, and ink-stained fingers',
  'a composed regal bearing, etched brass earring, and a weathered traveler’s cloak pinned with a serpent brooch',
  'fiery copper-tinted hair, bright determined grin, and glowing rune tattoos peeking above the collar',
  'calm shadowed gaze, crescent-shaped brow scar, and ornate layered leather gloves',
  'piercing violet-gray eyes, wind-tousled hair, and an heirloom bronze compass hanging from the belt',
];

const PERSONALITY_TRAITS = [
  'Always catalogues strange reagents, monster feathers, and forgotten rumors in a pocket ledger.',
  'Speaks softly in taverns, yet commands the room the instant steel or spellcraft is drawn.',
  'Trusts well-tempered brass and tested allies far more than royal promises.',
  'Finds dark humor in impossible odds and refuses to leave a companion behind.',
  'Never enters an ancient ruin without first sketching its protective wards.',
  'Treats every duel like an intricate alchemical experiment waiting for a catalyst.',
];

const BACKSTORY_HOOKS = [
  'Survived the collapse of the Obsidian Conservatory, escaping with a single unlabelled phial that hums at midnight.',
  'Once served as apprentice to a disgraced royal artificer before vanishing into the borderlands.',
  'Swore an oath beneath a shattered eclipse to recover three stolen relics from the sunken archives.',
  'Discovered an unmapped ley-line beneath their homeland village and followed its pulse across the continent.',
  'Broke free from a guild debt by outsmarting a lich’s tax collector in a game of bone dice.',
  'Carries half of a split bronze astrolabe whose twin belongs to a rival presumed lost at sea.',
];

function pick<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function capitalize(word: string): string {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function roll4d6DropLowest(): number {
  const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
  rolls.sort((a, b) => a - b);
  return rolls[1] + rolls[2] + rolls[3];
}

export function getAbilityModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function rollSmartAbilityScores(
  classDef: CharacterClassDef,
  ancestryDef: CharacterAncestryDef
): AbilityScores {
  const rawRolls = Array.from({ length: 6 }, () => roll4d6DropLowest()).sort((a, b) => b - a);
  const scores: AbilityScores = {
    STR: 10,
    DEX: 10,
    CON: 10,
    INT: 10,
    WIS: 10,
    CHA: 10,
  };

  const remainingKeys = ABILITY_KEYS.filter(
    (k) => k !== classDef.primaryAbility && k !== classDef.secondaryAbility
  );
  // Shuffle remaining keys so non-primary stats vary naturally
  for (let i = remainingKeys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remainingKeys[i], remainingKeys[j]] = [remainingKeys[j], remainingKeys[i]];
  }

  const orderedKeys = [classDef.primaryAbility, classDef.secondaryAbility, ...remainingKeys];
  orderedKeys.forEach((key, idx) => {
    scores[key] = rawRolls[idx];
  });

  scores[ancestryDef.bonusAbility] = Math.min(20, scores[ancestryDef.bonusAbility] + 2);
  return scores;
}

export function computeDerivedStats(
  scores: AbilityScores,
  classDef: CharacterClassDef,
  ancestryDef: CharacterAncestryDef,
  level: number
): { maxHp: number; armorClass: number; speed: number } {
  const conMod = getAbilityModifier(scores.CON);
  const dexMod = getAbilityModifier(scores.DEX);

  const firstLevelHp = Math.max(4, classDef.hitDie + conMod);
  const avgPerLevel = Math.floor(classDef.hitDie / 2) + 1 + conMod;
  const maxHp = Math.max(level * 4, firstLevelHp + Math.max(0, level - 1) * Math.max(2, avgPerLevel));

  const armorClass =
    classDef.baseArmor >= 16
      ? classDef.baseArmor + Math.min(1, Math.max(0, dexMod))
      : classDef.baseArmor + Math.max(0, Math.min(4, dexMod));

  return {
    maxHp,
    armorClass,
    speed: ancestryDef.speed,
  };
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function rollCardStats(): { health: number; mana: number; strength: number } {
  return {
    health: randomInt(50, 150),
    mana: randomInt(30, 100),
    strength: randomInt(10, 50),
  };
}

export function generateCharacterName(ancestryName?: string): string {
  const ancestryDef =
    CHARACTER_ANCESTRIES.find((a) => a.name === ancestryName) ?? pick(CHARACTER_ANCESTRIES);
  const first = pick(ancestryDef.firstNames);
  const last = capitalize(pick(ancestryDef.surnames));
  return `${first} ${last}`;
}

export function generateCharacter(options?: {
  ancestryName?: string;
  className?: string;
  level?: number;
  alignment?: string;
  customName?: string;
}): FantasyCharacter {
  const ancestryDef =
    CHARACTER_ANCESTRIES.find((a) => a.name === options?.ancestryName) ?? pick(CHARACTER_ANCESTRIES);
  const classDef =
    CHARACTER_CLASSES.find((c) => c.name === options?.className) ?? pick(CHARACTER_CLASSES);
  const level = options?.level ?? Math.floor(Math.random() * 5) + 3;
  const alignment = options?.alignment ?? pick(ALIGNMENTS);

  const name =
    options?.customName && options.customName.trim().length > 0
      ? options.customName.trim()
      : generateCharacterName(ancestryDef.name);

  const scores = rollSmartAbilityScores(classDef, ancestryDef);
  const cardStats = rollCardStats();
  const { maxHp, armorClass, speed } = computeDerivedStats(scores, classDef, ancestryDef, level);
  const weapon = pick(classDef.weapons);
  const curio = pick(classDef.curios);
  const initialBackstory = generateOriginBackstory(
    {
      name,
      characterClass: classDef.name,
      ancestry: ancestryDef.name,
      weapon,
      curio,
    },
    null
  ).text;

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    name,
    title: pick(TITLES),
    ancestry: ancestryDef.name,
    characterClass: classDef.name,
    level,
    alignment,
    cardStats,
    scores,
    maxHp,
    armorClass,
    speed,
    weapon,
    curio,
    appearance: pick(APPEARANCE_DETAILS),
    personalityTrait: pick(PERSONALITY_TRAITS),
    backstory: initialBackstory,
    features: [...classDef.features, ...ancestryDef.traits],
  };
}

export function getCharacterSignature(character: Pick<FantasyCharacter, 'name' | 'characterClass' | 'ancestry'>): string {
  return `${character.name.trim().toLowerCase()}::${character.characterClass}::${character.ancestry}`;
}

const CLASS_ORIGIN_ARCS: Record<string, string[]> = {
  Alchemist: [
    'spent seven candlelit years sweeping soot in a royal apothecary before transmuting lead dust into liquid starlight',
    'survived an explosion in the Obsidian Guildhall that left violet sparks permanently dancing in their alembic glass',
    'learned forbidden reagent ratios from a traveling Plague Doctor after curing a silver-fever outbreak in a border town',
    'uncovered an encrypted brass formula tablet beneath a ruined monastery and mastered its volatile elixirs alone',
    'traded half an inheritance for a shattered philosopher’s crucible and rebuilt it using meteoric bronze',
    'forsook a quiet herbalist’s stall when a midnight distillation revealed the true names of dormant elements',
  ],
  'Pyromancer Mage': [
    'awakened dormant ember-magic as a child when frostbite threatened their mountain caravan and melted the ice with a single breath',
    'stole a charred tome from the Caldera Academy after its elders refused to teach the forbidden Third Flame',
    'forged a pact with a sleeping salamander spirit beneath an ancient volcanic foundry',
    'mastered living fire while tending the eternal braziers of a sunken citadel',
    'etched glowing phoenix sigils across their own spellbook after surviving an arcane duel in the Ashlands',
    'channeled wildfire through obsidian glass to save an entire highland village from winter-born wraiths',
  ],
  'Shadowblade Rogue': [
    'grew up running rooftops above the Lantern Quarter, lifting gilded signet rings from corrupt magistrates before vanishing into fog',
    'escaped a guild betrayal by slipping through seven locked vaults with only a whisper-blade and a decoy prism',
    'learned the silent art of dusk-stepping from an exiled royal spymaster who vanished without a trace',
    'carved a notorious reputation along the Midnight Docks by returning stolen relics to the impoverished',
    'survived a rigged heist in the Clockwork Catacombs and kept the vault’s master cipher for themselves',
    'left the Thieves’ Conclave behind after discovering an assassin’s ledger bearing their own name',
  ],
  'Oathbound Paladin': [
    'knelt for three sleepless nights beside a shattered altar until golden dawn-fire answered their vow of protection',
    'inherited a dented shield from a fallen mentor and swore to uphold justice across every lawless frontier',
    'broke a siege at Ironwatch Gate by holding the bridge alone until morning reinforcements arrived',
    'renounced a noble title to join the Gilded Watch after witnessing a lord’s betrayal of his own people',
    'received a radiant vision inside a ruined cathedral, binding their blade to the defense of the innocent',
    'recovered a lost banner from undead marshals and consecrated it anew with sacred starlight oil',
  ],
  'Wildwood Ranger': [
    'tracked white-antlered stags through mist-choked elderwoods long before ever setting foot inside a walled city',
    'guarded the Silver Briar border alone for five winters, learning the silent language of hawks and thorn-paths',
    'survived an ambush by shadow-beasts and turned their predators’ fangs into fletching tools',
    'mapped three uncharted mountain passes for wandering cartographers before taking up the bow full-time',
    'saved an injured dryad from iron-mongers and earned a living yew branch that never misses in twilight',
    'followed a migrating star-owl across the frontier after their homeward trail vanished beneath enchanted snow',
  ],
  'Hexblade Warlock': [
    'sealed an irreversible bargain in a mirror-lined cellar when a voice from the Astral Veil offered power to overturn a curse',
    'pulled a whispering amethyst blade from a sunken bell-tower and heard ancient truths echo in their mind',
    'outsmarted a cunning archfey at midnight dice, winning a fraction of twilight sorcery as the wager',
    'deciphered a violet-waxed contract hidden inside an heirloom astrolabe and claimed its dormant patron’s gift',
    'walked the boundary between waking and dream during a solar eclipse, returning with arcane steel bound to their shadow',
    'accepted an enigmatic patron’s mark to rescue a lost sibling from the Shattered Spires',
  ],
  'Stormcaller Druid': [
    'listened to thunderheads rolling over coastal cliffs until lightning answered their raised oak staff',
    'was raised among stone circles by elder circle-keepers who taught how gale and root answer one another',
    'calmed a month-long tempest with a crescent bronze sickle and earned the wildlands’ enduring trust',
    'wandered into a petrified grove during a solstice storm and emerged able to bottle living cloud-sparks',
    'defended sacred standing stones from strip-miners by summoning sudden squalls out of clear skies',
    'gathered storm-moss and fallen meteor iron to bind tempest magic into ancient druidic wards',
  ],
  'Ironclad Warrior': [
    'stood in the front shield-wall of thirty brutal border skirmishes and walked away from every broken pike line',
    'apprenticed under a blind dwarven smith before testing their own tempered blade against northern marauders',
    'earned a scarred bronze pauldron after single-handedly holding a mountain pass against a warband',
    'fought their way out of an arena pit using nothing more than a notched axe and relentless iron grit',
    'served as banner-guard for a fallen company and now carries their memory into every clash of steel',
    'shattered a warlord’s siege ram at dawn, turning a hopeless rout into a legendary countercharge',
  ],
  'Celestial Cleric': [
    'tended lantern-lit shrines through a bitter winter plague, discovering that faint starlight answered their prayers to heal',
    'received an engraved sundial medallion from an astral herald while keeping vigil atop a mountain observatory',
    'walked unarmed into a cursed crypt to guide trapped souls back toward the dawn',
    'copied forgotten hymns from gilded frescoes until sacred radiance kindled in their ceremonial censer',
    'left a cloistered abbey to carry mercy and astral fire to towns abandoned by crown and guild',
    'heard the distant chime of the Astral Choir during an eclipse and vowed to mend every broken sanctuary',
  ],
  'Arcane Scholar': [
    'catalogued four thousand dusty scrolls in the Sunken Spire before realizing one hidden marginalia note unlocked living magic',
    'corrected a centuries-old celestial chart, accidentally opening a pocket archive filled with floating brass glyphs',
    'debated archmages twice their age and proved that forgotten chronomancy runes still pulsed beneath the city',
    'salvaged a waterlogged grimoire from a wrecked scholar-barge and spent years decoding its ciphered theorems',
    'crafted a monocle of true sight to read invisible ink left by the realm’s vanished founders',
    'abandoned dusty lecture halls after discovering a discrepancy in history that could only be solved in the field',
  ],
};

const ORIGIN_SECOND_SENTENCES = [
  (name: string, curio: string, weapon: string) =>
    `Now ${name} roams the uncharted realms carrying a ${weapon.toLowerCase()} and a ${curio.toLowerCase()}, seeking answers no guild dares print.`,
  (name: string, curio: string, weapon: string) =>
    `Armed with a ${weapon.toLowerCase()} and guided by a ${curio.toLowerCase()}, ${name} follows faint arcane rumors toward the next great crucible.`,
  (name: string, curio: string, weapon: string) =>
    `Today ${name} trusts only tested allies, a ${weapon.toLowerCase()}, and the quiet hum of a ${curio.toLowerCase()} tucked safely at their side.`,
  (name: string, curio: string, weapon: string) =>
    `Every road since has led ${name} deeper into forgotten vaults, with a ${weapon.toLowerCase()} at the ready and a ${curio.toLowerCase()} lighting the dark.`,
  (name: string, curio: string, weapon: string) =>
    `Bearing a ${weapon.toLowerCase()} and a ${curio.toLowerCase()}, ${name} now hunts down the final relic needed to settle an old debt.`,
];

export function generateOriginBackstory(
  character: Pick<FantasyCharacter, 'name' | 'characterClass' | 'ancestry' | 'weapon' | 'curio'>,
  previous?: { text: string; templateIndex: number } | null
): { text: string; templateIndex: number } {
  const safeName = character.name.trim() || 'This wanderer';
  const arcs = CLASS_ORIGIN_ARCS[character.characterClass] ?? CLASS_ORIGIN_ARCS.Alchemist;

  const totalCombinations = arcs.length * ORIGIN_SECOND_SENTENCES.length;
  const candidateIndices = Array.from({ length: totalCombinations }, (_, idx) => idx).filter(
    (idx) => idx !== previous?.templateIndex
  );

  // Pick a guaranteed different combination when regenerating
  const chosenIndex =
    candidateIndices[Math.floor(Math.random() * candidateIndices.length)] ?? 0;

  const arcIdx = chosenIndex % arcs.length;
  const secondIdx = Math.floor(chosenIndex / arcs.length) % ORIGIN_SECOND_SENTENCES.length;

  const firstSentence = `Born of ${character.ancestry} lineage, ${safeName} became a ${character.characterClass} after they ${arcs[arcIdx]}.`;
  const secondSentence = ORIGIN_SECOND_SENTENCES[secondIdx](
    safeName,
    character.curio,
    character.weapon
  );

  const text = `${firstSentence} ${secondSentence}`;
  return { text, templateIndex: chosenIndex };
}

