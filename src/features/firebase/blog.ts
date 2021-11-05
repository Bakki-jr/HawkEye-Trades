import { doc, setDoc } from "@firebase/firestore";
import { db } from "./config";
import { v4 as uuidv4 } from "uuid";
import {
	collection,
	getDoc,
	getDocs,
	updateDoc,
	onSnapshot,
} from "firebase/firestore";

export const saveToBlogsCollection = async (blogDetails: any) => {
	const uidV4 = uuidv4();
	const docRef = doc(db, "blogs", uidV4);
	const document = {
		...blogDetails,
		id: uidV4,
		comments: [],
		publishedOn: new Date(),
	};
	await setDoc(docRef, document).then(() => {
		console.log(`Blog saved successfully => ${uidV4}`);
	});
};

export const getBlogsFromCollection = async () => {
	const fetchBlogsSnapshot = await getDocs(collection(db, "blogs"));
	const blogs: {}[] = [];
	fetchBlogsSnapshot.forEach((doc) => {
		blogs.push(doc.data());
	});
	return blogs;
};

export const updateSpecificBlogComments = async (blogDetails: any) => {
	const washingtonRef = doc(db, "blogs", blogDetails.id);
	await updateDoc(washingtonRef, {
		comments: blogDetails.comments,
	});
};

export const blogSnapshot = onSnapshot(collection(db, "blogs"), (blogs) => {
	const docs = blogs.docs;
	const blogsData = [];
	for (var i in docs) {
		blogsData.push(docs[i].data());
	}
});


export const getBlogById = async (blogId : string) => {
	return await getDoc(doc(db, `blogs/${blogId}`)).then(doc => doc.data());
};
