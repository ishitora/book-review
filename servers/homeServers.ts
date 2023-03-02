import API from './API';

const getHomeLayout = () => {
  return API.get('/api/homeLayout').then((res) => res.data);
};

const homeServers = { getHomeLayout };

export default homeServers;
