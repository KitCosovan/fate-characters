// src/data/rulesContentEn.ts
import type { SystemRules } from './rulesContent'

const fateCoreEn: SystemRules = {
  id: 'fate-core',
  name: 'Fate Core',
  tagline: 'The classic system for stories about competent, proactive characters',
  accentColor: '#c8a96e',
  sections: [
    {
      id: 'dice',
      title: 'Dice & Rolls',
      content: [
        { type: 'text', text: 'Fate uses 4 Fate dice (4dF). Each die gives −1, 0, or +1. The total ranges from −4 to +4.' },
        { type: 'text', text: 'Roll result = dice + skill level + bonuses from aspects and stunts.' },
        { type: 'table', headers: ['Result', 'Outcome'], rows: [
          ['Below difficulty', '🔴 Fail — goal not achieved or at great cost'],
          ['Equal to difficulty', '🟡 Tie — goal achieved but with a complication'],
          ['Above difficulty', '🟢 Success — goal achieved'],
          ['Above by 3+', '✨ Success with style — goal + bonus'],
        ]},
      ]
    },
    {
      id: 'actions',
      title: 'Four Actions',
      content: [
        { type: 'table', headers: ['Action', 'Purpose'], rows: [
          ['Overcome', 'Remove an obstacle or solve a problem'],
          ['Create Advantage', 'Create an aspect with free invokes'],
          ['Attack', 'Cause stress or a consequence'],
          ['Defend', 'Prevent an attack or overcome'],
        ]},
        { type: 'tip', text: 'Defend is a free action — it can be used on someone else\'s turn at no cost.' },
      ]
    },
    {
      id: 'aspects',
      title: 'Aspects',
      content: [
        { type: 'text', text: 'An aspect is a short phrase describing an important fact about a character or scene. Aspects can be invoked (+2 or reroll for a fate point) or compelled (complication in exchange for a fate point).' },
        { type: 'table', headers: ['Aspect type', 'Description'], rows: [
          ['High Concept', 'The main aspect — who you are'],
          ['Trouble', 'Source of complications and drama'],
          ['Phase aspects', '3 aspects from your character\'s history'],
        ]},
        { type: 'list', items: [
          'Invoke: spend a fate point → +2 to roll or reroll',
          'Free invoke: appears when creating an advantage',
          'Compel: accept a complication → gain a fate point',
        ]},
      ]
    },
    {
      id: 'stress',
      title: 'Stress & Consequences',
      content: [
        { type: 'text', text: 'When a character takes damage, they absorb it with stress or consequences. If neither is available, the character is taken out.' },
        { type: 'table', headers: ['Type', 'Absorbs', 'Recovery'], rows: [
          ['Stress (□□)', 'Any damage ≤ box number', 'After scene'],
          ['Mild consequence', '2 damage', 'After next scene'],
          ['Moderate consequence', '4 damage', 'After session'],
          ['Severe consequence', '6 damage', 'After milestone'],
          ['Extreme consequence', '8 damage', 'Permanent character change'],
        ]},
        { type: 'tip', text: 'Physique and Will increase stress boxes: +1 box at rating 1-2, +2 boxes at 3-4, extra consequence slot at 5+.' },
      ]
    },
    {
      id: 'skills',
      title: 'Skills',
      content: [
        { type: 'text', text: 'Skills are distributed in a pyramid: 1 skill at +4, 2 at +3, 3 at +2, 4 at +1. Everything else is +0.' },
        { type: 'table', headers: ['Skill', 'Attack', 'Defend', 'Overcome', 'Advantage'], rows: [
          ['Athletics', '—', 'yes', 'yes', 'yes'],
          ['Burglary', '—', '—', 'yes', 'yes'],
          ['Contacts', '—', '—', 'yes', 'yes'],
          ['Crafts', '—', '—', 'yes', 'yes'],
          ['Deceive', '—', 'yes', 'yes', 'yes'],
          ['Drive', '—', '—', 'yes', 'yes'],
          ['Empathy', '—', 'yes', 'yes', 'yes'],
          ['Fight', 'yes', 'yes', 'yes', 'yes'],
          ['Investigate', '—', '—', 'yes', 'yes'],
          ['Lore', '—', '—', 'yes', 'yes'],
          ['Notice', '—', '—', 'yes', 'yes'],
          ['Physique', '—', '—', 'yes', 'yes'],
          ['Provoke', 'yes (mental)', '—', 'yes', 'yes'],
          ['Rapport', '—', 'yes', 'yes', 'yes'],
          ['Resources', '—', '—', 'yes', 'yes'],
          ['Shoot', 'yes', '—', 'yes', 'yes'],
          ['Stealth', '—', '—', 'yes', 'yes'],
          ['Will', '—', 'yes (mental)', 'yes', 'yes'],
        ]},
      ]
    },
    {
      id: 'stunts',
      title: 'Stunts & Refresh',
      content: [
        { type: 'text', text: 'Stunts are special abilities. Each stunt beyond three reduces refresh by 1. Refresh is the minimum fate point count at session start.' },
        { type: 'list', items: [
          '+2 to an action in a specific situation',
          'Use one skill in place of another',
          'Special action (once per scene or session)',
        ]},
        { type: 'tip', text: 'Default refresh: 3. Minimum refresh: 1.' },
      ]
    },
  ]
}

