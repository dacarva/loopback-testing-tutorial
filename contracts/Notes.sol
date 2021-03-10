pragma solidity ^0.5.0;

contract Notes {
    string public name;
    uint256 public noteCount = 0;

    mapping(uint256 => Note) public notes;

    struct Note {
        uint256 id;
        string title;
        string description;
    }

    constructor() public {
        name = 'Notes on Besu';
    }

    event NoteCreated(uint256 id, string title, string description);

    function createNote(string memory _title, string memory _description)
        public
    {
        //Require a valid title
        require(bytes(_title).length > 0);
        //Increment noteCount
        noteCount++;

        //Create movie
        Note memory newNote = Note(noteCount, _title, _description);

        notes[noteCount] = newNote;

        emit NoteCreated(newNote.id, newNote.title, newNote.description);
    }
}
