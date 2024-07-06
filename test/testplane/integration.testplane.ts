const BUG_ID = ''; // меняйте bug_id - например ?bug_id=1
describe('check routes', function() {
    it('should if product catalog correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);
        const productName = await browser.$('.ProductItem-Name');
        const productPrice = await browser.$('.ProductItem-Price');
        const productLink = await browser.$('.ProductItem-DetailsLink');
        const href = await productLink.getAttribute('href');

        expect(productName.isDisplayed()).toBeTruthy();
        expect(productPrice.isDisplayed()).toBeTruthy();
        expect(productLink.isDisplayed()).toBeTruthy();
        expect(href).toBe('/hw/store/catalog/0');
    });

    it('should if navigate to product from catalog correctly and text equal to each other', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog${BUG_ID}`);
        const productNameCatalog = await browser.$$('.ProductItem-Name')[2].getText();
        const productPriceCatalog = await browser.$$('.ProductItem-Price')[2].getText();
        const productLink = await browser.$$('.ProductItem-DetailsLink')[2];
        await productLink.click();
        const productNameOnProductPage = await browser.$('.ProductDetails-Name').getText();
        const productPriceOnProductPage = await browser.$('.ProductDetails-Price').getText();

        expect(productNameCatalog).toEqual(productNameOnProductPage);
        expect(productPriceOnProductPage).toEqual(productPriceCatalog);

    });

    it('should render order correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog/1${BUG_ID}`);
        const addToCartButton = await browser.$('.ProductDetails-AddToCart');
        await addToCartButton.click();
        await browser.$('.navbar-nav').$(':last-child').click();
        const indexCart = await browser.$('.Cart-Index').getText();
        const priceCart = await browser.$('.Cart-Price').isDisplayed();
        const countCart = await browser.$('.Cart-Count').isDisplayed();
        const totalCart = await browser.$('.Cart-Total').isDisplayed();

        await browser.refresh();

        expect(indexCart).toBe('1');
        expect(priceCart).toBeTruthy();
        expect(countCart).toBeTruthy();
        expect(totalCart).toBeTruthy();

        const clearButton = await browser.$('.Cart-Clear');
        await clearButton.click();

        await browser.refresh();

        const empty = await browser.$('.Cart').getText();
        expect(empty).toBe(`Shopping cart\nCart is empty. Please select products in the catalog.`);
    });

    it('should if clear product correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog/1${BUG_ID}`);
        const addToCartButton = await browser.$('.ProductDetails-AddToCart');
        await addToCartButton.click();
        await browser.$('.navbar-nav').$(':last-child').click();
        const indexCart = await browser.$('.Cart-Index').getText();
        const priceCart = await browser.$('.Cart-Price').isDisplayed();
        const countCart = await browser.$('.Cart-Count').isDisplayed();
        const totalCart = await browser.$('.Cart-Total').isDisplayed();

        expect(indexCart).toBe('1');
        expect(priceCart).toBeTruthy();
        expect(countCart).toBeTruthy();
        expect(totalCart).toBeTruthy();

        const clearButton = await browser.$('.Cart-Clear');
        await clearButton.click();

        const empty = await browser.$('.Cart').getText();
        expect(empty).toBe(`Shopping cart\nCart is empty. Please select products in the catalog.`);
    });

    it('should return product order success correct text', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog/1${BUG_ID}`);
        const addToCartButton = await browser.$('.ProductDetails-AddToCart');
        await addToCartButton.click();
        await browser.$('.navbar-nav').$(':last-child').click();

       const nameField = await browser.$('.Form-Field_type_name');
       await nameField.setValue('Test Name');
       const phoneField = await browser.$('.Form-Field_type_phone');
       await phoneField.setValue('+7933333333');
       const addressField = await browser.$('.Form-Field_type_address');
       await addressField.setValue('Test Address');
       const formSubmit = await browser.$('.Form-Submit');
       await formSubmit.click();
       const successText = await browser.$('.Cart-SuccessMessage > p').getText();
       expect(successText).toBe('Order #1 has been successfully completed.')
    });
});
