const students = ["B.Jade", "B.Manon", "B.Camille", "B.Kenza", "D.Inès", "D.Lisa", "D.Mila", "E.Erwan", "E.Simon", "G.Raphaëlle", "G.Arthur", "G.Gabriel", "L.Tiana", "L.Baptiste", "L.Nolwenn", "L.Bertille", "L.Martin", "L.Maxence", "L.Baptiste", "L.Adam", "L.Thomas", "L.Tom", "M.Julian", "M.Evan", "M.Samuel", "M.Elouen", "M.Ombeline", "P.Maxence", "R.Clémence"];

function addDocument() {
    const documentName = document.getElementById('documentName').value;
    if (documentName) {
        const table = document.createElement('table');
        table.className = 'table';
        table.id = documentName;
        
        const tableName = document.createElement('div');
        tableName.textContent = `${documentName} : `;
        
        const counter = document.createElement('div');
        counter.id = `counter-${documentName}`;
        counter.textContent = `0/${students.length}`;
        
        students.forEach(student => {
            const cell = document.createElement('td');
            cell.className = 'red';
            cell.innerText = student;
            cell.onclick = () => {
                cell.className = cell.className === 'red' ? 'green' : 'red';
                updateCounter(documentName);
                saveData();
            };
            table.appendChild(cell);
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Supprimer';
        deleteButton.onclick = () => {
            document.getElementById('documents').removeChild(container);
            saveData();
        };

        const container = document.createElement('div');
        container.appendChild(tableName);
        container.appendChild(counter);
        container.appendChild(table);
        container.appendChild(deleteButton);

        document.getElementById('documents').appendChild(container);
        saveData();
    }
}

function updateCounter(documentName) {
    const table = document.getElementById(documentName);
    if (table) {
        const cells = table.getElementsByTagName('td');
        let greenCount = 0;
        for (let cell of cells) {
            if (cell.className === 'green') {
                greenCount++;
            }
        }
        document.getElementById(`counter-${documentName}`).textContent = `${greenCount}/${cells.length}`;
    } else {
        console.error(`Table with id ${documentName} not found.`);
    }
}

function saveData() {
    const documents = document.getElementById('documents').innerHTML;
    localStorage.setItem('documents', documents);
    displayLocalStorageSize();
}

function loadData() {
    const documents = localStorage.getItem('documents');
    if (documents) {
        document.getElementById('documents').innerHTML = documents;
        document.querySelectorAll('.table td').forEach(cell => {
            cell.onclick = () => {
                cell.className = cell.className === 'red' ? 'green' : 'red';
                updateCounter(cell.closest('.table').id);
                saveData();
            };
        });
        document.querySelectorAll('button').forEach(button => {
            if (button.innerText === 'Supprimer') {
                button.onclick = () => {
                    document.getElementById('documents').removeChild(button.parentElement);
                    saveData();
                };
            }
        });
        document.querySelectorAll('.table').forEach(table => {
            updateCounter(table.id);
        });
    }
    displayLocalStorageSize();
}

window.onload = loadData;

function getLocalStorageSizeInMB() {
    let total = 0;
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            total += ((localStorage[key].length + key.length) * 2);
        }
    }
    // Convertir les octets en mégaoctets
    return (total / (1024 * 1024)).toFixed(2);
}

function displayLocalStorageSize() {
    const size = getLocalStorageSizeInMB();
    document.getElementById('localStorageSize').innerText = `Taille du local Storage : ${size} Mo`;
}
