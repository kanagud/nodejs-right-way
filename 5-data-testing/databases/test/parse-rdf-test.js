const fs = require('fs');
const expect = require('chai').expect;

const parseRDF = require('../lib/parse-rdf');

const rdf = fs.readFileSync(`${__dirname}/pg1000.rdf`);

describe('parseRDF', () => {
  it('should be a function', () => {
    expect(parseRDF).to.be.a('function');
  });

  it('should should parseRDF content', () => {
    const book = parseRDF(rdf);

    console.log(book);
    expect(book).to.be.an('object');
    expect(book).to.have.a.property('id', 1000);

    expect(book).to.have.a.property(
      'title',
      'La Divina Commedia di Dante: Complete'
    );

    expect(book)
      .to.have.a.property('authors')

      .that.is.an('array')
      .with.lengthOf(1)
      .and.contains('Dante Alighieri');

    expect(book)
      .to.have.a.property('subjects')
      .that.is.an('array')
      .with.lengthOf(2)
      .and.contains('Epic poetry, Italian')
      .and.contains('Italian poetry -- To 1400');
  });
});
