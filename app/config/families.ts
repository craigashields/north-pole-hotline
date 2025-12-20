// app/config/families.ts
export type Kid = {
  name: string;
  age?: number;
  achievements: string[];
  gender?: "boy" | "girl";
};
export type FamilyConfig = {
  familyName: string;
  kids: Kid[];
  houseRule?: string;
};
export const FAMILIES: Record<string, FamilyConfig> = {
  default: {
    familyName: "Default",
    kids: [
      {
        name: "Robin",
        age: 5,
        gender: "boy",
        achievements: [
          "worked hard at school",
          "showed kindness to others",
          "fantastic creativity in art and crafts",
        ],
      },
      {
        name: "Dexter",
        age: 13,
        gender: "boy",
        achievements: [
          "was a great helper at home",
          "Improved a lot at school, putting in extra effort",
          "practised basketball and becoming a great player",
        ],
      },
      {
        name: "Luke",
        age: 4,
        gender: "boy",
        achievements: [
          "was brave with everything going on",
          "has start learning to read",
          "made lots of new friends at school",
        ],
      },
    ],
    houseRule:
      "Please speak to one child at a time and ask them to pass the phone after you finish.",
  },
  shields: {
    familyName: "Shields",
    kids: [
      {
        name: "Jack",
        age: 19,
        gender: "boy",
        achievements: [
          "Starting a new college",
          "Taking part in the college drama production",
          "Volunteering at the Sanctuary Cafe",
          "Writing his novel",
        ],
      },
      {
        name: "Josh",
        age: 15,
        gender: "boy",
        achievements: [
          "doing very well at football, a scoring goals",
          "Helping out more at home, especially while dad is away",
          "Climbing to the very top of the climbing wall at school",
          "Learning to horse ride",
        ],
      },
    ],
    houseRule:
      "Please speak to one child at a time and ask them to pass the phone after you finish.",
  },
  abbott: {
    familyName: "Abbott",
    kids: [
      {
        name: "Tilly",
        age: 7,
        gender: "girl",
        achievements: [
          "Has been in 2 drama productions with her theatre school, most recently in Finding Nemo",
          "Being an wonderful bridesmaid for mummy and daddy's wedding",
          "Getting star of the week at school",
        ],
      },
      {
        name: "Trixie",
        age: 4,
        gender: "girl",
        achievements: [
          "Starting school and making new friends",
          "Played a sheep in the nativity play",
          "Being a beautiful bridesmaid for mummy and daddy's wedding",
          "Getting star of the week at school",
        ],
      },
    ],
    houseRule:
      "Please speak to one child at a time and ask them to pass the phone after you finish.",
  },
};
