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
          "worked hard at school and getting lots of faces on the amaze board",
          "showed lots of kindness to others, helping his friends who were sad",
          "fantastic creativity in your fantastic drawings",
        ],
      },
      {
        name: "Dexter",
        age: 13,
        gender: "boy",
        achievements: [
          "Improved a huge amount at school this year, putting in extra effort and getting great results",
          "practised hard at basketball, becoming a great player, team member and leader",
          "has been a fantastic big brother and growing into a very kind young man",
        ],
      },
      {
        name: "Luke",
        age: 4,
        gender: "boy",
        achievements: [
          "was very brave this year when playing Joseph in the nativity play.",
          "has start learning to read and write. His writing is excellent and very neat!",
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
