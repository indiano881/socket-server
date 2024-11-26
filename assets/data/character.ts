// Define the types for character powers
interface PowerType {
  name: string;
  description: string;
  image: string;
}

// Define the type for characters
interface CharacterType {
  id: number;
  name: string;
  image: string;
  slug: string;
  category: string;
  description: string;
  powers: PowerType[];
}

export const Characters: CharacterType[] = [
  {
    id: 1,
    name: "Wolverine",
    image: "/images/characters/wolverine.svg",
    slug: "wolverine",
    category: "Balance",
    description: "Wolverine is a powerful mutant known for his regenerative healing ability and adamantium claws.",
    powers: [
      {
        name: "Regeneration",
        description: "Instantly restore up to 3 guesses if you lose a turn, ensuring your survival in the game longer.",
        image: "/images/powers/power-hearth.svg"
      },
      {
        name: "Adamantium Claws",
        description: "Reveals one exact color and position in the secret combination, slicing through the mystery.",
        image: "/images/powers/power-time.svg"
      }
    ]
  },
  {
    id: 2,
    name: "Super Mario",
    image: "/images/characters/mario.svg",
    slug: "super-mario",
    category: "Balance",
    description: "Super Mario is the iconic plumber known for saving Princess Peach and battling Bowser.",
    powers: [
      {
        name: "Super Jump",
        description: "Skip over the current row, letting you start fresh on the next attempt with 2 extra hints.",
        image: "/images/powers/power-time.svg"
      },
      {
        name: "Fireball",
        description: "Burn away two incorrect colors from the pool, narrowing down your options.",
        image: "/images/powers/power-atomic.svg"
      }
    ]
  },
  {
    id: 3,
    name: "Heisenberg",
    image: "/images/characters/heisenberg.svg",
    slug: "heisenberg",
    category: "Defensive",
    description: "Heisenberg, also known as Walter White, is a chemistry teacher turned drug kingpin from the series Breaking Bad.",
    powers: [
      {
        name: "Chemistry Expertise",
        description: "Reveal all colors in the correct combination but not their positions, giving you a powerful clue.",
        image: "/images/powers/power-detective.svg"
      },
      {
        name: "Master Strategist",
        description: "Switch the positions of two pegs in your guess to instantly validate if they're correct.",
        image: "/images/powers/power-gun.svg"
      }
    ]
  },
  {
    id: 4,
    name: "Jigsaw",
    image: "/images/characters/saw-enigma.svg",
    slug: "jigsaw",
    category: "Aggressive",
    description: "Jigsaw, or John Kramer, is the mastermind behind the twisted games in the Saw series, testing people's will to survive.",
    powers: [
      {
        name: "Trap Creation",
        description: "Set a trap to lock one correct color in its position, ensuring it cannot be removed in future guesses.",
        image: "/images/powers/power-detective.svg"
      },
      {
        name: "Psychological Manipulation",
        description: "Force an automatic hint reveal by deducting one turn from your total attempts.",
        image: "/images/powers/power-atomic.svg"
      }
    ]
  },
  {
    id: 5,
    name: "Freddy",
    image: "/images/characters/freddy.svg",
    slug: "freddy-krueger",
    category: "Aggressive",
    description: "Freddy Krueger is the terrifying antagonist from the Nightmare on Elm Street series, known for haunting his victims' dreams.",
    powers: [
      {
        name: "Dream Manipulation",
        description: "Scramble the current guess to randomly rearrange colors, possibly solving part of the puzzle.",
        image: "/images/powers/power-hearth.svg"
      },
      {
        name: "Immortality in Dreams",
        description: "Resurrect one lost turn, giving you another chance to crack the code.",
        image: "/images/powers/power-time.svg"
      }
    ]
  },
  {
    id: 6,
    name: "Flash",
    image: "/images/characters/flash.svg",
    slug: "flash",
    category: "Defensive",
    description: "Flash is a superhero known for his incredible speed, which allows him to move and think at lightning-fast speeds.",
    powers: [
      {
        name: "time-plus-five",
        description: "Instantly skip to the next row while revealing the number of correctly placed colors.",
        image: "/images/powers/five-plus.svg"
      },
      {
        name: "time-plus-random",
        description: "Undo your last move and reattempt the same row without penalty.",
        image: "/images/powers/time-plus.svg"
      }
    ]
  }
];
