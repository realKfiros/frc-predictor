"use client";
import styled from "styled-components";
import {observer} from "mobx-react";
import predictor from "@/lib/predictor";
import {action} from "mobx";

const Container = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
	margin-bottom: 20px;
`;

const TeamGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 10px;
	margin-bottom: 20px;
`;

const TeamButton = styled.button<{ selected: boolean }>`
	padding: 10px;
	border: 1px solid #ccc;
	background-color: ${(props) => (props.selected ? "#28a745" : "white")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border-radius: 5px;
	cursor: pointer;
	&:disabled {
		background-color: #ccc;
		cursor: not-allowed;
	}
`;

const AlliancesContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-bottom: 20px;
`;

const AllianceRow = styled.div`
  display: flex;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AllianceSelection = observer(() => {
	const {rankings, alliances, pickTeam} = predictor;

	return (
		<Container>
			<Title>Alliance Selection</Title>
			<AlliancesContainer>
				{alliances.map((alliance, index) => (
					<AllianceRow key={index}>
						<strong>Alliance {index + 1}:</strong>
						{alliance.map((team) => (
							<span key={team.team_number}> {team?.team_number} </span>
						))}
					</AllianceRow>
				))}
			</AlliancesContainer>

			<TeamGrid>
				{rankings.map((team) => (
					<TeamButton
						key={team.team_number}
						selected={alliances.some(a => a.includes(team))}
						disabled={alliances.some(a => a.includes(team))}
						onClick={action(() => pickTeam(team))}
					>
						{team.team_number} - {team.name}
					</TeamButton>
				))}
			</TeamGrid>

			<ButtonContainer>
				{/*<button onClick={undo} disabled={history.length === 0}>Undo</button>*/}
				{/*<button onClick={redo} disabled={redoStack.length === 0}>Redo</button>*/}
			</ButtonContainer>
		</Container>
	);
});

export default AllianceSelection;
