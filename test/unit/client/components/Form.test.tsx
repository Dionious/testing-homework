import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Form, FormProps } from '../../../../src/client/components/Form';
import { CheckoutFormData } from '../../../../src/common/types';

describe('src/client/components/Form.tsx', () => {
    const mockSubmit = jest.fn();

    const renderForm = (props: Partial<FormProps> = {}) => {
        return render(<Form onSubmit={mockSubmit} {...props} />);
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the form fields and submit button', () => {
        const { getByRole, getByLabelText } = renderForm();

        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Phone')).toBeInTheDocument();
        expect(getByLabelText('Address')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Checkout' })).toBeInTheDocument();
    });

    it('displays validation errors when fields are empty and form is submitted', () => {
        const { getByText, getByRole } = renderForm();

        fireEvent.click(getByRole('button', { name: 'Checkout' }));

        expect(getByText('Please provide your name')).toBeVisible();
        expect(getByText('Please provide a valid phone')).toBeVisible();
        expect(getByText('Please provide a valid address')).toBeVisible();
    });

    it('displays validation errors when phone number is invalid', () => {
        const { getByRole, getByLabelText, getByText } = renderForm();

        fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Phone'), { target: { value: 'invalid-phone' } });
        fireEvent.change(getByLabelText('Address'), { target: { value: '123 Main St' } });
        fireEvent.click(getByRole('button', { name: 'Checkout' }));

        expect(getByText('Please provide a valid phone')).toBeVisible();
    });

    it('calls onSubmit with form data when all fields are valid', () => {
        const { getByRole, getByLabelText } = renderForm();

        fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Phone'), { target: { value: '123-456-7890' } });
        fireEvent.change(getByLabelText('Address'), { target: { value: '123 Main St' } });
        fireEvent.click(getByRole('button', { name: 'Checkout' }));

        expect(mockSubmit).toHaveBeenCalledWith({
            name: 'John Doe',
            phone: '123-456-7890',
            address: '123 Main St',
        });
    });

    it('disables the form fields and submit button after successful submission', () => {
        const { getByRole, getByLabelText } = renderForm();

        fireEvent.change(getByLabelText('Name'), { target: { value: 'John Doe' } });
        fireEvent.change(getByLabelText('Phone'), { target: { value: '123-456-7890' } });
        fireEvent.change(getByLabelText('Address'), { target: { value: '123 Main St' } });
        fireEvent.click(getByRole('button', { name: 'Checkout' }));

        expect(getByLabelText('Name')).toBeDisabled();
        expect(getByLabelText('Phone')).toBeDisabled();
        expect(getByLabelText('Address')).toBeDisabled();
        expect(getByRole('button', { name: 'Checkout' })).toBeDisabled();
    });
});
