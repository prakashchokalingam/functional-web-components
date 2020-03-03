import { newE2EPage } from '@stencil/core/testing';

describe('url-preview-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<url-preview-card></url-preview-card>');

    const element = await page.find('url-preview-card');
    expect(element).toHaveClass('hydrated');
  });
});
