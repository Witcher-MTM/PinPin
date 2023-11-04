import AsyncStorage from '@react-native-async-storage/async-storage';
export const saveDataToLocalStorage = async (obj) => {
    try {
        const { key, data } = obj
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
export const SaveHistoryWins = async (obj) => {
    try {
        const { key, data } = obj;
        const localData = await AsyncStorage.getItem(key);
        let existingData = localData ? JSON.parse(localData) : [];

        // Перевірка, чи довжина колекції більше 30
        if (existingData.length >= 25) {
            // Видалення першого об'єкта
            existingData.shift();
        }

        // Додавання нового об'єкта до колекції
        existingData.push(data);

        await AsyncStorage.setItem(key, JSON.stringify(existingData));
        console.log(`Дані збережено успішно.`);
    } catch (error) {
        console.error('Помилка збереження даних: ', error);
    }
};

export const clearAllData = async () => {
    try {
        await AsyncStorage.clear();
        console.log('Всі дані успішно видалені з локального сховища.');
    } catch (error) {
        console.error('Помилка під час видалення даних: ', error);
    }
}

export const saveUserDataWithDate = async (money) => {
    try {
        const currentDate = new Date();
        const currentDateStr = currentDate.toDateString();

        
        const savedDateStr = await AsyncStorage.getItem('date');
        if(!savedDateStr){
            saveDataToLocalStorage({key:'date', date:currentDateStr})
            return
        }
        else{
            if (currentDateStr !== savedDateStr) {
                await AsyncStorage.setItem(`date`, currentDateStr);
                const total_money = await getDataFromLocalStorage("total_money")
                if(total_money){
                    total_money+=500
                    saveDataToLocalStorage({key:"total_money", data:3000})
                }
            }
            const savedData = await AsyncStorage.getItem('date');
            if (savedData) {
                const parsedData = savedData;
            }
        }
    } catch (error) {
        console.error('Помилка збереження даних: ', error);
    }
};

