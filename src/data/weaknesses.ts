

export type PokemonTypeName = 'Normal' | 'Fire' | 'Water' | 'Electric' | 'Grass' | 'Ice' | 'Fighting' | 'Poison' | 'Ground' | 'Flying' | 'Psychic' | 'Bug' | 'Rock' | 'Ghost' | 'Dragon' | 'Dark' | 'Steel' | 'Fairy';
export type EffectivenessModifier = 0 | 0.25 | 0.5 | 1 | 2 | 4;
export type TypeDetailList = {
    [key in PokemonTypeName]: TypeDetail;
};
export type TypeMatchupRelationship =
    | 'neutral'            // Both types deal 1x to each other
    | 'inverse'            // One deals 2x AND resists the other (0.5x) — the classic matchup
    | 'mutuallyResistant'  // Both deal ≤0.5x to each other (includes mutual immunity)
    | 'mutuallyVulnerable' // Both deal ≥2x to each other
    | 'asymmetric';        // Doesn't fit the above patterns

export type Effectiveness = {
    modifier: EffectivenessModifier;
    anecdote: string;
    difficulty: MatchupDifficulty;
    relationship: TypeMatchupRelationship;
}
export type TypeDetail = {
    effectiveness: { [key in PokemonTypeName]: Effectiveness };
    color: string;
    name: PokemonTypeName;
    icon: any;
    bidirectionalStrengths?: string;
    bidirectionalWeakenesses?: string;
    asymetrical?: string;
}

import BugTypeIcon from '../assets/type-icons/bug.svg';
import DarkTypeIcon from '../assets/type-icons/dark.svg';
import DragonTypeIcon from '../assets/type-icons/dragon.svg';
import ElectricTypeIcon from '../assets/type-icons/electric.svg';
import FairyTypeIcon from '../assets/type-icons/fairy.svg';
import FightingTypeIcon from '../assets/type-icons/fighting.svg';
import FireTypeIcon from '../assets/type-icons/fire.svg';
import FlyingTypeIcon from '../assets/type-icons/flying.svg';
import GhostTypeIcon from '../assets/type-icons/ghost.svg';
import GrassTypeIcon from '../assets/type-icons/grass.svg';
import GroundTypeIcon from '../assets/type-icons/ground.svg';
import IceTypeIcon from '../assets/type-icons/ice.svg';
import NormalTypeIcon from '../assets/type-icons/normal.svg';
import PoisonTypeIcon from '../assets/type-icons/poison.svg';
import PsychicTypeIcon from '../assets/type-icons/psychic.svg';
import RockTypeIcon from '../assets/type-icons/rock.svg';
import SteelTypeIcon from '../assets/type-icons/steel.svg';
import WaterTypeIcon from '../assets/type-icons/water.svg';
import type { Settings } from '../Settings';

export type MatchupDifficulty =
    | 1  // Easy, most people know this.
    | 2  // Medium, some people know this.
    | 3  // Hard, more likely to trick people



// Helpful Case Studies:
// 1. Every Same Type Matchup
// 2. Four Elements + Dragon
// 3. Ground and Rock BS
// 4. Psychic, Ghost, Dark 
// 5. Steel Resistance
// 6. Normal type simplicity
// 7. New Kids (Fairy, Dragon, Steel)



