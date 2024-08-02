import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import testData from '../public/seedAlbums.json';
import Home from '../src/app/page';

const mockFetch = jest.fn();

describe('Home', () => {
  beforeAll(() => {
    mockFetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    window.fetch = mockFetch;
  });

  it('renders without crashing', async () => {
    await act(async () => {
      render(<Home />);
    });
  });

  it('renders the title', async () => {
    await act(async () => {
      render(<Home />);
    });

    const heading = screen.getByRole('heading', { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Musaic');
  });

  it('displays correct number of albums', async () => {
    await act(async () => {
      render(<Home />);
    });

    await waitFor(() => {
      const albumItems = screen.getAllByAltText(/top album/i);
      expect(albumItems.length).toBe(testData.length);
    });
  });

  it('displays correct image for album', async () => {
    await act(async () => {
      render(<Home />);
    });

    const image = screen.getByAltText('Top album: MM...FOOD');
    expect(image).toHaveAttribute('src', testData[0].images[0].url);
  });

  it('renders correct number of buttons', async () => {
    await act(async () => {
      render(<Home />);
    });

    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBe(4);
  });

  it('displays the information modal when the about button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    const openModalButton = screen.getByRole('button', {
      name: /about & how to use/i,
    });
    expect(openModalButton).toBeInTheDocument();

    fireEvent.click(openModalButton);

    const modal = screen.getByRole('dialog');
    expect(modal).toBeInTheDocument();

    const howToContent = screen.getByText(/how to use/i);
    expect(howToContent).toBeInTheDocument();

    const dataSourceContent = screen.getByText(/data source/i);
    expect(dataSourceContent).toBeInTheDocument();
  });

  // it('displays the search modal when the add albums button is clicked', async () => {
  //   await act(async () => {
  //     render(<Home />);
  //   });

  //   expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  //   const addAlbumsButton = screen.getByRole('button', {
  //     name: /add albums/i,
  //   });
  //   expect(addAlbumsButton).toBeInTheDocument();

  //   fireEvent.click(addAlbumsButton);

  //   await waitFor(() => {
  //     const modal = screen.getByRole('dialog');
  //     expect(modal).toBeInTheDocument();

  //     const searchModalContent = screen.getByText(/add albums/i);
  //     expect(searchModalContent).toBeInTheDocument();
  //   });
  // });

  it('clears the grid when the clear grid button is clicked', async () => {
    await act(async () => {
      render(<Home />);
    });

    const initialImage = screen.getByAltText('Top album: MM...FOOD');
    expect(initialImage).toHaveAttribute('src', testData[0].images[0].url);

    const clearGridButton = screen.getByRole('button', { name: /clear grid/i });
    expect(clearGridButton).toBeInTheDocument();
    fireEvent.click(clearGridButton);

    const nonExistentImage = screen.queryByAltText(/top album/i);
    expect(nonExistentImage).not.toBeInTheDocument();
  });
});
