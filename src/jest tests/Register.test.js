import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RegisterPage from "../Register";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../LoginPage";


jest.mock('../LoginPage', () => () => <div data-testid="mocked-login" />);

//Mock of the fetch giving an ok
global.fetch = jest.fn().mockResolvedValueOnce({
    ok: true,
    json: async () => ({ success: true }), 
  });

describe('RegisterPage Component', () => {
    it('renders accouant form', () => {
        render(
            <MemoryRouter>
                <RegisterPage />
            </MemoryRouter>
        );

        
        expect(screen.getByText('Create a Username:')).toBeInTheDocument();
        expect(screen.getByText('Create a Password:')).toBeInTheDocument();
        expect(screen.getByText('Register Account')).toBeInTheDocument();
    });

    //Checks what is rendered after acount is made
    it('renders login page when acount is created', async () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                </Routes>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Register Account'));

       
        await waitFor(() => {
            expect(screen.getByTestId('mocked-login')).toBeInTheDocument();
        });
    });
});