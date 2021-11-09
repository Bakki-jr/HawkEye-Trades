import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "./config";

const storage = getStorage();

export const getUsersBasicInfo = async () => {
	const fetchUsersSnapshot = await getDocs(collection(db, "users"));
	const users: {}[] = [];
	fetchUsersSnapshot.forEach((doc) => {
		users.push(doc.data());
	});
	return users;
};

export const uploadProfileImageToStorage = async (
	file: any,
	uid: string | null
) => {
	const storageRef = ref(storage, `user-profile/${uid}/${file.name}`);
	const imageRef = await uploadBytes(storageRef, file);
	return await imageRef.ref.fullPath;
};

export const updateProfileInfo = async (info: any) => {
	const documentRef = doc(db, `users/${info.uid}`);
	const data =
		info.photoURL === ""
			? {
					name: info.displayName,
			  }
			: {
					name: info.displayName,
					photoURL: info.photoURL,
			  };
	return await updateDoc(documentRef, data);
};
