import { PersonType } from "../components/person/person";

export const relations = ["Friend", "Brother"] as const;

export type relationsType = typeof relations[number] | null;

export const saveToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const fetchFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

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
