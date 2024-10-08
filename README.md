# Musaic

Musaic is a web application that allows users to search the Spotify API for albums and add their favorite album covers to a grid. Users can rearrange the grid by dragging and dropping the album covers and download their grid as an image.

![image](https://github.com/user-attachments/assets/6dd7ed1b-b4c9-4f99-95d4-20e91bd11992)

## Technologies Used

- React
- Next.js
- Shadcn
- Tailwind CSS
- Spotify API
- Jest
- Cypress

## Installation

To install and run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lukemcdowell/musaic.git
   cd musaic
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your Spotify API credentials:

   ```
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   ```

   If you don't have these yet you can follow the [Spotify Getting Started guide.](https://developer.spotify.com/documentation/web-api/tutorials/getting-started#create-an-app)

   Alternatively you can add the following environment variable to display only mock data and not interact with the Spotify API:

   ```
   MOCK=true
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Open the application**:
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Testing

This project includes unit tests using Jest and end-to-end tests using Cypress.

1.  **To run the unit tests**:

    ```bash
    npm run test
    ```

2.  **To run the Cypress tests**:

    Start the development server:

    ```bash
    npm run dev
    ```

    In a new terminal window, run the following command to open the Cypress Test Runner:

    ```bash
    npm run cy:open
    ```

    Alternatively, you can run the Cypress tests in headless mode to run them without opening the browser:

    ```bash
    npm run cy:run
    ```

## Usage

1. **Add Albums**:

   - Click on any square in the grid to open the search modal.
   - Search for an album using the Spotify API.
   - Click on an album cover to add it to the grid.
   - Alternatively, use the "Add Albums" button to add multiple albums to the grid at once.

2. **Rearrange Albums**:

   - Drag and drop album covers to rearrange their positions on the grid.

3. **Clear Grid**:

   - Click on the "Clear Grid" button to remove all album covers from the grid.

4. **Download Grid**:
   - Click the "Download As Image" button to download the current grid as an image.
   - Note: The download feature only works when the grid is full with 20 albums.

## Known Problems

- **React DnD Backend Configuration Requires Refresh**  
  The React DnD backend is configured at runtime, which sometimes leads to issues with drag-and-drop functionality whenever you resize the screen (e.g. using the responsive layout in developer tools). To resolve these issues, a page refresh may be necessary to reinitialize the backend properly.

- **No Scrolling on Small Screens During Drag**  
  When dragging items to the edge of the screen on smaller devices, automatic scrolling is not triggered. This can cause difficulty in positioning items in areas of the grid that are not visible without manual scrolling and can hinder users from scrolling on the page.

---

Feel free to contribute to this project by opening issues or submitting pull requests!
