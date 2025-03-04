import {TBA} from "@/lib/apis";
import {use} from "react";

const getEventName = async (eventId: string) => {
	const eventData = await TBA(`event/${eventId}`);
	return eventData.name;
}

interface EventNameProps {
	eventId: string;
}

export const EventName = ({ eventId }: EventNameProps) => {
	return use(getEventName(eventId));
}
