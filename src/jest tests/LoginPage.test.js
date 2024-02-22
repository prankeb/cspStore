import React from "react";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginPage from "../LoginPage";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Register from '../Register';

//Mock of the register page that login page uses
jest.mock('../Register', () => () => <div data-testid="mocked-register" />);

describe('LoginPage Component', () => {
    //Test to make sure login page renders
    it('renders Login form', () => {
        render(
            <MemoryRouter>
                <LoginPage />
            </MemoryRouter>
        );

        // Your assertions here
        expect(screen.getByText('Username:')).toBeInTheDocument();
        expect(screen.getByText('Password:')).toBeInTheDocument();
        expect(screen.getByText('Need an Account?')).toBeInTheDocument();
    });

    //test for Register page opening after button click
    it('renders register page when on button click', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </MemoryRouter>
        );

        //Clicks on teh accouant button
        fireEvent.click(screen.getByText('Need an Account?'));

        
        await waitFor(() => {
            expect(screen.getByTestId('mocked-register')).toBeInTheDocument();
        });
    });
});