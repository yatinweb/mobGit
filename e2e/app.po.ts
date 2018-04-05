/*
 * Use the Page Object pattern to define the page under test.
 * See docs/coding-guide/e2e-tests.md for more info.
 */

import { browser, element, by } from 'protractor';

export class AppPage {
  loginButton = element(by.css('button[type="button"]'));

  constructor() {
    // Forces default language
    this.navigateTo();
    browser.executeScript(() => localStorage.setItem('language', 'en-US'));
  }

  navigateTo() {
    return browser.get('/');
  }

  login() {
    this.loginButton.click();
  }

  getParagraphText() {
    return element(by.css('app-root ion-card-title')).getText();
  }
}
