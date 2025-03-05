import { afterEach, describe, expect, test } from 'vitest';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { fetchData } from '@services/ApiServices';

describe('fetchData', () => {
  const mock = new MockAdapter(axios);
  const url = 'https://api.marvel.ejemplo.com/data';

  afterEach(() => {
    mock.reset();
  });

  test('Debe devolver datos cuando la solicitud es exitosa', async () => {
    const mockData = { id: 1, name: 'Test Data' };
    mock.onGet(url).reply(200, mockData);

    const data = await fetchData(url);

    expect(data).toEqual(mockData);
  });

  test('Debe devolver null cuando la respuesta no contiene datos', async () => {
    mock.onGet(url).reply(200, null);

    const data = await fetchData(url);

    expect(data).toBeNull();
  });

  test('Debe devolver null cuando ocurre un error en la solicitud', async () => {
    mock.onGet(url).reply(500);

    const data = await fetchData(url);

    expect(data).toBeNull();
  });
});