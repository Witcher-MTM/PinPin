import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveDataToLocalStorage = async (obj) => {
    try {
        const {key,data} = obj
        console.log(`key:${key}, data:${data}`)
        await AsyncStorage.setItem(key, data.toString());
        console.log('Дані збережено успішно.');
    } catch (error) {
        console.error('Помилка збереження даних: ', error);
    }
};

export const getDataFromLocalStorage = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        if (data !== null) {
            console.log('Отримані дані з локального сховища:', data);
            return data
        } else {
            console.log('Дані не знайдено в локальному сховищі.');
            return null
        }
    } catch (error) {
        console.error('Помилка отримання даних: ', error);
    }
};

