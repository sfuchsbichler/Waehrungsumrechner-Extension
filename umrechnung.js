document.addEventListener('DOMContentLoaded', function() 
{
    const betrag = document.getElementById("betrag");
    const waehrung = document.getElementById("waehrungen");
    const umrechnung = document.getElementById("umrechnen");
    const ergebnis = document.getElementById("ergebnis");

    const API_KEY = "DEIN_API_KEY"; // hier deinen Key eintragen
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/EUR`;

    /*const umrechnungssaetze = 
    {
        USD: 1.0928, 
        GBP: 0.8500, 
        JPY: 161.2550,
        CAD: 1.4746,
        CHF: 0.9600
    };*/

    async function umrechnen() 
    {
        const betragsumme = parseFloat(betrag.value);
        const waehrungsumme = waehrung.value;

        if (!betragsumme || betragsumme <= 0) 
        {
            ergebnis.textContent = "Bitte einen gültigen Betrag eingeben.";
            return;
        }

        ergebnis.textContent = "Lade aktuellen Kurs...";

        try 
        {
            const response = await fetch(API_URL);
            const data = await response.json();
            const umrechnungssatz = data.conversion_rates[waehrungsumme];

            const ergebnisbetrag = betragsumme * umrechnungssatz;
            ergebnis.textContent = `${betragsumme} EUR = ${ergebnisbetrag.toFixed(2)} ${waehrungsumme}`;
        } 
        catch (error) 
        {
            ergebnis.textContent = "Fehler beim Abrufen des Wechselkurses.";
            console.error(error);
        }
        
        /*const betragsumme = betrag.value;
        if (!betragsumme || betragsumme <= 0) {
            ergebnis.textContent = "Bitte einen gültigen Betrag eingeben.";
            return;
        }
        const waehrungsumme = waehrung.value;
        const umrechnungssatz = umrechnungssaetze[waehrungsumme];

        const ergebnisbetrag = betragsumme * umrechnungssatz;
        ergebnis.textContent = `${betragsumme} EUR = ${ergebnisbetrag.toFixed(2)} ${waehrungsumme}`;*/
    }

    umrechnung.addEventListener('click', umrechnen);
});
