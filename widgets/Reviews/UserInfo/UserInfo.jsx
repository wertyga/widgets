export const UserInfo = ({ name, publishDate }) => {
  return (
    <div>
      <img src="/anonym.png" alt=""/>
      <div>
        <div>{name}</div>
        <div>{publishDate}</div>
      </div>
    </div>
  );
};
