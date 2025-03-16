import style from './style.module.scss';

export const Spinner = () => {
  return (
    <div className={style.spinner__container}>
      <div className={style.spinner}></div>Loading...
    </div>
  );
};
