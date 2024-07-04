import React from 'react';
import { Delivery } from '../../../../src/client/pages/Delivery'
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import '@testing-library/jest-dom';

jest.mock('../../../../src/client/components/Image', () => ({
    Image: jest.fn(() => <div data-testid="mock-image" />),
}));

describe('testing src/client/pages/Delivery.tsx', () => {
    it('Should render heading and text', () => {
        render(<Delivery/>);
        expect(document.querySelector('h1').innerHTML).toBe("Delivery");
        expect(document.querySelectorAll('p')[0].innerHTML).toBe('Swift and Secure Delivery: Experience the convenience of hassle-free shipping with our scratchers. We understand the excitement of receiving your new cat furniture, so we prioritize swift delivery to your doorstep. Rest assured, your order is handled with care every step of the way, ensuring it arrives safely and securely.');
        expect(document.querySelectorAll('p')[1].innerHTML).toBe('Track Your Package with Ease: Stay informed and in control of your delivery with our easy-to-use tracking system. From the moment your order is placed to the minute it reaches your home, you can monitor its journey in real-time. No more guessing games – know exactly when to expect your package and plan accordingly.');
        expect(document.querySelectorAll('p')[2].innerHTML).toBe('Customer Satisfaction Guaranteed: Your satisfaction is our top priority, which is why we go above and beyond to provide exceptional delivery service. If you have any questions or concerns about your shipment, our dedicated customer support team is here to assist you every step of the way. Trust us to deliver not only your scratcher but also peace of mind.');
    });

    it('sets the document title to "Delivery"', () => {
        render(<Delivery />);
        const helmet = Helmet.peek();
        expect(helmet.title).toBe("Delivery");
    });

    it('test if image render', () => {
        const { getByTestId } = render(<Delivery />);
        const imageElement = getByTestId('mock-image');
        expect(imageElement).toBeInTheDocument();
    })
});
