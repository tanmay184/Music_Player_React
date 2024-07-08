import axios from "axios";

const clientID = '200fc0bad3004c9daf259abdb2e7e8ee'
const clientSecret = '9b6c30a0b348414abb3495f8325a6178'
let accessToken = '';

const getAccessToken = async () => {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
            grant_type: 'client_credentials'
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientID + ':' + clientSecret)
            }
        });
        accessToken = response.data.access_token;
    } catch (error) {
        console.error('Error fetching access token', error);
    }
};

const searchTracks = async (keyword) => {
    if (!accessToken) {
        await getAccessToken();
    }

    try {
        const response = await axios.get(`https://api.spotify.com/v1/search`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: keyword,
                type: 'track'
            }
        });
        return response.data.tracks.items;
    } catch (error) {
        console.error('Error fetching tracks', error);
        if (error.response && error.response.status === 401) {
            // Token expired, get a new one and retry
            await getAccessToken();
            return searchTracks(keyword);
        }
    }
};

export { searchTracks };