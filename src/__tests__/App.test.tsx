import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';


describe('Renders main page correctly', async () => {
    it('Should render the page correctly', async () => {
        render(<App/>)
        const h1 = await screen.queryByText('Hello world!')
        expect(h1).not.toBeNull();
    });
});