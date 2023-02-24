import { fireEvent, render, screen } from '@testing-library/react';
import axios, { AxiosStatic } from 'axios';
import App from './App';

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
        "title":"Tequila",
        "description":"Shot of Tequila",
        "recipeEntries":[
          {
            "ingredient":{"name":"Tequila"},
            "amount":"1 bottle"
          }
        ]
      }
    ]
  });

  render(<App/>); // We think we have to go to "http://locahost:3000/forum" because that's where the "http://localhost:8080/post/all" get-req is sent

  // Go to '/forum' ???

  /** Test that the mocked Axios's get method was called with this argument */
  expect(mockedAxios.get).toHaveBeenCalledWith("http://localhost:8080/post/all");
  /** Use findByText (which will wait for 1 second if it cannot find the element
    * immediately) instead of getByText to make sure the asynchronous methods in 
    * App all have time to finish */
    const tequilaPost = await screen.findByText("S");
    expect(tequilaPost).toBeInTheDocument();
  })