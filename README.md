
# Spot the Lucky Clover!

A light-hearted **click-reaction game** where players must find and click all the four-leaf clovers before time runs out.  

Players click the **four-leaf clovers** to score, but beware  clicking a **rabbit** ends the game!  
Once all the lucky leaves are found within the time limit, the player wins 


## Tech Stack
HTML, CSS, Vanilla JS

## Gameplay Logic Overview

- **Game starts** → clovers and rabbits are rendered in random positions.
- **Click clover** → plays “leaf-pull” sound, removes it, and updates score.
- **Click rabbit** → plays “rabbit-pull” sound and triggers game over.
- **Timer ends** → checks if all clovers found; shows win/lose alert.
- **Replay button** resets everything instantly.
