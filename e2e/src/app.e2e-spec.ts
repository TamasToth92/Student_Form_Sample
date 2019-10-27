import { AppPage } from './app.po';
import { browser, logging , protractor } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;
  const EC = protractor.ExpectedConditions;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display default app screen', () => {
    page.navigateTo();
    expect(page.getTitleText()).toContain('Hallgatói nyilvántartás');
    expect(page.getTitleText()).toMatch(/Hallgatói nyilvántartás \(\d{4}\. .+ \d{1,2}\.\)/);
    // TODO gomb ellenőrzés, táblázat ellenőrzés
  });

  it('should have a clickable Add button', () => {
      page.navigateTo();
      browser.wait(protractor.ExpectedConditions.elementToBeClickable(page.getAddButton()), 5000);
      expect(page.getAddButton().getAttribute('href')).toContain('/students/add');
  });

  it('should go to add screen when the Add button is clicked', ()=>{
    page.navigateTo();
    page.getAddButton().click();
    expect(page.getTitleText()).toBe('Hallgató hozzáadása');
    browser.wait(protractor.ExpectedConditions.stalenessOf(page.getStudentTable()), 5000);
  });

  it('should display errors when user enters bogus student data', ()=>{
    page.addView();
    page.getAddEmailInput().click();
    page.getAddEmailInput().sendKeys('nemjóemailcím');
    page.getAddAgeInput().click();
    page.getAddAgeInput().sendKeys('nemjóéletkor');
    page.getAddButton().click();
    expect(page.getAddNameInput().getAttribute('class')).toMatch('is-invalid');
    expect(page.getAddAgeInput().getAttribute('class')).toMatch('is-invalid');
    expect(page.getAddEmailInput().getAttribute('class')).toMatch('is-invalid');
    browser.wait(EC.visibilityOf(page.getNameInputError()), 1000);
    browser.wait(EC.visibilityOf(page.getEmailInputError()), 1000);
    browser.wait(EC.visibilityOf(page.getAgeInputError()), 1000);
    browser.sleep(2000);
    expect(page.getTitleText()).toBe('Hallgató hozzáadása');
    browser.wait(EC.urlContains('/students/add'), 1000);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    }));
  });
});
