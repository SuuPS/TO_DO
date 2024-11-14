
const getCurrentDate = (): string => {
    const today = new Date();

    const day = today.getDate().toString().padStart(2, '0');  // Добавляем ведущий 0, если день < 10
    const month = (today.getMonth() + 1).toString().padStart(2, '0');  // Месяцы начинаются с 0, поэтому прибавляем 1
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
}

export default {
    getCurrentDate
}