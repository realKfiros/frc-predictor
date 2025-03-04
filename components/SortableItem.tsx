"use client";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import styled from "styled-components";

const ItemContainer = styled.div`
	padding: 10px;
	border: 1px solid #ccc;
	background-color: white;
	cursor: grab;
	user-select: none;
	border-radius: 5px;
`;

export const SortableItem = ({id, children}: { id: number; children: React.ReactNode }) =>
{
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<ItemContainer ref={setNodeRef} style={style} {...attributes} {...listeners}>
			{children}
		</ItemContainer>
	);
};