export const MatchupAnecdotes = {
  NormalAndFighting: "A trained fighter beats up the untrained person, but it hurts to get punched in the nose even if a normal person does it (x1).",
  NormalAndRockAndSteel: "Normal people can't break rocks or bend steel (x0.5), but rocks and steel do regular damage to people (x1).",
  NormalAndGhost: "Normies and Ghosts are oblivious to each other (immune both ways).",
  FireAndFire: "Fighting fire with fire is futile (x0.5 both ways).",
  FireAndWater: "Water puts out fire.",
  FireAndGrass: "Fire burns grass.",
  FireAndIce: "Fire melts ice & steel.",
  FireAndGround: "Ground smothers a fire (x2), but fire can still turn sand into glass (x1).",
  FireAndBug: "Spider? Kill it with fire.",
  FireAndRock: "Rocks beat fire by containing it like a rock fire pit ring.",  
  FireAndSteel: "Fire melts ice & steel.",
  FireAndFairy: "Fairy dust burns like anything else (x1), but fairy magic fizzles against flame (x0.5).",
  DragonAndFourElements: "Dragons resist the big four elements (x0.5), but don't do extra damage to them (x1).",
  WaterAndWater: "Water plus water equals more water (x0.5 both ways).",
  WaterAndElectric: "Electricity shocks all the fish in the water (x2), but water can still damage electronics (x1).",
  WaterAndGrass: "Grass absorbs water with its roots.",
  WaterAndPoison: "Poison pollutes, but water dilutes (x1 both ways).",
  WaterAndIce: "Water isn't great for ice (x1) and ice only adds to water (x0.5).",
  WaterAndGroundAndRock: "Water erodes ground and rock (x2), but things in the water take normal damage from rock and ground (x1).",
  WaterAndSteel: "Swords struggle to cut water (x0.5), but water can do some damage to metal depending on if it's stainless or not (x1).",
  ElectricAndGrass: "Plants thrive after thunder storms so they enjoy it (x0.5), but plants don't do extra damage to electricity (x1).",
  ElectricAndGround: "Electricity is nullified by Grounding it (x0) and Ground kills the charge (x2).",
  ElectricAndFlying: "Lightning strikes the flying bird.",
  ElectricAndRock: "Should rocks be resistant to electricity like ground? You'd think so, but they aren't. I don't know what to tell you. This is a rock-hard match-up.",
  ElectricAndElectric: "Electricity plus electricity equals more electricity (x0.5 both ways).",
  ElectricAndSteel: "Metal and electricity normally go well together so they aren't strong against each other, but electricity is more likely to overload a machine (x1) compared to metal causing any trouble for electricity (x0.5).",
  GrassAndGrass: "Trees don't wage war on each other (x0.5 both ways).",
  GrassAndIce: "Ice freezes plants in winter (x2), but evergreens hold strong (x1).",
  GrassAndPoison: "Herbicides poison weeds.",
  GrassAndFlying: "Birds make nests with grass and sticks, while grounded plants can't reach those with flight.",
  GrassAndBug: "Grass is eaten by bugs.",
  GrassAndSteel: "The mower cuts it down every week and it just grows back (x1) — grass can't do a thing to the blade (x0.5).",
  GrassAndDark: "Plants have varying degrees of sunlight they need and fungus even prefers dark. So it's a wash (x1 both ways).",
  GrassAndGroundAndRocks: "Grass roots breaks up ground and rocks (x2). Ground helps plants grow (x0.5), but rocks can still smash plants (x1).",
  IceAndIce: "Cold isn't bothered by more cold (x0.5 both ways).",
  IceAndSteel: "The Ice pick shatters the ice.",
  IceAndGroundAndRock: "Ice freezes ground (x2), but ground can still crush ice (x1). Rock crushes ice (x2), but cold can still crack rocks (x1).",
  IceAndFlying: "Ice freezes flying birds (x2), but birds can still peck ice (x1).",
  IceAndBug: "Bugs survive the winter under bark and in the ground. (x1 both ways).",
  IceAndDragon: "The ice age killed the dinosaurs (x2), but they are still strong enough to break ice (x1).",
  FightingAndPoison: "It's risky to punch a poisonous snake (0.5), but the snake can still bite a fighter (x1).",
  FightingAndGroundAndRock: "Fighters break bricks with their fists (x2), but not the ground (x1).",
  FightingAndFlying: "You can't easily punch a flying bird.",
  FightingAndPsychic: "Brain over brawn. Psychics outsmart and confuse fighters.",
  FightingAndBug: "Bugs are too small to punch, and fighters are too strong to care about bug bites (x0.5 both ways).",
  FightingAndGhost: "You can't punch ghosts (immune), but a ghost can spook a fighter (x1).",
  FightingAndDark: "The fighting hero always beats the dark villain.",
  FightingAndSteel: "Fighters are so strong they can bend steel (x2), but it still hurts to get hit with a metal pipe (x1).",
  FightingAndFairy: "Fairy's Love conquers Fighter's violence.",
  FightingAndIce: "Fighters can break ice with their fists (x2), but cold still slows a fighter (x1).",
  PoisonAndPoison: "Poison plus poison equals more poison (x0.5 both ways).",
  PoisonAndBug: "Poison pesticide hurts bugs (x1), but a venomous spider can't do much to poison (x0.5).",
  PoisonAndPsychic: "Psychics are smart enough to create antidotes (x2), but they still take damage if poisoned (x1).",
  PoisonAndGhost: "Poison doesn't work well on something already dead (x0.5), but ghosts can still haunt poisonous creatures (x1).",
  PoisonAndGroundAndRock: "Ground absorbs poison (resistant and strong against). Rock is resistant to poison (x0.5), but it only does normal damage to it (x1).",
  PoisonAndSteel: "Steel is immune to poison (x0) and it can still chop up a poisonous snake (x1).",
  PoisonAndFairy: "Hate poisons the heart of Fairies.",
  PoisonAndDark: "Poison and Dark are buds, but they can still hurt each other (x1 both ways).",
  FlyingAndRock: "Two birds with one stone.",
  FlyingAndGround: "Ground can't reach flying birds.",
  FlyingAndBug: "The early bird eats the worm.",
  FlyingAndSteel: "A bird struggles to peck through steel (x0.5) but steel can hurt birds like anything else (x1).",
  FlyingAndFlying: "No air superiority if both sides have something in the sky (x1 both ways).",
  BugAndGroundAndRock: "Ground helps bugs (x0.5) but rocks can smash them (x2). Both ground and rocks can still be hurt by bugs (x1).",  
  RockAndRock: "Rocks roll together (x1 both ways).",
  BugAndGhost: "A bug can't bite something with no body (x0.5), but a ghost can still spook anything with nerves (x1).",
  BugAndDark: "Bugs dominate darkness (x2), but other things in the darkness can still hurt bugs (x1).",
  BugAndSteel: "No beetle chews through a steel can (x0.5), but a knife is just ok at killing bugs (x1).",
  BugAndFairy: "Fairies aren't bugged by little critters (x0.5), and fairy magic was never meant for pest control (x1).",
  SteelAndGroundAndRock: "Earth swallows and dominates rocks and metal (x2). While a steel shovel only moves dirt around (x1) and rocks only add to the dirt (x0.5). Steel picks destroy rocks though (x2)",
  SteelAndPsychic: "You can't read the mind of a machine (x0.5), and cold steel has no special edge on a psychic (x1).",
  SteelAndGhost: "Armor can't block what walks through walls, and a ghost gets no grip on cold steel (x1 both ways).",
  SteelAndSteel: "Armor against armor, neither side gets through (x0.5 both ways).",
  SteelAndFairy: "In folklore, iron is used against the Fae.",
  SteelAndDragon: "Dragon claws skid off the knight's plate armor (x0.5), but it's still not easy work slaying a dragon (x1).",
  PsychicAndPsychic: "Two mind readers see each other coming (x0.5 both ways).",
  PsychicAndBug: "Buzzing fly breaks psychic concentration (x2), but bugs can still be crushed with telekinesis (x1)",
  PsychicAndGhost: "Ghosts scare and bewilder Psychics, breaking concentration (x2), but a psychic can still fight the dead just fine (x1).",
  PsychicAndDark: "Psychics terrified of the unknown that lurks in the dark more than anything else. It's so bad that it's completely helpless against the darkness (x0) and the darkness destroys the mind (x2).",
  GhostAndGhost: "Few things can hit a poltergeist harder than another poltergeist (x2 both ways).",
  GhostAndDark: "A dark necromancer dominates the dead",
  GhostAndSteel: "Armor can't block what walks through walls, and a ghost gets no grip on cold steel (x1 both ways).",
  GhostAndFairy: "Fairy tales and ghost stories live on the same shelf. Neither one has the upper hand (x1 both ways).",
  DragonAndDragon: "Witness the absolute destruction of a Kaiju fight (x2 both ways).",
  DragonAndFairy: "In Fairy tales, Dragons are slain at the end (x2). The Fairy's magic completely shields the hero from the dragon (x0).",
  DarkAndDark: "Can't con a con-man (x0.5 both ways).",
  DarkAndFairy: "The shining light of the fairy beats back the darkness."
}

