import {action, autorun, makeObservable, observable, toJS} from "mobx";
import {Team} from "@/interfaces/team";
import {AllianceSelectionState} from "@/interfaces/allaince_selection_state";

class Predictor {
	teams: Team[] = [];
	rankings: Team[] = [];
	alliances: Team[][] = Array(8).fill([]);
	history: AllianceSelectionState[] = [];

	pickIndex = 0;

	isSelectingAlliances = false;
	initializedSelection = false;

	constructor() {
		makeObservable(this, {
			teams: observable,
			rankings: observable,
			alliances: observable,
			history: observable.shallow,
			pickIndex: observable,
			isSelectingAlliances: observable,
			initializedSelection: observable,
			addToHistory: action.bound,
			initializeSelection: action.bound,
			pickTeam: action.bound,
			undo: action.bound
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
		this.addToHistory();
	}

	addToHistory() {
		this.history.push({
			rankings: toJS(this.rankings),
			alliances: toJS(this.alliances),
			pickIndex: this.pickIndex
		});
	}

	pickTeam(team: Team, autoAssign = false) {
		if (this.pickIndex > 23)
			return;

		if (!autoAssign)
			this.addToHistory();

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

	undo() {
		if (this.history.length === 0)
			return;

		const lastState = this.history.pop();
		if (lastState) {
			this.rankings = lastState.rankings;
			this.alliances = lastState.alliances;
			this.pickIndex = lastState.pickIndex;
		}
	}
}

const predictor = new Predictor();
export default predictor;
