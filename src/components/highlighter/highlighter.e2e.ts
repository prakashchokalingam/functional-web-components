import { newE2EPage } from '@stencil/core/testing';

describe('code-highlighter', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<code-highlighter></code-highlighter>');

    const element = await page.find('code-highlighter');
    expect(element).toHaveClass('hydrated');
  });
});
