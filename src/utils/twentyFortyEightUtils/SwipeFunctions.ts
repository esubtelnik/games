const shiftAndMerge = (row, size) => {
    let score = 0;
    const result = row.filter(num => num !== 0); 

    for (let i = 0; i < result.length - 1; i++) {
        if (result[i] === result[i + 1]) {        
            result[i] *= 2;                       
            score += result[i];                   
            result[i + 1] = 0;                     
        }
    }

    const mergedRow = result.filter(num => num !== 0); 
    while (mergedRow.length < size) {                   
        mergedRow.push(0);
    }

    return { mergedRow, score };
};

const transpose = matrix => matrix[0].map((_, i) => matrix.map(row => row[i]));

export const swipeLeft = (data, addNumber, setData, setScore, isSimulation = false) => {
    let totalScore = 0;
    const newData = data.map(row => {
        const { mergedRow, score } = shiftAndMerge(row, data.length);
        totalScore += score;
        return mergedRow;
    });


    if (!isSimulation && JSON.stringify(data) !== JSON.stringify(newData)) {
        addNumber(newData);
        setScore(prevScore => prevScore + totalScore);
    }
    if (!isSimulation) {
        setData(newData);
    }
    return newData;
};

export const swipeRight = (data, addNumber, setData, setScore, isSimulation = false) => {
    let totalScore = 0;
    const newData = data.map(row => {
        const { mergedRow, score } = shiftAndMerge([...row].reverse(), data.length);
        totalScore += score;
        return mergedRow.reverse();
    });

    if (!isSimulation && JSON.stringify(data) !== JSON.stringify(newData)) {
        addNumber(newData);
        setScore(prevScore => prevScore + totalScore);
    }
    if (!isSimulation) {
        setData(newData);
    }
    return newData;
};

export const swipeUp = (data, addNumber, setData, setScore, isSimulation = false) => {
    let totalScore = 0;
    const transposedData = transpose(data);
    const newData = transpose(transposedData.map(row => {
        const { mergedRow, score } = shiftAndMerge(row, data.length);
        totalScore += score;
        return mergedRow;
    }));

    if (!isSimulation && JSON.stringify(data) !== JSON.stringify(newData)) {
        addNumber(newData);
        setScore(prevScore => prevScore + totalScore);
    }
    if (!isSimulation) {
        setData(newData);
    }
    return newData;
};

export const swipeDown = (data, addNumber, setData, setScore, isSimulation = false) => {
    let totalScore = 0;
    const transposedData = transpose(data);
    const newData = transpose(transposedData.map(row => {
        const { mergedRow, score } = shiftAndMerge([...row].reverse(), data.length);
        totalScore += score;
        return mergedRow.reverse();
    }));

    if (!isSimulation && JSON.stringify(data) !== JSON.stringify(newData)) {
        addNumber(newData);
        setScore(prevScore => prevScore + totalScore);
    }
    if (!isSimulation) {
        setData(newData);
    }
    return newData;
};

