function convertMsToMinSec(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60 >= 10 ? totalSeconds % 60 : '0' + totalSeconds % 60;
    return { minutes, seconds };
}

function convertDate(date) {
    // Créer une instance de l'objet Date pour la date actuelle
    const currentDate = new Date();

    // Obtenir l'année, le mois et le jour de la date actuelle
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // +1 car les mois sont indexés à partir de 0
    const day = String(currentDate.getDate()).padStart(2, '0');

    // Construire la date au format souhaité (YYYY-MM-DD)
    const formattedDate = `${year}-${month}-${day}`;

    let jours = diffDate(date, formattedDate)

    if (jours == 0) { return 'Today' };

    if (jours < 7 && jours > 0) { return 'Less than a week' }

    if (jours >= 7 && jours < 30) { return 'More than a week' }

    if (jours >= 30) { return 'A month or more' }

    return '';

}

function diffDate(date1, date2) {
    // Dates au format "YYYY-MM-DD"

    // Convertir les dates en objets Date
    date1 = new Date(date1);
    date2 = new Date(date2);

    // Calculer la différence en millisecondes entre les deux dates
    const differenceInMs = Math.abs(date1 - date2);

    // Convertir la différence en millisecondes en jours
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return differenceInDays;
}

function convertDateToString(dateString) {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const date = new Date(dateString);

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
}

export { convertDate, convertMsToMinSec, convertDateToString }