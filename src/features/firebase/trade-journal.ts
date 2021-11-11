import { doc, setDoc, query, orderBy } from "@firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import { collection, getDoc, getDocs } from "firebase/firestore";
import { IFetchTradeDocRequest } from "../../pages/trade-info/trade-info.page";

export const saveTradeToTradesCollection = async (tradeDetails: any) => {
	const uidV4 = uuidv4();
	const docRef = doc(db, `trades/${tradeDetails.uid}/savedTrades`, uidV4);
	const tradeInfo = {
		...tradeDetails,
		id: uidV4,
		createdOn: new Date(),
	};
	await setDoc(docRef, tradeInfo);
};

export const getTrades = async (uid: string) => {
	const collectionRef = collection(db, `trades/${uid}/savedTrades`);
	const sortQuery = query(collectionRef, orderBy("createdOn", "desc"));
	const fetchTradesQuerySnapshot = await getDocs(sortQuery);
	const tradesInfo: {}[] = [];
	fetchTradesQuerySnapshot.forEach((doc) => {
		tradesInfo.push(doc.data());
	});
	return tradesInfo;
};

export const getTradeDocById = async (docToFetch: IFetchTradeDocRequest) => {
	return await getDoc(
		doc(db, `trades/${docToFetch.uid}/savedTrades/${docToFetch.id}`)
	).then((doc) => doc.data());
};

export const getTradingQuotes = async () => {
	return await getDoc(doc(db, "tradingQuotes/quotesDoc")).then((doc) =>
		doc.data()
	);
};
