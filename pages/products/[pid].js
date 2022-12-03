import { Fragment } from 'react';

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <div className="myProductClass">
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
        <img src={`${loadedProduct.thumbnail}`} alt="img" />
      </div>
    </Fragment>
  );
};

// Loading Data
async function getData() {
  const res = await fetch('https://dummyjson.com/products');
  const data = await res.json();

  return data;
}

export async function getStaticProps(context) {
  const data = await getData();

  const { params } = context;
  const productId = params.pid;
  const product = data.products.find(
    (product) => product.id.toString() === productId
  );

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);
  const pathWithParams = ids.map((id) => ({ params: { pid: id.toString() } }));

  return {
    paths: pathWithParams,
    fallback: false,
  };
}

export default ProductDetail;
