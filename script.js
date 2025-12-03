let inventory = JSON.parse(localStorage.getItem("inventoryData")) || [];
let editIndex = null;

window.onload = () => {
    displayItems();
};

function addItem() {
    let name = document.getElementById("itemName").value.trim();
    let qty = parseInt(document.getElementById("itemQty").value);
    let price = parseFloat(document.getElementById("itemPrice").value);

    if (!name || qty <= 0 || price <= 0) {
        alert("Please enter valid details");
        return;
    }

    let item = { name, qty, price };

    if (editIndex !== null) {
        inventory[editIndex] = item;
        editIndex = null;
    } else {
        inventory.push(item);
    }

    saveData();
    clearForm();
    displayItems();
}

function displayItems() {
    let table = document.getElementById("inventoryTable");
    table.innerHTML = "";

    inventory.forEach((item, index) => {
        let row = `<tr>
            <td>${item.name}</td>
            <td>${item.qty}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.qty * item.price).toFixed(2)}</td>
            <td>
                <button class="action-btn edit" onclick="editItem(${index})">Edit</button>
                <button class="action-btn delete" onclick="deleteItem(${index})">Delete</button>
            </td>
        </tr>`;
        table.innerHTML += row;
    });
}

function editItem(index) {
    document.getElementById("itemName").value = inventory[index].name;
    document.getElementById("itemQty").value = inventory[index].qty;
    document.getElementById("itemPrice").value = inventory[index].price;

    editIndex = index;
}

function deleteItem(index) {
    if (confirm("Are you sure to delete this item?")) {
        inventory.splice(index, 1);
        saveData();
        displayItems();
    }
}

function saveData() {
    localStorage.setItem("inventoryData", JSON.stringify(inventory));
}

function clearForm() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";
}
