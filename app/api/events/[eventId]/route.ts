import {NextResponse} from "next/server";
import {Statbotics, TBA} from "@/lib/apis";

interface RequestParams {
	eventId: string;
}

export const GET = async (_: Request, {params}: {params: RequestParams}) =>
{
	const {eventId} = params;

	const event = await Statbotics(`event/${eventId}`);

	// Fetch teams from TBA
	const tbaData = await TBA(`event/${eventId}/teams/simple`);

	// Fetch data for each team from Statbotics
	const combinedTeams = await Promise.all(
		tbaData.map(async (tbaTeam: any) => {
			try {
				const statboticsData = await Statbotics(`team/${tbaTeam.team_number}`);

				return {
					team_number: tbaTeam.team_number,
					name: tbaTeam.nickname || 'Unknown', // Fallback to 'Unknown' if TBA name is missing
					epa: statboticsData.norm_epa
				};
			} catch (error) {
				console.error(`Failed to fetch data for team ${tbaTeam.team_number}:`, error);
				return {
					team_number: tbaTeam.team_number,
					name: tbaTeam.nickname || 'Unknown',
				};
			}
		})
	);

	event.teams = combinedTeams.sort((a, b) => a.epa - b.epa);

	return NextResponse.json(event);
};
