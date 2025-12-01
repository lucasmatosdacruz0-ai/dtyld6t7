# Mudar de Corpo em 60 Dias

Um Web App leve e modular para gerar planos alimentares de 60 dias, otimizado para o plano gratuito da Vercel.

## 🚀 Como Rodar Localmente

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```
   O app estará disponível em `http://localhost:5173`.

   *Nota: As funções serverless em `/api` requerem o ambiente Vercel ou um proxy local configurado. Para testar a API localmente, recomenda-se usar `vercel dev` se tiver a Vercel CLI instalada.*

## 📦 Deploy na Vercel

1. Faça o push deste repositório para o GitHub.
2. Importe o projeto na Vercel.
3. O `vercel.json` já está configurado. O deploy deve ocorrer automaticamente sem configurações extras.

## 🛠️ Tecnologias

- **Frontend:** React + Vite + TailwindCSS
- **Backend:** Vercel Serverless Functions (Node.js)
- **Dados:** JSON (Sem banco de dados)

## 📄 Estrutura

- `/src`: Código fonte do Frontend
- `/api`: Funções Serverless
- `/data`: Arquivos JSON de dados (Receitas, Substituições)
