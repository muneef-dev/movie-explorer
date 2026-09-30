import { searchActionsSx, searchFormSx } from './SearchBar';

describe('SearchBar responsive layout', () => {
  it('stacks the input and right-aligns full-width actions on phones', () => {
    expect(searchFormSx.flexDirection).toEqual({ xs: 'column', sm: 'row' });
    expect(searchActionsSx).toMatchObject({
      width: { xs: '100%', sm: 'auto' },
      justifyContent: 'flex-end',
    });
  });
});
