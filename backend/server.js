// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { SessionsClient } from '@google-cloud/dialogflow-cx';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

// On récupère le chemin vers le fichier JSON depuis GOOGLE_APPLICATION_CREDENTIALS
const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!credentialsPath) throw new Error("Il faut définir GOOGLE_APPLICATION_CREDENTIALS");

const credentials = JSON.parse(fs.readFileSync(credentialsPath, 'utf-8'));
const projectId = credentials.project_id;

// Remplace ces valeurs par celles de ton agent
const agentId = '7871de4b-ba0d-49ee-a100-fe26f6fcb487'; // Ton agent ID
const location = 'us-central1';                           // Région de ton agent
const languageCode = 'fr-FR';                             // Langue de ton agent

const client = new SessionsClient({
  keyFilename: credentialsPath,
  apiEndpoint: 'us-central1-dialogflow.googleapis.com'
});

app.post('/chat', async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) return res.status(400).json({ reply: 'Aucun message fourni' });

  try {
    // Construire le chemin de session pour Dialogflow CX
    const sessionPath = client.projectLocationAgentSessionPath(
      projectId,
      location,
      agentId,
      sessionId || 'default'
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: { text: message },
        languageCode
      }
    };

    const [response] = await client.detectIntent(request);

    // Extraire la réponse du bot
    const reply = response?.queryResult?.responseMessages
      ?.map(msg => msg.text?.text?.join(' '))
      .join(' ') || "Désolé, je n'ai pas compris.";

    res.json({ reply });
  } catch (err) {
    console.error('Erreur Dialogflow CX:', err);
    res.status(500).json({ reply: 'Erreur serveur Dialogflow CX.' });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
