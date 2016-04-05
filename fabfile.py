# fabric 1.9.0
from fabric.operations import run, local
from fabric.api import env
from fabric.context_managers import settings


'''
This file is collection of commands regarding deployment
'''

env.user = 'skygear'
env.roledefs.update({
    'master': ['localhost'],
})

docker_run = "docker run --rm -v `pwd`:/usr/share/site --env-file=/home/faseng/config/skygear-doc.env -u `id -u $USER` skygear-doc-generator"

def deploy(branch_name):
    clean()
    local('cat Dockerfile | docker build -t skygear-doc-generator -')
    local('git submodule update --init --recursive')

    local(docker_run + ' hugo --theme=purehugo --buildDrafts -b http://docs.skygear.io/tutorial/')
    # Fix baseurl with an extra "/" at the end
    local(docker_run + ' find . -name "*.html" -exec sed -i "s/http:\/\/docs.skygear.io\/tutorial\/\//http:\/\/docs.skygear.io\/tutorial\//g" {} \;')
    local(docker_run + ' aws s3 sync public/ s3://docs.skygear.io/tutorial/')

def restart():
    raise NotImplemented()

def clean():
    with settings(warn_only=True):
        local(docker_run + ' rm -rf public')
