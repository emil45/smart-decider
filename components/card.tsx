import { Slider, Card as MuiCard, CardContent, TextField, Grid, Input } from '@mui/material';
import React from 'react';
import { CardInfo } from '../models/cards';

interface CardProps {
	cardInfo: CardInfo;
	onChange: (data: CardInfo) => void;
}

export default function Card(props: CardProps) {
	// TODO: Fix event type
	const handleTextChange = (event: any) => {
		props.onChange({
			id: props.cardInfo.id,
			name: event.target.value,
			value: props.cardInfo.value
		});
	};

	const handleSliderChange = (event: any) => {
		props.onChange({
			id: props.cardInfo.id,
			name: props.cardInfo.name,
			value: Number(event.target.value)
		});
	};

	const handleInputChange = (event: any) => {
		props.onChange({
			id: props.cardInfo.id,
			name: props.cardInfo.name,
			value: Number(event.target.value)
		});
	};

	const handleBlur = () => {
		let blurValue = 0;
		if (props.cardInfo.value < 0) {
			blurValue = 0;
		} else if (props.cardInfo.value > 100) {
			blurValue = 100;
		}

		props.onChange({
			id: props.cardInfo.id,
			name: props.cardInfo.name,
			value: blurValue
		});
	};

	return (
		<MuiCard>
			<CardContent>
				<TextField label={props.cardInfo.name} variant="standard" sx={{ mb: 4 }} onChange={handleTextChange} />
				<Grid container spacing={2} alignItems="center">
					<Grid item xs>
						<Slider value={props.cardInfo.value} aria-labelledby="input-slider" onChange={handleSliderChange} min={1} max={100} />
					</Grid>
					<Grid item>
						<Input
							value={props.cardInfo.value}
							size="small"
							onChange={handleInputChange}
							onBlur={handleBlur}
							inputProps={{
								min: 1,
								max: 100,
								type: 'number',
								'aria-labelledby': 'input-slider'
							}}
						/>
					</Grid>
				</Grid>
			</CardContent>
		</MuiCard>
	);
}
