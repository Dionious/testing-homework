import React from 'react';
import { Home } from '../../../../src/client/pages/Home'
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import '@testing-library/jest-dom';

describe('testing src/client/pages/Home.tsx', () => {
    it('Should render welcome element text', () => {
        render(<Home/>);
        expect(document.querySelector('.display-3').innerHTML).toBe("Welcome to Kogtetochka store!");
        expect(document.querySelector('.lead').innerHTML).toBe('We have a large assortment of scratching posts!');
    });

    it('Should render headings with text', () => {
        render(<Home/>);
        expect(document.querySelectorAll('h1')[0].innerHTML).toBe("Stability");
        expect(document.querySelectorAll('.lead')[1].innerHTML).toBe(`Our scratching posts are crafted with precision and designed for unparalleled stability. Made from high-quality materials, they provide a sturdy platform for your cat's scratching needs.`);
        expect(document.querySelectorAll('h1')[1].innerHTML).toBe("Comfort");
        expect(document.querySelectorAll('.lead')[2].innerHTML).toBe(`Pamper your feline friend with the luxurious comfort of our scratching posts. Covered in soft, plush fabric, they offer a cozy retreat for your cat to relax and unwind.`);
        expect(document.querySelectorAll('h1')[2].innerHTML).toBe("Design");
        expect(document.querySelectorAll('.lead')[3].innerHTML).toBe(`Engage your cat's natural instincts and keep them entertained for hours with our interactive scratching posts. Featuring built-in toys and enticing textures, they stimulate your cat's senses and encourage active play.`);
    });

    it('Should render welcome element text', () => {
        render(<Home/>);
        const welcomeElement = document.querySelector('.display-3');
        expect(welcomeElement.innerHTML).toBe("Welcome to Kogtetochka store!");
    });

    it('Should render footer text', () => {
        render(<Home/>);
        expect(document.querySelector('.fs-1').innerHTML).toBe("Empower Your Coding Journey with Every Scratch – Get Your Paws on Our Purr-fect Scratchers Today!");
    });

    it('sets the document title to "Welcome"', () => {
        render(<Home />);
        const helmet = Helmet.peek();
        expect(helmet.title).toBe("Welcome");
    });
});
