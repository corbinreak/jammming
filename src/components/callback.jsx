import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spotify from '../assets/Spotify';


function Callback() {
    const navigate = useNavigate();

    useEffect(() => {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const token = params.get('access_token');
        const expiresIn = Number(params.get('expires_in'));

        if (token) {
            Spotify.setAccessToken(token);
            setTimeout(() => Spotify.setAccessToken(''), expiresIn * 1000);
            navigate('/');
        }
    }, [navigate]);

      return <div>Logging in...</div>;
}


export default Callback;