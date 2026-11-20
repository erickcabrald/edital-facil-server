# Editais IA

API desenvolvida em TypeScript que utiliza inteligência artificial para analisar editais em PDF e extrair suas principais informações. O projeto busca facilitar a compreensão dos editais, reunindo informações importantes para que os candidatos possam consultar requisitos, inscrições, documentos necessários e etapas dos processos seletivos.

## Funcionalidades

- Envio de editais em formato PDF.
- Extração automática do texto dos documentos.
- Análise do conteúdo utilizando o Google Gemini.
- Identificação dos principais dados do edital.
- Retorno das informações estruturadas em JSON.
- Validação do envio e do formato do arquivo.
- Limite de upload de 50 MB por arquivo.

## Informações extraídas

A API pode identificar:

- Título e instituição responsável.
- Resumo do edital.
- Quantidade de vagas.
- Benefícios ou remuneração.
- Período e forma de inscrição.
- Link de inscrição, taxa e informações sobre isenção.
- Público-alvo e requisitos.
- Documentos necessários.
- Cotas disponíveis.
- Etapas do processo seletivo.
- Datas importantes.
- Critérios de classificação.
- Motivos de eliminação.
- Informações de contato.
- Observações importantes.

## Tecnologias utilizadas

- **Node.js:** ambiente de execução.
- **TypeScript:** linguagem utilizada no desenvolvimento.
- **Fastify:** criação do servidor e das rotas HTTP.
- **Google Gemini:** análise dos editais com inteligência artificial.
- **PDF.js:** extração de texto dos arquivos PDF.
- **@fastify/multipart:** recebimento de arquivos.
- **@fastify/cors:** configuração de acesso entre origens.
- **dotenv:** carregamento de variáveis de ambiente.
- **tsx:** execução do TypeScript durante o desenvolvimento.
- **pnpm:** gerenciamento de dependências.

## Pré-requisitos

Antes de executar o projeto, você precisa ter:

- [Node.js](https://nodejs.org/) instalado.
- [pnpm](https://pnpm.io/) instalado.
- Uma chave de API do Google Gemini, disponível no [Google AI Studio](https://aistudio.google.com/apikey).

## Como executar o projeto

### 1. Clone o repositório

```bash
git clone URL_DO_REPOSITORIO
```

Entre na pasta do projeto:

```bash
cd editais-ia
```

Substitua `URL_DO_REPOSITORIO` pelo endereço real do repositório no GitHub.

### 2. Instale as dependências

Na raiz do projeto, execute:

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API:

```env
GEMINI_API_KEY=sua_chave_api_aqui
```

Substitua `sua_chave_api_aqui` pela chave obtida no Google AI Studio.

**Importante:** não compartilhe sua chave de API nem envie o arquivo `.env` para o GitHub. Adicione esse arquivo ao `.gitignore`.

### 4. Inicie o servidor

Execute:

```bash
pnpm dev
```

O projeto utilizará o script `dev` configurado no `package.json`, executando o arquivo `src/server.ts` com o `tsx watch`.

O modo `watch` reinicia a execução quando alterações nos arquivos monitorados são detectadas.

Por padrão, o servidor utiliza a porta `3000`.

## Como utilizar a API

### Verificar se o servidor está funcionando

**Método:** `GET`

**Rota:** `/`

Com o servidor em execução, acesse:

```text
http://localhost:3000/
```

Resposta esperada:

```json
{
  "message": "Servidor está no ar"
}
```

### Analisar um edital

**Método:** `POST`

**Rota:** `/extrair-edital`

Envie um arquivo PDF para a API utilizando `multipart/form-data`.

Exemplo com cURL:

```bash
curl -X POST http://localhost:3000/extrair-edital \
  -F "file=@edital.pdf"
```

Nesse exemplo, `edital.pdf` é o arquivo que será analisado. Se ele estiver em outra pasta, informe o caminho correto.

### Resposta da análise

Quando o processamento é concluído, a API retorna um objeto JSON com o indicador de sucesso e os dados extraídos do edital.

Exemplo ilustrativo:

```json
{
  "success": true,
  "data": {
    "titulo": "Processo Seletivo",
    "instituicao": "Instituição responsável",
    "resumo": "Resumo do objetivo do edital.",
    "inscricoes": {
      "inicio": "Data de início",
      "fim": "Data de encerramento",
      "forma": "Inscrição pela internet",
      "link": null,
      "taxa": null,
      "isencao": null
    },
    "requisitos": [],
    "documentosNecessarios": [],
    "cotas": [],
    "etapas": [],
    "datasImportantes": [],
    "observacoesImportantes": []
  }
}
```

Os valores acima são apenas ilustrativos. A resposta real depende do conteúdo do arquivo enviado e da análise realizada pelo Gemini.

## Tratamento de erros

| Situação | Código HTTP |
|---|---:|
| Nenhum arquivo enviado | 400 |
| Arquivo que não é PDF | 400 |
| Erro durante o processamento | 500 |

## Como funciona

1. O usuário envia um edital em PDF.
2. A API verifica o arquivo recebido.
3. O PDF.js extrai o texto do documento.
4. O texto é enviado ao Google Gemini.
5. O Gemini organiza as informações conforme a estrutura definida no código.
6. A API retorna os dados em JSON.

## Limitações e observações

- A análise depende da qualidade e da legibilidade do documento.
- PDFs compostos exclusivamente por imagens podem precisar de OCR, funcionalidade que não está implementada no código apresentado.
- As informações extraídas devem ser conferidas no documento original, principalmente datas, requisitos e prazos.
- A API utiliza uma chave do Google Gemini, e seu funcionamento depende da disponibilidade e das condições de uso desse serviço.
- A configuração atual do CORS permite origens locais nas portas `5173` e `8080`.

## Licença

O projeto está configurado com a licença `ISC` no `package.json`. Antes de distribuir o código, confirme se essa é a licença que deseja utilizar e inclua um arquivo `LICENSE` com seu texto.
