const { test, expect } = require('@playwright/test');
const {DuckStartPage} = require('../pages/duckStartPage')

//test.describe('', () => {
//    let = page;)

test('Checks that duckduckgo can pe opened', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  const isLogoVisible = await page.isVisible('#logo_homepage_link');

  expect(isLogoVisible).toBe(true);
});

test('Checks that results page opens and results are correct', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    //await page.waitForSelector('#logo_homepage_link');
    await page.fill('#search_form_input_homepage', 'Test');
    await page.click('#search_button_homepage');
    const resultTextContent = await page.textContent('#r1-0')

    expect(resultTextContent).toContain('Test');
  });

  test('Ispector demo', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.click('[placeholder="Search the web without being tracked"]');
    await page.fill('[placeholder="Search the web without being tracked"]', 'Test');
    await Promise.all([
        page.waitForNavigation(/*{ url: 'https://duckduckgo.com/?q=Test&t=h_&ia=web' }*/),
        page.click('input:has-text("S")')
    ]);
    await page.click('text=Speedtest от Ookla - Глобальный тест скорости широкополосного...');
    
    expect(page.url()).toBe('https://www.speedtest.net/ru');
  });

  //Erroras
  test('MSword demo', async ({ page }) => {
    await page.goto('https://duckduckgo.com/');
    await page.fill('#search_form_input_homepage', "microsoft word cheat sheet");
    await page.click('#search_button_homepage');
    const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    const resultTextContent = await page.textContent('.c-base__title');
    expect(resultTextContent).toContain("Microsoft Word 2010");
    expect(isCheatSheetsVisible).toBe(true);
  });

  //PVZ
  test(`Search MS word cheatsheets`, async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    await page.fill('#search_form_input_homepage', 'ms word cheat sheet');
    await page.click('#search_button_homepage');
    const textContent = await page.textContent('.c-base__title');
    const isCheatSheetsVisible = await page.isVisible('.zcm__link.js-zci-link.js-zci-link--cheat_sheets.is-active');
    expect(isCheatSheetsVisible).toBe(true);
    expect(textContent).toContain("Microsoft Word 2010");
});

//Erroras
test(`go to shortened Wiki`, async ({ page }) => {
    await page.goto('https://duckduckgo.com');
    await page.fill('#search_form_input_homepage', 'shorten www.wikipedia.com');
    await page.click('#search_button_homepage');
    const shortUrl = await page.textContent('#shorten-url');
    await page.goto(shortUrl);
    expect(page.url()).toBe('https://www.wikipedia.org/');
});


test('panda', async ({ page }) => {
    await page.goto('https://duckduckgo.com');
  await page.waitForSelector("#search_form_input_homepage");
  await page.fill('#search_form_input_homepage', "intitle:panda");
  await page.click("#search_button_homepage", { force: true });
  await page.waitForNavigation();
      const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
      console.log(results);
  results.forEach(result => {
    expect(result.toLowerCase()).toContain("panda");
  });
});

const passwordsLengths = ['7', '16', '65'];
    passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async ({ page }) => {
        await page.goto('https://duckduckgo.com');
        await page.waitForSelector("#search_form_input_homepage");
        await page.fill('#search_form_input_homepage', ("password " + passwordLength));
        await page.click("#search_button_homepage");
        const generatedPassword = await page.textContent(".c-base__title");
        expect(generatedPassword.length).toEqual(+passwordLength)
    });
  });