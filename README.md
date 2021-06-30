All of this work is based on this YouTube video: https://www.youtube.com/watch?v=9zUHg7xjIqQ&t=2283s

Currently at 2:51:30 minute mark.

### Fun facts
- `-p` - port mapping. 3000:3000. The right hand side is traffic destined for container, probably what your express server is listening for. While the left value is what ports your host should listen on to forward to the docker container.
- `docker exec -it node-app bash` is a way you can execute into the container. Useful for when your Docker container is running in `-d` (detached) mode.
- `.dockerignore` is helpful for ignoring files that shouldn't go into your Dockerfile
- `docker ps -a` to show all containers (started/stopped)
- `docker logs node-app` (name of container) to show output/errors of container
- Volume mounts (`-v`) are specific. So if I mount something like `-v $(cwd):/app`, that is a 'bind' mount and that will sync all things over (including removing of things - ex. deleting node_modules). However, if I then specify another volume (an anonymous volume in this case, without the colon) like so `-v /app/node_modules`, this will leave the anonymous volume (and its contents) untouched within the container. Docker mounts work on specificity, so this more specific overrules the less specific.
- The `:ro` after a volume mount tells Docker it's read only. More secure than Docker writing to your local file system.
- `--env-file` argument is handy when specifying many environment variables (as opposed to our `.dev/run.sh` scripts)
- When we create anonymous volumes, they begin to build up all of the time. One way to get rid of unused volumes is `docker volume prune`
- `docker rm node-app -fv` - when we want to remove and stop a container that we've run in detached mode, you will need to rm it. Take note of the `-f` flag which tells it to force (stop the container and remove it) along with the `-v` which will remove any associated volumes as well. Although, you may not always want this in case you still have a postgres or some valuable data lying around.
- `docker-compose.yml` replaces our `.dev/run.sh` scripts. You can run `docker-compose up -d` to spin it up in a detached state OR `docker-compose down -v` to tear it down and remove volumes.
- While using docker-compose, it will not rebuild an image after you've made changes. It is only looking to see if the image exists locally (based on $projectName-$serviceName). If you make a change to the Dockerfile, you'll need to pass in the `--build` to force a new build.
- Try to run `node index.js` vs `["npm", "run", "start"]` - one less level of abstraction within the Docker container.
- When using docker-compose, you can pass in multiple files. ORDER MATTERS! `docker-compose -f docker-compose.yml -f docker-compose.dev.yml down`
- You can use some fancy logic in your `RUN` command to determine what node environment is set to!
- You can often use the `docker-compose down -v` option to remove volumes, HOWEVER you should be careful not to remove volumes that you care about. For example, a mongodb volume that contains data you want to keep!
- docker-compose does a simple comparison since the last time it was run, so if something in your code changes for production...you'll likely want to pass the `--build` parameter to re-build the container with latest code. `docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build`
- A config directory and file seem like a good tool to know what environment variables are in use rather than a .env file! Although, you're really just moving the variables over to a docker-compose in this case, I still think it's a good way to point out what are required variables.
- Routes and controllers are fascinating in NodeJS. That's what today's session was focused on.