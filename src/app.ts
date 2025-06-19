import express, { Application } from 'express';
import cors from 'cors';
import { AuthRoute } from './app/module/Auth/auth.route';
import { UserRoute } from './app/module/User/user.route';
import notFound from './app/middlewares/notFound';

const app: Application = express();
app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);

app.get('/', (req, res) => {
  res.send('Hello from Service360');
});
app.use(notFound);
export default app;
