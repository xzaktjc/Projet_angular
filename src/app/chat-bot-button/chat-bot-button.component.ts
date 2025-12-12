import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  selector: 'app-chat-bot-button',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot-button.component.html',
  styleUrls: ['./chat-bot-button.component.scss'],
})
export class ChatBotButtonComponent {
  // propriétés simples (pas de signals) pour éviter les problèmes avec *ngIf et ngModel
  open: boolean = false;
  inputMessage: string = '';
  messages: ChatMessage[] = [];

  // dictionnaire lisible
  private rawQaDictionary: Record<string, string> = {
    'bonjour': "Bonjour. Comment puis-je vous aider aujourd'hui ?",
    "Je veux une session massage pour ce soir": "Bien sûr ! Pourrais-tu m'indiquer à quelle heure tu souhaites te faire masser ce soir ?",
    "a 20h": "Bien sûr ! Le rendez-vous est pris. Un chauffeur privé sera à ton adresse à 20h."
  };

  // Map avec clés pré-normalisées
  private qaMap: Map<string, string>;

  // Réponse par défaut
  private defaultReply = "Je suis désolé, je n'ai pas compris. Peux-tu reformuler ?";

  constructor() {
    // Pré-normaliser toutes les clés au démarrage
    this.qaMap = new Map<string, string>();
    for (const [k, v] of Object.entries(this.rawQaDictionary)) {
      const nk = this.normalize(k);
      this.qaMap.set(nk, v);
    }
  }

  // toggle pour afficher / cacher le chat
  toggleChat() {
    this.open = !this.open;
  }

  // envoyer le message
  sendMessage() {
    const message = (this.inputMessage || '').trim();
    if (!message) return;

    this.messages.push({ role: 'user', content: message });
    this.inputMessage = '';

    const normalized = this.normalize(message);
    const reply = this.qaMap.get(normalized);

    if (reply) {
      this.messages.push({ role: 'assistant', content: reply });
    } else {
      // Debug optionnel : console logs pour comprendre pourquoi ça n'a pas matché
      console.warn('Message non trouvé dans le dictionnaire.');
      console.log('Raw user message:', JSON.stringify(message));
      console.log('Normalized user message:', JSON.stringify(normalized));
      console.log('Known normalized keys: ', Array.from(this.qaMap.keys()));
      this.messages.push({ role: 'assistant', content: this.defaultReply });
    }
  }

  // Normalisation robuste
  private normalize(text: string): string {
    if (!text) return '';
    return text
      .replace(/\u00A0/g, ' ')          // NBSP -> espace
      .replace(/\u200B/g, '')           // zero-width -> rien
      .toLowerCase()
      .normalize('NFD')                 // sépare accents
      .replace(/[\u0300-\u036f]/g, '')  // supprime accents
      .replace(/[’‘‚‛‹›“”«»„"]/g, "'")  // quotes typographiques -> apostrophe simple
      .replace(/[^\w\s:]/g, '')         // supprime ponctuation (garde alphanum & espaces)
      .replace(/\s+/g, ' ')             // espaces multiples -> 1
      .trim();
  }
}
