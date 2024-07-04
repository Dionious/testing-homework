import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { Product } from '../../../../src/client/pages/Product';
import { productDetailsLoad } from '../../../../src/client/store';

// Mock the dependencies
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('react-router', () => ({
  useParams: jest.fn(),
}));
jest.mock('../../../../src/client/components/ProductDetails', () => ({
  ProductDetails: jest.fn(() => <div data-testid="product-details" />),
}));

const mockDispatch = jest.fn();
const mockProduct = { id: 1, name: 'Test Product' };

beforeEach(() => {
    jest.mocked(useDispatch).mockReturnValue(mockDispatch);
    jest.mocked(useParams).mockReturnValue({ id: '1' });
    jest.mocked(useSelector).mockImplementation(selector => selector({
        details: {
            1: mockProduct,
        },
    }));
});

afterEach(() => {
    jest.clearAllMocks();
});

describe('src/client/pages/Product.tsx', () => {
  it('dispatches productDetailsLoad on mount', () => {
        render(<Product />);
        expect(mockDispatch).toHaveBeenCalledWith(productDetailsLoad(1));
  });

  it('renders ProductDetails component when product is loaded', () => {
        const { getByTestId } = render(<Product />);
        expect(getByTestId('product-details')).toBeInTheDocument();
  });

  it('renders "LOADING" when product is not loaded', () => {
        jest.mocked(useSelector).mockImplementation(selector => selector({
            details: {},
        }));
        const { getByText } = render(<Product />);
        expect(getByText('LOADING')).toBeInTheDocument();
  });

  it('sets the document title to product name', () => {
        render(<Product />);
        const helmet = Helmet.peek();
        expect(helmet.title).toBe(mockProduct.name);
  });
});
