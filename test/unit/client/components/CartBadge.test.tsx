import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useSelector } from 'react-redux';
import { CartBadge } from '../../../../src/client/components/CartBadge';

// Мокирование useSelector
jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

describe('src/client/components/CartBadge.tsx', () => {
    const mockUseSelector = useSelector as jest.MockedFunction<typeof useSelector>;

    it('should render "Item in cart" when item is in the cart', () => {
        mockUseSelector.mockReturnValue({
            1: { id: 1, name: 'Product 1', price: 10, count: 1 },
        });

        const { getByText } = render(<CartBadge id={1} />);
        expect(getByText('Item in cart')).toBeInTheDocument();
    });

    it('should not render anything when item is not in the cart', () => {
        mockUseSelector.mockReturnValue({});

        const { container } = render(<CartBadge id={1} />);
        expect(container).toBeEmptyDOMElement();
    });

    it('should not render anything when item id is not in the cart', () => {
        mockUseSelector.mockReturnValue({
            2: { id: 2, name: 'Product 2', price: 20, count: 1 },
        });

        const { container } = render(<CartBadge id={1} />);
        expect(container).toBeEmptyDOMElement();
    });
});
