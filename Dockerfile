# Stage 1: Build Angular app
FROM node:22.9.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
#execute ngcc (Compatibility compiler) - compile Angulary Ivy libraries to be compatible with the app
RUN npx ngcc --properties es2024 browser module main --first-only --create-ivy-entry-points
COPY . .
RUN npm run build

# Stage 2: Nginx
FROM nginx:alpine
COPY default.conf /etc/nginx/conf.d
COPY --from=build /app/dist/pz-cheeseria-web-app /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 80