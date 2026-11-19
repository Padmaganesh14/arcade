import { ArrowUpRight, Eye, Layers, Trash2, UserCheck, X } from 'lucide-react';
import { useState } from 'react';
import type { SavedDeckCharacter } from '../types/character';
import { AlchemicalDivider, OrnateCornerFiligree } from './AlchemicalOrnaments';
import { StatProgressBars } from './StatProgressBars';

interface MyDeckSectionProps {
  deck: SavedDeckCharacter[];
  activeCharacterId: string;
  onLoadCharacter: (card: SavedDeckCharacter) => void;
  onRemoveCharacter: (id: string) => void;
}

export function MyDeckSection({
  deck,
  activeCharacterId,
  onLoadCharacter,
  onRemoveCharacter,
}: MyDeckSectionProps) {
  const [inspectingCard, setInspectingCard] = useState<SavedDeckCharacter | null>(null);

  return (
    <section
      id="my-deck"
      aria-label="My Deck"
      className="mt-14 scroll-mt-6"
    >
      <div className="alchemist-folio relative rounded-xl border-2 border-[#a57b3d]/65 p-6 sm:p-8">
        <OrnateCornerFiligree position="top-left" />
        <OrnateCornerFiligree position="top-right" />
        <OrnateCornerFiligree position="bottom-left" />
        <OrnateCornerFiligree position="bottom-right" />

        <div className="flex flex-col items-start justify-between gap-4 border-b border-[#7c5d32]/40 pb-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-wide text-[#f4d58d]">
              <Layers className="h-5 w-5 text-[#c99b49]" aria-hidden="true" />
              My Deck
            </h2>
            <p className="mt-1 text-sm text-[#b9ab97]">
              Collected fantasy player cards with preserved stats, portraits, and origin stories.
            </p>
          </div>
          <span className="font-mono text-sm tabular-nums text-[#e6c478]">
            {deck.length} {deck.length === 1 ? 'Card' : 'Cards'} Saved
          </span>
        </div>

        {deck.length === 0 ? (
          <div className="py-12 text-center">
            <p className="font-display text-base font-semibold text-[#e6c478]">
              My Deck is Empty
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-[#a99b87]">
              Forge a character above and click <span className="font-semibold text-[#f3d692]">Save to Deck</span> to add their player card to your collection.
            </p>
          </div>
        ) : (
          <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {deck.map((card) => {
              const isActive = card.id === activeCharacterId;
              return (
                <article
                  key={card.id}
                  data-testid={`deck-card-${card.id}`}
                  className={`flex flex-col justify-between rounded-lg border-2 p-4 transition-colors ${
                    isActive
                      ? 'border-[#d4a652] bg-[#1d1428]'
                      : 'border-[#8a6838]/65 bg-[#130d1c] hover:border-[#c99b49]'
                  }`}
                >
                  <div>
                    {/* Mini Card Header */}
                    <div className="flex items-start gap-3.5 border-b border-[#7c5d32]/35 pb-3.5">
                      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-md border border-[#a57b3d]/75 bg-[#0c0812]">
                        {card.portraitUrl ? (
                          <img
                            src={card.portraitUrl}
                            alt={`Portrait of ${card.name}`}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#9b7438]">
                            <UserCheck className="h-7 w-7" aria-hidden="true" />
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-hero text-lg font-bold text-[#f4d58d]">
                          {card.name}
                        </h3>
                        <p className="mt-0.5 font-display text-xs font-semibold tracking-wider text-[#dec8f8]">
                          {card.characterClass}
                        </p>
                        <p className="mt-1 text-xs text-[#a99b87]">
                          Lvl {card.level} · {card.ancestry}
                        </p>
                      </div>
                    </div>

                    {/* Mini Card Stats Progress Bars */}
                    <div className="mt-3.5">
                      <StatProgressBars stats={card.cardStats} compact />
                    </div>

                    {/* Mini Card Backstory */}
                    <p className="mt-3.5 line-clamp-3 border-t border-[#7c5d32]/30 pt-3 font-serif text-xs leading-relaxed text-[#d7cab6]">
                      {card.backstory}
                    </p>
                  </div>

                  {/* Mini Card Controls */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-[#7c5d32]/35 pt-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectingCard(card)}
                        className="rpg-btn-gold inline-flex cursor-pointer items-center gap-1.5 rounded px-3 py-1.5 font-display text-xs font-bold tracking-wider whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                        View Card
                      </button>

                      <button
                        type="button"
                        onClick={() => onLoadCharacter(card)}
                        className="rpg-btn-bronze inline-flex cursor-pointer items-center gap-1 rounded px-2.5 py-1.5 text-xs font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                        Load
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (inspectingCard?.id === card.id) {
                          setInspectingCard(null);
                        }
                        onRemoveCharacter(card.id);
                      }}
                      aria-label={`Remove ${card.name} from My Deck`}
                      className="rpg-btn-bronze inline-flex cursor-pointer items-center gap-1 rounded px-2.5 py-1.5 text-xs text-[#f2b5a8] hover:text-[#fecaca] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Saved Card Detail Modal */}
      {inspectingCard ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Saved Player Card: ${inspectingCard.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setInspectingCard(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl border-2 border-[#c99b49] bg-[#0e0a15] p-2 shadow-[0_32px_90px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="alchemist-folio relative rounded-lg border border-[#8a6838]/75 p-6 sm:p-8">
              <OrnateCornerFiligree position="top-left" />
              <OrnateCornerFiligree position="top-right" />
              <OrnateCornerFiligree position="bottom-left" />
              <OrnateCornerFiligree position="bottom-right" />

              <div className="flex items-start justify-between gap-4 border-b border-[#7c5d32]/40 pb-4">
                <div>
                  <h3 className="font-hero text-2xl font-bold text-[#f6d992]">
                    {inspectingCard.name}
                  </h3>
                  <p className="mt-1 font-display text-sm font-semibold tracking-wider text-[#dec8f8]">
                    {inspectingCard.characterClass} · Level {inspectingCard.level} {inspectingCard.ancestry}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setInspectingCard(null)}
                  aria-label="Close card viewer"
                  className="rpg-btn-bronze inline-flex cursor-pointer items-center justify-center rounded-md p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-5">
                <StatProgressBars stats={inspectingCard.cardStats} />
              </div>

              {inspectingCard.portraitUrl ? (
                <div className="mt-6 flex justify-center">
                  <div className="w-full max-w-xs overflow-hidden rounded-lg border-2 border-[#b48842]/80 bg-[#120c1a] p-2">
                    <img
                      src={inspectingCard.portraitUrl}
                      alt={`Portrait of ${inspectingCard.name}`}
                      referrerPolicy="no-referrer"
                      className="aspect-square w-full rounded object-cover"
                    />
                  </div>
                </div>
              ) : null}

              <AlchemicalDivider label="Origin Backstory" />

              <p className="font-serif text-sm leading-relaxed text-[#f2e8d7]">
                {inspectingCard.backstory}
              </p>

              <div className="mt-6 flex items-center justify-end gap-3 border-t border-[#7c5d32]/35 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    onLoadCharacter(inspectingCard);
                    setInspectingCard(null);
                  }}
                  className="rpg-btn-gold inline-flex cursor-pointer items-center gap-1.5 rounded-md px-4 py-2 font-display text-xs font-bold tracking-wider whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f5dba0]"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  Load onto Forge
                </button>
                <button
                  type="button"
                  onClick={() => setInspectingCard(null)}
                  className="rpg-btn-bronze cursor-pointer rounded-md px-4 py-2 font-display text-xs font-semibold tracking-wider whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a652]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
