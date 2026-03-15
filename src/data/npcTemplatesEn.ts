// src/data/npcTemplatesEn.ts
import type { NpcTemplate } from '../types'

const boxes = (count: number) =>
  Array.from({ length: count }, (_, i) => ({ index: i, checked: false }))

const consequences = [
  { severity: 'mild' as const, label: 'Mild', value: '' },
  { severity: 'moderate' as const, label: 'Moderate', value: '' },
  { severity: 'severe' as const, label: 'Severe', value: '' },
]

export const npcTemplatesEn: NpcTemplate[] = [
  {
    id: 'fighter', name: 'Fighter', description: 'A tough close-combat opponent',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Hardened veteran of close combat' },
        { slotId: 'trouble', value: 'Lives only for the fight — the world outside battle is alien' },
        { slotId: 'aspect-1', value: 'The scars speak for themselves' },
        { slotId: 'aspect-2', value: 'Loyal to whoever pays' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 4 }, { skillId: 'physique', rating: 3 },
        { skillId: 'athletics', rating: 2 }, { skillId: 'provoke', rating: 2 },
        { skillId: 'will', rating: 1 }, { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Crushing Blow', description: '+2 to Fight when attacking an unarmed opponent' },
        { id: 'stunt-2', name: 'Steel Body', description: 'Once per scene can absorb a mild consequence without writing it down' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(4) }, { trackId: 'mental', boxes: boxes(2) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'socialite', name: 'Negotiator', description: 'Master of words and manipulation',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Cunning manipulator with impeccable manners' },
        { slotId: 'trouble', value: 'Frail body — sharp tongue, but fists are no help' },
        { slotId: 'aspect-1', value: 'I have friends everywhere — and enemies too' },
        { slotId: 'aspect-2', value: 'Truth is merely a tool of persuasion' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'rapport', rating: 4 }, { skillId: 'deceive', rating: 3 },
        { skillId: 'empathy', rating: 3 }, { skillId: 'contacts', rating: 2 },
        { skillId: 'provoke', rating: 2 }, { skillId: 'resources', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Read People', description: '+2 to Empathy at the first conversation with a stranger' },
        { id: 'stunt-2', name: 'Master of Half-Truths', description: 'Can use Deceive instead of Rapport in negotiations if the target suspects nothing' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(2) }, { trackId: 'mental', boxes: boxes(4) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'mook', name: 'Mook', description: 'A weak opponent, cannon fodder',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 1, currentFatePoints: 1,
      aspects: [
        { slotId: 'high-concept', value: 'Ordinary hired thug' },
        { slotId: 'trouble', value: 'Coward at heart — runs at the first opportunity' },
        { slotId: 'aspect-1', value: 'Strong in a crowd, weak alone' },
        { slotId: 'aspect-2', value: '' }, { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'fight', rating: 2 }, { skillId: 'athletics', rating: 1 },
        { skillId: 'physique', rating: 1 }, { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Strength in Numbers', description: '+1 to attack for each ally in the same zone (max +3)' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(2) }, { trackId: 'mental', boxes: boxes(2) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'boss', name: 'Boss', description: 'Powerful opponent, the main villain',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 3, currentFatePoints: 3,
      aspects: [
        { slotId: 'high-concept', value: 'Ruthless villain with a grand plan' },
        { slotId: 'trouble', value: 'Paranoia and mistrust destroy his alliances' },
        { slotId: 'aspect-1', value: 'Always one step ahead of his opponents' },
        { slotId: 'aspect-2', value: 'Power is the only thing that matters' },
        { slotId: 'aspect-3', value: 'I have a backup plan' },
      ],
      skills: [
        { skillId: 'fight', rating: 4 }, { skillId: 'provoke', rating: 4 },
        { skillId: 'deceive', rating: 3 }, { skillId: 'physique', rating: 3 },
        { skillId: 'will', rating: 3 }, { skillId: 'notice', rating: 2 },
        { skillId: 'resources', rating: 2 }, { skillId: 'contacts', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Unstoppable', description: '+2 to defense against Overcome actions directed at him' },
        { id: 'stunt-2', name: 'Intimidation', description: 'Can use Provoke instead of Fight to create advantages in combat' },
        { id: 'stunt-3', name: 'Last Ace', description: 'Once per session can cancel one consequence at the start of his turn' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(4) }, { trackId: 'mental', boxes: boxes(4) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'assassin', name: 'Assassin', description: 'Silent and deadly hired killer',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Ghost — kills before anyone notices' },
        { slotId: 'trouble', value: 'The past pursues — someone knows his face' },
        { slotId: 'aspect-1', value: 'The contract is sacred as long as they pay' },
        { slotId: 'aspect-2', value: 'One strike, one death' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'stealth', rating: 4 }, { skillId: 'fight', rating: 3 },
        { skillId: 'athletics', rating: 3 }, { skillId: 'notice', rating: 2 },
        { skillId: 'deceive', rating: 2 }, { skillId: 'investigate', rating: 1 },
        { skillId: 'shoot', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Strike from Shadow', description: 'When attacking from stealth, gains +2 to Fight and a free boost on success' },
        { id: 'stunt-2', name: 'Traceless', description: '+2 to Stealth when attempting to disappear at the end of a scene' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(3) }, { trackId: 'mental', boxes: boxes(3) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'scholar', name: 'Scholar', description: 'Expert in secrets and occult sciences',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Keeper of forbidden knowledge' },
        { slotId: 'trouble', value: 'Knowledge without wisdom is a dangerous weapon' },
        { slotId: 'aspect-1', value: 'I read about this — that does not mean I survived it' },
        { slotId: 'aspect-2', value: 'Curiosity is stronger than the survival instinct' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'lore', rating: 4 }, { skillId: 'investigate', rating: 3 },
        { skillId: 'will', rating: 3 }, { skillId: 'crafts', rating: 2 },
        { skillId: 'notice', rating: 2 }, { skillId: 'rapport', rating: 1 },
        { skillId: 'resources', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Encyclopedic Mind', description: '+2 to Lore at the first encounter with a creature or phenomenon' },
        { id: 'stunt-2', name: 'Weak Spot', description: 'After a successful Lore roll to study an opponent, the next ally attack gets +2' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(2) }, { trackId: 'mental', boxes: boxes(4) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'merchant', name: 'Merchant', description: 'Wealthy and influential businessman',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Rich merchant with a long reach' },
        { slotId: 'trouble', value: 'Money is the only language he understands' },
        { slotId: 'aspect-1', value: 'I have the right person for any job' },
        { slotId: 'aspect-2', value: 'Debts are not forgotten — neither his nor anyone else\'s' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'resources', rating: 4 }, { skillId: 'contacts', rating: 4 },
        { skillId: 'rapport', rating: 3 }, { skillId: 'deceive', rating: 2 },
        { skillId: 'empathy', rating: 2 }, { skillId: 'investigate', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Network', description: '+2 to Contacts when looking for information or people in any city' },
        { id: 'stunt-2', name: 'Price of Everything', description: 'Can use Resources instead of Rapport when negotiating with greedy NPCs' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(2) }, { trackId: 'mental', boxes: boxes(3) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'guardian', name: 'Guardian', description: 'Impenetrable defender and bodyguard',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Living shield — stands between danger and the charge' },
        { slotId: 'trouble', value: 'Duty matters more than life — even his own' },
        { slotId: 'aspect-1', value: 'No one gets through me' },
        { slotId: 'aspect-2', value: 'The oath is unbreakable while alive' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'physique', rating: 4 }, { skillId: 'fight', rating: 3 },
        { skillId: 'athletics', rating: 3 }, { skillId: 'will', rating: 2 },
        { skillId: 'notice', rating: 2 }, { skillId: 'empathy', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Living Shield', description: 'Can take a blow meant for an ally in the same zone, rolling Athletics or Physique' },
        { id: 'stunt-2', name: 'Unbending', description: '+2 to Physique when defending against physical attacks while already having a consequence' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(4) }, { trackId: 'mental', boxes: boxes(3) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'trickster', name: 'Trickster', description: 'Con artist, rogue and master of illusions',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Master of deception — no one knows his real face' },
        { slotId: 'trouble', value: 'Lies even when the truth would serve better' },
        { slotId: 'aspect-1', value: 'Always has a spare trick up the sleeve' },
        { slotId: 'aspect-2', value: 'Chaos is the best ally' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'deceive', rating: 4 }, { skillId: 'burglary', rating: 3 },
        { skillId: 'athletics', rating: 3 }, { skillId: 'rapport', rating: 2 },
        { skillId: 'stealth', rating: 2 }, { skillId: 'provoke', rating: 1 },
        { skillId: 'notice', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Smokescreen', description: '+2 to Deceive when creating distracting advantages in a conflict' },
        { id: 'stunt-2', name: 'Another Face', description: 'Can assume another person\'s identity — +2 to Deceive until the mask is torn off' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(2) }, { trackId: 'mental', boxes: boxes(3) }],
      consequences, scars: [], equipment: [],
    },
  },
  {
    id: 'zealot', name: 'Zealot', description: 'Obsessed with an idea — dangerous and unpredictable',
    character: {
      systemId: 'fate-core', name: '', description: '', isNpc: true, refresh: 2, currentFatePoints: 2,
      aspects: [
        { slotId: 'high-concept', value: 'Blind fanatic — faith matters more than life or reason' },
        { slotId: 'trouble', value: 'Deaf to argument — only hears the voice of his belief' },
        { slotId: 'aspect-1', value: 'Pain means nothing when there is purpose' },
        { slotId: 'aspect-2', value: 'All who oppose me are enemies of the truth' },
        { slotId: 'aspect-3', value: '' },
      ],
      skills: [
        { skillId: 'will', rating: 4 }, { skillId: 'provoke', rating: 4 },
        { skillId: 'fight', rating: 3 }, { skillId: 'physique', rating: 2 },
        { skillId: 'athletics', rating: 2 }, { skillId: 'lore', rating: 1 },
        { skillId: 'rapport', rating: 1 },
      ],
      stunts: [
        { id: 'stunt-1', name: 'Unbroken Faith', description: '+2 to Will when defending against psychological attacks and intimidation' },
        { id: 'stunt-2', name: 'Battle Cry', description: 'Once per scene can use Provoke to attack all enemies in a zone simultaneously' },
        { id: 'stunt-3', name: 'Martyr', description: 'Upon receiving a severe consequence — immediately makes a free attack' },
      ],
      stressTracks: [{ trackId: 'physical', boxes: boxes(3) }, { trackId: 'mental', boxes: boxes(4) }],
      consequences, scars: [], equipment: [],
    },
  },
]
