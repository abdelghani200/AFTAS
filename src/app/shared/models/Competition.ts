import { Ranking } from "../models/Ranking";
import { Hunting } from "../models/Hunting";

export class CompetitionDetails {
    constructor(public code: string, public competition: CompetitionInfo) { }
}

export class CompetitionInfo {
    constructor(public memberNum: string, public competitionCode: string) { }
}


export class Competition {

    constructor(public code?: String, public date?: Date, public startTime?: string, public endTime?: string,
        public numberOfParticipants?: number,
        public location?: string,
        public amount?: number,
        public rankingList?: Ranking[],
        public details?: CompetitionDetails,
        public huntings?: Hunting[],) { }

}
