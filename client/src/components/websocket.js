import { useEffect, useState } from 'react';
import Headline from './headline';
import io from 'socket.io-client';
const socket = io.connect(process.env.REACT_APP_URL);

const SocketApp = () => {
  const [socketData, setSocketData] = useState();

  useEffect(() => {
    socket.on('news', (data) => {
      let id = 1;
      const newsArr = [];
      data.forEach((value) => {
        newsArr.push({ id: id, data: value });
        id++;
      });
      id = 0;
      setSocketData(newsArr);
    });
  }, [socket]);

  socket.onopen = () => {};
  return (
    <div className="main-container">
      {socketData &&
        socketData.map((article) => {
          return <Headline data={article.data} id={article.id} />;
        })}{' '}
    </div>
  );
};

export default SocketApp;
