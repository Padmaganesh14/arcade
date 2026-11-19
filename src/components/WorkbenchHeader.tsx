import { Dices } from 'lucide-react';

interface WorkbenchHeaderProps {
  deckCount: number;
  onScrollToForge: () => void;
  onScrollToDeck: () => void;
  onGenerateCharacter: () => void;
}

export function WorkbenchHeader({
  deckCount,
  onScrollToForge,
  onScrollToDeck,
  onGenerateCharacter,
}: WorkbenchHeaderProps) {
  return (
    <header className="relative z-20 border-b border-[#8a6838]/45 bg-[#120d19]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-4 sm:px-6 lg:px-8">
        <a
          href="#character-forge"
          onClick={(e) => {
            e.preventDefault();
            onScrollToForge();
          }}
          className="font-display text-xl font-bold tracking-wider text-[#f1cf84] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c99b49]"
        >
          Arcanum Forge
        </a>

        <nav className="flex items-center gap-6 text-sm" aria-label="Primary navigation">
          <a
            href="#character-forge"
            onClick={(e) => {
              e.preventDefault();
              onScrollToForge();
            }}
            className="border-b-2 border-[#d4a652] py-1 font-medium text-[#f5dba0] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c99b49]"
          >
            Player Card
          </a>
          <a
            href="#my-deck"
            onClick={(e) => {
              e.preventDefault();
              onScrollToDeck();
            }}
            className="border-b-2 border-transparent py-1 font-medium text-[#cbbda7] transition-colors hover:border-[#a87ff0]/70 hover:text-[#f5dba0] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c99b49]"
          >
            My Deck ({deckCount})
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onGenerateCharacter}
            className="rpg-btn-gold inline-flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 font-display text-xs font-bold tracking-wider whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]"
          >
            <Dices className="h-4 w-4" aria-hidden="true" />
            Generate Character
          </button>
        </div>
      </div>
    </header>
  );
}
