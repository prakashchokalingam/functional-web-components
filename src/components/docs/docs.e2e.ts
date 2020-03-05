import { newE2EPage } from '@stencil/core/testing';

describe('component-docs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<component-docs></component-docs>');

    const element = await page.find('component-docs');
    expect(element).toHaveClass('hydrated');
  });
});
