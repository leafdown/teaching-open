#!/usr/bin/python
# -*- encoding: utf-8 -*-
import os, hashlib, json, re, zipfile
from shutil import copyfile
from PIL import Image
from xml.dom import minidom

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
            s["assetsHost"] = "/static/internalapi/asset"

    with open(json_path, 'w') as outfile:
        json.dump(sprites, outfile,indent = 4)

def generate_costumes():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    costumes = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "costumes.json")
    json_path = os.path.join(BASE_DIR, "new_costumes.json")
    with open(full_path, "r") as f:
        costumes = json.load(f)

        for s in costumes:
            s["assetsHost"] = "/static/internalapi/asset"

    with open(json_path, 'w') as outfile:
        json.dump(costumes, outfile)

def generate_costumes():
    '''
    create brackdrops.json
    create md5 backdrop files
    '''
    costumes = []
    backdrops_tags = []

    full_path = os.path.join(BASE_DIR, "costumes.json")
    json_path = os.path.join(BASE_DIR, "new_costumes.json")
    with open(full_path, "r") as f:
        costumes = json.load(f)

        for s in costumes:
            s["assetsHost"] = "/static/internalapi/asset"

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
    json_path = os.path.join(BASE_DIR, "new_backdrops.json")
    with open(full_path, "r") as f:
        backdrops = json.load(f)

        for s in backdrops:
            s["assetsHost"] = "/static/internalapi/asset"

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
    json_path = os.path.join(BASE_DIR, "new_sounds.json")
    with open(full_path, "r") as f:
        sounds = json.load(f)

        for s in sounds:
            s["assetsHost"] = "/static/internalapi/asset/"

    with open(json_path, 'w') as outfile:
        json.dump(sounds, outfile)

if __name__ == '__main__':
    generate_sprites()
    generate_costumes()
    generate_backdrops()
    generate_sounds()

