import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Image } from '../../../../src/client/components/Image';

describe('src/client/components/Image.tsx', () => {
    const STUB = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkMAYAADkANVKH3ScAAAAASUVORK5CYII=';

    it('should render an img element', () => {
        const { container } = render(<Image />);
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
    });

    it('should use the provided src attribute', () => {
        const src = 'https://example.com/image.png';
        const { getByRole } = render(<Image src={src} />);
        const imgElement = getByRole('img');
        expect(imgElement).toHaveAttribute('src', src);
    });

    it('should use the STUB src attribute when src is not provided', () => {
        const { getByRole } = render(<Image />);
        const imgElement = getByRole('img');
        expect(imgElement).toHaveAttribute('src', STUB);
    });

    it('should apply the provided className', () => {
        const className = 'custom-class';
        const { container } = render(<Image className={className} />);
        const imgElement = container.querySelector('img');
        expect(imgElement).toHaveClass(className);
    });

    it('should combine the BEM class with the provided className', () => {
        const className = 'custom-class';
        const { container } = render(<Image className={className} />);
        const imgElement = container.querySelector('img');
        expect(imgElement).toHaveClass('Image');
        expect(imgElement).toHaveClass(className);
    });
});
