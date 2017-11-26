import expect from 'expect';
import { authorSelector } from './course';

describe('Author Selectors', () => {
  describe('authorSelector', () => {
    it('should return author data formatted for use in a dropDown', () => {
      const authors = [
        {
          id: 'cory-house',
          firstName: 'Cory',
          lastName: 'House'
        },
        {
          id: 'scott-allen',
          firstName: 'Scott',
          lastName: 'Allen'
        }
      ];

      const expected = [
        {
          value: 'cory-house',
          text: 'Cory House'
        },
        {
          value: 'scott-allen',
          text: 'Scott Allen'
        }
      ];

      expect(authorSelector(authors)).toEqual(expected);

    });
  });
});