// Create a constant object to hold the type effectiveness data based on the attacking pokemon
export const typeDetailList: TypeDetailList = {
    Normal: {
        name: 'Normal',
        color: '#777',
        icon: NormalTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.NormalAndFighting },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Rock: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.NormalAndRockAndSteel },
            Ghost: { modifier: 0, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.NormalAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.NormalAndRockAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Fire: {
        name: 'Fire',
        color: '#F08030',
        icon: FireTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.FireAndFire },
            Water: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndWater },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndGrass },
            Ice: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndIce },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FireAndGround },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: "" },
            Bug: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndBug },
            Rock: { modifier: 0.5, difficulty: 3, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 0.5, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFourElements },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndSteel },
            Fairy: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FireAndFairy },
        },
    },
    Water: {
        name: 'Water',
        color: '#6890F0',
        icon: WaterTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndWater },
            Water: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.WaterAndWater },
            Electric: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndElectric },
            Grass: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.WaterAndGrass },
            Ice: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndIce },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.WaterAndPoison },
            Ground: { modifier: 2, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndGroundAndRock },
            Flying: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Rock: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndGroundAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 0.5, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFourElements },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Electric: {
        name: 'Electric',
        color: '#F8D030',
        icon: ElectricTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 2, difficulty: 1, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndElectric },
            Electric: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.ElectricAndElectric },
            Grass: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndGrass },
            Ice: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 0, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndGround },
            Flying: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.ElectricAndFlying },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Rock: { modifier: 1, difficulty: 3, relationship: 'neutral', anecdote: MatchupAnecdotes.ElectricAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 0.5, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFourElements },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Grass: {
        name: 'Grass',
        color: '#78C850',
        icon: GrassTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndGrass },
            Water: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.WaterAndGrass },
            Electric: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndGrass },
            Grass: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.GrassAndGrass },
            Ice: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndIce },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 0.5, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndPoison },
            Ground: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndGroundAndRocks },
            Flying: { modifier: 0.5, difficulty: 3, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndFlying },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndBug },
            Rock: { modifier: 2, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndGroundAndRocks },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 0.5, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFourElements },
            Dark: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.GrassAndDark },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Ice: {
        name: 'Ice',
        color: '#96D9D6',
        icon: IceTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndIce },
            Water: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndIce },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 2, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndIce },
            Ice: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.IceAndIce },
            Fighting: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndIce },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndGroundAndRock },
            Flying: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndFlying },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.IceAndBug },
            Rock: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndGroundAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndDragon },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.IceAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Fighting: {
        name: 'Fighting',
        color: '#C22E28',
        icon: FightingTypeIcon,
        effectiveness: {
            Normal: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.NormalAndFighting },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ice: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndIce },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndPoison },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.FightingAndGroundAndRock },
            Flying: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndFlying },
            Psychic: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndPsychic },
            Bug: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.FightingAndBug },
            Rock: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndGroundAndRock },
            Ghost: { modifier: 0, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndDark },
            Steel: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndSteel },
            Fairy: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndFairy },
        },
    },
    Poison: {
        name: 'Poison',
        color: '#A33EA1',
        icon: PoisonTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.WaterAndPoison },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndPoison },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndPoison },
            Poison: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.PoisonAndPoison },
            Ground: { modifier: 0.5, difficulty: 3, relationship: 'inverse', anecdote: MatchupAnecdotes.PoisonAndGroundAndRock },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndPsychic },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndBug },
            Rock: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndGroundAndRock },
            Ghost: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.PoisonAndDark },
            Steel: { modifier: 0, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndSteel },
            Fairy: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.PoisonAndFairy },
        },
    },
    Ground: {
        name: 'Ground',
        color: '#E2BF65',
        icon: GroundTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FireAndGround },
            Water: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndGroundAndRock },
            Electric: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndGround },
            Grass: { modifier: 0.5, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndGroundAndRocks },
            Ice: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndGroundAndRock },
            Fighting: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.FightingAndGroundAndRock },
            Poison: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.PoisonAndGroundAndRock },
            Ground: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Flying: { modifier: 0, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FlyingAndGround },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndGroundAndRock },
            Rock: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Flying: {
        name: 'Flying',
        color: '#A98FF3',
        icon: FlyingTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.ElectricAndFlying },
            Grass: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndFlying },
            Ice: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndFlying },
            Fighting: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndFlying },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 1, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FlyingAndGround },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.FlyingAndFlying },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FlyingAndBug},
            Rock: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FlyingAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FlyingAndSteel },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Psychic: {
        name: 'Psychic',
        color: '#F95587',
        icon: PsychicTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndPsychic },
            Poison: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndPsychic},
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.PsychicAndPsychic },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PsychicAndBug },
            Rock: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ghost: { modifier: 1, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PsychicAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 0, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PsychicAndDark },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndPsychic },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Bug: {
        name: 'Bug',
        color: '#A6B91A',
        icon: BugTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndBug },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.GrassAndBug },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.IceAndBug },
            Fighting: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.FightingAndBug },
            Poison: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndBug },
            Ground: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndGroundAndRock },
            Flying: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FlyingAndBug },
            Psychic: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PsychicAndBug },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Rock: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndGroundAndRock },
            Ghost: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndDark },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndSteel },
            Fairy: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndFairy },
        },
    },
    Rock: {
        name: 'Rock',
        color: '#B6A136',
        icon: RockTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.NormalAndRockAndSteel },
            Fire: { modifier: 2, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndRock },
            Water: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndGroundAndRock },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.ElectricAndRock },
            Grass: { modifier: 1, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndGroundAndRocks },
            Ice: { modifier: 2, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.IceAndGroundAndRock },
            Fighting: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndGroundAndRock },
            Poison: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndGroundAndRock },
            Ground: { modifier: 0.5, difficulty: 2, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Flying: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FlyingAndRock },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 2, difficulty: 2, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndGroundAndRock },
            Rock: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.RockAndRock },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
    Ghost: {
        name: 'Ghost',
        color: '#735797',
        icon: GhostTypeIcon,
        effectiveness: {
            Normal: { modifier: 0, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.NormalAndGhost },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.FightingAndGhost },
            Poison: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndGhost },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.PsychicAndGhost },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.BugAndGhost },
            Rock: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ghost: { modifier: 2, difficulty: 2, relationship: 'mutuallyVulnerable', anecdote: MatchupAnecdotes.GhostAndGhost },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote:  MatchupAnecdotes.GhostAndDark },
            Steel: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote:  MatchupAnecdotes.GhostAndSteel },
            Fairy: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote:  MatchupAnecdotes.GhostAndFairy },
        },
    },
    Dragon: {
        name: 'Dragon',
        color: '#6F35FC',
        icon: DragonTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFourElements },
            Water: { modifier: 1, difficulty: 1, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.DragonAndFourElements },
            Electric: { modifier: 1, difficulty: 1, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.DragonAndFourElements },
            Grass: { modifier: 1, difficulty: 1, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.DragonAndFourElements },
            Ice: { modifier: 1, difficulty: 2, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.IceAndDragon },
            Fighting: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Poison: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Rock: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 2, difficulty: 2, relationship: 'mutuallyVulnerable', anecdote: MatchupAnecdotes.DragonAndDragon },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndDragon },
            Fairy: { modifier: 0, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFairy },
        },
    },
    Dark: {
        name: 'Dark',
        color: '#222',
        icon: DarkTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: MatchupAnecdotes.GrassAndDark },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndDark },
            Poison: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.PoisonAndDark },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote:  MatchupAnecdotes.PsychicAndDark },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndDark },
            Rock: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ghost: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.GhostAndDark },
            Dragon: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dark: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.DarkAndDark },
            Steel: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fairy: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.DarkAndFairy },
        },
    },
    Steel: {
        name: 'Steel',
        color: '#B7B7CE',
        icon: SteelTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote:  MatchupAnecdotes.NormalAndRockAndSteel },
            Fire: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FireAndSteel },
            Water: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.WaterAndSteel },
            Electric: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.ElectricAndSteel },
            Grass: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.GrassAndSteel},
            Ice: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.IceAndSteel },
            Fighting: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FightingAndSteel },
            Poison: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.PoisonAndSteel },
            Ground: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Flying: { modifier: 1, difficulty: 1, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FlyingAndSteel },
            Psychic: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndPsychic },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndSteel },
            Rock: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndGroundAndRock },
            Ghost: { modifier: 1, difficulty: 2, relationship: 'neutral', anecdote: MatchupAnecdotes.SteelAndGhost },
            Dragon: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.SteelAndDragon },
            Dark: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Steel: { modifier: 0.5, difficulty: 2, relationship: 'mutuallyResistant', anecdote: MatchupAnecdotes.SteelAndSteel },
            Fairy: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndFairy },
        },
    },
    Fairy: {
        name: 'Fairy',
        color: '#D685AD',
        icon: FairyTypeIcon,
        effectiveness: {
            Normal: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fire: { modifier: 0.5, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.FireAndFairy },
            Water: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Electric: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Grass: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ice: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Fighting: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.FightingAndFairy },
            Poison: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.PoisonAndFairy },
            Ground: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Flying: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Psychic: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Bug: { modifier: 1, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.BugAndFairy },
            Rock: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Ghost: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
            Dragon: { modifier: 2, difficulty: 3, relationship: 'asymmetric', anecdote: MatchupAnecdotes.DragonAndFairy },
            Dark: { modifier: 2, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.DarkAndFairy },
            Steel: { modifier: 0.5, difficulty: 1, relationship: 'inverse', anecdote: MatchupAnecdotes.SteelAndFairy },
            Fairy: { modifier: 1, difficulty: 1, relationship: 'neutral', anecdote: '' },
        },
    },
};

