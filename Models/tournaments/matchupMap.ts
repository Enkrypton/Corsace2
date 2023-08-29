import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MapStatus } from "../../Interfaces/matchup";
import { MappoolMap } from "./mappools/mappoolMap";
import { Matchup } from "./matchup";
import { MatchupScore } from "./matchupScore";
import { Team } from "./team";

@Entity()
export class MatchupMap extends BaseEntity {

    @PrimaryGeneratedColumn()
        ID!: number;

    @ManyToOne(() => MappoolMap, map => map.matchMaps)
        map!: MappoolMap;

    @Column({ type: "enum", enum: MapStatus, default: MapStatus.Picked })
        status!: MapStatus;

    @Column()
        order!: number;

    @Column({ type: "int", nullable: true })
        team1Score?: number | null;

    @Column({ type: "int", nullable: true })
        team2Score?: number | null;

    @OneToMany(() => MatchupScore, score => score.map)
        scores!: MatchupScore[];

    @ManyToOne(() => Team, team => team.wins)
        winner?: Team | null;

    @ManyToOne(() => Matchup, matchup => matchup.maps)
        matchup!: Matchup;

}