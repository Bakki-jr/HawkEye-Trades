import {
	useForm,
	SubmitHandler,
	Controller,
	useFieldArray,
	FieldArrayWithId,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
	CssBaseline,
	InputAdornment,
	MenuItem,
	TextField,
	useTheme,
	Select,
	InputLabel,
	FormControl,
} from "@mui/material";
import { useEffect, useState, Fragment } from "react";
import {
	AddItemWrapper,
	TradeJournalBackgroundWrapper,
	TradeJournalPaddingWrapper,
	FormHeader,
	FromFieldErrorMessageContainer,
	CalculateButton,
	TradeOutputWrapper,
	SatisfactionItemWrapper,
	FieldArrayLabel,
	AddFieldArrayWrapper,
	AddAnotherPositionButton,
	AdditionalTradeInfo,
	AdditionalFieldsWrapper,
} from "./trade-journal.styles";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { filterDate, getDifferenceInDays } from "../../helpers/helper-date";

import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import SentimentSatisfiedTwoToneIcon from "@mui/icons-material/SentimentSatisfiedTwoTone";
import SentimentVerySatisfiedTwoToneIcon from "@mui/icons-material/SentimentVerySatisfiedTwoTone";
import SentimentDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentDissatisfiedTwoTone";
import SentimentVeryDissatisfiedTwoToneIcon from "@mui/icons-material/SentimentVeryDissatisfiedTwoTone";
import DraftJSEditor from "../../components/editor-draftjs/editor-draftjs.component";

import {
	resetSaveTradeStatus,
	saveTradeJournal,
} from "../../features/redux/slice/trade-journal.slice";
import {
	useAppDispatch,
	useAppSelector,
} from "../../features/redux/redux-toolkit-hooks/redux-toolkit-hooks";
import { isAPIFetchedSuccefully } from "../../helpers/helper-API-status";
import Spinner from "../../components/spinner/spinner.component";
import LoadingButton from "../../components/form-input-fields/button.component";
import { useHistory } from "react-router";
import { Routes } from "../../constants/route-paths";
import Toast from "../../components/snackbar/snackbar.component";

enum SegmentTypes {
	equity = "Equity",
	futures = "Futures",
	options = "Options",
}

enum FutureTypes {
	long = "Long",
	short = "Short",
}

enum OptionTypes {
	CE = "CE",
	PE = "PE",
}

export interface ITradeJournal {
	stockName: string;
	segment: SegmentTypes;
	expiry?: string;
	positionSide?: FutureTypes | OptionTypes;
	basedOnStrategy: string;
	riskRewardRatio: string;
	entry: IPositionInfo[];
	exit: IPositionInfo[];
	profitAndLoss: number;
	investedAmount: number;
	roi: number;
	durationOfTrade: string;
	tradeSatisfaction: string;
	percentageOfCapitalDeployed: number;
	advancedSelfReview: any;
}

interface IPositionInfo {
	date: Date;
	quantity: number;
	price: number;
}

const schema = yup.object().shape({
	stockName: yup.string().required().max(100),
	segment: yup.string().required(),
	expiry: yup.string(),
	positionSide: yup.string(),
	basedOnStrategy: yup.string().required(),
	riskRewardRatio: yup.string().required(),
	entry: yup.array().of(
		yup.object().shape({
			date: yup.date().required(),
			quantity: yup.number().required(),
			price: yup.number().required(),
		})
	),
	exit: yup.array().of(
		yup.object().shape({
			date: yup.date().required(),
			quantity: yup.number().required(),
			price: yup.number().required(),
		})
	),
	profitAndLoss: yup.number().required(),
	investedAmount: yup.number().required().min(1, "* calcuate PNL"),
	roi: yup.number().required(),
	durationOfTrade: yup.string().required(),
	tradeSatisfaction: yup.string().required(),
	percentageOfCapitalDeployed: yup
		.number()
		.required()
		.min(1, "percentage should be in range of 1 - 100")
		.max(100, "percentage should not exceed 100"),
	advancedSelfReview: yup.object().required("* ASR is Required"),
});

