import type { Difficulty } from "./Difficulty";
import type { DifficultyLabel } from "./DifficultyLabel";

export const DifficultyLabelToKeyMap: Record<DifficultyLabel, Difficulty> = {
    Easy: 'easy',
    Medium: 'medium',
    Hard: 'hard',
};
