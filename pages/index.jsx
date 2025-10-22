import Layout from "./Layout.jsx";

import Home from "./Home";

import Kandidaten from "./Kandidaten";

import Arbeitgeber from "./Arbeitgeber";

import Auftraggeber from "./Auftraggeber";

import Admin from "./Admin";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Home: Home,
    
    Kandidaten: Kandidaten,
    
    Arbeitgeber: Arbeitgeber,
    
    Auftraggeber: Auftraggeber,
    
    Admin: Admin,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Home />} />
                
                
                <Route path="/Home" element={<Home />} />
                
                <Route path="/Kandidaten" element={<Kandidaten />} />
                
                <Route path="/Arbeitgeber" element={<Arbeitgeber />} />
                
                <Route path="/Auftraggeber" element={<Auftraggeber />} />
                
                <Route path="/Admin" element={<Admin />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}