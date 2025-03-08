"use client";
import styled from "styled-components";
import {observer} from "mobx-react";
import predictor from "@/lib/predictor";
import {motion} from "framer-motion";
import {Button} from "@/styles/styles";

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	padding: 20px;
	text-align: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(100%, 600px);
`;

const Title = styled.h1`
	margin-bottom: 20px;
`;

const TeamGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
	gap: 20px;
	justify-content: center;
	align-items: center;
	width: 100%;
	max-width: 600px;
	margin: auto;
`;

const TeamButton = styled.button<{ selected: boolean }>`
	width: 200px;
	height: 200px;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px;
	font-size: 16px;
	text-align: center;
	border: 1px solid #ccc;
	background-color: ${(props) => (props.selected ? "#28a745" : "white")};
	color: ${(props) => (props.selected ? "white" : "black")};
	border-radius: 10px;
	cursor: pointer;
	flex: 1 1 auto;=
	min-width: 70px;
	min-height: 70px;
	max-width: 100px;
	max-height: 100px;

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
	const { rankings, alliances, pickTeam, history, undo } = predictor;

	return <Container>
			<ContentWrapper>
				<Title>Alliance Selection</Title>
				<AlliancesContainer>
					{alliances.map((alliance, index) => (
						<motion.div
							key={index}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.3 }}>
							<AllianceRow>
								<strong>Alliance {index + 1}:</strong>
								{alliance.map((team) => (
									<motion.span
										key={team.team_number}
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ duration: 0.3 }}
									>
										{team?.team_number}
									</motion.span>
								))}
							</AllianceRow>
						</motion.div>
					))}
				</AlliancesContainer>
			</ContentWrapper>

			<TeamGrid>
				{rankings.map((team) => (
					<motion.div key={team.team_number} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<TeamButton
							selected={alliances.some((a) => a.includes(team))}
							disabled={alliances.some((a) => a.includes(team))}
							onClick={() => pickTeam(team)}>
							{team.name} #{team.team_number}
						</TeamButton>
					</motion.div>
				))}
			</TeamGrid>

			<ButtonContainer>
				<Button onClick={undo} disabled={history.length === 0}>Undo</Button>
			</ButtonContainer>
		</Container>;
});

export default AllianceSelection;
