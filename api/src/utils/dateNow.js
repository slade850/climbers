const getDatetime = () => {
    const date = new Date();
    date.setHours(date.getHours() + 1);
    return JSON.stringify(date).replace(/T/gi , ' ').replace(/(\.[a-z|0-9]+)?/gi , '');
}

module.exports = getDatetime;