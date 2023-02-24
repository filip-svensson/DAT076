
import { render, screen } from '@testing-library/react';
import Home from "./Home";


beforeEach(() => {
    render(<Home/>);
})

test("renders Home page", ()=>{
    const pElement = screen.getByText(/Welcome to Share-A-Drink. This is an online forum where you can share your delicious drink recipes with others./i);
    expect(pElement).toBeInTheDocument;

    const linkElement = screen.getByText(/Enter Forum/i);
    expect(linkElement).toBeInTheDocument;
})