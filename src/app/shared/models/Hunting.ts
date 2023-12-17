import { Fish } from "./Fish";
import { Member } from "./Member";

export class Hunting {
    constructor(public id?: number, public numberOfFish?: number, public member?: Member,
        public fish?: Fish, public competition_code?: String){}
}