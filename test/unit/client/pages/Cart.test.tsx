import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Cart } from '../../../../src/client/pages/Cart';
import { clearCart, checkout } from '../../../../src/client/store';

// Mock the dependencies
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
jest.mock('../../../../src/client/store', () => ({
    clearCart: jest.fn(),
    checkout: jest.fn(),
}));

jest.mock('../../../../src/client/components/Form', () => ({
    Form: ({ onSubmit }: { onSubmit: (data: any) => void }) => {
        const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSubmit({ /* mock form data here */ });
        };

        return (
            <form onSubmit={handleSubmit} data-testid="mock-form">
                {/* your form fields here */}
                <button type="submit">Submit</button>
            </form>
        );
    },
}));

describe('src/client/pages/Cart.tsx', () => {
    const mockDispatch = jest.fn();
    const mockProducts = {
        1: { id: 1, name: 'Product 1', price: 10, count: 2 },
        2: { id: 2, name: 'Product 2', price: 20, count: 1 },
    };
    const mockLatestOrderId = '12345';

    beforeEach(() => {
        jest.mocked(useDispatch).mockReturnValue(mockDispatch);
        jest.mocked(useSelector).mockImplementation(selector => selector({
            cart: mockProducts,
            latestOrderId: mockLatestOrderId,
        }));
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders h1 with text "Shopping cart"', () => {
        const { getByText } = render(<Cart />, { wrapper: MemoryRouter });
        expect(getByText('Shopping cart')).toBeInTheDocument();
    });

    it('renders order info when cart is empty and latestOrderId is present', () => {
        jest.mocked(useSelector).mockImplementation(selector => selector({
            cart: {},
            latestOrderId: mockLatestOrderId,
        }));
        const { container } = render(<Cart />, { wrapper: MemoryRouter });
        const paragraph = container.querySelector('.Cart-SuccessMessage');
        expect(paragraph).toBeInTheDocument();
        expect(paragraph.classList.contains('alert-success')).toBe(true);
        expect(paragraph).toContainHTML(`Order #<strong class="Cart-Number">${mockLatestOrderId}</strong>`);
    });

    it('renders cart items with correct details', () => {
        const { getByTestId, getByText } = render(<Cart />, { wrapper: MemoryRouter });
        expect(getByTestId('1').innerHTML).toBe('<th class="Cart-Index" scope="row">1</th><td class="Cart-Name">Product 1</td><td class="Cart-Price">$10</td><td class="Cart-Count">2</td><td class="Cart-Total">$20</td>');
        expect(getByTestId('2').innerHTML).toBe('<th class="Cart-Index" scope="row">2</th><td class="Cart-Name">Product 2</td><td class="Cart-Price">$20</td><td class="Cart-Count">1</td><td class="Cart-Total">$20</td>');
    });

    it('renders total order price', () => {
        const total = Object.values(mockProducts).reduce((sum, { count, price }) => sum + count * price, 0);
        render(<Cart />, { wrapper: MemoryRouter });
        const totalPriceElement = document.querySelector('.Cart-OrderPrice');
        expect(totalPriceElement.innerHTML).toBe(`$${total}`);
    });

    it('renders "Cart is empty" message and catalog link when cart is empty', () => {
        jest.mocked(useSelector).mockImplementation(selector => selector({
            cart: {},
            latestOrderId: null,
        }));
        const { container, getByText, getByRole } = render(<Cart />, { wrapper: MemoryRouter });
        expect(container).toContainHTML('Cart is empty. Please select products in the');
        expect(getByRole('link', { name: /catalog/i })).toHaveAttribute('href', '/catalog');
    });

    it('dispatches clearCart action when "Clear shopping cart" button is clicked', async () => {
        const { getByText } = render(<Cart />, { wrapper: MemoryRouter });
        const clearButton = getByText('Clear shopping cart');
        fireEvent.click(clearButton);
        await waitFor(() => {
            expect(clearCart).toHaveBeenCalledTimes(1);
        });
    });

    it('dispatches checkout action when form is submitted', async () => {
        const { getByTestId } = render(<Cart />, { wrapper: MemoryRouter });
        const form = getByTestId('mock-form');
        fireEvent.submit(form);
        await waitFor(() => {
            expect(checkout).toHaveBeenCalledTimes(1);
        });
    });

    it('sets the document title to "Shopping cart"', () => {
        render(<Cart />, { wrapper: MemoryRouter });
        const helmet = Helmet.peek();
        expect(helmet.title).toBe('Shopping cart');
    });
});