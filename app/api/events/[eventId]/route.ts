import {NextResponse} from "next/server";
import {Statbotics, TBA} from "@/lib/apis";

interface RequestParams {
	params: Promise<{eventId: string}>
}

export const GET = async (_: Request, {params}: RequestParams) => {
	const {eventId} = await params;

	const event = await Statbotics(`event/${eventId}`);
	const tbaData = await TBA(`event/${eventId}/teams/simple`);

	const combinedTeams = await Promise.all(
		tbaData.map(async (tbaTeam: any) => {
			try {
				const teamEventData = await Statbotics(`team_event/${tbaTeam.team_number}/${eventId}`);

				return {
					team_number: tbaTeam.team_number,
					name: tbaTeam.nickname || 'Unknown', // Fallback to 'Unknown' if TBA name is missing
					epa: teamEventData.epa,
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