const TradeJournal = () => {
	const theme = useTheme();
	const history = useHistory();
	const userUID = useAppSelector((state) => state.user.uid);
	const dispatch = useAppDispatch();
	const [editorData, setEditorData] = useState();
	const {
		control,
		formState: { errors },
		watch,
		setValue,
		handleSubmit,
	} = useForm<ITradeJournal>({
		resolver: yupResolver(schema),
		defaultValues: {
			entry: [{ date: new Date(), quantity: 1, price: 0 }],
			exit: [{ date: new Date(), quantity: 1, price: 0 }],
		},
	});
	const {
		fields: entryFields,
		append: entryAppend,
		remove: entryRemove,
	} = useFieldArray({ control, name: "entry" });

	const {
		fields: exitFields,
		append: exitAppend,
		remove: exitRemove,
	} = useFieldArray({ control, name: "exit" });

	const segmentChange = watch("segment");
	const positionChangeWatcher = watch(["entry", "exit"]);

	const [segmentSelected, setSegmentSelected] = useState(segmentChange);
	const saveTradeStatus = useAppSelector(
		(state) => state.tradeJournal.saveTrade.status
	);
	const isSpinnerRequired = isAPIFetchedSuccefully(saveTradeStatus);

	useEffect(() => {
		setValue("advancedSelfReview", editorData);
	}, [editorData, setValue]);

	useEffect(() => {
		setSegmentSelected(segmentChange);
	}, [segmentChange]);

	useEffect(() => {
		saveTradeStatus === "success" && history.push(Routes.TRADE_HISTORY);
		return () => {
			saveTradeStatus === "success" && dispatch(resetSaveTradeStatus());
		};
	}, [saveTradeStatus, history, dispatch]);

	const calculatePNL = () => {
		if (segmentSelected === SegmentTypes.equity) {
			const entry = positionChangeWatcher[0];
			const exit = positionChangeWatcher[1];

			let totalAmountInvested = 0;
			let exitValue = 0;
			let startDate: Date = entry[0].date;
			let endDate: Date = exit[0].date;

			entry.forEach((entryPosition) => {
				totalAmountInvested =
					entryPosition.quantity * entryPosition.price + totalAmountInvested;
				startDate = filterDate(startDate, entryPosition.date, "min");
			});

			exit.forEach((exitPosition) => {
				exitValue = exitPosition.quantity * exitPosition.price + exitValue;
				endDate = filterDate(endDate, exitPosition.date, "max");
			});

			const pnl = exitValue - totalAmountInvested;

			setCalculatedValues(pnl, totalAmountInvested, endDate, startDate);
		}
	};

	const setCalculatedValues = (
		pnl: number,
		totalAmountInvested: number,
		endDate: Date,
		startDate: Date
	) => {
		setValue("profitAndLoss", pnl);
		setValue("investedAmount", totalAmountInvested);
		setValue("roi", Number(((pnl / totalAmountInvested) * 100).toFixed(2)));
		setValue("durationOfTrade", getDifferenceInDays(endDate, startDate));
	};

	const removeFieldFromFieldArray = (
		remove: (index?: number | number[] | undefined) => void,
		fieldArray:
			| FieldArrayWithId<ITradeJournal, "entry", "id">[]
			| FieldArrayWithId<ITradeJournal, "exit", "id">[],
		index: number
	) => (fieldArray.length !== 1 ? remove(index) : alert("cant remove"));

	const onTradeJournalSubmit: SubmitHandler<ITradeJournal> = async (data) => {
		console.log(data, "TJ Data");
		const tradeJournalData = {
			...data,
			uid: userUID,
		};
		await dispatch(saveTradeJournal(tradeJournalData));
	};

	const getAdditionalSegmentInfo = (segmentSelected: SegmentTypes) => {
		return (
			<AdditionalFieldsWrapper>
				{segmentSelected === SegmentTypes.futures ? (
					<FormControl variant="outlined" sx={{ minWidth: 330 }}>
						<InputLabel color="primary">Position Categoty</InputLabel>
						<Controller
							name="positionSide"
							control={control}
							defaultValue={FutureTypes.long}
							render={({ field }) => (
								<Select label="Position Category" {...field}>
									<MenuItem value={FutureTypes.long}>
										{FutureTypes.long} - Position
									</MenuItem>
									<MenuItem value={FutureTypes.short}>
										{FutureTypes.short} - Position
									</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
				) : (
					<FormControl variant="outlined" sx={{ minWidth: 330 }}>
						<InputLabel color="primary">Position Category</InputLabel>
						<Controller
							name="positionSide"
							control={control}
							defaultValue={OptionTypes.CE}
							render={({ field }) => (
								<Select label="Position Category" {...field}>
									<MenuItem value={OptionTypes.CE}>
										{OptionTypes.CE} - Position
									</MenuItem>
									<MenuItem value={OptionTypes.PE}>
										{OptionTypes.PE} - Position
									</MenuItem>
								</Select>
							)}
						/>
					</FormControl>
				)}

				<Controller
					name="expiry"
					control={control}
					defaultValue=""
					render={({ field }) => (
						<TextField
							sx={{ width: "330px" }}
							type="text"
							label="Expiry"
							color="primary"
							autoComplete="off"
							{...field}
						/>
					)}
				/>
			</AdditionalFieldsWrapper>
		);
	};

	return (
		<Fragment>
			<TradeJournalPaddingWrapper>
				<TradeJournalBackgroundWrapper theme={theme.palette}>
					<FormHeader>Journal Your Trade</FormHeader>
					<CssBaseline></CssBaseline>
					<form onSubmit={handleSubmit(onTradeJournalSubmit)}>
						<Controller
							name="stockName"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									type="text"
									label="Stock Name"
									fullWidth
									color="primary"
									autoComplete="off"
									{...field}
								/>
							)}
						/>
						<FromFieldErrorMessageContainer>
							{errors.stockName?.message}
						</FromFieldErrorMessageContainer>

						<FormControl variant="outlined" sx={{ minWidth: 330 }}>
							<InputLabel color="primary">Select Segment</InputLabel>
							<Controller
								name="segment"
								control={control}
								defaultValue={SegmentTypes.equity}
								render={({ field }) => (
									<Select label="Select Segment" {...field}>
										<MenuItem value={SegmentTypes.equity}>
											{SegmentTypes.equity}
										</MenuItem>
										<MenuItem value={SegmentTypes.futures}>
											{SegmentTypes.futures}
										</MenuItem>
										<MenuItem value={SegmentTypes.options}>
											{SegmentTypes.options}
										</MenuItem>
									</Select>
								)}
							/>
						</FormControl>
						<FromFieldErrorMessageContainer>
							{errors.segment?.message}
						</FromFieldErrorMessageContainer>
						{segmentSelected === SegmentTypes.futures ||
						segmentSelected === SegmentTypes.options
							? getAdditionalSegmentInfo(segmentSelected)
							: null}

						<Controller
							name="basedOnStrategy"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									sx={{ width: "330px" }}
									type="text"
									label="Based On Strategy"
									color="primary"
									autoComplete="off"
									{...field}
								/>
							)}
						/>
						<FromFieldErrorMessageContainer>
							{errors.basedOnStrategy?.message}
						</FromFieldErrorMessageContainer>

						<Controller
							name="riskRewardRatio"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<TextField
									sx={{ width: "330px" }}
									type="text"
									label="Risk-Reward Ratio"
									color="primary"
									autoComplete="off"
									{...field}
								/>
							)}
						/>
						<FromFieldErrorMessageContainer>
							{errors.riskRewardRatio?.message}
						</FromFieldErrorMessageContainer>

						<FieldArrayLabel>Entry :</FieldArrayLabel>
						{entryFields.map((item, index) => (
							<AddItemWrapper key={item.id}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Controller
										render={({ field }) => (
											<MobileDatePicker
												label="Entry Date"
												inputFormat="dd/MM/yyyy"
												value={field.value}
												onChange={(date) => field.onChange(date)}
												renderInput={(params) => (
													<TextField
														sx={{ width: "200px" }}
														{...params}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<TodayRoundedIcon color="primary" />
																</InputAdornment>
															),
														}}
													/>
												)}
											/>
										)}
										name={`entry.${index}.date`}
										control={control}
									/>
								</LocalizationProvider>

								<Controller
									render={({ field }) => (
										<TextField
											sx={{ width: "200px" }}
											type="number"
											label="Quantity"
											color="primary"
											autoComplete="off"
											{...field}
										/>
									)}
									name={`entry.${index}.quantity`}
									control={control}
								/>

								<Controller
									render={({ field }) => (
										<TextField
											sx={{ width: "200px" }}
											type="number"
											label="Price"
											color="primary"
											autoComplete="off"
											{...field}
										/>
									)}
									name={`entry.${index}.price`}
									control={control}
								/>
								<DeleteForeverIcon
									color="error"
									onClick={() =>
										removeFieldFromFieldArray(entryRemove, entryFields, index)
									}
								/>
							</AddItemWrapper>
						))}
						<AddFieldArrayWrapper>
							<AddAnotherPositionButton
								variant="contained"
								onClick={() => entryAppend({ quantity: 1, price: 0 })}
								endIcon={<AddBoxIcon />}
							>
								Add Enrty Position
							</AddAnotherPositionButton>
						</AddFieldArrayWrapper>

						<FieldArrayLabel>Exit :</FieldArrayLabel>
						{exitFields.map((item, index) => (
							<AddItemWrapper key={item.id}>
								<LocalizationProvider dateAdapter={AdapterDateFns}>
									<Controller
										render={({ field }) => (
											<MobileDatePicker
												label="Exit Date"
												inputFormat="dd/MM/yyyy"
												value={field.value}
												onChange={(date) => field.onChange(date)}
												renderInput={(params) => (
													<TextField
														sx={{ width: "200px" }}
														{...params}
														InputProps={{
															endAdornment: (
																<InputAdornment position="end">
																	<TodayRoundedIcon color="primary" />
																</InputAdornment>
															),
														}}
													/>
												)}
											/>
										)}
										name={`exit.${index}.date`}
										control={control}
									/>
								</LocalizationProvider>

								<Controller
									render={({ field }) => (
										<TextField
											sx={{ width: "200px" }}
											type="number"
											label="Quantity"
											color="primary"
											autoComplete="off"
											{...field}
										/>
									)}
									name={`exit.${index}.quantity`}
									control={control}
								/>

								<Controller
									render={({ field }) => (
										<TextField
											sx={{ width: "200px" }}
											type="number"
											label="Price"
											color="primary"
											autoComplete="off"
											{...field}
										/>
									)}
									name={`exit.${index}.price`}
									control={control}
								/>
								<DeleteForeverIcon
									color="error"
									onClick={() =>
										removeFieldFromFieldArray(exitRemove, exitFields, index)
									}
								/>
							</AddItemWrapper>
						))}
						<AddFieldArrayWrapper>
							<AddAnotherPositionButton
								variant="contained"
								onClick={() => exitAppend({ quantity: 1, price: 0 })}
								endIcon={<AddBoxIcon />}
							>
								Add Exit Position
							</AddAnotherPositionButton>
						</AddFieldArrayWrapper>
						<CalculateButton
							color="warning"
							variant="contained"
							type="button"
							onClick={calculatePNL}
						>
							Calculate PNL
						</CalculateButton>

						<TradeOutputWrapper>
							<Controller
								name="profitAndLoss"
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<TextField
										sx={{ width: "200px" }}
										type="text"
										label="Profit/Loss"
										color="primary"
										autoComplete="off"
										disabled={true}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													&#x20B9;
												</InputAdornment>
											),
										}}
										{...field}
									/>
								)}
							/>

							<Controller
								name="investedAmount"
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<TextField
										sx={{ width: "200px" }}
										type="text"
										label="Amount Invested"
										color="primary"
										autoComplete="off"
										disabled={true}
										InputProps={{
											startAdornment: (
												<InputAdornment position="start">
													&#x20B9;
												</InputAdornment>
											),
										}}
										{...field}
									/>
								)}
							/>

							<Controller
								name="roi"
								control={control}
								defaultValue={0}
								render={({ field }) => (
									<TextField
										sx={{ width: "200px" }}
										type="text"
										label="ROI Percentage"
										color="primary"
										autoComplete="off"
										disabled={true}
										InputProps={{
											endAdornment: (
												<InputAdornment position="end">%</InputAdornment>
											),
										}}
										{...field}
									/>
								)}
							/>

							<Controller
								name="durationOfTrade"
								control={control}
								defaultValue="0"
								render={({ field }) => (
									<TextField
										sx={{ width: "200px" }}
										type="text"
										label="Duration Of Trade[Day's]"
										color="primary"
										autoComplete="off"
										disabled={true}
										{...field}
									/>
								)}
							/>
						</TradeOutputWrapper>
						<FromFieldErrorMessageContainer>
							{errors.investedAmount?.message}
						</FromFieldErrorMessageContainer>

						<FieldArrayLabel>Additional Trade Info :</FieldArrayLabel>
						<AdditionalTradeInfo>
							<div>
								<Controller
									name="percentageOfCapitalDeployed"
									control={control}
									defaultValue={1}
									render={({ field }) => (
										<TextField
											sx={{ width: "250px" }}
											type="number"
											label="Percentage Of Capital Deployed"
											color="primary"
											autoComplete="off"
											InputProps={{
												endAdornment: (
													<InputAdornment position="end">%</InputAdornment>
												),
											}}
											{...field}
										/>
									)}
								/>
								<FromFieldErrorMessageContainer>
									{errors.percentageOfCapitalDeployed?.message}
								</FromFieldErrorMessageContainer>
							</div>
							<div>
								<FormControl sx={{ minWidth: "250px" }}>
									<InputLabel>Trade Satisfaction</InputLabel>
									<Controller
										name="tradeSatisfaction"
										control={control}
										defaultValue={"Satisfied"}
										render={({ field }) => (
											<Select label="Trade Satisfaction" {...field}>
												<MenuItem value={"Satisfied"}>
													<SatisfactionItemWrapper>
														<SentimentSatisfiedTwoToneIcon htmlColor="#77c918" />
														Satisfied
													</SatisfactionItemWrapper>
												</MenuItem>
												<MenuItem value={"Very Much Satisfied"}>
													<SatisfactionItemWrapper>
														<SentimentVerySatisfiedTwoToneIcon htmlColor="#3fc230" />
														Very Much Satisfied
													</SatisfactionItemWrapper>
												</MenuItem>
												<MenuItem value={"Dissatisfied"}>
													<SatisfactionItemWrapper>
														<SentimentDissatisfiedTwoToneIcon htmlColor="#e9f50c" />
														Dissatisfied
													</SatisfactionItemWrapper>
												</MenuItem>
												<MenuItem value={"Very Much Dissatisfied"}>
													<SatisfactionItemWrapper>
														<SentimentVeryDissatisfiedTwoToneIcon htmlColor="#ed0909" />
														Very Much Dissatisfied
													</SatisfactionItemWrapper>
												</MenuItem>
											</Select>
										)}
									/>
								</FormControl>
								<FromFieldErrorMessageContainer>
									{errors.tradeSatisfaction?.message}
								</FromFieldErrorMessageContainer>
							</div>
						</AdditionalTradeInfo>

						<FieldArrayLabel>Advanced Self Review :</FieldArrayLabel>
						<DraftJSEditor {...{ setEditorData }} />
						<FromFieldErrorMessageContainer>
							{errors.advancedSelfReview?.message}
						</FromFieldErrorMessageContainer>
						<LoadingButton
							color="primary"
							type="submit"
							endIcon="send"
							loading={isSpinnerRequired}
						>
							Submit Your Trade !!
						</LoadingButton>
					</form>
				</TradeJournalBackgroundWrapper>
			</TradeJournalPaddingWrapper>
			{isSpinnerRequired ? <Spinner isLoading={isSpinnerRequired} /> : null}
			{saveTradeStatus === "success" ? (
				<Toast message="Trade Saved Successfully" variant="success" />
			) : null}
		</Fragment>
	);
};

export default TradeJournal;
