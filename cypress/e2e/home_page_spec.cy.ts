import path from 'path';

describe('musaic home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('successfully loads', () => {
    cy.get('main').should('be.visible');
  });

  it('clears the grid', () => {
    cy.get('img[alt="Top album: MM...FOOD"]').should('exist');
    cy.get('button[aria-label="clear grid"]').click();
    cy.get('img[alt="Top album: MM...FOOD"]').should('not.exist');
  });

  it('add albums button is disabled when grid is full', () => {
    cy.get('button[aria-label="add albums"]').should('be.disabled');
  });

  it('download button is disabled when grid is not full', () => {
    cy.get('button[aria-label="clear grid"]').click();
    cy.get('button[aria-label="download as image"]').should('be.disabled');
  });

  it('can search for an album and add it to the grid', () => {
    cy.intercept('GET', '/api/search?query=test', {
      fixture: 'searchResults.json',
    }).as('searchRequest');

    cy.get('img[alt="Top album: MM...FOOD"]').click();
    cy.get('input[placeholder="Search for an album..."]').type('test');
    cy.wait('@searchRequest');
    cy.get('img[alt="Search result: TESTING"]').click();
    cy.get('img[alt="Top album: TESTING"]').should('be.visible');
  });

  it('can add multiple albums to the grid', () => {
    cy.intercept('GET', '/api/search?query=test', {
      fixture: 'searchResults.json',
    }).as('searchRequest');

    cy.get('button[aria-label="clear grid"]').click();
    cy.get('button[aria-label="add albums"]').click();

    cy.get('input[placeholder="Search for an album..."]').type('test');
    cy.wait('@searchRequest');
    cy.get('img[alt="Search result: TESTING"]').click();
    cy.get('img[alt="Search result: Test & Recognise (Remixes)"]').click();
    cy.contains('button', 'Close').click();

    cy.get('img[alt="Top album: TESTING"]').should('be.visible');
    cy.get('img[alt="Top album: Test & Recognise (Remixes)"]').should(
      'be.visible'
    );
  });

  it('can drag and drop to rearrange albums', () => {
    // check order before drag and drop
    cy.get('img[alt="Top album: MM...FOOD"]')
      .parent()
      .next()
      .find('img')
      .should('have.attr', 'alt', 'Top album: Nevermind (Remastered)');
    cy.get('img[alt="Top album: Nevermind (Remastered)"]')
      .parent()
      .next()
      .find('img')
      .should('have.attr', 'alt', 'Top album: Blonde');
    cy.get('img[alt="Top album: Blonde"]')
      .parent()
      .next()
      .find('img')
      .should(
        'have.attr',
        'alt',
        "Top album: Sgt. Pepper's Lonely Hearts Club Band (Remastered)"
      );

    // drag and drop
    cy.get('img[alt="Top album: Nevermind (Remastered)"]').drag(
      'img[alt="Top album: MM...FOOD"]'
    );

    // check order after drag and drop
    cy.get('img[alt="Top album: Nevermind (Remastered)"]')
      .parent()
      .next()
      .find('img')
      .should('have.attr', 'alt', 'Top album: MM...FOOD');
    cy.get('img[alt="Top album: MM...FOOD"]')
      .parent()
      .next()
      .find('img')
      .should('have.attr', 'alt', 'Top album: Blonde');
  });

  it('downloads a collage image', () => {
    const downloadFilePath = path.join('.', '/cypress/downloads/musaic.png');

    cy.intercept('POST', '/api/collage', {
      fixture: 'musaic.png',
    }).as('collageRequest');

    cy.get('button[aria-label="download as image"]')
      .should('not.be.disabled')
      .click();

    cy.wait('@collageRequest');

    cy.readFile(downloadFilePath).should('exist');

    // clean up download folder
    cy.task('removeDownloadsFolder');
  });
});
