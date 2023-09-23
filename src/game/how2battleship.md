battleship needs to:
- [ ] matchmake players
- [ ] let players set pieces on a board
- [ ] store everyones boards on the main server
- [ ] let players hit coordinates
    - [ ] 1. ask server if it was a hit
    - [ ] 2. mark on your hit boards if it hit or not
- [ ] check for any winners / loosers
- [ ] declare winner
- [ ] reset game

# DATA NEEDED FOR THE GAME

### BOATS
each boat needs to have
- Its orientation *(horizontal or vertical)*
- Start pos
- Length or the boat
- Hit state *(is the boat hit or not?)*

### PLAYERS
Each player needs to have 
- A list of their boats
- A list of marked coordinates