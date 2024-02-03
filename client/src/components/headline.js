import moment from 'moment';
moment().format();

const Headline = ({ data, id }) => {
  const parseDateHandler = (date) => {
    const stringDate = moment(`${date}`).format('MMM Do, YYYY-HH:mm');
    const splitDate = stringDate.split('-');
    return `Published on ${splitDate[0]} at ${splitDate[1]} EST `;
  };
  return (
    <>
      <div class={`article-container container-fluid number${id} text-wrap`}>
        <div className="d-flex justify-content-between hidden-data text-wrap">
          <p>Source: {data.source.name} </p>
          <p>{parseDateHandler(data.publishedAt)}</p>
          <a href={data.url}>Read here</a>{' '}
        </div>
        <div className={`title title-container${id}`}>
          <h3 className="title">{data.title}</h3>
        </div>
        <div className="d-flex text-wrap">{data.description}</div>
      </div>
    </>
  );
};

export default Headline;
