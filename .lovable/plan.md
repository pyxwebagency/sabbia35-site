## Causa esatta del 403

Nel tuo log compare 3 volte:

```text
[@lovable.dev/vite-tanstack-config] No Lovable context detected — skipping nitro deploy plugin.
```

Il plugin di build attiva **nitro** (che genera il vero server Node) solo in due casi:
1. sei dentro l'ambiente Lovable, **oppure**
2. passi esplicitamente l'opzione `nitro` nel `vite.config.ts`.

La mia modifica precedente attivava nitro **solo** se impostavi `BUILD_TARGET=node`. Tu hai lanciato `npm run build` (senza quella variabile) → nitro saltato → **nessun `dist/server/index.mjs` eseguibile**, solo file statici in `dist/client`. Hostinger non ha un server da avviare e risponde **403**.

## Soluzione

Rendere la build self-host affidabile **senza dipendere da variabili da ricordare**: attivare automaticamente il preset Node ogni volta che la build gira **fuori** dall'ambiente Lovable, e lasciare invariato il comportamento dentro Lovable (così il "Publish" continua a funzionare con Cloudflare).

Verificato leggendo il sorgente del plugin: rileva l'ambiente Lovable tramite le env `LOVABLE_SANDBOX` / `DEV_SERVER__PROJECT_PATH`. Replico la stessa logica.

### Modifiche al codice

1. **`vite.config.ts`**
   - Calcolare `isLovable = !!(process.env.LOVABLE_SANDBOX || process.env.DEV_SERVER__PROJECT_PATH)`.
   - Se **non** è Lovable → passare `nitro: { preset: "node-server" }` (forza la generazione del server Node).
   - Se **è** Lovable → non passare nulla (resta il default Cloudflare per il Publish).
   - Risultato: anche un semplice `npm run build` su Hostinger genera `dist/server/index.mjs`.

2. **`package.json`**
   - Lo script `"start": "node dist/server/index.mjs"` è già presente e corretto.
   - Mantengo `build:node` come alias esplicito, ma non sarà più necessario.

### Verifica che farò

- Eseguire `npm run build` (senza BUILD_TARGET) e confermare che venga creato `dist/server/index.mjs`.
- Avviare `node dist/server/index.mjs` e controllare la risposta **200** (no 403).

## Cosa devi fare su Hostinger

Il 403 sparisce solo se l'app gira su un ambiente che esegue **Node 22**:

```text
1. npm install        (devono installarsi anche le devDependencies: serve 'nitro' e 'vite' per la build)
2. npm run build      (ora genera dist/server/index.mjs)
3. npm start          (avvia node dist/server/index.mjs, porta da variabile PORT)
```

- Usa un **VPS Hostinger** o un piano con **"Node.js app"**. L'hosting **condiviso/statico** (il dominio `*.hostingersite.com` attuale) non esegue Node → continuerà a dare 403 comunque.
- Nella config dell'app Node imposta: startup file `dist/server/index.mjs` (oppure comando `npm start`), build command `npm run build`.
- ⚠️ Se Hostinger installa con `--production`, la build fallisce perché `vite`/`nitro` sono devDependencies. In quel caso va forzato l'install completo delle dipendenze.

## Alternativa più semplice

Se vuoi evitare tutta la gestione del server, posso pubblicare con **Lovable** (SSR già configurato) e poi colleghi il tuo dominio Hostinger puntando i DNS. Zero configurazione server.

Dimmi se procedo con le modifiche al codice (consigliato) o se preferisci la pubblicazione Lovable.