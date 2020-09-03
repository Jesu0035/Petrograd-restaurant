//built Navigation and create Sections
function init() {
	fetch("https://kea-alt-del.dk/t5/api/categories").then(r => r.json()).then(function (data) {
		categoriesRecieved(data)
	})
}
init();

function categoriesRecieved(cats) {
	//createNavigation(cats);
	createSections(cats);
	fetchProducts();
}

function createSections(categories) {
	categories.forEach(category => {
		const section = document.createElement("section");
		section.setAttribute("id", category);
		const h2 = document.createElement("h2");
		h2.textContent = category;
		section.appendChild(h2);
		document.querySelector(".productlist").appendChild(section);



	})
}

function fetchProducts() {
	fetch("https://kea-alt-del.dk/t5/api/productlist")

		.then(function (response) {
			console.log(response)
			return response.json();
		})

		.then(function (data) {
			console.log(data)
			dataReceived(data)
		})

}


function dataReceived(products) {
	products.forEach(showProduct)

}

function showProduct(myProduct) {
	console.log("myProduct")
	const temp = document.querySelector("#productTemplate").content;
	const myCopy = temp.cloneNode(true);

	const img = myCopy.querySelector(".product_image");
	img.setAttribute("src", `https://kea-alt-del.dk/t5/site/imgs/medium/${myProduct.image}-md.jpg`)


	myCopy.querySelector("h2").textContent = myProduct.name;

	myCopy.querySelector("h3").textContent = myProduct.price + "dkk";

	myCopy.querySelector("p").textContent = myProduct.shortdescription;

	//veggy products//condition for Veggeterian//
	if (myProduct.vegetarian) {
		console.log("veg");
		myCopy.querySelector(".vegetarian").classList.remove("hidden");
	}
	//ventana modal
	myCopy.querySelector("button").addEventListener("click", () => {
		fetch(`https://kea-alt-del.dk/t5/api/product?id=${myProduct.id}`)
			.then(res => res.json())
			.then(showDetails);
	});

	const modal = document.querySelector(".modal-background");
	//once we have our data, ....
	function showDetails(data) {

		modal.querySelector(".modal-name").textContent = data.name;
		modal.querySelector(".modal-description").textContent = data.longdescription;
		//...
		modal.classList.remove("hide");
	}


	//CONDITION IF MY PRODUCTU IS SOLD OUT, text that appear over the card.
	if (myProduct.soldout) {
		const p = document.createElement("p");
		p.textContent = "Sold Out";
		p.classList.add("soldout")
		myCopy.querySelector("article").appendChild(p)
	}

	//const parentElem = document.querySelector("section#starter");
	const parentElem = document.querySelector("section#" + myProduct.category);

	parentElem.appendChild(myCopy);

}


//MODAL
//close the modal when clicked

modal.addEventListener("click", () => {
	modal.classList.add("hide");
});



//CREATE A SINGLE HIDDEN ELEMENT