const faeEn: SystemRules = {
  id: 'fate-accelerated',
  name: 'Fate Accelerated',
  tagline: 'A fast, light version of Fate — perfect for beginners and short stories',
  accentColor: '#70a0e0',
  sections: [
    {
      id: 'approaches',
      title: 'Approaches instead of skills',
      content: [
        { type: 'text', text: 'FAE replaces skills with six approaches — ways of acting. Instead of "what can I do" it answers "how do I do it".' },
        { type: 'table', headers: ['Approach', 'Description'], rows: [
          ['Careful', 'Paying close attention and taking your time'],
          ['Clever', 'Thinking it through and using wits'],
          ['Flashy', 'With flair, making it look good'],
          ['Forceful', 'Using power and directness'],
          ['Quick', 'Moving fast and reacting instantly'],
          ['Sneaky', 'With misdirection, stealth, or deception'],
        ]},
        { type: 'text', text: 'Distribute approach ratings: +3, +2, +2, +1, +1, +0.' },
      ]
    },
    {
      id: 'actions-fae',
      title: 'Actions (same as Fate Core)',
      content: [
        { type: 'table', headers: ['Action', 'Purpose'], rows: [
          ['Overcome', 'Remove an obstacle'],
          ['Create Advantage', 'Create an aspect with invokes'],
          ['Attack', 'Cause stress'],
          ['Defend', 'Prevent an attack'],
        ]},
        { type: 'tip', text: 'In FAE there are no restrictions — "this approach only for attack". Use any approach for any action, as long as it makes sense.' },
      ]
    },
    {
      id: 'aspects-fae',
      title: 'Aspects',
      content: [
        { type: 'table', headers: ['Aspect type', 'Description'], rows: [
          ['High Concept', 'Who you are — the main aspect'],
          ['Trouble', 'Your main complication'],
          ['Three free aspects', 'Any important facts about the character'],
        ]},
        { type: 'list', items: [
          'Invoke: −1 fate point → +2 or reroll',
          'Compel: gain a fate point, accept a complication',
          'Create advantage: success = 1 invoke, style = 2 invokes',
        ]},
      ]
    },
    {
      id: 'stress-fae',
      title: 'Stress & Consequences',
      content: [
        { type: 'text', text: 'In FAE every character starts with 3 stress boxes. Consequences work the same as Fate Core.' },
        { type: 'table', headers: ['Type', 'Absorbs', 'Recovery'], rows: [
          ['Stress □□□', 'Any damage', 'After scene'],
          ['Mild consequence', '2 damage', 'After next scene'],
          ['Moderate consequence', '4 damage', 'After session'],
          ['Severe consequence', '6 damage', 'After milestone'],
        ]},
      ]
    },
    {
      id: 'stunts-fae',
      title: 'Stunts',
      content: [
        { type: 'text', text: 'Stunts in FAE follow the template: "Because I [description], once per [scene/session] I get +2 when I [approach] [action] in [situation]".' },
        { type: 'list', items: [
          '3 stunts free, refresh = 3',
          'Each additional stunt reduces refresh by 1',
          'Minimum refresh: 1',
        ]},
        { type: 'tip', text: 'Example: "Because I am an experienced swordsman, once per scene I get +2 when I Quickly attack a single opponent".' },
      ]
    },
  ]
}

