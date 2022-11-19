import React from 'react';
// import fs from 'fs/promises';
import path from 'path';

function Homepage(props) {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}

// This code is not a part of client side code
export async function getStaticProps() {
  // const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  console.log('(Re-)Generating...');

  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  // this works but what if data changes frequently from api ?
  // So for that we have solution from NEXT.JS ==> 1. useEffect 2. ISR(Incremental Static Generation)

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // in development it does'nt matter
    // coz in development for every request it regenerate but not in server
  };
}
export default Homepage;
