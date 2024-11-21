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
  export const Characters= [
    {id: 1,
    name: "Wolverine",
    image: "/images/characters/wolverine.svg",
    slug: "wolverine",
    category: "Balance",
    description: "Wolverine is a powerful mutant known for his regenerative healing ability and adamantium claws.",
    powers: [
      {
        name: "Regeneration",
        description: "Wolverine can heal from wounds almost instantly, making him nearly invincible in battle.",
        image: "/images/powers/power-hearth.svg"
      },
      {
        name: "Adamantium Claws",
        description: "Indestructible claws that can cut through almost anything, giving Wolverine a deadly edge in combat.",
        image: "/images/powers/power-time.svg"
      }
    ]},
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
          description: "Mario's signature high jump allows him to reach high platforms and avoid obstacles.",
          image: "/images/powers/power-time.svg"
        },
        {
          name: "Fireball",
          description: "Mario can throw fireballs to defeat enemies after acquiring a Fire Flower.",
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
          description: "Uses his extensive knowledge of chemistry to create highly potent substances and outsmart opponents.",
          image: "/images/powers/power-detective.svg"
        },
        {
          name: "Master Strategist",
          description: "Capable of devising intricate plans and staying one step ahead of enemies.",
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
          description: "Designs complex traps and challenges to test his victims' will and ingenuity.",
          image: "/images/powers/power-detective.svg"
        },
        {
          name: "Psychological Manipulation",
          description: "Able to break people mentally, forcing them to confront their morals and choices.",
          image: "/images/powers/power-atomic.svg"
        }
      ]
    },
    {
      id: 5,
      name: "Freddy Krueger",
      image: "/images/characters/freddy.svg",
      slug: "freddy-krueger",
      category: "Aggressive",
      description: "Freddy Krueger is the terrifying antagonist from the Nightmare on Elm Street series, known for haunting his victims' dreams.",
      powers: [
        {
          name: "Dream Manipulation",
          description: "Freddy can invade and control the dreams of his victims, making their worst nightmares come to life.",
          image: "/images/powers/power-hearth.svg"
        },
        {
          name: "Immortality in Dreams",
          description: "Freddy is nearly invincible in the dream world, using it to his advantage to toy with and terrorize his victims.",
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
          name: "Super Speed",
          description: "Flash can run at superhuman speeds, allowing him to move faster than the eye can see and travel great distances instantly.",
          image: "/images/powers/power-time.svg"
        },
        {
          name: "Speed Force Manipulation",
          description: "Flash can tap into the Speed Force to phase through objects, time travel, and generate powerful energy bursts.",
          image: "/images/powers/power-atomic.svg"
        }
      ]
    }
]
 
  