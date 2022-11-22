import { generatePopup } from './generatePopup';

export const fetchBearData = (id) => {
    fetch(`https://private-dd610-ruporttestassignment.apiary-mock.com/get-bears/${id}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            if (response.status === 404) {
                alert('Судя по всему, только Леонард, Миша и Клео могут рассказать о себе. Остальные стесняются.');
                console.warn('Похоже, работают только 3 эндпоинта из 10')
            }
        }
    }).then(data => {
        if (data) {
            const item = data?.data;
            generatePopup(item)
        }
    }).catch(error => console.log(error))
}
