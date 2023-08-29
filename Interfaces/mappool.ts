import { Beatmap } from "./beatmap";
import { User } from "./user";

export interface Mappool {
    ID:             number;
    createdAt:      Date;
    name:           string;
    abbreviation:   string;
    isPublic:       boolean;
    bannable:       boolean;
    mappackLink?:   string | null;
    mappackExpiry?: Date | null;
    targetSR:       number;
    order:          number;
    slots:          MappoolSlot[];
}

export interface MappoolSlot {
    ID:             number;
    createdAt:      Date;
    name:           string;
    acronym:        string;
    allowedMods?:    number | null;
    userModCount?:   number | null;
    uniqueModCount?: number | null;
    mappool?:       Mappool | null;
    maps:           MappoolMap[];
}

export interface MappoolMap {
    ID:              number;
    createdAt:       Date;
    lastUpdate:      Date;
    order:           number;
    isCustom:        boolean;
    deadline?:        Date | null;
    customThreadID?:  string | null;
    customMessageID?: string | null;
    customMappers?:   User[];
    customBeatmap?:   CustomBeatmap | null;
    replay?:          MappoolReplay | null;
    beatmap?:         Beatmap | null;
    slot?:           MappoolSlot | null;
}

export interface CustomBeatmap {
    ID:                number;
    link?:              string | null;
    background?:        string | null;
    artist:            string;
    title:             string;
    BPM:               number;
    totalLength:       number;
    hitLength:         number;
    difficulty:        string;
    circleSize:        number;
    overallDifficulty: number;
    approachRate:      number;
    hpDrain:           number;
    circles:           number;
    sliders:           number;
    spinners:          number;
    maxCombo?:          number;
    aimSR?:             number;
    speedSR?:           number;
    totalSR:           number;
}

export interface MappoolReplay {
    ID: number;
    createdAt: Date;
    createdBy: User;
    link: string;
    score: number;
}