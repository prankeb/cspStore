import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from "../Header";

//Test if header componet renders title
describe('Header Component', () => {
    it('renders Title', () => {
      render(
            <Header />
      );
  
      
      expect(screen.getByText('CSPStore')).toBeInTheDocument();
      
      
    });
});