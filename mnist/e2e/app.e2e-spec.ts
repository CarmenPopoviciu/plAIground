import { MnistPage } from './app.po';

describe('mnist App', () => {
  let page: MnistPage;

  beforeEach(() => {
    page = new MnistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
