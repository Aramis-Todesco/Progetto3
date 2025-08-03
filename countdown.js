export default class Countdown {
  #scadenza;
  #ms;
  #htmlElem;
  #interval;

  constructor(d, m12, y, h = 0, m = 0, s = 0) {
    this.#scadenza = new Date(y, m12 - 1, d, h, m, s);
    this.#ms = {
      inizio: this.#scadenza.getTime(),
      in_giorno: 24 * 60 * 60 * 1000,
      in_ora: 60 * 60 * 1000,
      in_minuto: 60 * 1000,
    };
    // Seleziona gli elementi di visualizzazione all'interno della sezione #time
    this.#htmlElem = {
      giorni: document.querySelector("#giorni"),
      ore: document.querySelector("#ore"),
      minuti: document.querySelector("#minuti"),
      secondi: document.querySelector("#secondi"),
    };
    this.#aggiornaCountdown();
    this.#interval = setInterval(this.#aggiornaCountdown.bind(this), 1000);
  }

  #aggiornaCountdown() {
    let ms_correnti = new Date().getTime(),
      ms_differenza = this.#ms.inizio - ms_correnti,
      time = {
        giorni: ~~(ms_differenza / this.#ms.in_giorno),
        ore: ~~((ms_differenza % this.#ms.in_giorno) / this.#ms.in_ora),
        minuti: ~~((ms_differenza % this.#ms.in_ora) / this.#ms.in_minuto),
        secondi: ~~((ms_differenza % this.#ms.in_minuto) / 1000),
      };

    if (ms_differenza <= 0) {
      // Ferma il countdown quando scade
      return this.stopCountdown();
    }

    this.#aggiornaTempi(time);
  }

  #aggiornaTempi(time) {
    for (let chiave in this.#htmlElem) {
      this.#htmlElem[chiave].textContent = time[chiave];
    }
  }

  // Metodo pubblico per fermare il countdown
  stopCountdown() {
    clearInterval(this.#interval);
  }
}

// Inizializza l'applicazione dopo che il DOM è stato caricato
document.addEventListener("DOMContentLoaded", () => {
  // Funzione per impostare i valori minimi in base alla data e ora corrente
  const setMinDate = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1; // getMonth() è 0-based
    const currentDay = now.getDate();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const currentSecond = now.getSeconds();

    // Imposta il valore minimo dell'anno e il suo valore predefinito
    document.querySelector("#input-anno").min = currentYear;
    document.querySelector("#input-anno").value = currentYear;

    // Imposta il valore minimo del mese e il suo valore predefinito
    document.querySelector("#input-mese").min = 1;
    document.querySelector("#input-mese").value = currentMonth;

    // Imposta il valore minimo del giorno e il suo valore predefinito
    document.querySelector("#input-giorno").min = 1;
    document.querySelector("#input-giorno").value = currentDay;

    // Imposta i valori minimi per l'ora, i minuti e i secondi
    document.querySelector("#input-ore").min = currentHour;
    document.querySelector("#input-ore").value = currentHour;

    document.querySelector("#input-minuti").min = currentMinute;
    document.querySelector("#input-minuti").value = currentMinute;

    document.querySelector("#input-secondi").min = currentSecond;
    document.querySelector("#input-secondi").value = currentSecond;
  };

  // Chiama la funzione all'avvio
  setMinDate();

  const form = document.querySelector("#countdownForm");
  const avviaButton = form.querySelector("button[type='submit']");
  let countdownInstance = null;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Controlla lo stato del pulsante per decidere l'azione
    if (avviaButton.textContent === "Avvia Countdown") {
      // Avvia il countdown
      const giorno = parseInt(document.querySelector("#input-giorno").value);
      const mese = parseInt(document.querySelector("#input-mese").value);
      const anno = parseInt(document.querySelector("#input-anno").value);
      const ore = parseInt(document.querySelector("#input-ore").value);
      const minuti = parseInt(document.querySelector("#input-minuti").value);
      const secondi = parseInt(document.querySelector("#input-secondi").value);

      // Ferma l'istanza precedente se esiste
      if (countdownInstance) {
        countdownInstance.stopCountdown();
      }

      // Crea una nuova istanza del countdown
      countdownInstance = new Countdown(
        giorno,
        mese,
        anno,
        ore,
        minuti,
        secondi
      );
      avviaButton.textContent = "Ferma Countdown";
    } else if (avviaButton.textContent === "Ferma Countdown") {
      // Ferma il countdown
      if (countdownInstance) {
        countdownInstance.stopCountdown();
      }
      avviaButton.textContent = "Avvia Countdown";
    }
  });
});
