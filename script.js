let checkInRecords = JSON.parse(localStorage.getItem('checkInRecords')) || [];

function checkIn() {
    const name = document.getElementById('name').value;
    const hours = parseInt(document.getElementById('hours').value);

    if (name && !isNaN(hours) && hours > 0) {
        const amount = calculateAmount(hours);
        const record = {
            name,
            hours,
            amount,
            timeRemaining: hours * 60 * 60, // Convert hours to seconds
            timerId: null,
        };

        checkInRecords.push(record);
        updateTable();
        startTimer(record);

        // Save to local storage
        localStorage.setItem('checkInRecords', JSON.stringify(checkInRecords));

    } else {
        alert('Invalid input. Please enter valid name and hours.');
    }
}

function calculateAmount(hours) {
    // You can customize the amount calculation logic here
    // For simplicity, let's assume php66 per hour
    return hours * 66;
}

function deleteRecord(index) {
    clearInterval(checkInRecords[index].timerId);
    checkInRecords.splice(index, 1);
    updateTable();

    // Save to local storage
    localStorage.setItem('checkInRecords', JSON.stringify(checkInRecords));
}

function updateTable() {
    const tableBody = document.getElementById('checkInRecords');
    tableBody.innerHTML = '';

    checkInRecords.forEach((record, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = record.name;
        cell2.textContent = record.hours;
        cell3.textContent = 'Php ' + record.amount.toFixed(2);
        cell4.textContent = formatTime(record.timeRemaining);
        cell5.innerHTML = `<button onclick="deleteRecord(${index})">Delete</button>`;
    });
}

function startTimer(record) {
    record.timerId = setInterval(() => {
        record.timeRemaining--;

        if (record.timeRemaining <= 0) {
            clearInterval(record.timerId);
            updateTable();
        } else {
            updateTable();
        }
    }, 1000);
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secondsRemain = seconds % 60;
    return `${hours}h ${minutes}m ${secondsRemain}s`;
}

// Initial table update
updateTable();
