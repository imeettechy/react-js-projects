import React from 'react';
import { useParams } from 'react-router-dom';
import FullPost from './../containers/Blog/FullPost/FullPost'

const FullPostWrapper = (props) => {
  const { id } = useParams();
  
  return <FullPost {...props} id={id} />;
};

export default FullPostWrapper;