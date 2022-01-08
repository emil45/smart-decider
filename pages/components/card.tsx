import { Slider, Card as MuiCard, CardContent, TextField } from '@mui/material';
import React from 'react';
import { CardInfo } from '../models/cards';

interface CardProps {
	cardInfo: CardInfo;
	onChange: (data: CardInfo) => void;
}

export default function Card(props: CardProps) {
	const handleTextChange = (event: { target: HTMLInputElement }) => {
		props.onChange({
			id: props.cardInfo.id,
			name: event.target.value,
			value: props.cardInfo.value
		});
	};

	const handleSliderChange = (event: { target: HTMLInputElement }) => {
		props.onChange({
			id: props.cardInfo.id,
			name: props.cardInfo.name,
			value: Number(event.target.value)
		});
	};

	return (
		<MuiCard>
			<CardContent>
				<TextField label={props.cardInfo.name} variant="standard" sx={{ mb: 4 }} onChange={handleTextChange} />
				<Slider valueLabelDisplay="auto" value={props.cardInfo.value} aria-label="Default" onChange={handleSliderChange} />
			</CardContent>
		</MuiCard>
	);
}
