
#!/usr/bin/env python3
import time
import threading
import subprocess
import dbus
from PIL import Image, ImageDraw, ImageFont
from luma.core.interface.serial import i2c
from luma.oled.device import sh1106

PHONE_MAC = "2C:BE:EE:1C:00:11"
W,H=128,64

serial=i2c(port=1,address=0x3C)
device=sh1106(serial)

try:
    font=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",10)
    bold=ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",11)
except:
    font=ImageFont.load_default()
    bold=ImageFont.load_default()

state={
    "connected":False,
    "title":"Waiting for phone...",
    "artist":"",
    "status":"stopped",
    "duration":0,
    "position":0,
}

bus=dbus.SystemBus()

def btctl(*cmd):
    subprocess.run(["bluetoothctl",*cmd],
                   stdout=subprocess.DEVNULL,
                   stderr=subprocess.DEVNULL)

def ensure():
    btctl("power","on")
    btctl("agent","NoInputNoOutput")
    btctl("default-agent")
    btctl("pairable","on")
    btctl("discoverable","on")
    btctl("trust",PHONE_MAC)
    btctl("connect",PHONE_MAC)

def media():
    om=dbus.Interface(bus.get_object("org.bluez","/"),
                      "org.freedesktop.DBus.ObjectManager")
    objs=om.GetManagedObjects()
    for path,ifs in objs.items():
        if "org.bluez.MediaPlayer1" in ifs:
            p=ifs["org.bluez.MediaPlayer1"]
            track=p.get("Track",{})
            return {
                "connected":True,
                "title":str(track.get("Title","Unknown")),
                "artist":", ".join(track.get("Artist",[])) if "Artist" in track else "",
                "duration":int(track.get("Duration",0)),
                "status":str(p.get("Status","stopped")),
                "position":int(p.get("Position",0))
            }
    return None

def poll():
    while True:
        try:
            ensure()
            m=media()
            if m:
                state.update(m)
            else:
                state["connected"]=False
        except Exception:
            state["connected"]=False
        time.sleep(3)

threading.Thread(target=poll,daemon=True).start()

scroll=0
last=""

while True:
    img=Image.new("1",(W,H),0)
    d=ImageDraw.Draw(img)

    if not state["connected"]:
        d.text((8,20),"Waiting for phone...",font=bold,fill=255)
        d.text((8,36),"Auto reconnect...",font=font,fill=255)
        device.display(img)
        time.sleep(0.1)
        continue

    icon="▶" if state["status"].lower()=="playing" else "||"
    d.text((0,0),icon,font=bold,fill=255)

    title=state["title"]
    if title!=last:
        scroll=0
        last=title

    bbox=d.textbbox((0,0),title,font=bold)
    tw=bbox[2]-bbox[0]
    area=W-16

    if tw>area:
        scroll=(scroll+1)%(tw+30)
        d.text((14-scroll,0),title+"   "+title,font=bold,fill=255)
    else:
        d.text((14,0),title,font=bold,fill=255)

    d.text((0,15),state["artist"],font=font,fill=255)
    d.line((0,28,W,28),fill=255)

    dur=max(state["duration"],1)
    pos=min(state["position"],dur)
    prog=int((pos/dur)*(W-4))
    d.rectangle((2,38,W-2,44),outline=255)
    if prog>0:
        d.rectangle((3,39,2+prog,43),fill=255)

    def fmt(ms):
        s=ms//1000
        return f"{s//60}:{s%60:02d}"

    d.text((0,48),fmt(pos),font=font,fill=255)
    total=fmt(dur)
    tb=d.textbbox((0,0),total,font=font)
    d.text((W-(tb[2]-tb[0]),48),total,font=font,fill=255)

    device.display(img)
    time.sleep(0.05)
