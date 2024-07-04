import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Catalog } from '../../../../src/client/pages/Catalog';
import { ProductItem } from "../../../../src/client/components/ProductItem";

// Mock the dependencies
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));
jest.mock('../../../../src/client/components/ProductItem', () => ({
    ProductItem: jest.fn(() => <div data-testid="product-item" />),
}));

const mockDispatch = jest.fn();
const mockProduct = { id: 1, name: 'Test Product' };

beforeEach(() => {
    jest.mocked(useDispatch).mockReturnValue(mockDispatch);
    jest.mocked(useSelector).mockImplementation(selector => selector({
        products: [mockProduct],
    }));
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('src/client/pages/Catalog.tsx', () => {
    it('dispatches productsLoad on mount', () => {
        render(<Catalog />);
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('renders ProductItem component when product is loaded', () => {
        const { getByTestId } = render(<Catalog />);
        expect(getByTestId('product-item')).toBeInTheDocument();
    });

    it('renders "LOADING" when product is not loaded', () => {
        jest.mocked(useSelector).mockImplementation(selector => selector({}));
        const { getByText } = render(<Catalog />);
        expect(getByText('LOADING')).toBeInTheDocument();
    });

    it('sets the document title to product name', () => {
        render(<Catalog />);
        const helmet = Helmet.peek();
        expect(helmet.title).toBe('Catalog');
    });

    it('renders h1 with text "Catalog"', () => {
        const { getByText } = render(<Catalog />);
        expect(getByText('Catalog')).toBeInTheDocument();
    });

    it('renders ProductItem components with products passed as props', () => {
        const { getByTestId } = render(<Catalog />);
        expect(getByTestId(mockProduct.id)).toBeInTheDocument();
        expect(ProductItem).toHaveBeenCalledWith({ product: mockProduct }, {});
    });
});
