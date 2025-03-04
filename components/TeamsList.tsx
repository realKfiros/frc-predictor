"use client";

import {TeamList} from "@/styles/styles";
import {Team} from "@/interfaces/team";

interface TeamsListProps {
	teams: Team[];
}

export const TeamsList = ({teams}: TeamsListProps) =>
{
	return <TeamList>
		{teams.length > 0 ? (
			teams.map((team) => (
				<div key={team.team_number}>
					<p>
						{team.team_number} - {team.name} (Current EPA: {team.epa.unitless ?? "N/A"})
					</p>
				</div>
			))
		) : (
			<p>No teams found.</p>
		)}
	</TeamList>;
}
