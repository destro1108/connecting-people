import { PersonType } from "../components/person";

export const sampleData1: { [id: string]: PersonType } = {
  "1660219192937": {
    name: "Goku",
    connections: [
      {
        relation: "Friend",
        id: 1660219210040,
      },
      {
        relation: "Brother",
        id: 1660227768419,
      },
      {
        relation: "Friend",
        id: 1660219204729,
      },
    ],
  },
  "1660219204729": {
    name: "Vegeta",
    connections: [
      {
        relation: "Friend",
        id: 1660219210040,
      },
      {
        relation: "Brother",
        id: 1660227768419,
      },
      {
        relation: "Friend",
        id: 1660219192937,
      },
    ],
  },
  "1660219210040": {
    name: "Tanjiro",
    connections: [
      {
        relation: "Friend",
        id: 1660219192937,
      },
      {
        relation: "Friend",
        id: 1660219204729,
      },
      {
        relation: "Friend",
        id: 1660297622557,
      },
    ],
  },
  "1660227768419": {
    name: "Luffy",
    connections: [
      {
        relation: "Brother",
        id: 1660219192937,
      },
      {
        relation: "Brother",
        id: 1660219204729,
      },
      {
        relation: "Brother",
        id: 1660297622557,
      },
    ],
  },
  "1660297622557": {
    name: "Gojo",
    connections: [
      {
        relation: "Friend",
        id: 1660219210040,
      },
      {
        relation: "Brother",
        id: 1660227768419,
      },
    ],
  },
};

export const sampleData2: { [id: string]: PersonType } = {
  "1660299346020": {
    name: "Sameer",
    connections: [
      {
        relation: "Friend",
        id: 1660299350516,
      },
      {
        relation: "Friend",
        id: 1660299367548,
      },
    ],
  },
  "1660299350516": {
    name: "Aayushi",
    connections: [
      {
        relation: "Friend",
        id: 1660299346020,
      },
      {
        relation: "Friend",
        id: 1660299359308,
      },
    ],
  },
  "1660299359308": {
    name: "Bhaskar",
    connections: [
      {
        relation: "Friend",
        id: 1660299350516,
      },
      {
        relation: "Friend",
        id: 1660299374028,
      },
    ],
  },
  "1660299367548": {
    name: "Kamalnath Sharma",
    connections: [
      {
        relation: "Friend",
        id: 1660299346020,
      },
      {
        relation: "Friend",
        id: 1660299374028,
      },
    ],
  },
  "1660299374028": {
    name: "Shanti Kumar Saha",
    connections: [
      {
        relation: "Friend",
        id: 1660299367548,
      },
      {
        relation: "Friend",
        id: 1660299359308,
      },
    ],
  },
};
