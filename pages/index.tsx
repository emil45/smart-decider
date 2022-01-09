import { useCallback, useState } from 'react';
import { Grid, ThemeProvider, Button, Dialog, DialogTitle, DialogContent, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import theme from '../theme';
import Head from 'next/head';
import Card from '../components/card';
import { CardInfo } from '../models/cards';
import { getRandomInt, getRandomItemFromArray } from '../common/utils';

const initialValues = [
	{ id: 1, name: 'Option 1', value: 50 },
	{ id: 2, name: 'Option 2', value: 75 }
];

export default function Home() {
	const [winnerCard, setWinnerCard] = useState<CardInfo | undefined>(undefined);
	const [cards, setCards] = useState<CardInfo[]>(initialValues);

	const onCardChange = useCallback(
		(data: CardInfo) => {
			let cardsCopy = [...cards];
			const foundIndex = cardsCopy.findIndex((cardCopy) => cardCopy.id == data.id);
			cardsCopy[foundIndex] = data;

			setCards(cardsCopy);
		},
		[cards]
	);

	const handleDialogClose = () => {
		setWinnerCard(undefined);
	};

	const calculateOdds = () => {
		const random = getRandomInt(1, 100);
		const randomCard = getRandomItemFromArray(cards);
		const minValue = Math.min(...cards.map((c) => c.value));
		const maxValue = Math.max(...cards.map((c) => c.value));
		console.log(`Calculating odds. Random: ${random}, MinValue: ${minValue}, MaxValue: ${maxValue}, RandomCard: ${randomCard.name}`);

		if (minValue === maxValue) {
			setWinnerCard(randomCard);
		} else if (minValue < random && random <= maxValue) {
			setWinnerCard(cards.find((card) => card.value == maxValue));
		} else {
			setWinnerCard(randomCard);
		}
	};

	if (winnerCard) {
		return (
			<Dialog open={true} onClose={handleDialogClose} fullWidth maxWidth={'xs'}>
				<DialogTitle>
					<Typography>The Winner 🥳</Typography>
					<IconButton
						aria-label="close"
						onClick={handleDialogClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500]
						}}
					>
						<CloseIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent dividers>{winnerCard.name}</DialogContent>
			</Dialog>
		);
	}

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<title>Smartie</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Grid container direction="column" alignItems="center" justifyContent="center">
				<Grid item marginY={4}>
					<Card cardInfo={cards[0]} onChange={onCardChange} />
				</Grid>
				<Grid item marginBottom={4}>
					<Card cardInfo={cards[1]} onChange={onCardChange} />
				</Grid>
				<Grid item>
					<Button variant="contained" onClick={calculateOdds}>
						Decide
					</Button>
				</Grid>
			</Grid>
		</ThemeProvider>
	);
}
