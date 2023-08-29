import { ModeDivisionType } from "../Models/MCA_AYIM/modeDivision";

export interface ModeDivision {
    ID: number;
    name: string;
}

export const modeList = [
    "standard",
    "taiko",
    "fruits",
    "mania",
];

// Having this as a function instead of a constant avoids possible circular dependencies and undefined errors on instance startup
export function modeIDToMode () {
    return {
        [ModeDivisionType.standard]: "osu",
        [ModeDivisionType.taiko]: "taiko",
        [ModeDivisionType.fruits]: "fruits",
        [ModeDivisionType.mania]: "mania",
        [ModeDivisionType.storyboard]: "osu",
    } as { [key in ModeDivisionType]: Mode };
}

export type Mode = "osu" | "taiko" | "fruits" | "mania";