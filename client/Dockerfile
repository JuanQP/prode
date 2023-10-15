FROM node:18-alpine as builder
ARG BACKEND_URL=http://localhost:8000
ENV VITE_BACKEND_URL=${BACKEND_URL}
WORKDIR /app
COPY package*.json ./
RUN npm ci --include=dev
COPY . .
RUN npm run build

FROM nginx:1.25-alpine
COPY --from=builder /app/dist /usr/share/nginx/html
