"use client";
import {Title} from "@/styles/styles";
import {EventName} from "@/components/EventName";
import useSWR from "swr";
import {use} from "react";

interface PredictLayoutProps {
	children: React.ReactNode;
	params: Promise<{ eventId: string }>;
}

const PredictLayout = ({ children, params }: PredictLayoutProps) => {
	const {eventId} = use(params);
	const {error, isLoading} = useSWR(`/api/events/${eventId || ''}`, {refreshInterval: 1000});

	if (error)
		return <Title>Error loading event</Title>;

	if (isLoading)
		return <Title>Loading...</Title>;

	return <>
		<Title><EventName eventId={eventId} /></Title>
		{children}
	</>;
}

export default PredictLayout;
