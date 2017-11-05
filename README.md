# WAFT
Wireless scoring in the sport of fencing is very new because of the challenge of latency, reliability, and portability.

I have a solution for all three!

This wireless system uses two raspberry pis to communicate over wifi with a hotspotted laptop or phone and can track hits, keep score and even tracks how close the hits were!

The electrical system for a fencer basically consists of closing the circuit when the sword is touched to the vest. I simulated this with a momentary switch. I then read the state of the button and if it is pressed, then send back the timestamp and the state of the button over a websocket.

I then process the hit on the laptop and update scores, stop / start timers and light indicator lights. To compensate for latency on the system, I send over the timestamps for each hit and then compare them.

The whole system costs less than $60 for two pis (assuming you have a laptop or phone). It can easily attach to the back of the helmet and transmit data quickly and reliably. 

The rpis are programmed in python using the RPi.GPIO and websockets library. The data is received in javascript using a websocket library. Also using JQuery and bootstrap for nice gui and functionality.

# Setup

use two raspberry pis one switch hooked up to gpio 4 and run pyClient04.py (need to change ip of host pc) and do the same for the other pi except with gpio 18

run index.html on host pc after launching both python files
