"use client";

import styled from "styled-components";

export const Container = styled.div`
  padding: 20px;
`;

export const Title = styled.h1`
  margin-bottom: 20px;
`;

export const TeamList = styled.div`
  margin-top: 20px;
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: #0056b3;
  }
`;

export const RankingsContainer = styled.div`
	padding: 20px;
`;

export const TeamRank = styled.div`
	margin: 10px 0;
	padding: 10px;
	background: #f0f0f0;
	border-radius: 5px;
`;
