import { describe, expect, test, vi } from 'vitest';
import {
  MARVEL_API_BASE_URL,
  getHeroesUrl,
  getHeroDetailUrl,
  getHeroComicsUrl,
} from '@services/SiteConfig';

vi.mock('crypto-js', async () => {
  const actual = await vi.importActual('crypto-js');
  return {
    ...actual,
    MD5: vi.fn().mockReturnValue({ toString: () => 'mockedHash' }),
  };
});

vi.stubGlobal('import.meta', {
  env: {
    VITE_MARVEL_API_PUBLIC_KEY: 'publicKey',
    VITE_MARVEL_API_PRIVATE_KEY: 'privateKey',
  },
});

describe('SiteConfig', () => {
  test('MARVEL_API_BASE_URL should be correct', () => {
    expect(MARVEL_API_BASE_URL).toBe('http://gateway.marvel.com/v1/public');
  });

  test('getHeroesUrl should generate correct URL', () => {
    const limit = 20;
    const offset = 0;
    const url = getHeroesUrl(limit, offset);
    expect(url).toContain(MARVEL_API_BASE_URL);
    expect(url).toContain('characters');
    expect(url).toContain(`limit=${limit}`);
    expect(url).toContain(`offset=${offset}`);
    expect(url).toContain('ts=');
  });

  test('getHeroDetailUrl should generate correct URL', () => {
    const heroId = 1;
    const url = getHeroDetailUrl(heroId);
    expect(url).toContain(MARVEL_API_BASE_URL);
    expect(url).toContain(`characters/${heroId}`);
    expect(url).toContain('ts=');
  });

  test('getHeroComicsUrl should generate correct URL', () => {
    const heroId = 1;
    const limit = 20;
    const url = getHeroComicsUrl(heroId, limit);
    expect(url).toContain(MARVEL_API_BASE_URL);
    expect(url).toContain(`characters/${heroId}/comics`);
    expect(url).toContain(`limit=${limit}`);
    expect(url).toContain('orderBy=onsaleDate');
    expect(url).toContain('ts=');
  });
});
