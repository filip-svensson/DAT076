import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import { BrowserRouter } from 'react-router-dom';
import Forum from './Forum';

/** Create the mocked version of Axios */
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<AxiosStatic>

test("Should send get to localhost", async () => {
  /** This line tells the mocked Axios: when your 'get' method is called,
  *  return this.
  */
  mockedAxios.get.mockResolvedValue({
    status: 200,
    data: [
        {
            "id": "f8f2d19d-a473-4817-ac50-43e6438a07f6",
            "author": {
                "id": "5e9b1ee3-e513-40a8-a3cb-8d517a430de2",
                "name": "test"
            },
            "title": "Tequila",
            "description": "Shot of Tequila",
            "recipeEntries": [
                {
                    "ingredient": {
                        "name": "Tequila"
                    },
                    "amount": "1 bottle"
                }
            ],
            "comments": [],
            "ratings": []
        },
    ]
  });

  render(
    <BrowserRouter>
        <Forum/>
    </BrowserRouter>
  ); // We think we have to go to "http://locahost:3000/forum" because that's where the "http://localhost:8080/post/all" get-req is sent

  // Go to '/forum' ???

  /** Test that the mocked Axios's get method was called with this argument */
  expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/post/all");
  /** Use findByText (which will wait for 1 second if it cannot find the element
    * immediately) instead of getByText to make sure the asynchronous methods in 
    * App all have time to finish */
  const tequilaPost = screen.findByText(/Tequila/i);
  expect(tequilaPost).toBeInTheDocument();
})