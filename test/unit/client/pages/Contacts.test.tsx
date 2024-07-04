import React from 'react';
import { Contacts } from '../../../../src/client/pages/Contacts'
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import '@testing-library/jest-dom';

describe('testing src/client/pages/Contacts.tsx', () => {
    it('Should render heading and text', () => {
        render(<Contacts/>);
        expect(document.querySelector('h1').innerHTML).toBe("Contacts");
        expect(document.querySelectorAll('p')[0].innerHTML).toBe('Have a question about our scratchers or need help placing an order? Don\'t hesitate to reach out to us! Our dedicated team is here to provide you with top-notch service and support.');
        expect(document.querySelectorAll('p')[1].innerHTML).toBe('Our friendly representatives are available during business hours to assist you with any inquiries you may have.');
        expect(document.querySelectorAll('p')[2].innerHTML).toBe('At our store, customer satisfaction is our priority, and we\'re committed to ensuring you have a smooth and enjoyable shopping experience. Reach out to us today – we\'re here to help make your cat\'s scratching dreams a reality!');
    });

    it('sets the document title to "Contacts"', () => {
        render(<Contacts />);
        const helmet = Helmet.peek();
        expect(helmet.title).toBe("Contacts");
    });
});
