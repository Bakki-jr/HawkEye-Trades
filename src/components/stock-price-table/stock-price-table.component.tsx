import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Theme } from "@mui/material";

const StockPriceTable = ({
	theme,
	stocksInfo,
}: {
	theme: Theme;
	stocksInfo: any[];
}) => {
	return (
		<TableContainer
			sx={{
				maxWidth: "1200px",
				marginInline: "auto",
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
							Symbol
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							Last Price
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							Open
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							High
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							Low
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							Change
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							% Change
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							30d % Change
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							365d % Change
						</TableCell>
						<TableCell
							color="primary"
							sx={{ fontWeight: "bold", fontSize: "14px" }}
							align="right"
						>
							Last Updated On
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stocksInfo.map((stock, index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
						>
							<TableCell component="th" scope="row">
								{stock.symbol}
							</TableCell>
							<TableCell align="right">{stock.lastPrice}</TableCell>
							<TableCell align="right">{stock.open}</TableCell>
							<TableCell align="right">{stock.dayHigh}</TableCell>
							<TableCell align="right">{stock.dayLow}</TableCell>
							<TableCell align="right">{stock.change}</TableCell>
							<TableCell align="right">{stock.pChange} %</TableCell>
							<TableCell align="right">{stock.perChange30d} %</TableCell>
							<TableCell align="right">{stock.perChange365d} %</TableCell>
							<TableCell align="right">{stock.lastUpdateTime}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default StockPriceTable;
