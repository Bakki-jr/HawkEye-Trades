import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IStatus } from "../../../interface/interface";
import {
	getBlogById,
	getBlogsFromCollection,
	saveToBlogsCollection,
	updateSpecificBlogComments,
} from "../../firebase/blog";

interface IBlog {
	saveBlog: {
		status: IStatus;
		dbError: any;
	};
	fetchBlogs: {
		status: IStatus;
		dbError: any;
		blogs: any[];
	};
	fetchBlogById: {
		status: IStatus;
		dbError: any;
		blog: any;
	};
	updateComments: {
		status: string;
		dbError: any;
	};
}

const initialState: IBlog = {
	saveBlog: {
		status: "",
		dbError: "",
	},
	fetchBlogs: {
		status: "",
		dbError: "",
		blogs: [],
	},
	fetchBlogById: {
		status: "",
		dbError: "",
		blog: {},
	},
	updateComments: {
		status: "",
		dbError: "",
	},
};

export const fetchBlogs = createAsyncThunk(
	"blog/fetchBlogs",
	async () => await getBlogsFromCollection()
);

export const SaveBlogContent = createAsyncThunk(
	"blog/SaveBlogContent",
	async (blogDetails: any) => {
		return await saveToBlogsCollection(blogDetails);
	}
);

export const updateBlogComments = createAsyncThunk(
	"blog/updateBlogComments",
	async (blogDetails: any) => {
		return await updateSpecificBlogComments(blogDetails);
	}
);

export const fetchBlogById = createAsyncThunk(
	"blog/fetchBlogById",
	async (id: string) => {
		return await getBlogById(id);
	}
);

export const blogSlice = createSlice({
	name: "blog",
	initialState,
	reducers: {
		resetSaveBlogStatus: (state) => {
			state.saveBlog.status = "";
		},
		resetFetchBlogsStatus: (state) => {
			state.fetchBlogs.status = "";
		},
		resetupdateBlogCommentsStatus: (state) => {
			state.updateComments.status = "";
		},
		updateBlog: {
			reducer: (state, action: PayloadAction<any>) => {
				state.fetchBlogById.blog = action.payload[0];
			},
			prepare: (state) => ({
				payload: [state],
			}),
		},
	},
	extraReducers: {
		[SaveBlogContent.pending.type]: (state: IBlog) => {
			state.saveBlog.status = "pending";
			state.saveBlog.dbError = null;
		},
		[SaveBlogContent.fulfilled.type]: (state: IBlog) => {
			state.saveBlog.status = "success";
			state.saveBlog.dbError = null;
		},
		[SaveBlogContent.rejected.type]: (state: IBlog, { error }) => {
			state.saveBlog.status = "failed";
			state.saveBlog.dbError = error;
		},
		[fetchBlogs.pending.type]: (state: IBlog) => {
			state.fetchBlogs.status = "pending";
			state.fetchBlogs.dbError = null;
		},
		[fetchBlogs.fulfilled.type]: (state: IBlog, { payload }: any) => {
			state.fetchBlogs.status = "success";
			state.fetchBlogs.dbError = null;
			state.fetchBlogs.blogs = payload;
		},
		[fetchBlogs.rejected.type]: (state: IBlog, { error }) => {
			state.fetchBlogs.status = "failed";
			state.fetchBlogs.dbError = error;
		},
		[fetchBlogById.pending.type]: (state: IBlog) => {
			state.fetchBlogById.status = "pending";
			state.fetchBlogById.dbError = null;
		},
		[fetchBlogById.fulfilled.type]: (state: IBlog, { payload }: any) => {
			state.fetchBlogById.status = "success";
			state.fetchBlogById.dbError = null;
			state.fetchBlogById.blog = payload;
		},
		[fetchBlogById.rejected.type]: (state: IBlog, { error }) => {
			state.fetchBlogById.status = "failed";
			state.fetchBlogById.dbError = error;
		},
		[updateBlogComments.pending.type]: (state: IBlog) => {
			state.updateComments.status = "pending";
			state.updateComments.dbError = null;
		},
		[updateBlogComments.fulfilled.type]: (state: IBlog, { payload }: any) => {
			state.updateComments.status = "success";
			state.updateComments.dbError = null;
		},
		[updateBlogComments.rejected.type]: (state: IBlog, { error }) => {
			state.updateComments.status = "failed";
			state.updateComments.dbError = error;
		},
	},
});

export const {
	resetSaveBlogStatus,
	resetFetchBlogsStatus,
	resetupdateBlogCommentsStatus,
	updateBlog,
} = blogSlice.actions;

export default blogSlice.reducer;
