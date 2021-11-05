import { useEffect, useState } from "react";
import { getNiftyFiftyIndexWithStockData } from "../../features/api/rapid-API/nse-data";
import { useTheme } from "@mui/material";
import StockPriceTable from "../../components/stock-price-table/stock-price-table.component";
import Spinner from "../../components/spinner/spinner.component";

const StocksInfo = () => {
	const [niftyFiftyInfo, setniftyFiftyInfo] = useState<any[]>([]);
	const theme = useTheme();
	useEffect(() => {
		getNiftyFiftyIndexWithStockData().then((res) => setniftyFiftyInfo(res));
	}, []);
	return (
		<div style={{ paddingInline: 20 }}>
			{niftyFiftyInfo.length > 0 ? (
				<StockPriceTable theme={theme} stocksInfo={niftyFiftyInfo} />
			) : (
				<Spinner isLoading={true} />
			)}
		</div>
	);
};

export default StocksInfo;
