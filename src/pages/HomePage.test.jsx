import { getRetryPage } from './HomePage';

describe('HomePage retry behavior', () => {
  it('retries a failed first page as page one', () => {
    expect(getRetryPage({ items: [], page: 0 })).toBe(1);
  });

  it('retries the next page when previously loaded movies remain visible', () => {
    expect(getRetryPage({ items: [{ id: 1 }], page: 1 })).toBe(2);
  });
});
