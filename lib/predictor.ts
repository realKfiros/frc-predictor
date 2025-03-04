import {action, autorun, makeObservable, observable} from "mobx";
import {Team} from "@/interfaces/team";

class Predictor
{
	teams: Team[] = [];
	rankings: Team[] = [];
	alliances: Team[][] = Array(8).fill([]);
	pickIndex = 0;

	isSelectingAlliances = false;
	initializedSelection = false;

	constructor() {
		makeObservable(this, {
			teams: observable,
			rankings: observable,
			alliances: observable,
			pickIndex: observable,
			isSelectingAlliances: observable,
			initializedSelection: observable,
			initializeSelection: action.bound,
			pickTeam: action.bound
		});

		autorun(() => {
			if (this.isSelectingAlliances && !this.initializedSelection)
				this.initializeSelection();
		});
	}

	initializeSelection() {
		if (this.initializedSelection)
			return;

		this.pickTeam(this.rankings[0], true);
		this.initializedSelection = true;
	}

	pickTeam(team: Team, autoAssign = false) {
		if (this.pickIndex > 23)
			return;

		this.rankings = this.rankings.filter((t) => t.team_number !== team.team_number);

		if (this.pickIndex > 15) {
			const allianceIndex = this.alliances.findLastIndex((a) => a.length === 2);
			this.alliances[allianceIndex].push(team);
			this.pickIndex++;
		} else {
			if (this.pickIndex === 15) {
				this.alliances[7].push(team);
				this.pickIndex++;
			}
			else if (autoAssign) {
				const allianceIndex = this.alliances.findIndex((a) => a.length === 0);
				this.alliances[allianceIndex].push(team);
				this.pickIndex++;
			}
			else {
				const allianceIndex = this.alliances.findIndex((a) => a.length === 1);
				this.alliances[allianceIndex].push(team);
				this.pickIndex++;
				this.pickTeam(this.rankings[0], true);
			}
		}
	}
}

const predictor = new Predictor();
export default predictor;
