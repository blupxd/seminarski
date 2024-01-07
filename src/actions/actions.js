export const dodajKorpa = (produkt, id) => ({
    type: 'DODAJ_PRODUKT',
    payload: produkt,
    _id: id
})
export const ukloniKorpa = (id) => ({
    type: 'UKLONI_PRODUKT',
    _id: id
})
export const isprazniKorpu = () => ({
    type: 'ISPRAZNI'
})