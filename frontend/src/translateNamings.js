const translateNamings = (nameInEnglish) => {
    switch (nameInEnglish) {
        case "doctors":
            return "Врачи";
        case "patients":
            return "Пациенты";
        case "visits":
            return "Посещения";
        case "rooms":
            return "Кабинеты";
        case "services":
            return "Услуги";
        case "service-lists":
            return "Списки услуг";
        default:
            return null;
    }
};

export default translateNamings;
