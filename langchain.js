import { ChatOpenAI } from "@langchain/openai";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";
import { VectorStoreRetrieverMemory } from "langchain/memory";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

const client = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

const embeddings = new OpenAIEmbeddings();
const vectorStore = await SupabaseVectorStore.fromExistingIndex(embeddings, {
  client,
  tableName: "documents",
  queryName: "match_documents",
});

const memory = new VectorStoreRetrieverMemory({
  retriever: vectorStore.asRetriever(),
  memoryKey: "chat_history",
});

const model = new ChatOpenAI({ temperature: 0.5 });

const chain = RunnableSequence.from([
  memory,
  model,
  new StringOutputParser()
]);

export { chain };
