import { Slider, Card as MuiCard, CardContent, TextField, Grid, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CardInfo } from '../models/cards';

interface CardProps {
	cardInfo: CardInfo;
	onChange: (data: CardInfo) => void;
}

export default function Card(props: CardProps) {
	console.log('Card rendered', props.cardInfo.name);
	const [sliderValue, setSliderValue] = useState<number>(props.cardInfo.value);
	const [textValue, setTextValue] = useState<string>(props.cardInfo.name);

	// TODO: Fix event type
	const handleTextChange = (event: any) => {
		setTextValue(event.target.value);
	};

	const handleSliderChange = (event: any, value: number | number[]) => {
		setSliderValue(Number(value));
	};

	const handleInputChange = (event: any) => {
		setSliderValue(Number(event.target.value));
	};

	const handleBlur = () => {
		console.log('blur', sliderValue);
		props.onChange({
			id: props.cardInfo.id,
			name: textValue,
			value: sliderValue
		});
	};

	return (
		<MuiCard>
			<CardContent>
				<TextField label={props.cardInfo.name} variant="standard" sx={{ mb: 4 }} onChange={handleTextChange} onBlur={handleBlur} />
				<Grid container spacing={2} alignItems="center">
					<Grid item xs>
						<Slider
							value={sliderValue}
							aria-labelledby="input-slider"
							onChange={handleSliderChange}
							onChangeCommitted={handleBlur}
							min={1}
							max={100}
						/>
					</Grid>
					<Grid item>
						<Input
							value={sliderValue}
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