export type Matchup = {
    attackingType: TypeDetail;
    defendingTypes: TypeDetail[];
}

const difficultyCorrectProbability: Record<MatchupDifficulty, number> = {
    1: 0.85,
    2: 0.65,
    3: 0.45,
};

export const getMatchupCorrectProbability = (matchup: Matchup): number => {
    return matchup.defendingTypes.reduce((probability, defendingType) => {
        const effectiveness = typeDetailList[matchup.attackingType.name].effectiveness[defendingType.name];
        return probability * difficultyCorrectProbability[effectiveness.difficulty];
    }, 1);
}

export const getExpectedScorePercentage = (matchups: Matchup[]): number => {
    if (matchups.length === 0) return 0;

    const expectedCorrectAnswers = matchups.reduce(
        (total, matchup) => total + getMatchupCorrectProbability(matchup),
        0,
    );
    return expectedCorrectAnswers / matchups.length * 100;
}

export type MatchupResults = {
    totalEffectiveness: EffectivenessModifier;
    totalEffectivenessDescription: string;
    totalEffectivenessColor: string;
    breakdown: EffectivenessAgainstType[];
}
export type EffectivenessAgainstType = {
    defendingType: TypeDetail;
    effectiveness: EffectivenessModifier;
}
export const evaluateMatchup = (matchup: Matchup): MatchupResults => {
    let totalEffectiveness: EffectivenessModifier = 1;
    const attackModifiersPerDefendingType: EffectivenessAgainstType[] = [];
    matchup.defendingTypes.forEach(defType => {
        const effectiveness = typeDetailList[matchup.attackingType.name].effectiveness[defType.name].modifier;
        const effectivenessAgainstTypeDetail: EffectivenessAgainstType = {
            defendingType: defType,
            effectiveness,
        };
        attackModifiersPerDefendingType.push(effectivenessAgainstTypeDetail);
        totalEffectiveness = (totalEffectiveness * effectiveness) as EffectivenessModifier;
    });
    return {
        totalEffectiveness,
        totalEffectivenessDescription: getEffectivenessDescription(totalEffectiveness),
        totalEffectivenessColor: getEffectivenessColor(totalEffectiveness),
        breakdown: attackModifiersPerDefendingType
    }
}

