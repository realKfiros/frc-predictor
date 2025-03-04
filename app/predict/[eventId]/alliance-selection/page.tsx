import { observer } from "mobx-react";
import { useEffect } from "react";
import simulationStore from "../../stores/simulationStore";
import styled from "styled-components";
import { DndContext, useDraggable, useDroppable, DragEndEvent } from "@dnd-kit/core";

const AllianceSelectionContainer = styled.div`
	padding: 20px;
`;

const TeamCard = styled.div`
	padding: 10px;
	background: #f0f0f0;
	margin: 10px;
	border-radius: 5px;
	cursor: grab;
`;

const AllianceContainer = styled.div`
	display: flex;
	margin-top: 20px;
`;

const AllianceSlot = styled.div`
	width: 150px;
	padding: 20px;
	background: #e0e0e0;
	margin: 10px;
	border-radius: 5px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface Team {
	team_number: number;
}

const AllianceSelection = observer(() => {
	useEffect(() => {
		simulationStore.fetchTeams("2025xyz");
	}, []);

	const { setNodeRef: setDroppableRef } = useDroppable({ id: "alliance-slot" });

	const onDragEnd = (event: DragEndEvent): void => {
		const { active, over } = event;
		if (over?.id === "alliance-slot" && simulationStore.selectedAlliances.length < 3) {
			const team = simulationStore.teams.find((team) => team.team_number === active.id);
			if (team) simulationStore.selectAlliance(team);
		}
	};

	return (
		<AllianceSelectionContainer>
			<h1>Alliance Selection</h1>
			<DndContext onDragEnd={onDragEnd}>
				<div style={{ display: "flex", flexWrap: "wrap" }}>
					{simulationStore.teams.map((team: Team) => {
						const { attributes, listeners, setNodeRef } = useDraggable({ id: team.team_number.toString() });
						return (
							<TeamCard key={team.team_number} ref={setNodeRef} {...listeners} {...attributes}>
								{team.team_number}
							</TeamCard>
						);
					})}
				</div>

				<AllianceContainer>
					{[1, 2, 3].map((index) => (
						<AllianceSlot key={index} ref={setDroppableRef}>
							<h3>Slot {index}</h3>
							{simulationStore.selectedAlliances[index - 1] ? (
								<div>{simulationStore.selectedAlliances[index - 1].team_number}</div>
							) : (
								<div>Empty</div>
							)}
						</AllianceSlot>
					))}
				</AllianceContainer>
			</DndContext>
		</AllianceSelectionContainer>
	);
});

export default AllianceSelection;
