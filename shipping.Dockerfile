# Imagem base
FROM node

# Diretório de trabalho
WORKDIR /app

# Copia todo o código (específico para o serviço Shipping)
COPY services/shipping /app

# Instala dependências
RUN npm install

# Expõe a porta usada pelo shipping (padrão 3001)
EXPOSE 3001

# Comando para rodar o serviço
CMD ["node", "index.js"]
