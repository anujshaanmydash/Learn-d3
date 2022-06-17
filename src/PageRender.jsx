import React from 'react';
import { useParams } from 'react-router-dom';
import PageNotFound from './components/global/PageNotFound';

const generatePage = (pagename) => {
  const component = () => require(`./pages/${pagename}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <PageNotFound />;
  }
};

const PageRender = () => {
  const { page, slug } = useParams();
  let pagename = '';
  if (slug) {
    pagename = `${page}/${slug}`;
  } else {
    pagename = `${page}`;
  }

  return generatePage(pagename);
};

export default PageRender;
