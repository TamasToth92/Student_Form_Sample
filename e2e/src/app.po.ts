import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '/students') as Promise<any>;
  }

  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }

  getAddButton(){
    return element(by.css('.add-button'));
  }

  getStudentTable(){
    return element(by.css('table'));
  }

  addView(){
    return browser.get(browser.baseUrl + '/students/add') as Promise<any>;
  }

  getAddEmailInput(){
    return element(by.id('exampleInputEmail1'));
  }

  getAddAgeInput(){
    return element(by.id('exampleInputAge'));
  }

  getAddNameInput(){
    return element(by.id('exampleInputName'));
  }

  getNameInputError(){
    return element(by.css('.name-group')).$('invalid-feedback');
    //return element(by.css('name-group invalid-feedback'));
  }
  getEmailInputError(){
    return element(by.css('.email-group')).$('invalid-feedback');
    //return element(by.css('email-group invalid-feedback'));
  }
  getAgeInputError(){
    return element(by.css('.age-group')).$('invalid-feedback');
    //return element(by.css('age-group invalid-feedback'));
  }
}
