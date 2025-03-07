import apiClient from "../apiClient";
import { BLOGS_ENDPOINTS } from "../endpoints/blogsEndpoints";
import { UpdatePostType, CreatePostType } from "@venteury/blog-common";

const getMyBlogs = async () => {
  try {
    const res = await apiClient.get(BLOGS_ENDPOINTS.GET_ALL);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const getBlogById = async (id: string) => {
  try {
    const res = await apiClient.get(BLOGS_ENDPOINTS.GET_BY_ID(id));
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const createBlog = async (data: CreatePostType) => {
  try {
    const res = await apiClient.post(BLOGS_ENDPOINTS.CREATE, data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const updateBlog = async (id: string, data: UpdatePostType) => {
  try {
    const res = await apiClient.put(BLOGS_ENDPOINTS.UPDATE(id), data);
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const deleteBlog = async (id: string) => {
  try {
    const res = await apiClient.delete(BLOGS_ENDPOINTS.DELETE(id));
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

const getPaginatedBlogs = async (
  page: string,
  limit: string,
  search?: string
) => {
  try {
    const res = await apiClient.get(
      BLOGS_ENDPOINTS.GET_PAGINATED(page, limit, search)
    );
    return res.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};

export {
  getMyBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getPaginatedBlogs,
};
