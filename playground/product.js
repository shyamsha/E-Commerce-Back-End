class Product {
	constructor(data) {
		this.name = data.name;
		this.price = data.price;
	}
}

const p1 = new Product({ name: "marker", price: 15 });
console.log(p1);

const p2 = new Product({ body: { name: "scale", price: 10 } });
console.log(p2);
