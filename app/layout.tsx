"use client";

import {Provider} from "mobx-react";
import predictor from "../lib/predictor";
import {createGlobalStyle} from "styled-components";
import StyledComponentsRegistry from "@/lib/registry";

const GlobalStyle = createGlobalStyle`
	body {
		font-family: 'Arial', sans-serif;
		margin: 0;
		padding: 0;
	}
`;

export default function Layout({children}: { children: React.ReactNode })
{
	return (
		<>
			<html lang="en">
			<head>
				{/* You can add any meta tags, favicon, etc. here */}
			</head>
			<body>
			<StyledComponentsRegistry>
				<Provider predictor={predictor}>
					<GlobalStyle/>
					{children}
				</Provider>
			</StyledComponentsRegistry>
			</body>
			</html>
		</>
	);
}
