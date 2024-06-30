export default class {
    #scadenza;
    #ms;
    #htmlElem;
    #interval;

    constructor(d, m12, y, h=0, m=0, s=0) {
        this.#scadenza = new Date(y, m12-1, d, h, m, s);
        this.#ms = {
            inizio: this.#scadenza.getTime(),
            in_giorno: 24 * 60 * 60 * 1000,
            in_ora: 60 * 60 * 1000,
            in_minuto: 60 * 1000
        };
        this.#htmlElem = {
            giorni: document.querySelector("#giorni"),
            ore: document.querySelector("#ore"),
            minuti: document.querySelector("#minuti"),
            secondi: document.querySelector("#secondi")
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
            }

        if(ms_differenza <= 0) {
            return clearInterval(this.#interval);
        }

        this.#aggiornaTempi(time);
    }
    #aggiornaTempi(time) {
        for(let chiave in this.#htmlElem) {
            this.#htmlElem[chiave].textContent = time[chiave];
        }
    }

}