// src/data/stuntLibraryEn.ts
import type { LibraryStunt } from './stuntLibrary'

export const stuntLibraryEn: LibraryStunt[] = [
  // ATHLETICS
  { id: 'lib-athletics-1', name: 'Acrobat', description: '+2 to Athletics when overcoming obstacles using jumps, rolls or acrobatics.', skillId: 'athletics', systems: ['all'] },
  { id: 'lib-athletics-2', name: 'Dodge', description: '+2 to Athletics when defending against physical attacks while moving.', skillId: 'athletics', systems: ['all'] },
  { id: 'lib-athletics-3', name: 'Sprinter', description: 'You may move two zones for free instead of one when using Athletics for movement.', skillId: 'athletics', systems: ['all'] },
  { id: 'lib-athletics-4', name: "Cat's Landing", description: 'You never take stress from falling as long as your hands are free.', skillId: 'athletics', systems: ['all'] },
  { id: 'lib-athletics-5', name: 'Parkour', description: 'When creating an advantage using the environment (walls, rooftops), gain an additional free invoke.', skillId: 'athletics', systems: ['all'] },
  // BURGLARY
  { id: 'lib-burglary-1', name: 'Lockmaster', description: '+2 to Burglary when picking locks and disabling mechanical traps.', skillId: 'burglary', systems: ['all'] },
  { id: 'lib-burglary-2', name: 'Light Fingers', description: '+2 to Burglary when pickpocketing or silently stealing items.', skillId: 'burglary', systems: ['all'] },
  { id: 'lib-burglary-3', name: 'Think Like a Guard', description: 'You may use Burglary instead of Investigate when studying security systems.', skillId: 'burglary', systems: ['all'] },
  { id: 'lib-burglary-4', name: 'Quick Crack', description: 'Once per scene you may pick a simple lock or bypass light security without a roll.', skillId: 'burglary', systems: ['all'] },
  { id: 'lib-burglary-5', name: 'Silent as Shadow', description: '+2 to Burglary when infiltrating buildings while still undetected.', skillId: 'burglary', systems: ['all'] },
  // CONTACTS
  { id: 'lib-contacts-1', name: 'Right Person for the Job', description: '+2 to Contacts when looking for a specialist or expert in an unfamiliar place.', skillId: 'contacts', systems: ['all'] },
  { id: 'lib-contacts-2', name: 'Street Rumors', description: 'You may use Contacts instead of Investigate to find out what is happening in town.', skillId: 'contacts', systems: ['all'] },
  { id: 'lib-contacts-3', name: 'Friend Everywhere', description: 'Once per session you may declare you have an acquaintance in any location without a roll.', skillId: 'contacts', systems: ['all'] },
  { id: 'lib-contacts-4', name: 'Informant Network', description: '+2 to Contacts when gathering information about criminal structures or secret organizations.', skillId: 'contacts', systems: ['all'] },
  { id: 'lib-contacts-5', name: 'Recommendation', description: 'You may spend free invokes from Contacts on Rapport rolls in the same scene.', skillId: 'contacts', systems: ['all'] },
  // CRAFTS
  { id: 'lib-crafts-1', name: 'MacGyver', description: '+2 to Crafts when repairing equipment in the field without proper tools.', skillId: 'crafts', systems: ['all'] },
  { id: 'lib-crafts-2', name: 'Quick Build', description: 'You may create an improvised weapon or tool in one action.', skillId: 'crafts', systems: ['all'] },
  { id: 'lib-crafts-3', name: 'Weak Point', description: '+2 to Crafts when studying a mechanism or structure — you find the vulnerability.', skillId: 'crafts', systems: ['all'] },
  { id: 'lib-crafts-4', name: 'Alchemist', description: 'You may use Crafts instead of Lore when creating potions and chemical substances.', skillId: 'crafts', systems: ['all'] },
  { id: 'lib-crafts-5', name: 'Upgrade', description: 'Once per session you may improve a weapon or piece of equipment — it gives +1 to rolls until end of session.', skillId: 'crafts', systems: ['all'] },
  // DECEIVE
  { id: 'lib-deceive-1', name: 'Bulletproof Lie', description: '+2 to Deceive when a character has already believed you at least once in this scene.', skillId: 'deceive', systems: ['all'] },
  { id: 'lib-deceive-2', name: 'Master of Disguise', description: '+2 to Deceive when creating and maintaining a disguise or false identity.', skillId: 'deceive', systems: ['all'] },
  { id: 'lib-deceive-3', name: 'Half-Truth', description: 'You may use Deceive instead of Rapport when manipulating through partial truths.', skillId: 'deceive', systems: ['all'] },
  { id: 'lib-deceive-4', name: 'Misdirection', description: 'Once per scene you may attack with Deceive leaving no trace — the target does not realize they were deceived.', skillId: 'deceive', systems: ['all'] },
  { id: 'lib-deceive-5', name: 'Double Agent', description: "+2 to Deceive when pretending to be the enemy's ally.", skillId: 'deceive', systems: ['all'] },
  // DRIVE
  { id: 'lib-drive-1', name: 'Experienced Rider', description: '+2 to Drive when operating under stress.', skillId: 'drive', systems: ['all'] },
  { id: 'lib-drive-2', name: 'Pursuit', description: '+2 to Drive during chases — whether as pursuer or fugitive.', skillId: 'drive', systems: ['all'] },
  { id: 'lib-drive-3', name: 'Know Every Road', description: 'You may use Drive instead of Lore when navigating familiar terrain.', skillId: 'drive', systems: ['all'] },
  { id: 'lib-drive-4', name: 'Combat Maneuver', description: 'You may attack with Drive by ramming a on-foot opponent — no roll penalty.', skillId: 'drive', systems: ['all'] },
  { id: 'lib-drive-5', name: 'Bonded with My Mount', description: 'Your mount or vehicle has an aspect you may invoke for free once per scene.', skillId: 'drive', systems: ['all'] },
  // EMPATHY
  { id: 'lib-empathy-1', name: 'Read People', description: '+2 to Empathy at a first meeting — you immediately sense their mood.', skillId: 'empathy', systems: ['all'] },
  { id: 'lib-empathy-2', name: 'Listen Between the Lines', description: 'You may use Empathy instead of Investigate to tell if someone is lying.', skillId: 'empathy', systems: ['all'] },
  { id: 'lib-empathy-3', name: 'Support', description: 'Once per scene you may clear a mild consequence from an ally through conversation and attention.', skillId: 'empathy', systems: ['all'] },
  { id: 'lib-empathy-4', name: "Another's Pain", description: "+2 to Empathy when helping a character through an emotional crisis.", skillId: 'empathy', systems: ['all'] },
  { id: 'lib-empathy-5', name: 'Weak Spot', description: "When you succeed at creating an advantage with Empathy, allies get +1 to rolls against that character.", skillId: 'empathy', systems: ['all'] },
  // FIGHT
  { id: 'lib-fight-1', name: 'Crushing Blow', description: '+2 to Fight when attacking an unarmed or significantly weaker opponent.', skillId: 'fight', systems: ['all'] },
  { id: 'lib-fight-2', name: 'Counter-attack', description: 'When you successfully defend in melee, you may deal damage equal to the margin of the rolls.', skillId: 'fight', systems: ['all'] },
  { id: 'lib-fight-3', name: 'Whirlwind', description: 'Once per scene you may attack all enemies in your zone with a single roll.', skillId: 'fight', systems: ['all'] },
  { id: 'lib-fight-4', name: 'Weaponsmith', description: 'You may use Fight instead of Crafts when evaluating or repairing weapons.', skillId: 'fight', systems: ['all'] },
  { id: 'lib-fight-5', name: 'Intimidating Stare', description: '+2 to Fight when creating an advantage through intimidation — showing force in battle.', skillId: 'fight', systems: ['all'] },
  // INVESTIGATE
  { id: 'lib-investigate-1', name: 'Sharp Eye', description: '+2 to Investigate when examining a crime scene or conducting a search.', skillId: 'investigate', systems: ['all'] },
  { id: 'lib-investigate-2', name: 'Deduction', description: 'You may use Investigate instead of Lore when analyzing clues in your area of expertise.', skillId: 'investigate', systems: ['all'] },
  { id: 'lib-investigate-3', name: "It's All Connected", description: 'On a success with style at Investigate, you gain two clues instead of one.', skillId: 'investigate', systems: ['all'] },
  { id: 'lib-investigate-4', name: 'Surveillance', description: '+2 to Investigate when tailing a character or conducting covert observation.', skillId: 'investigate', systems: ['all'] },
  { id: 'lib-investigate-5', name: 'I See the Lie', description: 'Once per scene you may ask the GM one question about a character — they must answer honestly.', skillId: 'investigate', systems: ['all'] },
  // LORE
  { id: 'lib-lore-1', name: 'Walking Encyclopedia', description: '+2 to Lore when answering questions about history, science or culture.', skillId: 'lore', systems: ['all'] },
  { id: 'lib-lore-2', name: 'Field Medic', description: 'You may use Lore to treat physical consequences — once per scene.', skillId: 'lore', systems: ['all'] },
  { id: 'lib-lore-3', name: 'Know the Enemy', description: "+2 to Lore when creating an advantage related to a specific creature type's weaknesses or habits.", skillId: 'lore', systems: ['all'] },
  { id: 'lib-lore-4', name: 'Quick Learner', description: 'Once per session you may declare you possess needed knowledge in any field without a roll.', skillId: 'lore', systems: ['all'] },
  { id: 'lib-lore-5', name: 'Tactician', description: 'You may use Lore instead of Fight when creating advantages through tactical analysis.', skillId: 'lore', systems: ['all'] },
  // NOTICE
  { id: 'lib-notice-1', name: 'Sixth Sense', description: '+2 to Notice when detecting an ambush or hidden threat.', skillId: 'notice', systems: ['all'] },
  { id: 'lib-notice-2', name: 'Eagle Eye', description: '+2 to Notice at long range and in darkness.', skillId: 'notice', systems: ['all'] },
  { id: 'lib-notice-3', name: 'Always Alert', description: 'You are never caught off guard — you always act in the first exchange of a surprise encounter.', skillId: 'notice', systems: ['all'] },
  { id: 'lib-notice-4', name: 'Read the Room', description: "You may use Notice instead of Empathy when assessing a crowd's or group's mood.", skillId: 'notice', systems: ['all'] },
  { id: 'lib-notice-5', name: 'Find Weaknesses', description: 'Once per scene after observing an opponent: +2 to the next attack against them.', skillId: 'notice', systems: ['all'] },
  // PHYSIQUE
  { id: 'lib-physique-1', name: 'Iron Constitution', description: '+2 to Physique when resisting poison, disease or extreme conditions.', skillId: 'physique', systems: ['all'] },
  { id: 'lib-physique-2', name: 'Living Wall', description: '+2 to Physique when shielding allies — you take the hit.', skillId: 'physique', systems: ['all'] },
  { id: 'lib-physique-3', name: 'Unbending', description: 'Once per scene you may ignore a mild consequence and keep acting.', skillId: 'physique', systems: ['all'] },
  { id: 'lib-physique-4', name: 'Mountain Strength', description: '+2 to Physique when overcoming obstacles requiring raw strength.', skillId: 'physique', systems: ['all'] },
  { id: 'lib-physique-5', name: 'Battle-Hardened', description: 'Once per scene you may absorb one mild physical consequence without writing it down.', skillId: 'physique', systems: ['all'] },
  // PROVOKE
  { id: 'lib-provoke-1', name: 'Cold Stare', description: '+2 to Provoke when intimidating a single opponent at the start of a conflict.', skillId: 'provoke', systems: ['all'] },
  { id: 'lib-provoke-2', name: 'Rattle', description: 'You may use Provoke to attack mental stress even in a physical conflict.', skillId: 'provoke', systems: ['all'] },
  { id: 'lib-provoke-3', name: 'Battle Cry', description: 'Once per scene: +2 to Provoke when attacking all enemies in a zone with mental stress.', skillId: 'provoke', systems: ['all'] },
  { id: 'lib-provoke-4', name: 'Pressure', description: '+2 to Provoke when the opponent already has at least one consequence.', skillId: 'provoke', systems: ['all'] },
  { id: 'lib-provoke-5', name: 'Weak Point', description: 'On a successful advantage creation with Provoke, the opponent gets -1 to Will rolls until end of scene.', skillId: 'provoke', systems: ['all'] },
  // RAPPORT
  { id: 'lib-rapport-1', name: 'First Impression', description: '+2 to Rapport at a first meeting with a character.', skillId: 'rapport', systems: ['all'] },
  { id: 'lib-rapport-2', name: 'Rousing Speech', description: 'Once per scene you may give allies +1 to their next rolls by delivering a short speech.', skillId: 'rapport', systems: ['all'] },
  { id: 'lib-rapport-3', name: 'Common Ground', description: 'You may use Rapport instead of any social skill once per scene.', skillId: 'rapport', systems: ['all'] },
  { id: 'lib-rapport-4', name: 'Charismatic Leader', description: '+2 to Rapport when convincing a group or crowd.', skillId: 'rapport', systems: ['all'] },
  { id: 'lib-rapport-5', name: 'Sympathy', description: "You may use Rapport instead of Empathy when relieving an ally's mental stress.", skillId: 'rapport', systems: ['all'] },
  // RESOURCES
  { id: 'lib-resources-1', name: 'Money Talks', description: '+2 to Resources when offering a bribe or paying for an urgent service.', skillId: 'resources', systems: ['fate-core'] },
  { id: 'lib-resources-2', name: 'Stash', description: "Once per session you may declare you have any ordinary item on hand — it's just there.", skillId: 'resources', systems: ['fate-core'] },
  { id: 'lib-resources-3', name: 'Connections Through Wealth', description: 'You may use Resources instead of Contacts when money can open the right door.', skillId: 'resources', systems: ['fate-core'] },
  { id: 'lib-resources-4', name: 'Investments', description: '+2 to Resources when acting in your home city or region — you have business connections there.', skillId: 'resources', systems: ['fate-core'] },
  { id: 'lib-resources-5', name: 'Premium Equipment', description: 'Once per session you may give an ally an item that grants +1 until end of session.', skillId: 'resources', systems: ['fate-core'] },
  // SHOOT
  { id: 'lib-shoot-1', name: 'Sharpshooter', description: '+2 to Shoot when attacking from cover or an advantageous position.', skillId: 'shoot', systems: ['all'] },
  { id: 'lib-shoot-2', name: 'Quick Draw', description: 'You may attack with Shoot at the start of a conflict before the opponent has reacted.', skillId: 'shoot', systems: ['all'] },
  { id: 'lib-shoot-3', name: 'Aimed Fire', description: "+2 to Shoot if you didn't move in the previous exchange.", skillId: 'shoot', systems: ['all'] },
  { id: 'lib-shoot-4', name: 'Suppressive Fire', description: "Once per scene you may create a 'Under Fire' aspect on a whole zone with a single Shoot roll.", skillId: 'shoot', systems: ['all'] },
  { id: 'lib-shoot-5', name: 'Long Shot', description: 'You do not take penalties for shooting at long range.', skillId: 'shoot', systems: ['all'] },
  // STEALTH
  { id: 'lib-stealth-1', name: 'Melt into Shadow', description: '+2 to Stealth when hiding in darkness or poor lighting.', skillId: 'stealth', systems: ['all'] },
  { id: 'lib-stealth-2', name: 'Silent Step', description: '+2 to Stealth while moving — you make no noise.', skillId: 'stealth', systems: ['all'] },
  { id: 'lib-stealth-3', name: 'Strike from Shadow', description: '+2 to Fight or Shoot when attacking from a hidden position + free boost.', skillId: 'stealth', systems: ['all'] },
  { id: 'lib-stealth-4', name: 'Vanish', description: 'Once per scene you may disappear from sight even with witnesses — one Stealth roll.', skillId: 'stealth', systems: ['all'] },
  { id: 'lib-stealth-5', name: 'Blend In', description: 'You may use Stealth instead of Deceive when mixing into a group of people.', skillId: 'stealth', systems: ['all'] },
  // WILL
  { id: 'lib-will-1', name: 'Unbroken', description: '+2 to Will when defending against mental attacks and intimidation.', skillId: 'will', systems: ['all'] },
  { id: 'lib-will-2', name: 'Iron Will', description: 'Once per scene you may reroll a failed Will roll.', skillId: 'will', systems: ['all'] },
  { id: 'lib-will-3', name: 'Focus', description: '+2 to Will when concentrating on a difficult mental task under pressure.', skillId: 'will', systems: ['all'] },
  { id: 'lib-will-4', name: 'Composure', description: 'You may use Will instead of Empathy when resisting social pressure.', skillId: 'will', systems: ['all'] },
  { id: 'lib-will-5', name: 'Through the Pain', description: 'Once per scene you may ignore the penalty from a mild consequence on one roll.', skillId: 'will', systems: ['all'] },
  // PRAYER (Book of Ashes)
  { id: 'lib-prayer-1', name: 'Light of Faith', description: '+2 to Prayer when attacking creatures of Darkness or undead.', skillId: 'prayer', systems: ['book-of-ashes'] },
  { id: 'lib-prayer-2', name: 'Blessing', description: 'Once per scene you may give an ally +1 to their next roll by reciting a short prayer.', skillId: 'prayer', systems: ['book-of-ashes'] },
  { id: 'lib-prayer-3', name: 'Cleansing', description: 'You may use Prayer instead of Lore when removing curses and dark aspects.', skillId: 'prayer', systems: ['book-of-ashes'] },
  { id: 'lib-prayer-4', name: 'Fire Ward', description: '+2 to Prayer when creating a protective aspect against dark magic.', skillId: 'prayer', systems: ['book-of-ashes'] },
  { id: 'lib-prayer-5', name: 'Flame Within', description: 'Once per session you may fully restore one mental stress box through prayer.', skillId: 'prayer', systems: ['book-of-ashes'] },
  // TRAVEL (Book of Ashes)
  { id: 'lib-travel-1', name: 'Tracker', description: '+2 to Travel when tracking creatures or people by their trail.', skillId: 'travel', systems: ['book-of-ashes'] },
  { id: 'lib-travel-2', name: 'Know These Lands', description: 'You may use Travel instead of Lore on questions of geography and local nature.', skillId: 'travel', systems: ['book-of-ashes'] },
  { id: 'lib-travel-3', name: 'Light Foot', description: '+2 to Travel during forced marches and travel in difficult conditions.', skillId: 'travel', systems: ['book-of-ashes'] },
  { id: 'lib-travel-4', name: 'Wayfinding', description: 'Once per session you may find a safe route without a roll.', skillId: 'travel', systems: ['book-of-ashes'] },
  { id: 'lib-travel-5', name: 'Survivalist', description: 'You may use Travel instead of Physique when surviving in the wild.', skillId: 'travel', systems: ['book-of-ashes'] },
  // DEALS (Book of Ashes)
  { id: 'lib-deals-1', name: 'Hard Bargain', description: '+2 to Deals when buying or selling — you always find the best price.', skillId: 'deals', systems: ['book-of-ashes'] },
  { id: 'lib-deals-2', name: 'Social Healing', description: 'You may use Deals to relieve mental stress through the right conversation and negotiation.', skillId: 'deals', systems: ['book-of-ashes'] },
  { id: 'lib-deals-3', name: 'The Deal', description: 'Once per session you may strike a deal that grants a permanent free invoke on an aspect until end of session.', skillId: 'deals', systems: ['book-of-ashes'] },
  { id: 'lib-deals-4', name: 'Know the Price of Everything', description: '+2 to Deals when appraising magical items, relics, or unusual goods.', skillId: 'deals', systems: ['book-of-ashes'] },
  { id: 'lib-deals-5', name: 'Mutual Benefit', description: 'You may use Deals instead of Rapport when proposing a fair exchange of services.', skillId: 'deals', systems: ['book-of-ashes'] },
]
