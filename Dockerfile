FROM node:15
WORKDIR /app
# Only copy the package.json, so my local directory does not get tainted with node_modules
COPY package.json .

# Build some logic in to Dockerfile to only install dependencies based on env
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# After npm has installed all modules, then we can copy the local js (or whatever) files over to the Docker container
COPY . .
# an environment variable
ENV PORT 3000
# Expose is apparently only a note for the developer, this serves no real purpose?
EXPOSE $PORT
# Separate each command within the array
CMD ["npm", "run", "dev"]
