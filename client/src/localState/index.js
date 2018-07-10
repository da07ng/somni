import merge from 'lodash.merge';

import account from './account';
import ui from './ui';

const state = { ...merge(account, ui) };

export default state;
