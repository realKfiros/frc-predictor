"use client";
import useSWR from "swr";
import {fetcher} from "@/lib/utilities";

interface EventNameProps {
	eventId: string;
}

export const EventName = ({ eventId }: EventNameProps) => {
	const {data} = useSWR(`/api/events/${eventId}`, fetcher);
	return data?.name;
}
