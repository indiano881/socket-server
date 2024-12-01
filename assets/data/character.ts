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
        name: "Detective mode",
        description: "Reveals one exact color and position in the secret combination, slicing through the mystery.",
        image: "/images/powers/power-detective.svg"
      },
      {
        name: "Adrenaline Time Boost",
        description: "Generate a random boost of seconds between 3 and 10",
        image: "/images/powers/time-plus.svg"
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
        name: "Adrenaline Time Boost",
        description: "Generate a random boost of seconds between 3 and 10",
        image: "/images/powers/time-plus.svg"
      },
      {
        name: "Detective mode",
        description: "Reveals one exact color and position in the secret combination, slicing through the mystery.",
        image: "/images/powers/power-detective.svg"
      },
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
        name: "Detective mode",
        description: "Reveals one exact color and position in the secret combination, slicing through the mystery.",
        image: "/images/powers/power-detective.svg"
      },
      {
        name: "Adrenaline Time Boost",
        description: "Generate a random boost of seconds between 3 and 10",
        image: "/images/powers/time-plus.svg"
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
        name: "Mist of Madness",
        description: "Tricks your mind and seight for 5 seconds",
        image: "/images/powers/mist2.svg"
      },
      {
        name: "Detective mode",
        description: "Reveals one exact color and position in the secret combination, slicing through the mystery.",
        image: "/images/powers/power-detective.svg"
      },
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
        name: "Time control",
        description: "Heris able to add 5 seconds extra to the countdown",
        image: "/images/powers/five-plus.svg"
      },
      {
        name: "Adrenaline Time Boost",
        description: "Generate a random boost of seconds between 3 and 10",
        image: "/images/powers/time-plus.svg"
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
        name: "Time control",
        description: "Heris able to add 5 seconds extra to the countdown",
        image: "/images/powers/five-plus.svg"
      },
      {
        name: "Adrenaline Time Boost",
        description: "Generate a random boost of seconds between 3 and 10",
        image: "/images/powers/time-plus.svg"
      }
    ]
  }
];
