import { Dices, RefreshCw, Shuffle } from 'lucide-react';
import { ALIGNMENTS, CHARACTER_ANCESTRIES, CHARACTER_CLASSES } from '../data/fantasyData';
import type { FantasyCharacter } from '../types/character';
import { OrnateCornerFiligree } from './AlchemicalOrnaments';

interface CharacterControlsProps {
  character: FantasyCharacter;
  onNameChange: (name: string) => void;
  onRandomizeName: () => void;
  onAncestryChange: (ancestry: string) => void;
  onClassChange: (characterClass: string) => void;
  onLevelChange: (level: number) => void;
  onAlignmentChange: (alignment: string) => void;
  onGenerateCharacter: () => void;
  onRerollStats: () => void;
}

export function CharacterControls({
  character,
  onNameChange,
  onRandomizeName,
  onAncestryChange,
  onClassChange,
  onLevelChange,
  onAlignmentChange,
  onGenerateCharacter,
  onRerollStats,
}: CharacterControlsProps) {
  return (
    <aside className="alchemist-folio relative rounded-lg border border-[#8a6838]/55 p-6">
      <OrnateCornerFiligree position="top-left" />
      <OrnateCornerFiligree position="top-right" />
      <OrnateCornerFiligree position="bottom-left" />
      <OrnateCornerFiligree position="bottom-right" />

      <div className="mb-5 border-b border-[#7c5d32]/35 pb-4">
        <h2 className="font-display text-lg font-bold tracking-wide text-[#f0cf86]">
          Crucible Controls
        </h2>
        <p className="mt-1 text-sm text-[#b9ab97]">
          Shape your hero’s lineage and calling, or cast the bone dice anew.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="character-name-input"
            className="mb-1.5 block text-xs font-medium tracking-wider text-[#d9bd8a]"
          >
            Character Name
          </label>
          <div className="flex gap-2">
            <input
              id="character-name-input"
              type="text"
              value={character.name}
              onChange={(e) => onNameChange(e.target.value)}
              placeholder="Enter hero name..."
              className="min-w-0 flex-1 rounded-md border border-[#7b5d33]/60 bg-[#120d19] px-3 py-2.5 text-sm text-[#f4ead8] placeholder-[#7f7062] focus:border-[#d4a652] focus:outline-none"
            />
            <button
              type="button"
              onClick={onRandomizeName}
              title="Randomize Name"
              aria-label="Randomize Name"
              className="rpg-btn-bronze inline-flex cursor-pointer items-center justify-center rounded-md px-3 py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
            >
              <Shuffle className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <label
              htmlFor="character-ancestry-select"
              className="mb-1.5 block text-xs font-medium tracking-wider text-[#d9bd8a]"
            >
              Ancestry
            </label>
            <select
              id="character-ancestry-select"
              value={character.ancestry}
              onChange={(e) => onAncestryChange(e.target.value)}
              className="w-full cursor-pointer rounded-md border border-[#7b5d33]/60 bg-[#120d19] px-3 py-2.5 text-sm text-[#f4ead8] focus:border-[#d4a652] focus:outline-none"
            >
              {CHARACTER_ANCESTRIES.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="character-class-select"
              className="mb-1.5 block text-xs font-medium tracking-wider text-[#d9bd8a]"
            >
              Class
            </label>
            <select
              id="character-class-select"
              value={character.characterClass}
              onChange={(e) => onClassChange(e.target.value)}
              className="w-full cursor-pointer rounded-md border border-[#7b5d33]/60 bg-[#120d19] px-3 py-2.5 text-sm text-[#f4ead8] focus:border-[#d4a652] focus:outline-none"
            >
              {CHARACTER_CLASSES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="character-level-select"
              className="mb-1.5 block text-xs font-medium tracking-wider text-[#d9bd8a]"
            >
              Level
            </label>
            <select
              id="character-level-select"
              value={character.level}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="w-full cursor-pointer rounded-md border border-[#7b5d33]/60 bg-[#120d19] px-3 py-2.5 font-mono text-sm tabular-nums text-[#f4ead8] focus:border-[#d4a652] focus:outline-none"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl}>
                  Level {lvl}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="character-alignment-select"
              className="mb-1.5 block text-xs font-medium tracking-wider text-[#d9bd8a]"
            >
              Alignment
            </label>
            <select
              id="character-alignment-select"
              value={character.alignment}
              onChange={(e) => onAlignmentChange(e.target.value)}
              className="w-full cursor-pointer rounded-md border border-[#7b5d33]/60 bg-[#120d19] px-3 py-2.5 text-sm text-[#f4ead8] focus:border-[#d4a652] focus:outline-none"
            >
              {ALIGNMENTS.map((align) => (
                <option key={align} value={align}>
                  {align}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-2.5 border-t border-[#7c5d32]/35 pt-5">
        <button
          type="button"
          onClick={onGenerateCharacter}
          className="rpg-btn-gold flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 font-display text-xs font-bold tracking-wider whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]"
        >
          <Dices className="h-4 w-4" aria-hidden="true" />
          Generate Character
        </button>

        <button
          type="button"
          onClick={onRerollStats}
          className="rpg-btn-bronze flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2.5 font-display text-xs font-semibold tracking-wider whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reroll Stats
        </button>
      </div>
    </aside>
  );
}
