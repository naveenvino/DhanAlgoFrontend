# Use Node for build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

# Use Nginx to serve the built app
FROM nginx:1.25-alpine
COPY --from=build /app/dist/DhanAlgoFrontend /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
