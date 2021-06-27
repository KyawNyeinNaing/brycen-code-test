import Pagination from "rc-pagination";

const PaginationData = (props) => {
  const { onChange, current, total } = props;
  return (
    <Pagination
      onChange={onChange}
      current={current}
      total={total}
      shwLessItems={true}
      showTitle={false}
    />
  );
};

export default PaginationData;
