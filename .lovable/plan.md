## Perché ottieni il 403

Questo sito **non è un sito statico**: è un'app TanStack Start con rendering lato server (SSR) e server functions. Per default la build genera un **Worker per Cloudflare**, non file HTML/JS da caricare in una cartella `public_html`.

L'URL `goldenrod-badger-...hostingersite.com` è l'**hosting condiviso/statico** di Hostinger (Apache, niente Node). Quando ci carichi i file della build:
- non c'è nessun processo Node che esegue il server → Apache non trova un `index.html` valido nella document root → risponde **403 Forbidden** (directory senza index o permessi).

In breve: l'hosting condiviso di Hostinger non può eseguire questa app così com'è. Servono due cose: (1) configurare la build per un **server Node** invece di Cloudflare, (2) eseguirla su un ambiente che fa girare **Node 22** (non lo shared hosting statico).

## Opzioni

```text
Opzione A – Pubblica con Lovable        → 1 click, zero config (consigliata)
Opzione B – Hostinger VPS + Node 22     → controllo totale, richiede setup
Opzione C – Hostinger "Node.js app"     → solo su piani che lo supportano
```

L'hosting condiviso classico (quello del dominio attuale) **non è adatto**: serve un VPS o un piano con runtime Node.

## Cosa faccio nel codice (per Opzione B/C)

1. **Aggiungere il preset Node alla build**
   - Configurare nitro in `vite.config.ts` per usare il preset `node-server` invece del default Cloudflare.
   - Questo fa generare una cartella `.output/` con dentro `server/index.mjs`, avviabile con Node.

2. **Aggiungere lo script di avvio in `package.json`**
   - `"start": "node .output/server/index.mjs"`
   - Definire la porta tramite variabile d'ambiente `PORT` (Hostinger la fornisce).

3. **Istruzioni di deploy** (te le riassumo, non sono codice):
   - `npm install` con Node 22
   - `npm run build`
   - caricare `.output/` (o l'intera repo) sul VPS / app Node
   - avviare con `npm start` (idealmente sotto PM2 per riavvii automatici)
   - puntare il dominio/reverse proxy (Nginx) alla porta del processo Node

## Dettagli tecnici

- Il template usa `@lovable.dev/vite-tanstack-config`, che imposta nitro con target Cloudflare. Passerò una configurazione `nitro` con `preset: "node-server"` tramite `defineConfig` in `vite.config.ts`.
- `vite preview` **non** è un server di produzione: serve solo i file statici e non esegue SSR/server functions correttamente — è probabilmente parte del motivo del comportamento anomalo. In produzione si avvia il bundle di `.output/`.
- Le eventuali variabili d'ambiente server (es. chiavi) vanno impostate nell'ambiente del processo Node, non in file `VITE_`.

## La via più semplice

Se l'obiettivo è solo avere il sito online velocemente, **Opzione A (Publish di Lovable)** evita tutto questo: ottieni un URL `*.lovable.app` funzionante con SSR già configurato, e puoi poi collegare un dominio personalizzato.

Dimmi quale opzione preferisci: se scegli B o C procedo con le modifiche a `vite.config.ts` e `package.json`; se scegli A ti guido alla pubblicazione.