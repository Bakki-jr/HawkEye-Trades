import { doc, setDoc } from "@firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import {
	collection,
	getDoc,
	getDocs,
} from "firebase/firestore";
import { IFetchTradeDocRequest } from "../../pages/trade-info/trade-info.page";


export const saveTradeToTradesCollection = async (tradeDetails: any) => {
	const uidV4 = uuidv4();
	const docRef = doc(db, `trades/${tradeDetails.uid}/savedTrades`, uidV4);
	const tradeInfo = {
		...tradeDetails,
		id: uidV4,
		createdOn: new Date(),
	};
	await setDoc(docRef, tradeInfo).then(() => {
		console.log(`Trade saved successfully => ${tradeDetails.uid}`);
	});
};

export const getTrades = async (uid: string) => {
	const fetchTradesQuerySnapshot = await getDocs(collection(db, `trades/${uid}/savedTrades`));
	const tradesInfo: {}[] = [];
  fetchTradesQuerySnapshot.forEach((doc) => {
     tradesInfo.push(doc.data());
	});
  return tradesInfo;
};

export const getTradeDocById = async (docToFetch: IFetchTradeDocRequest) => {
	return await getDoc(doc(db, `trades/${docToFetch.uid}/savedTrades/${docToFetch.id}`)).then(doc => doc.data());
};
