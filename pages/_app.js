import '../styles/global.css';
import { Inter } from 'next/font/google';

const inter = Inter({ 
    subsets: ['latin'], 
    variable: "--inter-font"
});
export default function App({ Component, pageProps }) {
    return <Component {...pageProps}/>
}