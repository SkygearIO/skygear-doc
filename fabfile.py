# fabric 1.9.0
from fabric.operations import run, local
from fabric.api import env


'''
This file is collection of commands regarding deployment
'''

env.user = 'ourd'
env.roledefs.update({
    'master': ['localhost'],
})

print(env.host)

def deploy(branch_name):
    clean()
    local('cat Dockerfile | docker build -t ourd-doc-generator -')
    local('git submodule update --init --recursive')
    local('docker run --rm -v `pwd`:/usr/share/site --env-file=/home/faseng/config/ourd-doc.env -u `id -u $USER` ourd-doc-generator hugo --theme=purehugo --buildDrafts')
    local('docker run --rm -v `pwd`:/usr/share/site --env-file=/home/faseng/config/ourd-doc.env -u `id -u $USER` ourd-doc-generator aws s3 sync public/ s3://docs.pandadb.com/tutorial/')

def restart():
    raise NotImplemented()

def clean():
    local('docker run --rm -v `pwd`:/usr/share/site --env-file=/home/faseng/config/ourd-doc.env ourd-doc-generator rm -rf public')
