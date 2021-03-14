import React from "react";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { unmountComponentAtNode } from "react-dom";
import { cleanup, render, fireEvent, waitFor } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import ClientLayout from "../index";
import { getAllClients } from '../services/ClientServices';
import { act } from 'react-dom/test-utils';

jest.mock('axios');
jest.mock('../services/ClientServices');

afterEach(() => {
  cleanup;
  jest.resetAllMocks();
});

const mockedAxios = mocked(getAllClients);

test("renders client data", async () => {

  const data: any = {
    data: {
      data: [
        {
          name: "First Test",
          gender: "Male",
          phone: "9865321454",
          email: "test@gmail.com",
          address: "kathmnandu",
          nationality: "Nepali",
          dob: "2021-03-03",
          education_background: "BBA",
          contact_mode: "Phone"
        }
      ]
    }
  }
  mockedAxios.mockImplementationOnce(() => Promise.resolve(data));

  await act(async () => {
    const { getByText } = render(<ClientLayout />);
    await waitFor(() => [
      expect(
        getByText(
          'test@gmail.com'
        )
      ).toBeTruthy(),
    ]);
  });
});
