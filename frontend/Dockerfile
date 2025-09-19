FROM node:18-alpine AS build
WORKDIR /app
COPY package.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Proxy API calls to backend stack via /api -> we rely on proxy (nginx in swarm or host) or use port mapping for dev.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
