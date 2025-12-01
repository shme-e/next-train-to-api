import { error, json, type RequestEvent } from '@sveltejs/kit';
import type { ServicesResponse } from '$lib/index';
import _ from 'lodash';

function timeStringToInt(timeString: string) {
	var hours = parseInt(timeString.substring(0, 2));
	var minutes = parseInt(timeString.substring(2, 4));

	return hoursMinsToInt(hours, minutes);
}

function hoursMinsToInt(hours: number, minutes: number) {
	return (hours * 60) + minutes;
}

export async function GET({request}: RequestEvent) {
	const authorization = request.headers.get("Authorization");

	const endpoint = "https://api.rtt.io/api/v1/json/search/CBG/to/KGX";

	const response = await fetch(endpoint, {
		headers: {
			"Authorization": `${authorization}`
		}
	}).then(res => res.json()) as any as ServicesResponse;

	const now = new Date();

	const hours = now.getHours();
	const minutes = now.getMinutes();

	const time = hoursMinsToInt(hours, minutes);

	const fastTrainsNotDepartedYet = response
		.services
		.filter(service => ["KLYNN", "ELYY"].includes(service.locationDetail.origin[0].tiploc))
		.filter(service => !service.locationDetail.realtimeDepartureActual);
		
	const latestService = _.minBy(fastTrainsNotDepartedYet, service => service.locationDetail.realtimeDeparture);

	return json(timeStringToInt(latestService?.locationDetail.realtimeDeparture ?? "0000") - time);
}