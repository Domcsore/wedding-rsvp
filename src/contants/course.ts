export const COURSE = {
  STARTER: { id: 0, name: "Starter" },
  MAIN: { id: 1, name: "Main" },
} as const;

export type Course = keyof typeof COURSE;
