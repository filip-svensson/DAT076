
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Navbar from './Navbar';

beforeEach(() => {
    render(
        /** This didn't work
        <BrowserRouter>
            <Router>
                <Route path='/' element={<Navbar/>}/>
            </Router>
        </BrowserRouter> 
        */
        <Navbar/>
    );
    // Wrap in router somehow
})

test("renders Navbar component", ()=>{
    const linkElement = screen.getByText(/Share-A-Drink/i);
    expect(linkElement).toBeInTheDocument;
})