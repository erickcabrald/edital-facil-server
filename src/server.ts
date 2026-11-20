import fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import multipart from "@fastify/multipart";
import { analisarEdital } from "./services/gemini.js";
import { extrairTextoPDF } from "./services/pdf.service.js";

const app = fastify();

await app.register(cors, {
  origin: [
    "http://localhost:5173",
    "http://localhost:8080",
    ...(process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : []),
  ],
});
app.register(multipart, {
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

app.post("/extrair-edital", async (request, reply) => {
  const arquivo = await request.file();

  if (!arquivo) {
    return reply.status(400).send({
      error: "Nenhum arquivo enviado.",
    });
  }
  console.log("chegou aqui: arquivo enviado");

  if (arquivo.mimetype !== "application/pdf") {
    return reply.status(400).send({
      error: "O arquivo deve ser um PDF.",
    });
  }

  try {
    const buffer = await arquivo.toBuffer();

    const texto = await extrairTextoPDF(buffer);

    const respostaIA = await analisarEdital(texto);

    return reply.send({
      success: true,
      data: respostaIA,
    });
  } catch (error) {
    request.log.error(error);

    return reply.status(500).send({
      error: "Erro ao processar o PDF.",
    });
  }
});

app.get("/", async () => {
  return {
    message: "Servidor está no ar",
  };
});

const port = Number(process.env.PORT) || 3000;

app.listen({ port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Servidor rodando em ${address}`);
});
