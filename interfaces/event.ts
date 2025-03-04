import {Team} from "@/interfaces/team";
import {Metrics} from "@/interfaces/metrics";
import {EPA} from "@/interfaces/epa";

export interface Event {
	key: string;
	year: number;
	name: string;
	time: number;
	country: string;
	state: string;
	district: string;
	start_date: string;
	end_date: string;
	type: string;
	week: number;
	video: string;
	status: string;
	status_str: string;
	num_teams: number;
	current_match: number;
	qual_matches: number;
	epa: EPA;
	metrics: Metrics;
	teams: Team[];
}

