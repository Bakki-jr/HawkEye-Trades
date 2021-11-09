import { doc, getDoc, setDoc } from "@firebase/firestore";
import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	signOut,
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	UserCredential,
	sendPasswordResetEmail,
} from "firebase/auth";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";
import { ISignInForm } from "../../pages/sign-in/sign-in.page";
import { initFirebaseConfig, db } from "./config";

const google_Auth = new GoogleAuthProvider();
export const authInstance = getAuth(initFirebaseConfig);

export const signUpWithEmailAndPassword = (signUpData: any) => {
	return createUserWithEmailAndPassword(
		authInstance,
		signUpData.email,
		signUpData.password
	).then((res: UserCredential) => res);
};

export const loginWithEmail = async (signInInfo: ISignInForm) => {
	return await signInWithEmailAndPassword(
		authInstance,
		signInInfo.email,
		signInInfo.password
	).then((res: UserCredential) => res);
};

export const googleSignInWithPopup = async () => {
	return await signInWithPopup(authInstance, google_Auth).then((res) => res);
};

export const isUserExists = async (uid: string) => {
	const docRef = doc(db, "users", uid);
	const docSnap = await getDoc(docRef);
	return docSnap.exists();
};

export const saveUserToUsersCollection = async (user: User) => {
	const docRef = doc(db, "users", user.uid);
	const userData = {
		name: user.displayName,
		email: user.email,
		uid: user.uid,
		createdOn: new Date(),
		photoURL: user.photoURL ? user.photoURL : "",
	};
	await setDoc(docRef, userData);
};

export const fetchUserInfo = async (uid: string) => {
	const docRef = doc(db, "users", uid);
	return await getDoc(docRef).then((res: DocumentSnapshot<DocumentData>) =>
		res.data()
	);
};

export const resetPassword = async (email: string) => {
	await sendPasswordResetEmail(authInstance, email);
};

export const signOutFromApp = async () => {
	return await signOut(authInstance).then(() => true);
};
