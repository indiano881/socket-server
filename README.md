*****MASTERMIND 3.0//NUXTERMIND*****
This project aim to create a very modern version of the mastermind/secret code game with a touch of some modern features. Players will be allowed to choose a character and release powers during the gameplay. A timer will be alwys set and online torunament mode will be availble so that it is possible to play online in real time.
[OPTIONAL] user will be allowed to connect their metamask wallet and play paying with crypto. The winner will win crypto.
 ________________________________________________________________________________

TECH STACK
Frontend: Vue 3 + Nuxt UI + Tailwind + Typescrypt
Backend: Nuxt + Supabase + Socket.io + [OPTIONAL]-Ether.js/Metamask
 ________________________________________________________________________________

GAME LOGIC
user log in
user can choose to train
user can choose to play against pc
user can play against an online player 1 vs 1 (single match or best of 3?)
user can play tournament mode
 ________________________________________________________________________________
ONLINE GAME:
only auth players can access online section
user can create a room// a user can acces a room existing

once all the requirment are fullfilled the game starts
player who win is the one who found the solution faster (must keep track of the time)
 ________________________________________________________________________________

GAME BASIC LOGIC
one of the character is pre selected other wise can press "CHANGE CARACTER" and it will give the possibility to change caracter
+every character has 2 powers (1 attack 1 defend???) OBS-power button shall work only when START GAME is pressed

when user ready will press START GAME
AT START GAME: 
-PC give same combination to all players
-players are allowed to press buttons
-timer starts

GAME END:
when all player time is 0
everyone found the correct combination (case in which will terminate before the time?)
no one has found the combination (case in which will terminate before the time?)
[ONLY-FOR-TOURNAMENT-MODE] the top 50% will pass to the next stage. ADD BUTTON READY instead of starting GAME??????
[ONLY-FOR-TOURNAMENT-MODE]  top 25% gets 1 card first one gets 2 cards//ALTERNATIVE 1st 2cards 2nd and 3rd 1 card (WHAT HAPPEN IF THE CARD SPACES ARE FULL????)
____________________________________________________

CHARACTERS//power 1// power2//specificare con A se e´attacco e con D se difesa
Mario
Heisenberg
Freddy
Jigsaw
Wolverine
______________________________________________________________
BACKEND DATABASE STRUCTURE
1TABLE for users
2TABLE for records (victories/losses/games/favorit character?)
3TABLE [OPTIONAL] crypto/ points /cards records?