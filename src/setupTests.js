import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import firebaseMock from 'firebase-mock';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

const mockAuth = new firebaseMock.MockAuthentication();
const mockDatabase = new firebaseMock.MockFirebase();
mockDatabase.autoFlush();

const mockSDK = new firebaseMock.MockFirebaseSdk(
  path => (path ? mockDatabase.child(path) : mockDatabase),
  () => mockAuth,
  null,
  null,
  null,
);

jest.mock('./lib/firebase', () => ({
  auth: mockSDK.auth(),
  database: mockSDK.database(),
}));
