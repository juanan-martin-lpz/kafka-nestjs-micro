# This file is generated by Nx.
#
# Build the docker image with `npx nx docker-build backend-backend-infra`.
# Tip: Modify "docker-build" options in project.json to change docker build args.
#
# Run the container with `docker run -p 3000:3000 -t backend-backend-infra`.
FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=3001

WORKDIR /app

RUN addgroup --system backend-backend-infra && \
          adduser --system -G backend-backend-infra backend-backend-infra

COPY dist/apps/backend/backend-infra backend-backend-infra
RUN chown -R backend-backend-infra:backend-backend-infra .

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
RUN npm --prefix backend-backend-infra --omit=dev -f install

EXPOSE 3001

CMD [ "node", "backend-backend-infra" ]
