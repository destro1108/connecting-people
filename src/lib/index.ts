export const relations = ["Friends", "Brothers"] as const;

export type relationsType = typeof relations[number] | null;
