import { version } from '../../package.json';
import { Router } from 'express';
import songs from './songs';

export default ({ config, db }) => {
	let api = Router();

	api.use(`/${config.namespace}/songs`, songs({ config, db }));

	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
