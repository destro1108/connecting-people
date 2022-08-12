export const relations = ["Friends", "Brothers"] as const;

export type relationsType = typeof relations[number] | null;

export const saveToLocalStorage = (key: string, data: string) => {
  localStorage.setItem(key, data);
};

export const fetchFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};
