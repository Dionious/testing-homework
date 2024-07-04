import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter} from 'react-router-dom';
import { useSelector} from 'react-redux';
import { Application } from '../../../src/client/Application';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('../../../src/client/pages/Home', () => ({
    Home: () => <div data-testid="mock-home">Mock Home Component</div>,
}));

jest.mock('../../../src/client/pages/Catalog', () => ({
    Catalog: () => <div data-testid="mock-catalog">Mock Catalog Component</div>,
}));

jest.mock('../../../src/client/pages/Product', () => ({
    Product: () => <div data-testid="mock-product">Mock Product Component</div>,
}));

jest.mock('../../../src/client/pages/Delivery', () => ({
    Delivery: () => <div data-testid="mock-delivery">Mock Delivery Component</div>,
}));

jest.mock('../../../src/client/pages/Contacts', () => ({
    Contacts: () => <div data-testid="mock-contacts">Mock Contacts Component</div>,
}));

jest.mock('../../../src/client/pages/Cart', () => ({
    Cart: () => <div data-testid="mock-cart">Mock Cart Component</div>,
}));


const mockProducts = {
    1: { id: 1, name: 'Product 1', price: 10, count: 2 },
    2: { id: 2, name: 'Product 2', price: 20, count: 1 },
};
describe('Application component', () => {
    beforeEach(() => {
        jest.mocked(useSelector).mockImplementation(selector => selector({
            cart: mockProducts,
        }));
    });

    const renderApp = () => {
        return render (
            <Application />, { wrapper: MemoryRouter }
        );
    };

    it('renders the navbar links and toggles the navbar on button click', () => {
        const { getByText, getByLabelText, getByRole } = renderApp();

        expect(getByText('Kogtetochka store')).toBeInTheDocument();
        expect(getByText('Catalog')).toBeInTheDocument();
        expect(getByText('Delivery')).toBeInTheDocument();
        expect(getByText('Contacts')).toBeInTheDocument();
        expect(getByText('Cart (2)')).toBeInTheDocument();

        const togglerButton = getByLabelText('Toggle navigation');
        fireEvent.click(togglerButton);
        expect(document.querySelector('.Application-Menu').classList).toContain('navbar-collapse');
    });

    it('navigates to the correct pages on link click', () => {
        const { getByText } = renderApp();

        fireEvent.click(getByText('Catalog'));
        expect(getByText('Catalog')).toHaveClass('active');

        fireEvent.click(getByText('Delivery'));
        expect(getByText('Delivery')).toHaveClass('active');

        fireEvent.click(getByText('Contacts'));
        expect(getByText('Contacts')).toHaveClass('active');

        fireEvent.click(getByText('Cart (2)'));
        expect(getByText('Cart (2)')).toHaveClass('active');
    });

    it('collapses the navbar on link click check classes', async () => {
        const { getByText } = renderApp();
        const classList = document.querySelector('.Application-Menu').classList;
        await fireEvent.click(getByText('Catalog'));
        expect(classList).toContain('collapse');
        expect(classList).toContain('navbar-collapse');
    });
});