const bookOfAshesEn: SystemRules = {
  id: 'book-of-ashes',
  name: 'Book of Ashes',
  tagline: 'Dark fantasy on the Fate engine — scars, darkness and the price of power',
  accentColor: '#e07070',
  sections: [
    {
      id: 'darkness',
      title: 'Darkness & Corruption',
      content: [
        { type: 'text', text: 'Book of Ashes adds the Darkness mechanic — a measure of how much a character has surrendered to dark power. Darkness grows from using certain abilities and difficult choices.' },
        { type: 'table', headers: ['Darkness level', 'Effect'], rows: [
          ['0–2 (Spark)', 'No effect'],
          ['3–4 (Smoldering)', 'GM gets +1 fate point when compelling'],
          ['5–6 (Burning)', 'Darkness begins to control actions'],
          ['7+ (Possessed)', 'Character loses control'],
        ]},
        { type: 'warning', text: 'If darkness reaches maximum, the character becomes an antagonist under GM control.' },
      ]
    },
    {
      id: 'scars',
      title: 'Scars',
      content: [
        { type: 'text', text: 'Scars are permanent consequences that replace character aspects. Each scar is a story about a price that had to be paid.' },
        { type: 'list', items: [
          'A scar replaces one of your free aspects permanently',
          'Scars cannot be removed — only accepted as part of yourself',
          'Scars can be invoked like regular aspects',
          'Scars may grant unique mechanical bonuses',
        ]},
        { type: 'tip', text: 'Example scar: "Burned hand that remembers the flame" — invoke when working with fire or when pain recalls the past.' },
      ]
    },
    {
      id: 'aspects-boa',
      title: 'Aspects',
      content: [
        { type: 'table', headers: ['Aspect type', 'Description'], rows: [
          ['Concept', 'Who you are in this world'],
          ['Vice', 'Your weakness and source of darkness'],
          ['Bright Side', 'What you fight for'],
          ['Phase 1 Aspect', 'From the character\'s past'],
          ['Phase 2 Aspect', 'From the character\'s past'],
        ]},
      ]
    },
    {
      id: 'equipment',
      title: 'Equipment',
      content: [
        { type: 'text', text: 'Equipment in Book of Ashes takes slots and has free invokes. Important equipment is written as an aspect.' },
        { type: 'table', headers: ['Type', 'Slots', 'Feature'], rows: [
          ['Weapon', '1–2', 'Free invokes for attack'],
          ['Armor', '1–2', 'Free invokes for defense'],
          ['Resource', '1', 'Consumable advantage'],
          ['Relic', '2–3', 'Unique magical item'],
        ]},
        { type: 'tip', text: 'Total 4 equipment slots. Choosing what to bring is part of the strategy.' },
      ]
    },
    {
      id: 'stress-boa',
      title: 'Stress & Consequences',
      content: [
        { type: 'text', text: 'Same as Fate Core, but accounting for Darkness. Some consequences may increase Darkness level instead of the usual effect.' },
        { type: 'table', headers: ['Type', 'Absorbs', 'Recovery'], rows: [
          ['Stress (depends on skills)', 'Damage ≤ box number', 'After scene'],
          ['Mild consequence', '2 damage', 'After next scene'],
          ['Moderate consequence', '4 damage', 'After session'],
          ['Severe consequence', '6 damage', 'After milestone'],
        ]},
      ]
    },
    {
      id: 'skills-boa',
      title: 'Skills',
      content: [
        { type: 'text', text: 'Skills follow the Fate Core pyramid but include setting-specific ones for the United Kingdom.' },
        { type: 'list', items: [
          'Standard Fate Core skill pyramid',
          'Some skills have "dark applications" at the cost of increased Darkness',
          'Stunts can be tied to Darkness — more powerful but more dangerous',
        ]},
      ]
    },
  ]
}

export const ALL_SYSTEM_RULES_EN = [fateCoreEn, faeEn, bookOfAshesEn]
