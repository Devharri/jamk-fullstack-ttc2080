document.getElementById("input1").addEventListener("click", renderHouses);
document.getElementById("input2").addEventListener("click", renderHouses);

async function getHouses() {
    let url = 'talot.json';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderHouses() {

    var checkBox1 = document.getElementById("input1");
    var checkBox2 = document.getElementById("input2");

    let houses = await getHouses();
    console.log(houses);

    let housediv = document.getElementById("houses");
    while (housediv.firstChild) {
        housediv.removeChild(housediv.lastChild);
    }

    houses.forEach(house => {

        if (checkBox1.checked == true && checkBox2.checked == false) {
            if (parseInt(house.size) < 200) {

            } else {
                return;
            }
        } else if (checkBox1.checked == false && checkBox2.checked == true) {
            if (parseInt(house.price) < 1000000) {

            } else {
                return;
            }
        } else if (checkBox1.checked == true && checkBox2.checked == true) {
            if (parseInt(house.price) < 1000000 && parseInt(house.size) < 200) {

            } else {
                return;
            }

        } else {

        }

        housecontainer = document.createElement('div');
        housecontainer.className = 'houseContainer';

        let image = document.createElement('img');
        image.src = house.image;
        image.className = 'houseImage';

        let header = document.createElement('p');
        header.className = 'header';
        header.innerHTML = house.address;

        let size = document.createElement('p');
        size.className = '';
        size.innerHTML = house.size + " m2";

        let text = document.createElement('p');
        text.className = 'text';
        text.innerHTML = house.text;

        let price = document.createElement('p');
        price.className = '';
        price.innerHTML = new Intl.NumberFormat('fi-FI').format(house.price) + " euroa";

        housecontainer.appendChild(image);
        housecontainer.appendChild(header);
        housecontainer.appendChild(size);
        housecontainer.appendChild(text);
        housecontainer.appendChild(price);
        housediv.appendChild(housecontainer);
    });
}