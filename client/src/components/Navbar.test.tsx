
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Route, Router } from 'react-router-dom';
import Navbar from './Navbar';

beforeEach(() => {
    render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>
    );
})

test("renders Navbar component", ()=>{
    const linkElement = screen.getByText(/Share-A-Drink/i);
    expect(linkElement).toBeInTheDocument;
})