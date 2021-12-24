import { useEffect, useState } from 'react';
import LoginForm from '../login-form/LoginForm';
import stickers from './stickers';

import './HomePage.scss';

const HomePage = () => {
    const [sticker, setSticker] = useState();

    useEffect(() => {
        const s = stickers[Math.floor(Math.random() * stickers.length)];
        setSticker(s);
    }, []);

    return (
        <div className="home-page">
            <div className="login-container">
                <LoginForm />
            </div>
            <img src={sticker} alt="" />
        </div>
    );
};

export default HomePage;
