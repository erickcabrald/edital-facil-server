import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function analisarEdital(textoEdital: string) {
  const prompt = `
Você é um especialista em análise de editais brasileiros.

O usuário NÃO quer ler o edital inteiro.

Extraia apenas as informações mais importantes para que um candidato saiba:
- Se pode participar;
- Como se inscrever;
- Quais documentos precisa;
- Quais são os prazos;
- Quais são as etapas do processo.

REGRAS:
- Retorne apenas os dados solicitados.
- Resuma informações longas.
- Não copie grandes trechos do edital.
- Cada item de lista deve ser curto e objetivo.
- Caso alguma informação não exista, utilize null.
- Datas devem ser retornadas exatamente como aparecem no edital.

Texto do edital:

${textoEdital}
`;

  const resposta = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          titulo: {
            type: Type.STRING,
            nullable: true,
          },

          instituicao: {
            type: Type.STRING,
            nullable: true,
          },

          resumo: {
            type: Type.STRING,
            nullable: true,
            description:
              "Resumo curto em até 300 caracteres explicando o objetivo do edital.",
          },

          vagas: {
            type: Type.STRING,
            nullable: true,
          },

          beneficioOuRemuneracao: {
            type: Type.STRING,
            nullable: true,
          },

          inscricoes: {
            type: Type.OBJECT,
            properties: {
              inicio: {
                type: Type.STRING,
                nullable: true,
              },

              fim: {
                type: Type.STRING,
                nullable: true,
              },

              forma: {
                type: Type.STRING,
                nullable: true,
              },

              link: {
                type: Type.STRING,
                nullable: true,
              },

              taxa: {
                type: Type.STRING,
                nullable: true,
              },

              isencao: {
                type: Type.STRING,
                nullable: true,
              },
            },
          },

          publicoAlvo: {
            type: Type.STRING,
            nullable: true,
          },

          requisitos: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          documentosNecessarios: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          cotas: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          etapas: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          datasImportantes: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                evento: {
                  type: Type.STRING,
                },
                data: {
                  type: Type.STRING,
                  nullable: true,
                },
              },
            },
          },

          criteriosClassificacao: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          motivosEliminacao: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },

          contato: {
            type: Type.OBJECT,
            properties: {
              email: {
                type: Type.STRING,
                nullable: true,
              },

              telefone: {
                type: Type.STRING,
                nullable: true,
              },

              site: {
                type: Type.STRING,
                nullable: true,
              },
            },
          },

          observacoesImportantes: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
          },
        },

        required: [
          "titulo",
          "instituicao",
          "resumo",
          "inscricoes",
          "requisitos",
          "documentosNecessarios",
          "cotas",
          "etapas",
          "datasImportantes",
          "observacoesImportantes",
        ],
      },
    },
  });

  return JSON.parse(resposta.text ?? "{}");
}
