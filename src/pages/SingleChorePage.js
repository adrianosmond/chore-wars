import React from 'react';
import SingleChoreContainer from 'containers/SingleChoreContainer';
import SingleChoreActionContainer from 'containers/SingleChoreActionContainer';
import Layout from 'components/Layout';

const SingleChorePage = ({
  match: {
    params: { id },
  },
}) => (
  <Layout
    primary={<SingleChoreContainer id={id} />}
    secondary={<SingleChoreActionContainer id={id} />}
  />
);

export default SingleChorePage;
