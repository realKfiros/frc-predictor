export const TBA = async (path: string) => {
	const response = await fetch(`https://www.thebluealliance.com/api/v3/${path}`, {
		headers: {
			'X-TBA-Auth-Key': process.env.TBA_API_KEY,
		} as any,
		cache: 'force-cache',
	});
	return response.json();
}

export const Statbotics = async (path: string) => {
	const response = await fetch(`https://api.statbotics.io/v3/${path}`, {cache: "force-cache"});
	return response.json();
}
