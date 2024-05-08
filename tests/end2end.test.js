const { Builder, By, until } = require('selenium-webdriver');
require ('geckodriver');

const fileUnderTest = 'file://' + __dirname.replace(/ /g, '%20') + '/../dist/index.html';
const defaultTimeout = 10000;
let driver;
jest.setTimeout(1000 * 60 * 5);

beforeAll(async () => {
    console.log(fileUnderTest);
    driver = await new Builder().forBrowser('firefox').build();
    await driver.get(fileUnderTest);
});

afterAll(async() => {
    await driver.quit();
}, defaultTimeout);

test('The stack should be empty in the beginning', async () => {
    let stack = await driver.findElement(By.id('top_of_stack')).getText();
    expect(stack).toEqual("n/a");
});

describe('Clicking pusha till stacken"', () => {
    it('should return "n/a" if push is cancelled', async () => {
        let push = await driver.findElement(By.id('push'));
        await push.click();
        await driver.wait(until.alertIsPresent(), 10000); 
        let alert = await driver.switchTo().alert();
        await alert.dismiss(); // Avbryter alert/prompt så att inget pushas
        let topStack = await driver.findElement(By.id('top_of_stack')).getText();
        expect(topStack).toEqual("n/a");  // Kollar så att stacken fortfarande visar "n/a"
    });
});