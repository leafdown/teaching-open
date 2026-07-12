#!/usr/bin/python
# -*- encoding: utf-8 -*-
import os, hashlib, json, re, zipfile
from shutil import copyfile
from PIL import Image
from xml.dom import minidom
from pypinyin import pinyin, Style
import requests
from shutil import copyfile

BASE_DIR = os.path.dirname(os.path.realpath(__file__))


def generate_sprites():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    sprites = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "sprites.json")
    json_path = os.path.join(BASE_DIR, "new_sprites.json")
    with open(full_path, "r") as f:
        sprites = json.load(f)

        for s in sprites:
            s["assetsHost"] = "https://home.leafdown.com:8334"
    #sprites.sort(key=lambda x:x["name"])
    for i in sprites:
        name = i['name']
        if 'Scratch官方' in i['tags']:
            print(name)
            sprites.remove(i)
    #sprites.sort(key=lambda keys:[pinyin(i, style=Style.TONE3) for i in keys["name"]])
    #with open(json_path, 'w') as outfile:
    #    json.dump(sprites, outfile,indent = 4)

def generate_costumes():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    costumes = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "costumes.json")
    json_path = os.path.join(BASE_DIR, "costumes.json")
    with open(full_path, "r") as f:
        costumes = json.load(f)

        for s in costumes:
            s["assetsHost"] = "https://home.leafdown.com:8334"

    for i in costumes:
        name = i['name']
        if 'Scratch官方' in i['tags']:
            print(name)
            costumes.remove(i)

    costumes.sort(key=lambda keys:[pinyin(i, style=Style.TONE3) for i in keys["name"]])
    with open(json_path, 'w') as outfile:
        json.dump(costumes, outfile)


def generate_backdrops():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    backdrops = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "backdrops.json")
    json_path = os.path.join(BASE_DIR, "backdrops.json")
    with open(full_path, "r") as f:
        backdrops = json.load(f)

        for s in backdrops:
            s["assetsHost"] = "https://home.leafdown.com:8334"
    """
    for i in backdrops:
        if ".svg" in i['md5ext']:
            exist_file = os.path.join('/Users/felixy/Documents/Lanqu/Codes/platform/scratch-asset-utils/scratch2/internalapi/internalapi/asset/', i['md5ext'])
            file_save = os.path.join(BASE_DIR, i['md5ext'])

            if(os.path.exists(exist_file)):
                copyfile(exist_file, file_save)
                print(exist_file)
            else:
                url = "https://edu-image.nosdn.127.net/"+i['md5ext']

                myfile = requests.get(url)
                open(file_save,'wb').write(myfile.content)
                print(url)
    """
    backdrops.sort(key=lambda keys:[pinyin(i, style=Style.TONE3) for i in keys["name"]])
    with open(json_path, 'w') as outfile:
        json.dump(backdrops, outfile)

def generate_sounds():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    sounds = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "sounds.json")
    json_path = os.path.join(BASE_DIR, "sounds.json")
    with open(full_path, "r") as f:
        sounds = json.load(f)

        for s in sounds:
            s["assetsHost"] = "/static/internalapi/asset/"
    for i in sounds:
        name = i['name']
        if 'Scratch官方' in i['tags']:
            print(name)
            sounds.remove(i)
    sounds.sort(key=lambda keys:[pinyin(i, style=Style.TONE3) for i in keys["name"]])
    with open(json_path, 'w') as outfile:
        json.dump(sounds, outfile)

if __name__ == '__main__':
    #generate_sprites()
    #generate_costumes()
    generate_backdrops()
    #generate_sounds()

