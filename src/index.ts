import * as rules from './rules';
import * as configs from './configs';

const packageData = require('../package.json') as Record<string, string>;
const meta = { name: packageData.name, version: packageData.version };

export { configs, meta, rules };
