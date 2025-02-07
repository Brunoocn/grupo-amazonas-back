# Use a versão mais recente do Node.js
FROM node:20-alpine

# Defina o diretório de trabalho
WORKDIR /app

# Copie o package.json e o package-lock.json (ou yarn.lock) para instalar as dependências primeiro
COPY package*.json ./

# Limpe o cache do npm
RUN npm cache clean --force

# Instale as dependências da aplicação
RUN npm install --legacy-peer-deps

# Copie todo o código da aplicação para dentro do contêiner
COPY . .

# Copie o arquivo .env
COPY .env .env

# Copie o script de espera pelo banco
COPY wait-for-it.sh /app/wait-for-it.sh
RUN chmod +x /app/wait-for-it.sh

# Compile o código TypeScript
RUN npm run build

# Exponha a porta que o NestJS vai rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["/app/wait-for-it.sh", "npm", "run", "start:prod"]
