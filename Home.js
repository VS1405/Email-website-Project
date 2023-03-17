import React, {useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../store/auth-context';

const Home = (props) => {
  const ctxAuth = useContext(AuthContext)
  console.log('I am in Home')
  return (
    <React.Fragment>
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick = {ctxAuth.onLogout}>Logout</Button>
    </Card>
    </React.Fragment>
  );
};

export default Home;
