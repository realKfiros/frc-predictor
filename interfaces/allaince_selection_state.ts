import {Team} from "@/interfaces/team";

export interface AllianceSelectionState {
	rankings: Team[];
	alliances: Team[][];
	pickIndex: number;
}
