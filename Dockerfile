# Stage 1 , deps
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package.json package-lock.json* ./
# npm install (e nao npm ci) porque as libs do atendimento humano sao
# optionalDependencies e podem nao estar no package-lock ainda.
RUN npm install --no-audit --no-fund
RUN npm install sharp

# Stage 2 , builder
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3 , runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN apk add --no-cache libc6-compat
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
# node_modules completo do estagio deps: o Baileys e carregado por import
# dinamico (nao e tracado pelo standalone), entao precisa estar presente aqui
# para o atendimento humano funcionar em runtime.
COPY --from=deps --chown=nextjs:nodejs /app/node_modules ./node_modules

# Pasta da sessao do WhatsApp (Baileys), gravavel pelo usuario nextjs e
# preparada para receber um volume persistente.
RUN mkdir -p /app/.whatsapp-auth && chown -R nextjs:nodejs /app/.whatsapp-auth

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