export const getEffectivenessDescription = (effectiveness?: EffectivenessModifier): string => {
    const description = effectivenessDetails[effectiveness as EffectivenessModifier]?.description;
    return description || '?????';
}

export const getEffectivenessColor = (effectiveness?: EffectivenessModifier): string => {
    const color = effectivenessDetails[effectiveness as EffectivenessModifier]?.color;
    return color || 'gray';
}

export type EffectivenessLevelDetail = {
    value: EffectivenessModifier;
    buttonText: string;
    easyButtonText?: string;
    description: string;
    helpTitle: string;
    helpText: string;
    helpTextSimple?: string;
    color: string;
}
export const effectivenessDetails: { [key in EffectivenessModifier]: EffectivenessLevelDetail } = {
    0: { 
        value: 0, 
        buttonText: '0x', 
        easyButtonText: 'Immune', 
        description: 'No Effect (x0)', 
        helpTitle: 'Immune', 
        helpText: 'Takes no damage because one of the types of the defending pokemon is entirely immune to damage from the attack type.', 
        helpTextSimple: "Defending pokemon's type is entirely immune to the attack type.", 
        color: '#888' 
    },
    0.25: { 
        value: 0.25, 
        buttonText: '0.25x', 
        easyButtonText: undefined, 
        description: 'Extremely Ineffective (1⁄4)', 
        helpTitle: 'Extremely Ineffective', 
        helpText: "Defending pokemon takes ¼ damage because BOTH of its types are resistant to the attack type.",
        color: '#FFD93B' },
    0.5: { 
        value: 0.5, 
        buttonText: '0.5x', 
        easyButtonText: 'Not very effective', 
        description: 'Not Very Effective (1⁄2)', 
        helpTitle: 'Not Very Effective', 
        helpText: "Defending pokemon takes ½ damage because one of its types are resistant.",
        helpTextSimple: 'Defending pokemon takes ½ damage because their type is resistant to that attack type.',
        color: '#FFA531' 
    },
    1: { 
        value: 1, 
        buttonText: '1x', 
        easyButtonText: 'Regular damage', 
        description: 'Normal Effectiveness (x1)', 
        helpTitle: 'Regular', 
        helpText: 'Defending pokemon takes normal damage. Usually this is because the defending types have no particular weakness or resistance to the attacking type. It can also happen when the defending pokemon has one type that is weak to the attack type and another type that is resistant. In that case they negate each other (0.5 x 2 = 1) resulting in normal damage.', 
        helpTextSimple: 'Defending pokemon takes normal damage from the attack because it is not resistant or weak to that attack type.',
        color: '#FF6B1A' 
    },
    2: { 
        value: 2, 
        buttonText: '2x', 
        easyButtonText: 'Super effective', 
        description: 'Super Effective (2x)', 
        helpTitle: 'Super Effective', 
        helpText: 'Defending pokemon takes double damage because one of its types are weak to the attacking type.', 
        helpTextSimple: 'Defending pokemon takes double damage because they are weak to the attack type.',
        color: '#E63946' 
    },
    4: { 
        value: 4, 
        buttonText: '4x', 
        easyButtonText: undefined, 
        description: 'Extremely Effective (4x)', 
        helpTitle: 'Extremely Effective', 
        helpText: 'Defending pokemon takes quadruple damage because BOTH of its types are weak to the attacking type.', 
        color: '#dd539fff' 
    },
};

