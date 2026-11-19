import { useEffect, useRef, useState } from 'react';
import {
  CHARACTER_ANCESTRIES,
  CHARACTER_CLASSES,
  computeDerivedStats,
  generateCharacter,
  generateCharacterName,
  generateOriginBackstory,
  getCharacterSignature,
  rollCardStats,
  rollSmartAbilityScores,
} from './data/fantasyData';
import type {
  BackstoryRecord,
  FantasyCharacter,
  PortraitRecord,
  SavedDeckCharacter,
} from './types/character';
import { WorkbenchBackgroundGeometry } from './components/AlchemicalOrnaments';
import { WorkbenchHeader } from './components/WorkbenchHeader';
import { CharacterControls } from './components/CharacterControls';
import { CharacterSheet } from './components/CharacterSheet';
import { MyDeckSection } from './components/MyDeckSection';

const DECK_STORAGE_KEY = 'arcanum_forge_my_deck_v1';

export default function App() {
  const [character, setCharacter] = useState<FantasyCharacter>(() => generateCharacter());
  const [deck, setDeck] = useState<SavedDeckCharacter[]>(() => {
    try {
      const raw = localStorage.getItem(DECK_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Store portraits and backstories keyed by character ID so switching or regenerating never mismatches
  const [portraitsById, setPortraitsById] = useState<Record<string, PortraitRecord>>({});
  const [backstoriesById, setBackstoriesById] = useState<Record<string, BackstoryRecord>>({});
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [portraitError, setPortraitError] = useState<string | null>(null);
  const [deckNotice, setDeckNotice] = useState<string | null>(null);
  const portraitRequestIdRef = useRef(0);

  useEffect(() => {
    try {
      localStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(deck));
    } catch {
      // Ignore storage quota errors if large portraits exceed localStorage limits
    }
  }, [deck]);

  const currentSignature = getCharacterSignature(character);
  const rawPortrait = portraitsById[character.id] ?? null;
  const activePortrait =
    rawPortrait && rawPortrait.characterSignature === currentSignature ? rawPortrait : null;
  const rawBackstory = backstoriesById[character.id] ?? null;
  const activeBackstory =
    rawBackstory && rawBackstory.characterSignature === currentSignature ? rawBackstory : null;

  const isInDeck = deck.some(
    (card) => card.id === character.id || card.signature === currentSignature
  );

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleGenerateCharacter = () => {
    setPortraitError(null);
    setDeckNotice(null);
    setCharacter(generateCharacter());
    scrollToSection('character-forge');
  };

  const handleRerollStats = () => {
    setDeckNotice(null);
    const classDef =
      CHARACTER_CLASSES.find((c) => c.name === character.characterClass) ?? CHARACTER_CLASSES[0];
    const ancestryDef =
      CHARACTER_ANCESTRIES.find((a) => a.name === character.ancestry) ?? CHARACTER_ANCESTRIES[0];
    const newScores = rollSmartAbilityScores(classDef, ancestryDef);
    const newCardStats = rollCardStats();
    const derived = computeDerivedStats(newScores, classDef, ancestryDef, character.level);
    setCharacter((prev) => ({
      ...prev,
      cardStats: newCardStats,
      scores: newScores,
      ...derived,
    }));
  };

  const handleNameChange = (name: string) => {
    setPortraitError(null);
    setDeckNotice(null);
    setCharacter((prev) => ({ ...prev, name }));
  };

  const handleRandomizeName = () => {
    setPortraitError(null);
    setDeckNotice(null);
    setCharacter((prev) => {
      const nextName = generateCharacterName(prev.ancestry);
      const nextBackstory = generateOriginBackstory(
        {
          name: nextName,
          characterClass: prev.characterClass,
          ancestry: prev.ancestry,
          weapon: prev.weapon,
          curio: prev.curio,
        },
        null
      ).text;
      return {
        ...prev,
        name: nextName,
        backstory: nextBackstory,
      };
    });
  };

  const handleAncestryChange = (ancestryName: string) => {
    setPortraitError(null);
    setDeckNotice(null);
    const ancestryDef =
      CHARACTER_ANCESTRIES.find((a) => a.name === ancestryName) ?? CHARACTER_ANCESTRIES[0];
    const classDef =
      CHARACTER_CLASSES.find((c) => c.name === character.characterClass) ?? CHARACTER_CLASSES[0];
    const newScores = rollSmartAbilityScores(classDef, ancestryDef);
    const derived = computeDerivedStats(newScores, classDef, ancestryDef, character.level);

    setCharacter((prev) => {
      const nextBackstory = generateOriginBackstory(
        {
          name: prev.name,
          characterClass: classDef.name,
          ancestry: ancestryDef.name,
          weapon: prev.weapon,
          curio: prev.curio,
        },
        null
      ).text;
      return {
        ...prev,
        ancestry: ancestryDef.name,
        scores: newScores,
        ...derived,
        features: [...classDef.features, ...ancestryDef.traits],
        backstory: nextBackstory,
      };
    });
  };

  const handleClassChange = (className: string) => {
    setPortraitError(null);
    setDeckNotice(null);
    const classDef =
      CHARACTER_CLASSES.find((c) => c.name === className) ?? CHARACTER_CLASSES[0];
    const ancestryDef =
      CHARACTER_ANCESTRIES.find((a) => a.name === character.ancestry) ?? CHARACTER_ANCESTRIES[0];
    const newScores = rollSmartAbilityScores(classDef, ancestryDef);
    const derived = computeDerivedStats(newScores, classDef, ancestryDef, character.level);
    const weapon = classDef.weapons[0];
    const curio = classDef.curios[0];

    setCharacter((prev) => {
      const nextBackstory = generateOriginBackstory(
        {
          name: prev.name,
          characterClass: classDef.name,
          ancestry: ancestryDef.name,
          weapon,
          curio,
        },
        null
      ).text;
      return {
        ...prev,
        characterClass: classDef.name,
        scores: newScores,
        ...derived,
        weapon,
        curio,
        features: [...classDef.features, ...ancestryDef.traits],
        backstory: nextBackstory,
      };
    });
  };

  const handleLevelChange = (level: number) => {
    setDeckNotice(null);
    const classDef =
      CHARACTER_CLASSES.find((c) => c.name === character.characterClass) ?? CHARACTER_CLASSES[0];
    const ancestryDef =
      CHARACTER_ANCESTRIES.find((a) => a.name === character.ancestry) ?? CHARACTER_ANCESTRIES[0];
    const derived = computeDerivedStats(character.scores, classDef, ancestryDef, level);
    setCharacter((prev) => ({
      ...prev,
      level,
      ...derived,
    }));
  };

  const handleAlignmentChange = (alignment: string) => {
    setDeckNotice(null);
    setCharacter((prev) => ({ ...prev, alignment }));
  };

  const requestPortrait = async (isRegenerate: boolean) => {
    const requestId = ++portraitRequestIdRef.current;
    const targetCharacter = character;
    const targetSignature = getCharacterSignature(targetCharacter);
    const existingPortrait = portraitsById[targetCharacter.id];
    const nextVariation =
      isRegenerate && existingPortrait && existingPortrait.characterSignature === targetSignature
        ? existingPortrait.variation + 1
        : isRegenerate
          ? (existingPortrait?.variation ?? 0) + 1
          : 0;

    const classDef = CHARACTER_CLASSES.find((c) => c.name === targetCharacter.characterClass);
    const ancestryDef = CHARACTER_ANCESTRIES.find((a) => a.name === targetCharacter.ancestry);

    setIsGeneratingPortrait(true);
    setPortraitError(null);
    setDeckNotice(null);

    try {
      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: targetCharacter.name.trim() || 'Unnamed Adventurer',
          characterClass: targetCharacter.characterClass,
          ancestry: targetCharacter.ancestry,
          title: targetCharacter.title,
          alignment: targetCharacter.alignment,
          weapon: targetCharacter.weapon,
          curio: targetCharacter.curio,
          appearance: targetCharacter.appearance,
          classVisual: classDef?.visualPrompt ?? '',
          ancestryVisual: ancestryDef?.visualPrompt ?? '',
          variation: nextVariation,
        }),
      });

      const data = (await response.json()) as { imageUrl?: string; error?: string; variation?: number };
      if (!response.ok || !data.imageUrl) {
        throw new Error(data.error || 'Failed to generate portrait.');
      }

      setPortraitsById((prev) => ({
        ...prev,
        [targetCharacter.id]: {
          imageUrl: data.imageUrl as string,
          variation: typeof data.variation === 'number' ? data.variation : nextVariation,
          characterSignature: targetSignature,
        },
      }));
    } catch (err) {
      if (portraitRequestIdRef.current === requestId) {
        setPortraitError(err instanceof Error ? err.message : 'Unable to conjure portrait.');
      }
    } finally {
      if (portraitRequestIdRef.current === requestId) {
        setIsGeneratingPortrait(false);
      }
    }
  };

  const handleGenerateBackstory = () => {
    setDeckNotice(null);
    const targetCharacter = character;
    const targetSignature = getCharacterSignature(targetCharacter);
    const existing = backstoriesById[targetCharacter.id];
    const previousMatching =
      existing && existing.characterSignature === targetSignature
        ? existing
        : { text: targetCharacter.backstory, templateIndex: -1 };

    const generated = generateOriginBackstory(targetCharacter, previousMatching);
    setBackstoriesById((prev) => ({
      ...prev,
      [targetCharacter.id]: {
        text: generated.text,
        templateIndex: generated.templateIndex,
        characterSignature: targetSignature,
      },
    }));
    setCharacter((prev) =>
      prev.id === targetCharacter.id ? { ...prev, backstory: generated.text } : prev
    );
  };

  const handleSaveToDeck = () => {
    const sig = getCharacterSignature(character);
    const alreadyExists = deck.some(
      (card) => card.id === character.id || card.signature === sig
    );

    if (alreadyExists) {
      setDeckNotice(
        `${character.name || 'This hero'} (${character.characterClass}) is already in My Deck.`
      );
      return;
    }

    const newCard: SavedDeckCharacter = {
      id: character.id,
      signature: sig,
      name: character.name.trim() || 'Unnamed Adventurer',
      title: character.title,
      ancestry: character.ancestry,
      characterClass: character.characterClass,
      level: character.level,
      alignment: character.alignment,
      cardStats: { ...character.cardStats },
      scores: { ...character.scores },
      armorClass: character.armorClass,
      speed: character.speed,
      weapon: character.weapon,
      curio: character.curio,
      appearance: character.appearance,
      features: [...character.features],
      portraitUrl: activePortrait?.imageUrl ?? null,
      portraitVariation: activePortrait?.variation ?? 0,
      backstory: activeBackstory?.text || character.backstory,
      savedAt: new Date().toISOString(),
    };

    setDeck((prev) => [newCard, ...prev]);
    setDeckNotice(`Saved ${newCard.name} to My Deck.`);
  };

  const handleLoadDeckCharacter = (card: SavedDeckCharacter) => {
    setPortraitError(null);
    setDeckNotice(null);
    const classDef = CHARACTER_CLASSES.find((c) => c.name === card.characterClass) ?? CHARACTER_CLASSES[0];
    const ancestryDef = CHARACTER_ANCESTRIES.find((a) => a.name === card.ancestry) ?? CHARACTER_ANCESTRIES[0];
    const { maxHp } = computeDerivedStats(card.scores, classDef, ancestryDef, card.level);

    setCharacter({
      id: card.id,
      name: card.name,
      title: card.title,
      ancestry: card.ancestry,
      characterClass: card.characterClass,
      level: card.level,
      alignment: card.alignment,
      cardStats: { ...card.cardStats },
      scores: { ...card.scores },
      maxHp,
      armorClass: card.armorClass,
      speed: card.speed,
      weapon: card.weapon,
      curio: card.curio,
      appearance: card.appearance,
      personalityTrait:
        'Carries an aura of hard-won legends preserved inside the alchemist’s deck.',
      backstory: card.backstory,
      features: [...card.features],
    });

    if (card.portraitUrl) {
      setPortraitsById((prev) => ({
        ...prev,
        [card.id]: {
          imageUrl: card.portraitUrl as string,
          variation: card.portraitVariation,
          characterSignature: card.signature,
        },
      }));
    }

    setBackstoriesById((prev) => ({
      ...prev,
      [card.id]: {
        text: card.backstory,
        templateIndex: -1,
        characterSignature: card.signature,
      },
    }));

    scrollToSection('character-forge');
  };

  const handleRemoveFromDeck = (id: string) => {
    setDeck((prev) => prev.filter((card) => card.id !== id));
    if (character.id === id) {
      setDeckNotice(null);
    }
  };

  return (
    <div className="workbench-surface relative min-h-screen text-[#ede3d2]">
      <WorkbenchBackgroundGeometry />

      <WorkbenchHeader
        deckCount={deck.length}
        onScrollToForge={() => scrollToSection('character-forge')}
        onScrollToDeck={() => scrollToSection('my-deck')}
        onGenerateCharacter={handleGenerateCharacter}
      />

      <main className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section
          id="character-forge"
          aria-label="Character Forge"
          className="grid scroll-mt-6 grid-cols-1 items-start gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-4">
            <CharacterControls
              character={character}
              onNameChange={handleNameChange}
              onRandomizeName={handleRandomizeName}
              onAncestryChange={handleAncestryChange}
              onClassChange={handleClassChange}
              onLevelChange={handleLevelChange}
              onAlignmentChange={handleAlignmentChange}
              onGenerateCharacter={handleGenerateCharacter}
              onRerollStats={handleRerollStats}
            />
          </div>

          <div className="lg:col-span-8">
            <CharacterSheet
              character={character}
              portrait={activePortrait}
              backstory={activeBackstory}
              isGeneratingPortrait={isGeneratingPortrait}
              portraitError={portraitError}
              isInDeck={isInDeck}
              deckNotice={deckNotice}
              onGeneratePortrait={() => requestPortrait(false)}
              onRegeneratePortrait={() => requestPortrait(true)}
              onGenerateBackstory={handleGenerateBackstory}
              onSaveToDeck={handleSaveToDeck}
            />
          </div>
        </section>

        <MyDeckSection
          deck={deck}
          activeCharacterId={character.id}
          onLoadCharacter={handleLoadDeckCharacter}
          onRemoveCharacter={handleRemoveFromDeck}
        />
      </main>
    </div>
  );
}
