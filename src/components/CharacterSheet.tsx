import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Feather,
  Layers,
  RefreshCw,
  Shield,
  Sparkles,
  Swords,
  UserCheck,
} from 'lucide-react';
import {
  ABILITY_KEYS,
  ABILITY_LABELS,
  formatModifier,
  getAbilityModifier,
  getCharacterSignature,
} from '../data/fantasyData';
import type { BackstoryRecord, FantasyCharacter, PortraitRecord } from '../types/character';
import { AlchemicalDivider, OrnateCornerFiligree, ScryingMirrorSigil } from './AlchemicalOrnaments';
import { StatProgressBars } from './StatProgressBars';

interface CharacterSheetProps {
  character: FantasyCharacter;
  portrait: PortraitRecord | null;
  backstory: BackstoryRecord | null;
  isGeneratingPortrait: boolean;
  portraitError: string | null;
  isInDeck: boolean;
  deckNotice: string | null;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onSaveToDeck: () => void;
}

export function CharacterSheet({
  character,
  portrait,
  backstory,
  isGeneratingPortrait,
  portraitError,
  isInDeck,
  deckNotice,
  onGeneratePortrait,
  onRegeneratePortrait,
  onGenerateBackstory,
  onSaveToDeck,
}: CharacterSheetProps) {
  const currentSignature = getCharacterSignature(character);
  const matchingPortrait =
    portrait && portrait.characterSignature === currentSignature ? portrait : null;
  const matchingBackstory =
    backstory && backstory.characterSignature === currentSignature ? backstory : null;

  const displayedBackstory = matchingBackstory?.text || character.backstory;
  const initiative = formatModifier(getAbilityModifier(character.scores.DEX));

  const handleDownloadPortrait = () => {
    if (!matchingPortrait) return;
    const link = document.createElement('a');
    const safeName = character.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    link.href = matchingPortrait.imageUrl;
    link.download = `${safeName || 'character'}-portrait.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <article
      aria-label="Fantasy Player Card"
      data-testid="player-card"
      className="relative rounded-xl border-2 border-[#c99b49]/85 bg-[#0e0a15] p-2 shadow-[0_32px_80px_rgba(0,0,0,0.92),0_0_50px_rgba(124,58,237,0.16)]"
    >
      {/* Inner Double-Beveled Fantasy Player Card Surface */}
      <div className="alchemist-folio relative rounded-lg border border-[#8a6838]/75 p-6 sm:p-8 lg:p-9">
        <OrnateCornerFiligree position="top-left" />
        <OrnateCornerFiligree position="top-right" />
        <OrnateCornerFiligree position="bottom-left" />
        <OrnateCornerFiligree position="bottom-right" />

        {/* CARD HEADER & CHARACTER DETAILS */}
        <header className="border-b border-[#7c5d32]/45 pb-6 text-center sm:text-left">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1
                data-testid="character-name"
                className="font-hero text-3xl font-bold tracking-wide text-[#f6d992] drop-shadow-[0_2px_10px_rgba(212,166,82,0.22)] sm:text-4xl"
                style={{ textWrap: 'balance' }}
              >
                {character.name || 'Unnamed Adventurer'}
              </h1>
              <p className="mt-1 font-serif text-base italic text-[#ceaef8]">
                {character.title}
              </p>
            </div>

            <div className="shrink-0 text-center sm:text-right">
              <span
                data-testid="character-class"
                className="font-display text-base font-bold tracking-wider text-[#f3d692]"
              >
                {character.characterClass}
              </span>
              <p className="mt-0.5 text-xs text-[#b9ab97]">
                <span className="font-mono tabular-nums text-[#e6c478]">
                  Lvl {character.level}
                </span>
                <span aria-hidden="true" className="mx-1.5 text-[#7c5d32]">·</span>
                <span>{character.ancestry}</span>
                <span aria-hidden="true" className="mx-1.5 text-[#7c5d32]">·</span>
                <span>{character.alignment}</span>
              </p>
            </div>
          </div>
        </header>

        {/* CARD VITALS: HEALTH (50-150), MANA (30-100), STRENGTH (10-50) PROGRESS BARS */}
        <section aria-label="Character Card Stats" className="mt-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h2 className="font-display text-sm font-bold tracking-wider text-[#d9b872]">
              Card Attributes
            </h2>
            <div className="flex items-center gap-3 font-mono text-xs tabular-nums text-[#b9ab97]">
              <span className="inline-flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-[#c99b49]" aria-hidden="true" />
                AC {character.armorClass}
              </span>
              <span aria-hidden="true" className="text-[#7c5d32]">·</span>
              <span>Init {initiative}</span>
              <span aria-hidden="true" className="text-[#7c5d32]">·</span>
              <span>{character.speed} ft</span>
            </div>
          </div>

          <StatProgressBars stats={character.cardStats} />
        </section>

        {/* SIX RPG ABILITY SCORE MEDALLIONS & LOADOUT */}
        <section aria-label="Ability Scores and Equipment" className="mt-6">
          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {ABILITY_KEYS.map((key) => {
              const score = character.scores[key];
              const mod = formatModifier(getAbilityModifier(score));
              return (
                <div
                  key={key}
                  className="stat-medallion flex flex-col items-center rounded-md px-2 py-2.5 text-center"
                >
                  <span className="font-display text-[11px] font-bold tracking-widest text-[#b99b6b]">
                    {key}
                  </span>
                  <span className="mt-0.5 font-mono text-xl font-semibold tabular-nums text-[#f5dba0]">
                    {mod}
                  </span>
                  <span
                    className="font-mono text-[11px] tabular-nums text-[#9e9080]"
                    title={ABILITY_LABELS[key]}
                  >
                    {score}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 border-t border-[#7c5d32]/35 pt-5 text-sm sm:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-1.5 font-display text-xs font-bold tracking-wider text-[#d9b872]">
                <Swords className="h-3.5 w-3.5 text-[#c99b49]" aria-hidden="true" />
                Signature Armament & Curio
              </h3>
              <p className="mt-1.5 text-[#ede3d2]">
                {character.weapon} <span className="text-[#7c5d32]">·</span>{' '}
                <span className="text-[#dec8f8]">{character.curio}</span>
              </p>
            </div>
            <div>
              <h3 className="font-display text-xs font-bold tracking-wider text-[#d9b872]">
                Traits & Appearance
              </h3>
              <p className="mt-1.5 text-[#d7cab6]">
                {character.features.slice(0, 3).join(' · ')}
              </p>
            </div>
          </div>
        </section>

        {/* ORNATE DIVIDER BETWEEN CHARACTER DETAILS AND PORTRAIT */}
        <AlchemicalDivider label="Scrying Mirror" />

        {/* CHARACTER PORTRAIT SECTION (BELOW CHARACTER DETAILS) */}
        <section aria-label="Character Portrait" className="relative">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg font-bold tracking-wide text-[#f0cf86]">
                Character Portrait
              </h2>
              <p className="mt-1 text-sm text-[#b9ab97]">
                Conjure a stylized fantasy portrait attuned to {character.name || 'this adventurer'} ({character.characterClass}).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={onGeneratePortrait}
                disabled={isGeneratingPortrait}
                className={`${
                  matchingPortrait ? 'rpg-btn-bronze' : 'rpg-btn-gold'
                } inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5 font-display text-xs font-bold tracking-wider whitespace-nowrap shrink-0 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]`}
              >
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Generate Portrait
              </button>

              <button
                type="button"
                onClick={onRegeneratePortrait}
                disabled={isGeneratingPortrait}
                className="rpg-btn-arcane inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5 font-display text-xs font-bold tracking-wider whitespace-nowrap shrink-0 disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4a1f5]"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isGeneratingPortrait ? 'animate-spin' : ''}`}
                  aria-hidden="true"
                />
                Regenerate Portrait
              </button>
            </div>
          </div>

          {portraitError ? (
            <div
              role="alert"
              className="mt-5 flex items-start gap-3 rounded-md border border-[#d97757]/55 bg-[#2a1418]/90 px-4 py-3 text-sm text-[#fcd5ce]"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-[#f59e0b]" aria-hidden="true" />
              <div>
                <p className="font-semibold text-[#fde68a]">Conjuration Interrupted</p>
                <p className="mt-0.5 text-[#f5d0c5]">{portraitError}</p>
              </div>
            </div>
          ) : null}

          <div className="mt-6 flex flex-col items-center">
            <div className="relative w-full max-w-md rounded-lg border-2 border-[#b48842]/85 bg-gradient-to-b from-[#181122] to-[#0b0812] p-3.5 shadow-[0_24px_60px_rgba(0,0,0,0.9),0_0_50px_rgba(124,58,237,0.18)]">
              <div className="relative aspect-square w-full overflow-hidden rounded border border-[#7d5e31]/75 bg-[#120c1a]">
                {isGeneratingPortrait ? (
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-4 p-6 text-center">
                    <ScryingMirrorSigil />
                    <div className="relative flex h-20 w-20 items-center justify-center">
                      <div className="absolute inset-0 animate-spin rounded-full border-2 border-dashed border-[#d4a652]/80" />
                      <div className="h-12 w-12 animate-pulse rounded-full border border-[#a855f7]/85 bg-[#4c1d95]/35" />
                    </div>
                    <div className="relative z-10">
                      <p className="font-display text-sm font-bold tracking-wider text-[#f3d692]">
                        Transmuting Likeness...
                      </p>
                      <p className="mt-1 text-xs text-[#b7a896]">
                        Illustrating {character.name} · {character.ancestry} {character.characterClass}
                      </p>
                    </div>
                  </div>
                ) : matchingPortrait ? (
                  <img
                    src={matchingPortrait.imageUrl}
                    alt={`Fantasy cartoon portrait of ${character.name}, ${character.ancestry} ${character.characterClass}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="relative flex h-full w-full flex-col items-center justify-center gap-3 p-8 text-center">
                    <ScryingMirrorSigil />
                    <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-[#a57b3d]/75 bg-[#1d1429] text-[#dfb35b] shadow-[0_0_24px_rgba(139,92,246,0.22)]">
                      <UserCheck className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div className="relative z-10">
                      <p className="font-display text-sm font-bold tracking-wider text-[#ebd08c]">
                        The Scrying Mirror Awaits
                      </p>
                      <p className="mt-1.5 max-w-xs text-xs leading-relaxed text-[#b2a490]">
                        Select <span className="font-semibold text-[#f3d692]">Generate Portrait</span> above to conjure a cartoon RPG portrait for{' '}
                        <span className="text-[#e3cbfd]">{character.name}</span>.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {matchingPortrait && !isGeneratingPortrait ? (
                <div className="mt-3 flex items-center justify-between gap-3 px-1">
                  <p className="truncate text-xs text-[#cbbda7]">
                    <span className="font-display font-semibold text-[#f0cf86]">
                      {character.name}
                    </span>
                    <span aria-hidden="true" className="mx-1.5 text-[#7c5d32]">·</span>
                    <span>
                      {character.ancestry} {character.characterClass}
                    </span>
                    {matchingPortrait.variation > 0 ? (
                      <>
                        <span aria-hidden="true" className="mx-1.5 text-[#7c5d32]">·</span>
                        <span className="font-mono text-[#c4a1f5]">
                          Variant {matchingPortrait.variation + 1}
                        </span>
                      </>
                    ) : null}
                  </p>

                  <button
                    type="button"
                    onClick={handleDownloadPortrait}
                    className="rpg-btn-bronze inline-flex cursor-pointer items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
                  >
                    <Download className="h-3.5 w-3.5" aria-hidden="true" />
                    Save Image
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        {/* ORNATE DIVIDER BETWEEN PORTRAIT AND BACKSTORY */}
        <AlchemicalDivider label="Origin Chronicle" />

        {/* CHARACTER BACKSTORY SECTION (BELOW CHARACTER PORTRAIT) */}
        <section aria-label="Character Backstory" className="relative">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-lg font-bold tracking-wide text-[#f0cf86]">
                Origin Backstory
              </h2>
              <p className="mt-1 text-sm text-[#b9ab97]">
                Inscribe a unique origin tale for {character.name || 'this adventurer'} ({character.characterClass}).
              </p>
            </div>

            <button
              type="button"
              onClick={onGenerateBackstory}
              className="rpg-btn-bronze inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2.5 font-display text-xs font-bold tracking-wider whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]"
            >
              <Feather className="h-4 w-4" aria-hidden="true" />
              Generate Backstory
            </button>
          </div>

          <div
            data-testid="generated-backstory"
            className="mt-4 rounded-md border border-[#8a6838]/60 bg-[#120d19]/90 px-5 py-4 shadow-[inset_0_1px_0_rgba(242,206,128,0.14),0_10px_28px_rgba(0,0,0,0.45)]"
          >
            <p className="font-serif text-base leading-relaxed text-[#f2e8d7]">
              {displayedBackstory}
            </p>
          </div>
        </section>

        {/* PLAYER CARD ACTION FOOTER — SAVE TO DECK */}
        <footer className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[#8a6838]/55 pt-6 sm:flex-row sm:items-center">
          <div className="text-sm">
            {deckNotice ? (
              <p className="inline-flex items-center gap-2 font-medium text-[#f5dba0]">
                <CheckCircle2 className="h-4 w-4 text-[#c4a1f5]" aria-hidden="true" />
                {deckNotice}
              </p>
            ) : isInDeck ? (
              <p className="inline-flex items-center gap-2 text-[#cbbda7]">
                <CheckCircle2 className="h-4 w-4 text-[#c99b49]" aria-hidden="true" />
                This hero is preserved in My Deck.
              </p>
            ) : (
              <p className="text-[#b9ab97]">
                Preserve this character card—stats, portrait, and backstory—inside My Deck.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={onSaveToDeck}
            className="rpg-btn-arcane inline-flex cursor-pointer items-center gap-2 rounded-md px-5 py-2.5 font-display text-xs font-bold tracking-wider whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c4a1f5]"
          >
            <Layers className="h-4 w-4" aria-hidden="true" />
            Save to Deck
          </button>
        </footer>
      </div>
    </article>
  );
}
