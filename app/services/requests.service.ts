const API_KEY = '818089ca50e2db994d4a5864de664559'

const req = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
}

export default req;
