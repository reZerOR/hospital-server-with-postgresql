export const calculatePagination = (options: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    const page = Number(options.page) || 1;
    const limit = Number(options.limit) || 10;
    const sortBy = options.sortBy || "createdAt";
    const sortOrder = options.sortOrder || "desc";
    const skip = (page - 1) * limit;
    return { page, limit, sortBy, sortOrder, skip };
  };