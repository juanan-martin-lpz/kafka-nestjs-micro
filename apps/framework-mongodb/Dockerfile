# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build framework-mongodb`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t framework-mongodb`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3000

WORKDIR /app

RUN addgroup --system framework-mongodb && \
          adduser --system -G framework-mongodb framework-mongodb

COPY dist/apps/framework-mongodb framework-mongodb
RUN chown -R framework-mongodb:framework-mongodb .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix framework-mongodb --omit=dev -f install

CMD [ "node", "framework-mongodb" ]
