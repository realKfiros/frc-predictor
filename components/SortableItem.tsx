"use client";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {GripVertical} from "lucide-react";
import styled from "styled-components";

const ItemContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: white;
`;

const DragHandle = styled.div`
	cursor: grab;
	touch-action: none;
	padding: 5px;
`;

export const SortableItem = ({id, children}: { id: number; children: React.ReactNode }) =>
{
	const {attributes, listeners, setNodeRef, transform, transition} = useSortable({id});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return <ItemContainer ref={setNodeRef} style={style} {...attributes}>
		<DragHandle {...listeners}>
			<GripVertical size={20}/>
		</DragHandle>
		{children}
	</ItemContainer>;
};