export const effectivenessValues: EffectivenessModifier[] = [0, 0.25, 0.5, 1, 2, 4];

export const effectivenessValueDetailList: EffectivenessLevelDetail[] = effectivenessValues.map(value => effectivenessDetails[value]);

// Mulberry32 PRNG — deterministic given the same seed, used for the daily quiz.
function mulberry32(seed: number): () => number {
    let t = seed >>> 0;
    return () => {
        t = (t + 0x6D2B79F5) >>> 0;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
        return ((r ^ (r >>> 14)) >>> 0) / 0x100000000;
    };
}

function matchupKey(m: Matchup): string {
  return m.attackingType.name + '|' + m.defendingTypes.map(d => d.name).sort().join(',');
}

const DAILY_QUESTION_COUNT = 20;

export function getDailyMatchups(count: number, date?: string, isPro: boolean = false): Matchup[] {
    const d = date ? new Date(date + 'T00:00:00') : new Date();
    let seed = d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
    if (isPro) seed += 1_000_000;
    const rng = mulberry32(seed);
    const types = Object.keys(typeDetailList) as PokemonTypeName[];
    const matchups: Matchup[] = [];
    const seen = new Set<string>();

    while (matchups.length < count) {
        const attacking = types[Math.floor(rng() * types.length)];
        const defendingCount = isPro ? Math.floor(rng() * 2) + 1 : 1;
        const defending: PokemonTypeName[] = [];
        while (defending.length < defendingCount) {
            const candidate = types[Math.floor(rng() * types.length)];
            if (!defending.includes(candidate)) defending.push(candidate);
        }
        const newMatchup = {
            attackingType: typeDetailList[attacking],
            defendingTypes: defending.map(t => typeDetailList[t]),
        };
        const key = matchupKey(newMatchup);
        if (!seen.has(key)) {
            seen.add(key);
            matchups.push(newMatchup);
        }
    }

    return matchups;
}

