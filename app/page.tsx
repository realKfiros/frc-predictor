"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const TextInput = styled.input`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
`;

const Select = styled.select`
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const MainPage = () => {
    const router = useRouter();
    const [eventId, setEventId] = useState("");

    const handleNavigate = () => {
        router.push(`/predict/${eventId}`);
    };


    return (
        <Container>
            <Title>Select an Event</Title>
            <TextInput placeholder="Search for an event..." onChange={(e) => setEventId(e.target.value)} value={eventId} />
            <Button onClick={handleNavigate} disabled={!eventId}>
                Proceed
            </Button>
        </Container>
    );
};

export default MainPage;
