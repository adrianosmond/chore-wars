it('renders without crashing', () => {
  const root = document.createElement('div');
  root.setAttribute('id', 'root');
  document.body.appendChild(root);
  /* eslint-disable global-require */
  require('./index');
  /* eslint-enable global-require */
});