export const getRandomMatchup = (maxDefendingTypes: number = 1): Matchup => {
    const types = Object.keys(typeDetailList) as PokemonTypeName[];
    const attackingType = types[Math.floor(Math.random() * types.length)];
    const defendingTypesCount = Math.floor(Math.random() * maxDefendingTypes) + 1;
    const defendingTypes: PokemonTypeName[] = [];
    for (let i = 0; i < defendingTypesCount; i++) {
        let rndDefendingType = types[Math.floor(Math.random() * types.length)];
        while (defendingTypes.includes(rndDefendingType)) {
            console.log('duplicate defending type found, re-rolling');
            rndDefendingType = types[Math.floor(Math.random() * types.length)];
        }
        defendingTypes.push(rndDefendingType);
    }

    return { attackingType: typeDetailList[attackingType], defendingTypes: defendingTypes.map(dt => typeDetailList[dt]) };
}

function getRandomMatchups(s: Settings): Matchup[] {
const maxDefendingTypes = s.includeDualTypes ? 2 : 1;
  const seen = new Set<string>();
  const queue: Matchup[] = [];
  while (queue.length < s.numberOfQuestions) {
    const matchup = getRandomMatchup(maxDefendingTypes);
    const key = matchupKey(matchup);
    if (!seen.has(key)) {
      seen.add(key);
      queue.push(matchup);
    }
  }
  return queue;
}

export function buildMatchupQueue(s: Settings): Matchup[] {
  if (s.mode === 'daily') {
    return getDailyMatchups(DAILY_QUESTION_COUNT, s.dailyDate, s.dailyMode === 'pro');
  } else {
    return getRandomMatchups(s);
  }
  
}
