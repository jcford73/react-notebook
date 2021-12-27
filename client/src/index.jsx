import ReactDOM from 'react-dom';
import './styles.scss';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import configureStore from './store/store';

const store = configureStore();

const appHost = document.createElement('div');
appHost.className = 'app-root';
document.body.appendChild(appHost);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>, //
    appHost,
);
