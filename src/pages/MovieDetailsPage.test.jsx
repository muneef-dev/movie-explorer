import { movieMetadataLayout, movieTitleSx } from './MovieDetailsPage';

describe('MovieDetailsPage responsive layout', () => {
  it('stacks metadata on phones and restores the wrapping row on larger screens', () => {
    expect(movieMetadataLayout.direction).toEqual({ xs: 'column', sm: 'row' });
    expect(movieMetadataLayout.sx).toMatchObject({
      flexWrap: { xs: 'nowrap', sm: 'wrap' },
      alignItems: { xs: 'flex-start', sm: 'center' },
      rowGap: { xs: 1, sm: 2.5 },
    });
  });

  it('keeps long movie titles inside narrow phone viewports', () => {
    expect(movieTitleSx.fontSize.xs).toBe('clamp(2.35rem, 12vw, 3.2rem)');
    expect(movieTitleSx.overflowWrap).toBe('anywhere');
  });
});
