import ReactHtmlParser from "react-html-parser";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
	InfoItemContainer,
	StockName,
	InfoItemTitle,
	InfoItemValue,
} from "./trade-details.styles";
import { Theme, Typography } from "@mui/material";
import { getDateFromTimeStamp } from "../../helpers/helper-date";
import { formatToIndianCurrency } from "../../helpers/currency-formatter";
import { ITradeDetails } from "../../features/redux/slice/trade-journal.slice";
import { Fragment } from "react";

interface ITradeInfo {
	theme: Theme;
	tradeInfo: ITradeDetails;
  markup: string;
}

const TradeDetails = ({ theme, tradeInfo, markup }: ITradeInfo) => {
	return (
		<Fragment>
			<StockName>{tradeInfo?.stockName}</StockName>
			<Typography color="primary" variant="subtitle1" align="right">
				{tradeInfo?.createdOn
					? getDateFromTimeStamp(tradeInfo?.createdOn)
					: null}
			</Typography>
			<InfoItemContainer>
				<InfoItemTitle>Segment: </InfoItemTitle>
				<InfoItemValue>{tradeInfo?.segment}</InfoItemValue>
			</InfoItemContainer>
			<InfoItemContainer>
				<InfoItemTitle>Based on strategy: </InfoItemTitle>
				<InfoItemValue>{tradeInfo?.basedOnStrategy}</InfoItemValue>
			</InfoItemContainer>
			<InfoItemContainer>
				<InfoItemTitle>Risk reward ratio: </InfoItemTitle>
				<InfoItemValue>{tradeInfo?.riskRewardRatio}</InfoItemValue>
			</InfoItemContainer>
			<InfoItemContainer>
				<InfoItemTitle>Percentage of capital deployed: </InfoItemTitle>
				<InfoItemValue>{tradeInfo?.percentageOfCapitalDeployed}%</InfoItemValue>
			</InfoItemContainer>
			<InfoItemContainer>
				<InfoItemTitle>Trade satisfaction: </InfoItemTitle>
				<InfoItemValue>{tradeInfo?.tradeSatisfaction}</InfoItemValue>
			</InfoItemContainer>
			<TableContainer
				sx={{
					maxWidth: "550px",
					marginInline: "0 auto",
					marginBlock: "20px",
					borderRadius: "10px",
				}}
				component={Paper}
			>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								Entry Date
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
								align="right"
							>
								Quantity Bought
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
								align="right"
							>
								Bought @ Price
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tradeInfo?.entry.map((entry, index) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{getDateFromTimeStamp(entry.date)}
								</TableCell>
								<TableCell align="right">{entry.quantity} qty</TableCell>
								<TableCell align="right">
									{formatToIndianCurrency(entry.price)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer
				sx={{
					maxWidth: "550px",
					marginInline: "auto 0",
					marginBlock: "20px",
					borderRadius: "10px",
				}}
				component={Paper}
			>
				<Table>
					<TableHead>
						<TableRow sx={{ backgroundColor: theme.palette.primary.dark }}>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								Exit Date
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
								align="right"
							>
								Quantity Sold
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
								align="right"
							>
								Exited @ Price
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{tradeInfo?.exit.map((exit, index) => (
							<TableRow
								key={index}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell component="th" scope="row">
									{getDateFromTimeStamp(exit.date)}
								</TableCell>
								<TableCell align="right">{exit.quantity} qty</TableCell>
								<TableCell align="right">
									{formatToIndianCurrency(exit.price)}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TableContainer
				sx={{
					maxWidth: "550px",
					marginInline: "auto auto",
					marginBlock: "30px",
					borderRadius: "10px",
				}}
				component={Paper}
			>
				<Table>
					<TableHead>
						<TableRow
							sx={{
								backgroundColor:
									theme.palette.mode === "dark" ? "#778899" : "#03408490",
							}}
						>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								Amount Invested
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								ROI
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								Trade Duration
							</TableCell>
							<TableCell
								color="primary"
								sx={{ fontWeight: "bold", fontSize: "14px" }}
							>
								PNL
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody
						sx={{
							backgroundColor:
								theme.palette.mode === "dark"
									? theme.palette.secondary.main
									: "#778899",
						}}
					>
						<TableRow
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell>
								{tradeInfo?.investedAmount
									? formatToIndianCurrency(tradeInfo?.investedAmount)
									: null}
							</TableCell>
							<TableCell>{tradeInfo?.roi} %</TableCell>
							<TableCell>{tradeInfo?.durationOfTrade}</TableCell>
							<TableCell
								sx={{
									color:
										tradeInfo !== undefined && tradeInfo.profitAndLoss > 0
											? "#90EE90"
											: "#FF5733",
									fontWeight: "bold",
									letterSpacing: "1px",
								}}
								component="th"
								scope="row"
							>
								{tradeInfo?.profitAndLoss
									? formatToIndianCurrency(tradeInfo?.profitAndLoss)
									: null}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<div>{ReactHtmlParser(markup)}</div>
		</Fragment>
	);
};

export default TradeDetails;
