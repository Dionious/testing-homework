describe('check routes', function() {
    it('should if product catalog correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog`);
        const productName = await browser.$('.ProductItem-Name');
        const productPrice = await browser.$('.ProductItem-Price');
        const productLink = await browser.$('.ProductItem-DetailsLink');
        const href = await productLink.getAttribute('href');

        expect(productName.isDisplayed()).toBeTruthy();
        expect(productPrice.isDisplayed()).toBeTruthy();
        expect(productLink.isDisplayed()).toBeTruthy();
        expect(href).toBe('/hw/store/catalog/0');
    });

    it('should if navigate to product from catalog correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog`);
        const productNameCatalog = await browser.$('.ProductItem-Name').getText();
        const productPriceCatalog = await browser.$('.ProductItem-Price').getText();
        const productLink = await browser.$('.ProductItem-DetailsLink');
        await productLink.click();
        const productNameOnProductPage = await browser.$('.ProductDetails-Name').getText();
        const productPriceOnProductPage = await browser.$('.ProductDetails-Price').getText();

        expect(productNameCatalog).toEqual(productNameOnProductPage);
        expect(productPriceOnProductPage).toEqual(productPriceCatalog);

    });

    it('should if clear product correctly', async ({ browser }) => {
        await browser.url(`http://localhost:3000/hw/store/catalog/1`);
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
});
