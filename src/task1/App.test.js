import { render, fireEvent } from '@testing-library/react';
import * as api from "../api";
import { waitFor } from '@testing-library/dom';
import ImageCarousel from './ImageCarousel';

beforeEach(() => {
    global.Image = class {
        constructor() {
          setTimeout(() => {
            this.onload(); // simulate onload
          }, 100);
        }
    }
    jest.spyOn(api, 'fetchImageUrls')
        .mockImplementation(
            () => new Promise((resolve) => setTimeout(
              () => resolve( [
                'https://images.unsplash.com/photo-1', 
                'https://images.unsplash.com/photo-2', 
                'https://images.unsplash.com/photo-3'] ), 
              200))
        );
});

afterEach(() => {
    api.fetchImageUrls.mockRestore();
});



test("ImageCarousel - next button works", async () => {
    const { findByText, container, findByRole } = render(<ImageCarousel />);
    //eslint-disable-next-line testing-library/prefer-screen-queries
    const nextBtn = await findByText('Next', { selector: 'button' })
    fireEvent.click(nextBtn)
    const img = await findByRole('img')
    expect(img.src).toBe('https://images.unsplash.com/photo-2');
   
});

test("ImageCarousel - prev button works", async () => {
    const { findByText, findByRole } = render(<ImageCarousel />);
    //eslint-disable-next-line testing-library/prefer-screen-queries
    const nextBtn = await findByText('Prev', { selector: 'button' })
    fireEvent.click(nextBtn)
    const img = await findByRole('img')
    expect(img.src).toBe('https://images.unsplash.com/photo-3');
   
});

