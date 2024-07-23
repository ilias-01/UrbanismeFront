import axios from 'axios';

export const getUrbanismeRequests = (page, limit, search, dateFrom) => {
  return axios.get('http://localhost:8000/api/urbanisme-requests', {
    params: {
      page: page,
      limit: limit,
      search: search,
      date_from: dateFrom,
    },
  });
};