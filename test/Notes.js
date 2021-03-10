const {assert} = require('chai');

const Notes = artifacts.require('./Notes.sol');

require('chai').use(require('chai-as-promised')).should();

contract('Notes', ([deployer, author]) => {
  let notes;

  before(async () => {
    notes = await Notes.deployed();
  });

  describe('Deployment', async () => {
    it('Deploys successfully', async () => {
      const address = await notes.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, '');
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it('Has a name', async () => {
      const name = await notes.name();
      assert.equal(name, 'Notes on Besu');
    });
  });

  describe('Notes', async () => {
    let result;
    let noteCount;

    before(async () => {
      //Create a note

      result = await notes.createNote(
        'This is my first note',
        'I have to code in Besu',
        {
          from: author,
        },
      );
      noteCount = await notes.noteCount();
    });

    it('Creates a note', async () => {
      //increase the number of notecount
      assert.equal(noteCount, 1);
      const event = result.logs[0].args;
      //Check the ID, title and description
      assert.equal(event.id.toNumber(), noteCount.toNumber(), 'Id is correct');
      assert.equal(event.title, 'This is my first note', 'Title is correct');
      assert.equal(
        event.description,
        'I have to code in Besu',
        'Description is correct',
      );
    });
  });
});
