import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { ProductItem, ProductItemProps } from '../../../../src/client/components/ProductItem';
import { ProductShortInfo } from '../../../../src/common/types';

// Mock the dependencies
jest.mock('../../../../src/client/components/Image', () => ({
    Image: jest.fn(() => <img data-testid="mock-image" />),
}));

jest.mock('../../../../src/client/components/CartBadge', () => ({
    CartBadge: jest.fn(() => <span data-testid="mock-cart-badge">Item in cart</span>),
}));

describe('src/client/components/ProductItem.tsx', () => {
    const product: ProductShortInfo = {
        id: 1,
        name: 'Sample Product',
        price: 99.99,
    };

    const setup = (props: ProductItemProps) => {
        return render(
            <MemoryRouter>
                <ProductItem {...props} />
            </MemoryRouter>
        );
    };

    it('should render the product item', () => {
        const { getByTestId, getByText } = setup({ product });

        expect(getByTestId(product.id)).toBeInTheDocument();
        expect(getByTestId('mock-image')).toBeInTheDocument();
        expect(getByText(product.name)).toBeInTheDocument();
        expect(getByText(`$${product.price}`)).toBeInTheDocument();
        expect(getByText('Details')).toBeInTheDocument();
        expect(getByTestId('mock-cart-badge')).toBeInTheDocument();
    });

    it('should render the correct product details link', () => {
        const { getByText } = setup({ product });

        const detailsLink = getByText('Details');
        expect(detailsLink).toHaveAttribute('href', `/catalog/${product.id}`);
    });

    it('should apply correct BEM classes', () => {
        const { container, getByText } = setup({ product });

        const productElement = container.querySelector(`.ProductItem.card.w-100.mb-4`);
        expect(productElement).toBeInTheDocument();

        const nameElement = getByText(product.name);
        expect(nameElement).toHaveClass('ProductItem-Name');
        expect(nameElement).toHaveClass('card-title');

        const priceElement = getByText(`$${product.price}`);
        expect(priceElement).toHaveClass('ProductItem-Price');
        expect(priceElement).toHaveClass('card-text');

        const detailsLink = getByText('Details');
        expect(detailsLink).toHaveClass('ProductItem-DetailsLink');
        expect(detailsLink).toHaveClass('card-link');
    });
});