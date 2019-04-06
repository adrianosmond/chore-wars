import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createSerializer } from 'enzyme-to-json';
import firebaseMock from 'firebase-mock';

configure({ adapter: new Adapter() });

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

const mockAuth = new firebaseMock.MockAuthentication();
mockAuth.autoFlush();
const mockDatabase = new firebaseMock.MockFirebase();
mockDatabase.autoFlush();

const mockSDK = new firebaseMock.MockFirebaseSdk(
  path => (path ? mockDatabase.child(path) : mockDatabase),
  () => mockAuth,
  null,
  null,
  null,
);

jest.mock('./utils/database', () => ({
  auth: mockSDK.auth(),
  database: mockSDK.database(),
  completeChore: jest.fn(),
  paidDebt: jest.fn(),
  addToTimePaused: jest.fn(),
}));
