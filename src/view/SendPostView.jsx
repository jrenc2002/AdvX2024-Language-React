import { backend } from "@/global";
import axios from "axios";
import { Button } from "tdesign-react";

export default function SendPostView(){
	return <>
		<Button onClick={() => {
			axios.post(backend + 'post/new', {
				title: 'sdf',
				content: 'Elizabeth II (Elizabeth Alexandra Mary; 21 April 1926 – 8 September 2022) was Queen of the United Kingdom and other Commonwealth realms from 6 February 1952 until her death in 2022. She was queen regnant of 32 sovereign states over the course of her lifetime and remained the monarch of 15 realms by the time of her death. Her reign of 70 years and 214 days is the longest of any British monarch or female monarch, and the second-longest verified reign of any monarch of a sovereign state in history.',
				anonymous: false,
				block: 1,
				top: false
			},{headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}})
			.then(console.log).catch(console.log);
		}}>a</Button>
	</>;
}
