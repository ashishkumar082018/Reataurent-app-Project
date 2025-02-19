const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const price = e.target.price.value;
    const dish = e.target.dish.value;
    const table = e.target.table.value;
    const order = { price: price, dish: dish, table: table };
    axios.post("https://crudcrud.com/api/57cc9fafa953462ba7e24b019d4a00a8/orders", order)
        .then((response) => {
            addToList(response.data);
        }
        )
        .catch((err) => {
            console.log(err);
        }
        )

});

function addToList(order) {
    showOrders(order);
}

document.addEventListener("DOMContentLoaded", () => {
    axios.get("https://crudcrud.com/api/57cc9fafa953462ba7e24b019d4a00a8/orders")
        .then((response) => {
            for (var i = 0; i < response.data.length; i++) {
                showOrders(response.data[i]);
            }
        })
        .catch((err) => {
            console.log(err);
        })
});
function showOrders(order) {
    const tableList = order.table + "";
    const listId = `${tableList.toLowerCase().replace(" ", "")}`;
    const parentNode = document.getElementById(listId);
    const childHTML = `<li id=${order._id}>    Dish name : ${order.dish} - Price : ${order.price}
                        <button onclick=handleDelete('${order._id}') class="btn-del">Delete</button>
                        </li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML;

}

function handleDelete(id) {
    axios.delete(`https://crudcrud.com/api/57cc9fafa953462ba7e24b019d4a00a8/orders/${id}`).catch(err => console.log(err));
    const parentNode = document.getElementById(id);
    parentNode.remove();
}