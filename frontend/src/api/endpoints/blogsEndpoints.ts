export const BLOGS_ENDPOINTS = {
  GET_ALL: "/blog/all",
  GET_BY_ID: (id: string) => `blog/${id}`,
  CREATE: "/blog/create",
  UPDATE: (id: string) => `blog/update/${id}`,
  DELETE: (id: string) => `blog/delete/${id}`,
  GET_PAGINATED: (page: string, limit: string, search?: string) =>
    `/blog/getAllBlogs?page=${page}&limit=${limit}${search ? `&search=${search}` : ""}`,
};
