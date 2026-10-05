
type ProductProps = {
    title:string,
    price:number,
    inStock: boolean,
    categories: string[] 
  }

function Product ({title, price, inStock, categories}:ProductProps){
    return (
        <div>
            <h3>{title}</h3>
            <p>Price: ${price}</p>
            <p>In stock: {inStock ? "Yes" : "No"}</p>
            <p>Categories: {categories.join(", ")}</p>
        </div>
    )
}

export default Product