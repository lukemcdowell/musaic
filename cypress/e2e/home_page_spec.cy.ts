describe('musaic home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('successfully loads', () => {});

  // it('can search for an album and add it to the grid', () => {
  //   cy.intercept('GET', '/api/search?query=test', {
  //     fixture: 'searchResults.json',
  //   }).as('searchRequest');

  //   cy.get('img[alt="Top album: MM...FOOD"]').click();

  //   cy.get('input[placeholder="Search for an album..."]').type('test');

  //   cy.get('img[alt="Search result: TESTING"]').click();
  // });

  // it('add albums button is disabled when grid is full', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('download button is disabled when grid is not full', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('can add multiple albums to the grid', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('shows the info modal', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('downloads a collage image', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('clears the grid', () => {
  //   // cy.visit('http://localhost:3000');
  // });

  // it('can drag and drop to rearrange albums', () => {
  //   // cy.visit('http://localhost:3000');
  // });
});
