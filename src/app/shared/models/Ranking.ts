import { Competition } from "./Competition";
import { Member } from "./Member";
import { RankingEmbedded } from "./RankingEmbedded";

export class Ranking {
    constructor(public id?:RankingEmbedded  ,public rank?: number, public score?: number,
        public member?: Member, public competition?: Competition, public competitionCode?: String
        ){}
}