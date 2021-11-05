import { collection, getDocs } from "firebase/firestore";
import { db } from "./config";

export const getUsersBasicInfo = async () => {
	const fetchUsersSnapshot = await getDocs(collection(db, "users"));
	const users: {}[] = [];
	fetchUsersSnapshot.forEach((doc) => {
		users.push(doc.data());
	});
	return users;
};
