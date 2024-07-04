import axios from 'axios';
import { ExampleApi, CartApi, LOCAL_STORAGE_CART_KEY  } from '../../src/client/api';
import { ProductShortInfo, Product, CheckoutFormData, CheckoutResponse, CartState } from '../../src/common/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('src/client/api.ts', () => {
    const basename = 'http://localhost:3000';
    const api = new ExampleApi(basename);

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch products', async () => {
        const products: ProductShortInfo[] = [{ id: 1, name: 'Product1', price: 100 }];
        mockedAxios.get.mockResolvedValueOnce({ data: products });

        const result = await api.getProducts();
        expect(result.data).toEqual(products);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${basename}/api/products`, { params: { bug_id: undefined } });
    });

    it('should fetch product by id', async () => {
        const product: Product = { id: 1, name: 'Product1', description: 'Desc', price: 100, color: 'red', material: 'wood' };
        mockedAxios.get.mockResolvedValueOnce({ data: product });

        const result = await api.getProductById(1);
        expect(result.data).toEqual(product);
        expect(mockedAxios.get).toHaveBeenCalledWith(`${basename}/api/products/1`, { params: { bug_id: undefined } });
    });

    it('should checkout', async () => {
        const form: CheckoutFormData = { name: 'John', phone: '+7676767', address: '123 Street' };
        const cartItem =  {
            name: 'testName',
            price: 100,
            count: 1,
        };
        const cart: CartState = { 1: cartItem };
        const response: CheckoutResponse = { id: 1 };
        mockedAxios.post.mockResolvedValueOnce({ data: response });

        const result = await api.checkout(form, cart);
        expect(result.data).toEqual(response);
        expect(mockedAxios.post).toHaveBeenCalledWith(`${basename}/api/checkout`, { form, cart }, { params: { bug_id: undefined } });
    });
});

describe('CartApi', () => {
    let cartApi: CartApi;

    beforeEach(() => {
        cartApi = new CartApi();
        localStorage.clear();
    });

    describe('getState', () => {
        it('should get state from localStorage', () => {
            const cartItem =  {
                name: 'testName',
                price: 100,
                count: 1,
            };
            const cartState: CartState = { 1: cartItem };
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cartState));

            const result = cartApi.getState();
            expect(result).toEqual(cartState);
        });

        it('should return empty state if localStorage is empty', () => {
            const result = cartApi.getState();
            expect(result).toEqual({});
        });

        it('should return empty state if localStorage has invalid JSON', () => {
            localStorage.setItem(LOCAL_STORAGE_CART_KEY, 'invalid_json');

            const result = cartApi.getState();
            expect(result).toEqual({});
        });
    });

    describe('setState', () => {
        it('should set state to localStorage', () => {
            const cartItem =  {
                name: 'testName',
                price: 100,
                count: 1,
            };
            const cartState: CartState = { 1: cartItem };
            cartApi.setState(cartState);

            const result = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
            expect(result).toEqual(JSON.stringify(cartState));
        });
    });
});
