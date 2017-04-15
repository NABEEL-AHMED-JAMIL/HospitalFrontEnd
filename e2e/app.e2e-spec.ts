import { HospitalFrontEndPage } from './app.po';

describe('hospital-front-end App', () => {
  let page: HospitalFrontEndPage;

  beforeEach(() => {
    page = new HospitalFrontEndPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
