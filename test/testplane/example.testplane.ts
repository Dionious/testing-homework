describe('github', function() {
    it('should check repository name', async ({ browser }) => {
        await browser.url('http://localhost:3000/hw/store/');

        await expect(browser.$('.display-3')).toHaveText('Welcome to Kogtetochka store!');
    });
});
