import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import {useDispatch} from 'react-redux';
import { ProductDetails, ProductDetailsProps } from '../../../../src/client/components/ProductDetails';
import { addToCart } from '../../../../src/client/store';
import { Product } from '../../../../src/common/types';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));
jest.mock('../../../../src/client/components/Image', () => ({
    Image: jest.fn(() => <img data-testid="mock-image" />),
}));

jest.mock('../../../../src/client/components/CartBadge', () => ({
    CartBadge: jest.fn(() => <span data-testid="mock-cart-badge">Item in cart</span>),
}));

jest.mock('../../../../src/client/store', () => ({
    addToCart: jest.fn((product) => ({ type: 'ADD_TO_CART', payload: product })),
}));

beforeEach(() => {
    const mockDispatch = jest.fn();
    jest.mocked(useDispatch).mockReturnValue(mockDispatch);
})

describe('src/client/components/ProductDetails.tsx', () => {
    const product: Product = {
        id: 1,
        name: 'Sample Product',
        description: 'This is a sample product description',
        price: 99.99,
        color: 'red',
        material: 'plastic',
    };

    const setup = (props: ProductDetailsProps) => {
        return render(
            <ProductDetails {...props} />
        );
    };

    it('should render the product details', () => {
        const { getByText, getByTestId } = setup({ product });
        expect(getByText(product.name)).toBeInTheDocument();
        expect(getByText(product.description)).toBeInTheDocument();
        expect(getByText(`$${product.price}`)).toBeInTheDocument();
        expect(getByText('Add to Cart')).toBeInTheDocument();
        expect(getByTestId('mock-image')).toBeInTheDocument();
        expect(getByTestId('mock-cart-badge')).toBeInTheDocument();
        expect(getByText('Color')).toBeInTheDocument();
        expect(getByText(product.color)).toBeInTheDocument();
        expect(getByText('Material')).toBeInTheDocument();
        expect(getByText(product.material)).toBeInTheDocument();
    });

    it('should dispatch addToCart action when Add to Cart button is clicked', () => {
        const { getByText } = setup({ product });

        const addToCartButton = getByText('Add to Cart');
        fireEvent.click(addToCartButton);

        expect(addToCart).toHaveBeenCalledWith(product);
    });

    it('should dispatch addToCart action when Add to Cart button is clicked', () => {
        const { getByText } = setup({ product });

        const addToCartButton = getByText('Add to Cart');

        expect(addToCartButton.classList.contains('btn')).toBeTruthy();
        expect(addToCartButton.classList.contains('btn-primary')).toBeTruthy();
        expect(addToCartButton.classList.contains('btn-lg')).toBeTruthy();
    });

});
