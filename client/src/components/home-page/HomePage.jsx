import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';
import LoginForm from '../login-form/LoginForm';
import stickers from './stickers';

import './HomePage.scss';
import { connect } from 'react-redux';
import { Navigate } from 'react-router';

const HomePage = ({isLoggedIn}) => {
    const [sticker, setSticker] = useState();

    useEffect(() => {
        const s = stickers[Math.floor(Math.random() * stickers.length)];
        setSticker(s);
    }, []);

    return ( isLoggedIn
        ? <Navigate to="/notes" />
        : <div className="home-page">
            <div className="login-container">
                <LoginForm />
            </div>
            <img src={sticker} alt="" />
        </div>
    );
};

HomePage.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    isLoggedIn: !!state.currentUser.jwt,
});

export default connect(mapStateToProps)(HomePage);
