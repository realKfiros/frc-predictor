"use client";
import {useParams, useRouter} from "next/navigation";
import useSWR from "swr";
import {fetcher} from "@/lib/utilities";
import styled from "styled-components";
import {useEffect} from "react";
import {Team} from "@/interfaces/team";
import {closestCenter, DndContext} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import {SortableItem} from "@/components/SortableItem";
import {Button, Title} from "@/styles/styles";
import {observer} from "mobx-react";
import predictor from "@/lib/predictor";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;

const QualificationRankingPage = observer(({}) => {
	const query = useParams();
	const {data} = useSWR(`/api/events/${query.eventId}`, fetcher);
	const router = useRouter();

	const {rankings} = predictor;

	useEffect(() => {
		if (!data)
			return;
		predictor.rankings = data.teams.sort((a: Team, b: Team) => b.epa.unitless - a.epa.unitless);
	}, [data]);

	if (!data)
		return null;

	const handleDragEnd = (event: any) => {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = rankings.findIndex((team) => team.team_number === active.id);
		const newIndex = rankings.findIndex((team) => team.team_number === over.id);

		predictor.rankings = arrayMove(rankings, oldIndex, newIndex);
	};

	return <div>
		<Title>How will the qualifications end?</Title>
		<DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext items={rankings.map((team) => team.team_number)} strategy={verticalListSortingStrategy}>
				<List>
					{rankings.map((team, index) => (
						<SortableItem key={team.team_number} id={team.team_number}>
							{index + 1}. {team.name} #{team.team_number} (EPA: {team.epa.unitless})
						</SortableItem>
					))}
				</List>
			</SortableContext>
		</DndContext>
		<Button onClick={() => (predictor.isSelectingAlliances = true, router.push(`/predict/${query.eventId}/alliance-selection`))}>Select alliances</Button>
	</div>;
});

export default QualificationRankingPage;
