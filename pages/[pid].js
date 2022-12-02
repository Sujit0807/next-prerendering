import { Fragment } from 'react';

// the default behavior for dynamic page is not to preGenerate the page !  e.g [pid].js
const ProductDetail = (props) => {
  const { loadedProduct } = props;

  return (
    <Fragment>
      <div className='myProductClass'>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
        <img src={`${loadedProduct.thumbnail}`} alt="img" />
      </div>
    </Fragment>
  );
};

// // useRouter hook - only works on browser/client, not on the server side to get params
// // and context - in server side to get params

export async function getStaticProps(context) {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  const { params } = context;
  const productId = params.pid;
  const product = data.products.find(
    (product) => product.id.toString() === productId
  );

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { pid: '1' } },
      { params: { pid: '2' } },
      { params: { pid: '3' } },
    ],
    fallback: false,
  };
}

export default ProductDetail;
