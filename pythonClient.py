#!/usr/bin/python3

import asyncio
import websockets
import random
import datetime
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)
GPIO.setup(18, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)
GPIO.add_event_detect(18, GPIO.RISING)

async def time(websocket, path):
    while True:
        currentState = GPIO.input(18)
        print(currentState)
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        if(GPIO.event_detected(18)): 
            await websocket.send(now + str(GPIO.input(18)))

start_server = websockets.serve(time, '10.42.0.38', 5678)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()

#while True:

#  if(lastState != currentState): 
#    lastState = currentState
#    if(GPIO.input(18)):
#      s.send("HIGH" + str(time.time()))
#    else:
#      s.send("LOW--------------")
#s.close()
