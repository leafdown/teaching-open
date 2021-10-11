 #!/usr/bin/env python3

import json


f = open('old_sprites.json')
sprits = json.load(f)
f.close()

new_sprits = []
for sprit in sprits:
    new = {}
    print(sprit["name"])
    new["name"] = sprit["name"]
    new["tags"] = sprit["tags"]
    new["isStage"] = False
    new["variables"] = {}
    new["costumes"] = []
    for c in sprit["json"]["costumes"]:
        costumes = {}
        md5 = c["baseLayerMD5"]
        costumes["assetId"],costumes["dataFormat"] = md5.split(".")
        costumes["rotationCenterX"]  = c["rotationCenterX"]
        costumes["rotationCenterY"]  = c["rotationCenterY"]
        costumes["md5ext"]  = md5
        costumes["bitmapResolution"]  = c["bitmapResolution"]
        costumes["name"]  = c["costumeName"]
        new["costumes"].append(costumes)

    new["sounds"] = []

    for s in sprit["json"]["sounds"]:
        sound = {}
        md5 = s["md5ext"]
        sound["assetId"],sound["dataFormat"] = md5.split(".")
        sound["rate"]  = int(s["rate"])
        sound["sampleCount"]  = int(s["sampleCount"])
        sound["md5ext"]  = md5
        sound["format"]  = s["format"]
        sound["name"]  = s["soundName"]
        new["sounds"].append(sound)

    new["blocks"] = {}
    new_sprits.append(new)



jsObj = json.dumps(new_sprits)
with open('sprites.json','w') as f:
    f.write(jsObj)
    f.close()

