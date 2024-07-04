import { createRootReducer, productsLoaded, productDetailsLoaded, addToCart, clearCart, checkoutComplete } from '../../src/client/store';
import { ProductShortInfo, Product } from '../../src/common/types';

const exampleProduct: Product = {
    id: 1,
    name: 'Example Product',
    price: 100,
    description: 'Example Description',
    material: 'wood',
    color: 'black'
};

describe('store reducers', () => {
    it('should handle PRODUCTS_LOADED', () => {
        const state = { details: {}, cart: {}, products: {} as any };
        const action = productsLoaded([exampleProduct]);

        const newState = createRootReducer(state)(state, action);

        expect(newState.products).toEqual([exampleProduct]);
    });

    it('should handle PRODUCT_DETAILS_LOADED', () => {
        const state = { details: {}, cart: {}, products: {} as any };
        const action = productDetailsLoaded(exampleProduct);

        const newState = createRootReducer(state)(state, action);

        expect(newState.details[exampleProduct.id]).toEqual(exampleProduct);
    });

    it('should handle ADD_TO_CART', () => {
        const state = { details: {}, cart: {}, products: {} as any };
        const action = addToCart(exampleProduct);

        const newState = createRootReducer(state)(state, action);

        expect(newState.cart[exampleProduct.id]).toEqual({ name: exampleProduct.name, count: 1, price: exampleProduct.price });
    });

    it('should handle CLEAR_CART', () => {
        const state = { details: {}, cart: { 1: { name: 'Example Product', count: 1, price: 100 } }, products: {} as any };
        const action = clearCart();

        const newState = createRootReducer(state)(state, action);

        expect(newState.cart).toEqual({});
    });

    it('should handle CHECKOUT_COMPLETE', () => {
        const state = { details: {}, cart: { 1: { name: 'Example Product', count: 1, price: 100 } }, products: {} as any };
        const action = checkoutComplete(1);

        const newState = createRootReducer(state)(state, action);

        expect(newState.latestOrderId).toEqual(1);
        expect(newState.cart).toEqual({});
    });
});
