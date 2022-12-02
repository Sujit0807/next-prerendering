import React from 'react';
// import fs from 'fs/promises';
import path from 'path';
import Link from 'next/link';

function Homepage(props) {
  const { products } = props;

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}><Link href={`/${product.id}/`}>{product.title}</Link></li>
        ))}
      </ul>
    </div>
  );
}

// This code is not a part of client side code
export async function getStaticProps(context) {
  // const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  console.log('(Re-)Generating...');

  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  // this works but what if data changes frequently from api ?
  // So for that we have solution from NEXT.JS ==> 1. useEffect 2. ISR(Incremental Static Generation)

  // redirect
  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    };
  }

  // notFound
  if (data.products.length === 0) {
    return { notFound: true };
  }


  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // in development it does'nt matter
    // coz in development for every request it regenerate but not in server
    // notFound: false,
    // redirect: {
    //   destination: '/no-data',
    // },
  };
}
export default Homepage;
