import React from 'react';
import SingleChoreContainer, {
  SingleChoreContainerAside,
} from 'containers/SingleChoreContainer';
import Layout from 'components/Layout';

const SingleChorePage = ({
  match: {
    params: { id },
  },
}) => (
  <Layout
    primary={<SingleChoreContainer id={id} />}
    secondary={<SingleChoreContainerAside id={id} />}
  />
);

export default SingleChorePage;
