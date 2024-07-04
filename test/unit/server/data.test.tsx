import { ExampleStore, SIZE } from '../../../src/server/data';

describe('generateProducts', () => {
    it('should generate 27 products', () => {
        const store = new ExampleStore();
        expect(store.getAllProducts(0).length).toBe(27);
    });
});

// Тест класса ExampleStore
describe('ExampleStore', () => {
    let store: ExampleStore;

    beforeEach(() => {
        store = new ExampleStore();
    });

    it('should return all products with correct short info', () => {
        const products = store.getAllProducts(0);
        expect(products.length).toBe(27);
        expect(products[0].name).toBeDefined();
        expect(products[0].id).toBeDefined();
        expect(products[0].price).toBeDefined();
        expect(products[10].name).toBeDefined();
        expect(products[10].id).toBeDefined();
        expect(products[10].price).toBeDefined();
        expect(products[26].name).toBeDefined();
        expect(products[26].id).toBeDefined();
        expect(products[26].price).toBeDefined();
    });

    it('should return product by id', () => {
        const product = store.getProductById(0);
        expect(product).toHaveProperty('id', 0);
    });

    it('should return undefined for non-existent product id', () => {
        const product = store.getProductById(999);
        expect(product).toBeUndefined();
    });

    it('should create an order and return its id', () => {
        const formObj = {
            name: 'testName',
            phone: 'testPhone',
            address: 'testAddress',
        };
        const cartObj = {
            name: 'testName',
            price: 'testPrice',
            count:  'testCount',
        };
        const order = {
            form: formObj,
            cart: cartObj,
        };
        const orderId = store.createOrder(order);
        expect(orderId).toBe(1);
        const latestOrders = store.getLatestOrders();
        expect(latestOrders.length).toBe(1);
        expect(latestOrders[0]).toHaveProperty('form', formObj);
        expect(latestOrders[0]).toHaveProperty('cart', cartObj);
    });

    it('should return the latest orders up to SIZE', () => {
        for (let i = 0; i < SIZE + 10; i++) {
            const formObj = {
                name: `testName${i}`,
                phone: `testPhone${i}`,
                address: `testAddress${i}`,
            };
            const cartObj = {
                name: `testName${i}`,
                price: `testPrice${i}`,
                count:  `testCount${i}`,
            };
            const order = {
                form: formObj,
                cart: cartObj,
            };
            store.createOrder(order);
        }
        const latestOrders = store.getLatestOrders();
        expect(latestOrders.length).toBe(SIZE);
    });
});
