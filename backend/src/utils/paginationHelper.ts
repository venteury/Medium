const getPagination = (page: string, limit: string) => {
  const currentPage = Math.max(parseInt(page) || 1, 1);
  const pageSize = Math.max(parseInt(limit) || 10, 1);
  const skip = (currentPage - 1) * pageSize;

  return { skip, take: pageSize, currentPage, pageSize };
};

export { getPagination };
